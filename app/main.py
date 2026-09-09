from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os

# Import our unified engine and validator
from recovery.engine import RecoveryEngine
from recovery.validator import FileValidator

app = FastAPI(title="SIH 2026 Data Recovery API")

# Define the expected JSON payload from the frontend
class RecoveryRequest(BaseModel):
    method: str  # Expecting "filesystem" or "carving"

@app.post("/api/recover")
def run_recovery_endpoint(request: RecoveryRequest):
    method = request.method.lower()
    
    if method not in ["filesystem", "carving"]:
        raise HTTPException(status_code=400, detail="Invalid recovery method selected.")
    
    # 1. Initialize and run the engine on our disk image
    engine = RecoveryEngine(image_path="evidence.img", output_dir="recovered")
    engine.run_recovery(method)
    
    # 2. Gather the validation results to send back to the frontend
    validator = FileValidator("recovered")
    recovered_files_data = []
    
    if os.path.exists("recovered"):
        for filename in sorted(os.listdir("recovered")):
            filepath = os.path.join("recovered", filename)
            if os.path.isfile(filepath):
                status = validator.validate_file(filepath)
                size_mb = round(os.path.getsize(filepath) / (1024 * 1024), 2)
                
                recovered_files_data.append({
                    "filename": filename,
                    "size_mb": size_mb,
                    "status": status
                })
                
    return {
        "status": "success",
        "method_used": method,
        "total_recovered": len(recovered_files_data),
        "files": recovered_files_data
    }
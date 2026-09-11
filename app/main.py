<<<<<<< HEAD
import sys
import os

# Ensure Python can resolve modules in app directory
sys.path.append(os.path.dirname(__file__))

from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Import our unified engine and validator
from recovery.engine import RecoveryEngine
from recovery.validator import FileValidator

from fastapi.staticfiles import StaticFiles

app = FastAPI(title="SIH 2026 Data Recovery API")

# Add CORS middleware to prevent cross-origin issues between Windows browser and WSL server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define frontend path
FRONTEND_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "frontend"))

# Mount frontend directory for static assets (js, css, images)
if os.path.exists(FRONTEND_DIR):
    app.mount("/static", StaticFiles(directory=FRONTEND_DIR), name="static")

# Define the expected JSON payload from the frontend
class RecoveryRequest(BaseModel):
    method: str  # Expecting "filesystem" or "carving"

@app.get("/")
def serve_frontend():
    html_path = os.path.join(FRONTEND_DIR, "index.html")
    if not os.path.exists(html_path):
        raise HTTPException(status_code=404, detail="Frontend UI (index.html) not found.")
    return FileResponse(html_path)

@app.post("/api/recover")
def run_recovery_endpoint(request: RecoveryRequest):
    method = request.method.lower()
    
    # Validate method
    if method not in ["filesystem", "carving"]:
        raise HTTPException(status_code=400, detail="Invalid recovery method selected.")

    # Resolve the forensic image path relative to the project root (two levels up)
    image_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "evidence.img"))
    if not os.path.exists(image_path):
        raise HTTPException(status_code=404, detail=f"Forensic image '{image_path}' not found on the server.")

    # Verify required Sleuth Kit tools when using filesystem method
    fallback_msg = None
    if method == "filesystem":
        import shutil
        missing = [t for t in ("fls", "icat") if shutil.which(t) is None]
        if missing:
            # Fall back to carving automatically
            fallback_msg = f"Sleuth Kit tools missing: {', '.join(missing)}. Falling back to carving."
            method = "carving"

    # 1. Initialize and run the engine on our disk image
    try:
        engine = RecoveryEngine(image_path=image_path, output_dir="recovered")
        engine.run_recovery(method)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal recovery engine error: {str(e)}")
    
    # 2. Gather the validation results to send back to the frontend
    validator = FileValidator("recovered")
    recovered_files_data = []
    
    if os.path.exists("recovered"):
        for filename in sorted(os.listdir("recovered")):
            filepath = os.path.join("recovered", filename)
            if os.path.isfile(filepath):
                result = validator.validate_file(filepath)
                size_mb = round(os.path.getsize(filepath) / (1024 * 1024), 2)
                
                recovered_files_data.append({
                    "filename": filename,
                    "size_mb": size_mb,
                    "status": result["status"],
                    "score": result["score"]
                })
                
    # 3. Generate Automated PDF Report
    try:
        # Import dynamically to avoid top-level circular issues if any
        from reports.report import ForensicReportGenerator
        report_gen = ForensicReportGenerator(output_pdf="forensic_report.pdf", recovered_dir="recovered")
        report_gen.generate_report(recovered_files_data, method_used=method)
    except Exception as e:
        print(f"Failed to generate PDF report: {e}")

    response = {
        "status": "success",
        "method_used": method,
        "total_recovered": len(recovered_files_data),
        "files": recovered_files_data
    }
    if fallback_msg:
        response["fallback"] = fallback_msg
        
    return response
=======
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
>>>>>>> 2062c80052111075f9b12d712889fbeedf985ed0

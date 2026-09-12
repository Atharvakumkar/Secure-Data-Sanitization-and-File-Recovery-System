import "./App.css"
import { useState } from "react"

function App() {
  const [target, setTarget] = useState("drive")
  const [method, setMethod] = useState("NIST 800-88 (Clear)")
  const [verify, setVerify] = useState(true)
  const [certificate, setCertificate] = useState(true)
  const [audit, setAudit] = useState(false)
  const [eject, setEject] = useState(false)
  const [hardware, setHardware] = useState(false)
  const [started, setStarted] = useState(false)
  const [result, setResult] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploadedTarget,setUploadedTarget]=useState(null)

  const targetNames = {
    drive: "Disk / Drive",
    file: "File / Folder",
    image: "Disk Image",
    removable: "Removable Media",
  }
  /*function handleFileSelect(event) {
  const file = event.target.files[0]

  if (file) {
    setSelectedFile(file)
    console.log("Selected file:", file)
  }
}*/
async function handleFileSelect(event) {
  const file = event.target.files[0]

  if (!file) return

  setSelectedFile(file)

  const formData = new FormData()
  formData.append("file", file)

  try {
    const response = await fetch("http://127.0.0.1:5000/api/upload", {
      method: "POST",
      body: formData,
    })

    const data = await response.json()

    console.log("Upload API Response:", data)

    if (data.success) {
      setUploadedTarget(data.target)
<<<<<<< HEAD:SIH-GUI/secureerase-sih/src/App.jsx
      alert(`File uploaded successfully: ${data.target}`)
    } else {
      alert(`Upload failed: ${data.error}`)
    }
  } catch (error) {
    console.error("Upload Error:", error)
    alert("Could not connect to the sanitization engine.")
=======
    } else {
      console.error("Upload failed:" ,data.error)
    }
  } catch (error) {
    console.error("Upload Error:", error)
    
>>>>>>> 1b8b5a3 (Improve sanitization GUI layout):src/App.jsx
  }
}
  async function startSanitization() {
  try {
    const response = await fetch("http://127.0.0.1:5000/api/sanitize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        target: uploadedTarget,
      }),
    })

    const data = await response.json()
    setResult(data)
    console.log("Sanitization API Response:", data)

    if (data.success) {
      setStarted(true)
<<<<<<< HEAD:SIH-GUI/secureerase-sih/src/App.jsx
      alert("Sanitization completed successfully!")
    } else {
      alert(`Sanitization failed: ${data.message || data.result}`)
    }
  } catch (error) {
    console.error("API Error:", error)
    alert("Could not connect to the sanitization engine.")
=======
      
    } else {
      setStarted(false)
      console.error(
      "Sanitization failed:", data.message || data.error || data.result)
    }
  } catch (error) {
    console.error("API Error:", error)
    
>>>>>>> 1b8b5a3 (Improve sanitization GUI layout):src/App.jsx
  }
}

  return (
    <div className="app">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="brand">
          <div className="brand-shield">◆</div>

          <div>
            <h2>FORENSIC <span>CORE</span></h2>
            <p>Recover · Sanitize · Verify</p>
          </div>
        </div>

        <nav className="side-nav">

          <button>
            <span>⌂</span>
            Home
          </button>

          <button>
            <span>▰</span>
            Evidence
          </button>

          <button>
            <span>⟳</span>
            File Recovery
          </button>

          <button className="active">
            <span>▣</span>
            Sanitization
          </button>

          <button>
            <span>▥</span>
            Intelligence
          </button>

          <button>
            <span>◆</span>
            Verification
          </button>

          <button>
            <span>▤</span>
            Reports
          </button>

          <button>
            <span>▤</span>
            Audit Logs
          </button>

        </nav>

        <div className="sidebar-bottom">

          <button>
            <span>⚙</span>
            Settings
          </button>

          <button>
            <span>?</span>
            Help
          </button>

          <div className="sih-label">
            SIH 2026
            <small>
              Digital Forensics &<br />
              Data Sanitization
            </small>
          </div>

        </div>

      </aside>

      {/* MAIN AREA */}
      <main className="main">

        {/* TOP BAR */}
        <header className="topbar">

          <div className="search">
            <span>⌕</span>
            <input
              placeholder="Search drives, devices, or operations..."
            />
          </div>

          <div className="profile-area">

            <div className="notification">
              ♧
              <span></span>
            </div>

            <div className="profile-circle">
              AK
            </div>

            <div className="profile-text">
              <strong>Atharva Kumkar</strong>
              <small>Investigator</small>
            </div>

            <div className="profile-arrow">
             ⌄
            </div>

          </div>

        </header>

        {/* PAGE CONTENT */}
        <div className="content">

          {/* PAGE HEADER */}
          <div className="page-header">

            <div className="page-title">

              <button className="back-button">
                ←
              </button>

              <div>
                <h1>Data Sanitization</h1>
                <p>Secure. Permanent. Verifiable.</p>
              </div>

            </div>

            <button className="audit-button">
              ▤ &nbsp; View Audit Logs
            </button>

          </div>

          {/* TARGET CARDS */}
          <div className="target-grid">

            <button
              className={`target-card ${target === "drive" ? "selected" : ""}`}
              onClick={() => setTarget("drive")}
            >
              <div className="target-icon">▰</div>
              <div className="target-radio">
                {target === "drive" ? "✓" : ""}
              </div>

              <h3>Disk / Drive</h3>

              <p>
                Sanitize entire HDD, SSD
                or external drives
              </p>
            </button>

            <button
              className={`target-card ${target === "file" ? "selected" : ""}`}
              onClick={() =>{ 
                setTarget("file") 
                document.getElementById("file-input").click()}}
            >
              <div className="target-icon">▱</div>
              <div className="target-radio">
                {target === "file" ? "✓" : ""}
              </div>

              <h3>File / Folder</h3>

              <p>
                Securely erase selected
                files or folders
              </p>
            </button>

            <button
              className={`target-card ${target === "image" ? "selected" : ""}`}
              onClick={() => setTarget("image")}
            >
              <div className="target-icon">▣</div>
              <div className="target-radio">
                {target === "image" ? "✓" : ""}
              </div>

              <h3>Disk Image</h3>

              <p>
                Sanitize disk image files
                (e.g. .img, .dd)
              </p>
            </button>

            <button
              className={`target-card ${target === "removable" ? "selected" : ""}`}
              onClick={() => setTarget("removable")}
            >
              <div className="target-icon">♧</div>
              <div className="target-radio">
                {target === "removable" ? "✓" : ""}
              </div>

              <h3>Removable Media</h3>

              <p>
                Sanitize USB drives,
                SD cards, etc.
              </p>
            </button>
            <input id="file-input"
            type="file"
            style={{display:"none"}}
            onChange={handleFileSelect}/>

            {selectedFile &&(
              <div className="selected-file">
                Selected: {selectedFile.name}
                </div>
            )}

          </div>

          {/* TWO COLUMN AREA */}
          <div className="main-grid">

            {/* LEFT */}
            <section>

              {/* CONFIGURATION */}
              <div className="panel configuration">

                <div className="panel-title">
                  <span>⚙</span>
                  <h2>Sanitization Configuration</h2>
                </div>

                <div className="config-grid">

                  <div className="config-left">

                    <label>Select Drive / Device</label>

                    <div className="select-box">
                      <span>▰</span>
                      Controlled Test Disk Image
                      <span>⌄</span>
                    </div>

                    <div className="device-info">

                      <div>
                        <span>Model</span>
                        <strong>Samsung SSD 970 EVO Plus</strong>
                      </div>

                      <div>
                        <span>Serial</span>
                        <strong>S4EVNX0R123456B</strong>
                      </div>

                      <div>
                        <span>Capacity</span>
                        <strong>500 GB</strong>
                      </div>

                      <div>
                        <span>Type</span>
                        <strong>SSD (NVMe)</strong>
                      </div>

                    </div>

                    <label>Sanitization Method</label>

                    <select
                      className="method-select"
                      value={method}
                      onChange={(e) => setMethod(e.target.value)}
                    >
                      <option>NIST 800-88 (Clear)</option>
                      <option>DoD 5220.22-M</option>
                      <option>Secure Delete</option>
                      <option>3-Pass Overwrite</option>
                    </select>

                    <div className="method-description">
                      Overwrites all accessible data with zeroes.
                      Recommended for general use.
                    </div>

                  </div>

                  {/* ADVANCED OPTIONS */}
                  <div className="advanced">

                    <h3>Advanced Options</h3>

                    <label className="check-row">
                      <input
                        type="checkbox"
                        checked={verify}
                        onChange={(e) => setVerify(e.target.checked)}
                      />
                      Verify after sanitization
                    </label>

                    <label className="check-row">
                      <input
                        type="checkbox"
                        checked={certificate}
                        onChange={(e) =>
                          setCertificate(e.target.checked)
                        }
                      />
                      Generate sanitization certificate
                    </label>

                    <label className="check-row">
                      <input
                        type="checkbox"
                        checked={audit}
                        onChange={(e) => setAudit(e.target.checked)}
                      />
                      Create audit log entry
                    </label>

                    <label className="check-row">
                      <input
                        type="checkbox"
                        checked={eject}
                        onChange={(e) => setEject(e.target.checked)}
                      />
                      Eject drive after completion
                    </label>

                    <label className="check-row">
                      <input
                        type="checkbox"
                        checked={hardware}
                        onChange={(e) =>
                          setHardware(e.target.checked)
                        }
                      />
                      Use hardware secure erase (if available)
                    </label>

                    <div className="warning">

                      <div className="warning-icon">
                        !
                      </div>

                      <div>
                        <strong>Warning</strong>

                        <p>
                          <p>
  This prototype sanitizes only the selected
  controlled disk-image file. The operation
  cannot be undone.
</p>
                        </p>
                      </div>

                    </div>

                    <button
                      className="start-button"
                      onClick={startSanitization}
                    >
                      ▶ &nbsp; Start Sanitization
                    </button>

                  </div>

                </div>

              </div>

              {/* RECENT OPERATIONS */}
              <div className="panel recent">

                <div className="recent-header">

                  <div className="panel-title">
                    <span>◷</span>
                    <h2>Recent Sanitization Operations</h2>
                  </div>

                  <button>View All →</button>

                </div>

                <table>

                  <thead>
                    <tr>
                      <th>Date & Time</th>
                      <th>Target</th>
                      <th>Method</th>
                      <th>Status</th>
                      <th>Report</th>
                    </tr>
                  </thead>

                  <tbody>

                    <tr>
                      <td>07 Sep 2026, 04:12 PM</td>
                      <td>USB_Drive (32 GB)</td>
                      <td>DoD 5220.22-M</td>
                      <td>
                        <span className="status success">
                          ● Completed
                        </span>
                      </td>
                      <td>▤</td>
                    </tr>

                    <tr>
                      <td>06 Sep 2026, 11:23 AM</td>
                      <td>evidence.img (10 GB)</td>
                      <td>NIST 800-88</td>
                      <td>
                        <span className="status success">
                          ● Completed
                        </span>
                      </td>
                      <td>▤</td>
                    </tr>

                    <tr>
                      <td>05 Sep 2026, 02:41 PM</td>
                      <td>Project_Folder</td>
                      <td>Secure Delete</td>
                      <td>
                        <span className="status success">
                          ● Completed
                        </span>
                      </td>
                      <td>▤</td>
                    </tr>

                    <tr>
                      <td>04 Sep 2026, 10:18 AM</td>
                      <td>External HDD (1 TB)</td>
                      <td>3-Pass Overwrite</td>
                      <td>
                        <span className="status failed">
                          ● Failed
                        </span>
                      </td>
                      <td>▤</td>
                    </tr>

                  </tbody>

                </table>

              </div>

            </section>

            {/* RIGHT SIDE */}
            <aside className="right-column">

              {/* DRIVE INFO */}
              <div className="panel side-panel">

                <h2>▰ &nbsp; Drive Information</h2>

                <div className="drive-details">

                  <div>
                    <span>Model</span>
                    <strong>Controlled Test Disk Image</strong>
                  </div>

                  <div>
                    <span>Serial</span>
                    <strong>TEST-IMAGE-001</strong>
                  </div>

                  <div>
                    <span>Capacity</span>
                    <strong>Test Image</strong>
                  </div>

                  <div>
                    <span>Type</span>
                    <strong>Disk Image</strong>
                  </div>

                  <div>
                    <span>Status</span>
                    <strong className="ready">
                      ● &nbsp; Ready
                    </strong>
                  </div>

                </div>

              </div>

              {/* PROGRESS */}
              <div className="panel side-panel">

                <h2>◷ &nbsp; Sanitization Progress</h2>

                <div className="progress-circle">
                  <div>
                    <strong>{result?.success ? "100%" :started ? "5%" : "0%"}</strong>
                    <span>
                      {result?.success ? "Completed" : started ? "Running" : "Not Started"}
                    </span>
                  </div>
                </div>
                {result && (
                  <div className="sanitization-result">
                    <strong> {result.success ? "✓ Sanitization Successful" 
                    : "✗ Sanitization Failed"}
                      </strong>
                      <span> Target :{result.target}</span>
                      <span> Media:{result.media_type}· Method: {result.method}</span>
                      <span> SHA-256: {result.pre_sanitization_sha256}</span>
                      <span>Verification: {result.verification_status}</span>
                      <span> Audit Log: {result.audit_log}</span>
                      </div>
                )}
                <div className="progress-stats">

                  <div>
                    <span>Elapsed Time</span>
                    <strong>00:00:00</strong>
                  </div>

                  <div>
                    <span>Estimated Time</span>
                    <strong>--:--:--</strong>
                  </div>

                  <div>
                    <span>Current Operation</span>
                    <strong>{result?.success ? "Sanitization Complete":started ? "Preparing" : "-"}</strong>
                  </div>

                </div>

                <div className="progress-bar">
                  <div
                    className={result?.success ? "progress-fill started completed" : started ? "progress-fill started" : ""}
                  ></div>
                </div>

              </div>

              {/* VERIFICATION */}
              <div className="panel side-panel">

                <h2>◆ &nbsp; Post-Sanitization Verification</h2>

                <div className="verification-list">

                  <div>
                    <span className="verify-check">✓</span>
                    Scan for residual data
                    <small>{result ? result.verification_status:"Pending"}</small>
                  </div>

                  <div>
                    <span className="verify-check">✓</span>
                    Verify sanitization effectiveness
                    <small>{result ? result.verification_status:"Pending"}</small>
                  </div>

                  <div>
                    <span className="verify-check">✓</span>
                    Generate verification report
                    <small>{result ? result.verification_status:"Pending"}</small>
                  </div>

                </div>

              </div>

              {/* QUICK ACTIONS */}
              <div className="panel side-panel">

                <h2>◆ &nbsp; Quick Actions</h2>

                <div className="quick-actions">

                  <button>
                    <span>▤</span>
                    View Reports
                  </button>

                  <button>
                    <span>◉</span>
                    Certificates
                  </button>

                  <button>
                    <span>◆</span>
                    Sanitization
                    Guidelines
                  </button>

                </div>

              </div>

            </aside>

          </div>

        </div>

      </main>

    </div>
  )
}

export default App
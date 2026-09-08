# 🔍 Advanced File Recovery & Raw File Carving

## SIH 2026 — Integrated Secure Data Erasure & Advanced File Recovery Tool

A forensic file recovery module designed to identify, recover, reconstruct, and validate deleted or otherwise recoverable files from controlled disk images.

This module is part of the **SIH 2026 Integrated Secure Data Erasure and Advanced File Recovery Tool for Digital Forensics and Data Sanitization**.

---

## 📌 Overview

The File Recovery module combines:

- Filesystem analysis
- Deleted-file identification
- Sleuth Kit-based recovery
- Raw file carving
- File signature/header detection
- Fragmented-file reconstruction
- Recovered-file validation
- Recovery metadata generation

The primary objective is to demonstrate how deleted or recoverable files can be identified and recovered from a controlled forensic disk image and provide evidence about the recovered artifacts.

The prototype operates on **controlled test disk images** rather than real system disks.

---

## 🎯 Objectives

The main objectives of this module are:

1. Analyze a forensic disk image.
2. Identify the filesystem and available evidence.
3. Detect deleted files using filesystem metadata.
4. Recover files using Sleuth Kit.
5. Perform raw file carving when filesystem metadata is unavailable or insufficient.
6. Identify files using file signatures/magic bytes.
7. Reconstruct fragmented files where possible.
8. Validate recovered files.
9. Generate recovery metadata and results.
10. Provide recovery evidence to the verification and reporting modules.

---

## 🏗️ Module Architecture

```text
                    ┌──────────────────────┐
                    │   Controlled Disk    │
                    │       Image          │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    Image Analysis    │
                    │   & Filesystem       │
                    │      Detection       │
                    └──────────┬───────────┘
                               │
                    ┌──────────┴──────────┐
                    │                     │
                    ▼                     ▼
          ┌──────────────────┐   ┌──────────────────┐
          │   Sleuth Kit     │   │   Raw File       │
          │    Analysis      │   │    Carving       │
          └────────┬─────────┘   └────────┬─────────┘
                   │                      │
                   └──────────┬───────────┘
                              ▼
                  ┌─────────────────────────┐
                  │   Recovered Artifacts   │
                  └────────────┬────────────┘
                               │
                               ▼
                  ┌─────────────────────────┐
                  │ File Validation &       │
                  │ Integrity Checking      │
                  └────────────┬────────────┘
                               │
                               ▼
                  ┌─────────────────────────┐
                  │ Recovery Metadata &     │
                  │ Evidence Results        │
                  └─────────────────────────┘
```

---

# 🔬 Recovery Approaches

## 1. Filesystem-Based Recovery

The module uses **The Sleuth Kit (TSK)** to analyze filesystem metadata and identify deleted files.

This approach can provide information such as:

- Filename
- File metadata
- Inode
- File size
- File location
- Allocation status
- Deleted status
- Filesystem information

The general workflow is:

```text
Disk Image
    │
    ▼
Filesystem Analysis
    │
    ▼
Metadata Analysis
    │
    ▼
Deleted File Identification
    │
    ▼
File Recovery
    │
    ▼
Validation
```

---

# 2. Raw File Carving

When filesystem metadata is unavailable, damaged, or insufficient, the module performs **raw file carving**.

Raw file carving operates directly on the bytes of a disk image instead of depending entirely on filesystem metadata.

The carving engine searches for known file signatures, identifies potential files, extracts their contents, and validates the resulting artifacts.

Example:

```text
Raw Disk Image
      │
      ├── Random Data
      ├── JPEG Header
      ├── JPEG Data
      ├── Random Data
      ├── PDF Header
      ├── PDF Data
      └── Random Data
```

The carving engine identifies known signatures and extracts the corresponding file data.

---

# 📂 Initial Supported File Types

The initial prototype targets the following file formats:

| File Type | Extension | Detection |
|-----------|-----------|-----------|
| JPEG | `.jpg`, `.jpeg` | File signature |
| PNG | `.png` | File signature |
| PDF | `.pdf` | File signature |
| Microsoft Word | `.docx` | ZIP/container signature |
| ZIP | `.zip` | ZIP signature |

Additional formats can be added later.

---

# 🧩 File Carving Process

The raw carving pipeline follows:

```text
                    Disk Image
                        │
                        ▼
                  Read Raw Bytes
                        │
                        ▼
              Search File Signatures
                        │
                        ▼
               Identify File Header
                        │
                        ▼
              Determine File Structure
                        │
                        ▼
             Locate Appropriate Marker
                        │
                        ▼
                  Extract File
                        │
                        ▼
               Validate Recovered File
                        │
                        ▼
             Generate Recovery Metadata
```

---

# 🗂️ Project Structure

```text
raw-file-carving-sih/
│
├── README.md
│
├── carving.img
│
├── recovered/
│   ├── jpg/
│   ├── png/
│   ├── pdf/
│   ├── docx/
│   └── zip/
│
├── reports/
│   └── recovery-report.json
│
├── signatures/
│   └── signatures.json
│
├── src/
│   ├── sleuthkit/
│   ├── carving/
│   ├── reconstruction/
│   └── validation/
│
├── test-data/
│   └── ...
│
└── docs/
    └── ...
```

> The directory structure may evolve during development.

---

# 🛠️ Technologies

## Operating System

- Linux
- Ubuntu
- WSL2

## Forensic Tools

- The Sleuth Kit
- `mmls`
- `fsstat`
- `fls`
- `istat`
- Other TSK utilities as required

## Core Concepts

- Digital Forensics
- Filesystems
- File Signatures
- Magic Bytes
- Raw File Carving
- File Reconstruction
- File Integrity Validation
- Disk Image Analysis
- SHA-256 Hashing

---

# 🔎 Sleuth Kit Workflow

The filesystem analysis workflow can be summarized as:

```text
                 Disk Image
                     │
                     ▼
                    mmls
                     │
                     ▼
             Partition Information
                     │
                     ▼
                   fsstat
                     │
                     ▼
             Filesystem Information
                     │
                     ▼
                    fls
                     │
                     ▼
          Deleted File Identification
                     │
                     ▼
             File Metadata / Inode
                     │
                     ▼
                  Recovery
```

---

# 🧪 Raw File Carving Workflow

The raw carving workflow operates directly against the disk image.

```text
                    carving.img
                         │
                         ▼
                    Raw Byte Scan
                         │
                         ▼
                  Signature Detection
                         │
              ┌──────────┼──────────┐
              │          │          │
              ▼          ▼          ▼
            JPEG        PNG        PDF
              │          │          │
              └──────────┼──────────┘
                         │
                         ▼
                    ZIP / DOCX
                         │
                         ▼
                   File Extraction
                         │
                         ▼
                    Validation
                         │
                         ▼
                  Recovered Files
```

---

# 📊 Recovery Metadata

Every recovered artifact should maintain metadata such as:

```json
{
    "file_name": "recovered_001.jpg",
    "file_type": "JPEG",
    "source_image": "carving.img",
    "offset": 1048576,
    "size": 245760,
    "recovery_method": "raw_carving",
    "validation_status": "VALID",
    "sha256": "..."
}
```

The exact metadata structure may evolve during integration.

---

# ✅ File Validation

Recovering bytes is not enough.

The recovered artifact should be validated to determine whether the extracted data represents a usable file.

Validation may include:

- File signature verification
- File size verification
- Structural validation
- Parser-based validation
- Successful opening/decoding
- SHA-256 hash calculation
- Integrity status

Example:

```text
              Recovered Artifact
                      │
                      ▼
                Signature Valid?
                      │
                      ▼
                Structure Valid?
                      │
                      ▼
                 Parser Check
                      │
                      ▼
                Integrity Check
                      │
                      ▼
             ┌────────┴────────┐
             │                 │
             ▼                 ▼
           VALID       PARTIAL / INVALID
```

---

# 🧩 Fragmented File Reconstruction

A file may not exist as one continuous block on the disk.

Example:

```text
Disk:

[FILE HEADER]
[FILE DATA]
[RANDOM DATA]
[RANDOM DATA]
[FILE DATA]
[FILE DATA]
[FILE END]
```

The recovery engine should attempt to identify and reconstruct fragmented files where sufficient structural information is available.

The reconstruction process may use:

- File signatures
- File structure
- Known block/cluster boundaries
- File metadata
- Structural markers
- Validation results

---

# 🔐 Integrity

SHA-256 hashes can be generated for recovered artifacts.

Example command:

```bash
sha256sum recovered/example.jpg
```

Example output:

```text
<sha256-hash>  recovered/example.jpg
```

Hash values can be passed to the verification/reporting layer as forensic evidence.

---

# 🔗 Integration With Other Teams

This module is **Team 2 — File Recovery** in the overall SIH prototype.

The complete system follows this workflow:

```text
TEST DISK IMAGE
       │
       ▼
    ANALYZE
       │
       ▼
FIND DELETED FILES
       │
       ▼
     RECOVER
       │
       ▼
    VALIDATE
       │
       ▼
CALCULATE RECOVERY CONFIDENCE
       │
       ▼
 CREATE BASELINE
       │
       ▼
   SANITIZE
       │
       ▼
 RECOVER AGAIN
       │
       ▼
COMPARE BEFORE/AFTER
       │
       ▼
     VERIFY
       │
       ▼
GENERATE REPORT
```

Team 2 provides the recovery evidence required by the rest of the system.

---

# 🤝 Module Responsibilities

| Component | Responsibility |
|-----------|----------------|
| Image Analysis | Analyze disk image and filesystem |
| Sleuth Kit Integration | Filesystem-level forensic analysis |
| Deleted File Detection | Identify deleted artifacts |
| File Recovery | Recover files using filesystem metadata |
| Raw Carving | Recover files directly from raw bytes |
| Reconstruction | Attempt fragmented-file recovery |
| Validation | Determine recovery integrity |
| Metadata | Store evidence about recovered artifacts |

---

# 🧪 Testing Strategy

The prototype should use **controlled test disk images**.

## Test 1 — Normal Deleted File

```text
Create File
     │
     ▼
Store in Test Filesystem
     │
     ▼
Delete File
     │
     ▼
Analyze Disk Image
     │
     ▼
Identify Deleted File
     │
     ▼
Recover File
     │
     ▼
Validate File
```

---

## Test 2 — Raw File Carving

```text
Create Test File
     │
     ▼
Place File Data Inside Disk Image
     │
     ▼
Remove Filesystem Reference
     │
     ▼
Scan Raw Image
     │
     ▼
Detect File Signature
     │
     ▼
Carve File
     │
     ▼
Validate File
```

---

## Test 3 — Multiple File Types

```text
                 Test Image
                     │
          ┌──────────┼──────────┐
          │          │          │
          ▼          ▼          ▼
        JPEG        PNG        PDF
          │          │          │
          └──────────┼──────────┘
                     │
                 ZIP / DOCX
                     │
                     ▼
               Carving Engine
                     │
                     ▼
             Recovered Artifacts
```

---

# 📈 Recovery Result Example

A recovery result can contain information such as:

```text
--------------------------------------------------
              FILE RECOVERY RESULT
--------------------------------------------------

Source Image       : carving.img

Recovered File     : recovered_001.jpg
File Type          : JPEG
Recovery Method    : Raw File Carving
Offset             : 1048576 bytes
Recovered Size     : 245760 bytes

Signature Check    : PASS
Structure Check    : PASS
Parser Validation  : PASS
Integrity Check    : PASS

SHA-256            : <hash>

Recovery Status    : VALID
--------------------------------------------------
```

---

# 🧠 Recovery Confidence

The recovered artifact can provide evidence for the later **Recovery Confidence** calculation.

Possible supporting evidence includes:

- Valid file signature
- Correct structural markers
- Successful parsing
- Filesystem evidence
- Successful decoding/opening
- Integrity validation

The File Recovery module provides these evidence points; the final confidence/scoring layer is handled by Team 3.

---

# 🔄 Before/After Recovery

The File Recovery module participates in the system's closed-loop verification process.

```text
             BEFORE SANITIZATION
                     │
                     ▼
              Recover Artifacts
                     │
                     ▼
              Validate Artifacts
                     │
                     ▼
             Create Recovery Baseline
                     │
                     ▼
                 SANITIZATION
                     │
                     ▼
              AFTER SANITIZATION
                     │
                     ▼
              Recover Again
                     │
                     ▼
              Validate Results
                     │
                     ▼
              Compare Results
```

This allows Team 3 to determine whether previously identified artifacts remain recoverable after sanitization.

---

# 🛡️ Safety

This project is a **digital forensics prototype**.

The MVP should operate on controlled test disk images by default.

## Important Safety Rules

- Never automatically target system disks.
- Never automatically target `/dev/sda`.
- Never automatically target `/dev/nvme*`.
- Destructive operations must require explicit confirmation.
- The target path should be displayed before sanitization.
- SHA-256 should be captured before sanitization.
- Testing should be performed on disposable forensic images.
- Do not perform destructive operations on real user data.

The prototype should **not claim universal or permanent deletion**, particularly for SSD/NVMe storage.

---

# 🚧 Current Scope

The current MVP focuses on:

- Controlled disk images
- Filesystem analysis
- Deleted-file recovery
- Raw file carving
- Initial target file formats
- File validation
- Recovery metadata
- Fragmented-file reconstruction
- Integration with the overall SIH workflow

---

# 🚫 Out of Scope for MVP

The following are intentionally outside the working MVP:

- Universal filesystem support
- Guaranteed recovery of every deleted file
- Guaranteed recovery of heavily fragmented files
- Automatic wiping of real physical drives
- Claims of permanent deletion for SSD/NVMe
- AI/ML-based recovery
- Full-scale commercial forensic suite functionality

AI/ML can be discussed as a **future enhancement** during the SIH presentation.

---

# 🔮 Future Enhancements

Potential future improvements include:

- Additional file formats
- Advanced fragmented-file reconstruction
- More filesystem support
- Automated carving rules
- Advanced file parsers
- Duplicate detection
- Parallel carving
- Large disk-image optimization
- GUI-based forensic analysis
- Advanced recovery scoring
- AI/ML-assisted artifact classification
- Cloud-based forensic analysis
- Advanced evidence visualization

---

# 🎯 Project USP

> **Don't just erase data. Prove what was recoverable before sanitization — and prove what remains afterward.**

The File Recovery module provides the forensic evidence required to make this possible by identifying, recovering, reconstructing, and validating recoverable artifacts before and after sanitization.

---

# 📚 SIH Prototype Context

This repository represents the **File Recovery component** of the SIH 2026 prototype:

> **Integrated Secure Data Erasure and Advanced File Recovery Tool for Digital Forensics and Data Sanitization**

The overall prototype consists of three major teams:

```text
┌───────────────────────────────────────────────┐
│                  SIH SYSTEM                   │
├───────────────────────────────────────────────┤
│                                               │
│  TEAM 1              TEAM 2          TEAM 3   │
│  Sanitization        Recovery        Analysis │
│  & Erasure           & Carving       & Verify │
│                                               │
│  ┌─────────┐        ┌─────────┐    ┌───────┐ │
│  │Sanitize │        │ Recover │    │ Score │ │
│  │ Files   │        │ Deleted │    │ Verify│ │
│  │ Folders │        │ Files   │    │ Audit │ │
│  │ Images  │        │ Carve   │    │ Report│ │
│  └─────────┘        └─────────┘    └───────┘ │
│                                               │
└───────────────────────────────────────────────┘
```

Team 2 focuses on:

```text
FIND
  ↓
RECOVER
  ↓
RECONSTRUCT
  ↓
VALIDATE
  ↓
PROVIDE FORENSIC EVIDENCE
```

---

# 👨‍💻 Development

This module is being developed as part of the **Smart India Hackathon (SIH) 2026 prototype**.

Development and testing are performed using controlled forensic disk images to ensure safe, reproducible, and demonstrable results.

---

# 📌 Prototype Principle

The recovery system does not simply answer:

> "Was a file found?"

Instead, it aims to answer:

> "What was found, where was it found, how was it recovered, can it be validated, and how reliable is the recovered artifact?"

This evidence is then passed to the verification and reporting layer.

---

# 📄 License

This project is developed for educational, research, and SIH prototype purposes.

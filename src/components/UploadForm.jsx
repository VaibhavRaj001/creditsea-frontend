import React, { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.name.endsWith(".xml")) {
        setFile(droppedFile);
        setMessage("");
        setUploadSuccess(false);
      } else {
        setMessage("Please upload an XML file");
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setMessage("");
      setUploadSuccess(false);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file) {
      setMessage("Please choose an XML file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      setMessage("Uploading and parsing XML...");
      setUploadSuccess(false);

      const res = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Upload failed");
        setUploadSuccess(false);
      } else {
        setMessage(
          `Successfully uploaded for ${data.name}! Credit Score: ${
            data.creditScore || "N/A"
          }`
        );
        setUploadSuccess(true);
        setReportData(data);
      }
    } catch (err) {
      setMessage("Network error. Please try again.");
      setUploadSuccess(false);
    } finally {
      setUploading(false);
    }
  }

  const clearFile = () => {
    setFile(null);
    setMessage("");
    setUploadSuccess(false);
    setReportData(null);
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "40px auto",
        padding: 32,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: 20,
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: 16,
          padding: 32,
          boxShadow: "0 4px 6px rgba(0,0,0,0.07)",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              fontSize: 40,
              marginBottom: 8,
            }}
          >
            📊
          </div>
          <h2
            style={{
              margin: "0 0 8px 0",
              fontSize: 28,
              fontWeight: 700,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Upload Credit Report
          </h2>
          <p style={{ margin: 0, color: "#6b7280", fontSize: 14 }}>
            Upload your Experian XML file to view detailed credit analysis
          </p>
        </div>

        {/* Drag & Drop Zone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => !file && document.getElementById("fileInput").click()}
          style={{
            border: dragActive
              ? "3px dashed #667eea"
              : file
              ? "3px solid #10b981"
              : "3px dashed #d1d5db",
            borderRadius: 16,
            padding: 40,
            textAlign: "center",
            backgroundColor: dragActive
              ? "#eff6ff"
              : file
              ? "#f0fdf4"
              : "#f9fafb",
            transition: "all 0.3s ease",
            cursor: "pointer",
            position: "relative",
            marginBottom: 24,
          }}
        >
          <input
            id="fileInput"
            type="file"
            accept=".xml"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          {!file ? (
            <>
              <div style={{ fontSize: 48, marginBottom: 16 }}>
                {dragActive ? "📥" : "📄"}
              </div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: 8,
                }}
              >
                {dragActive
                  ? "Drop your XML file here"
                  : "Drag & drop your XML file"}
              </div>
              <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 16 }}>
                or click to browse
              </div>
              <div
                style={{
                  display: "inline-block",
                  padding: "10px 24px",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "#fff",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Choose File
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#059669",
                  marginBottom: 8,
                }}
              >
                File Selected
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: "#374151",
                  backgroundColor: "#fff",
                  padding: "12px 16px",
                  borderRadius: 8,
                  display: "inline-block",
                  marginBottom: 16,
                  border: "1px solid #e5e7eb",
                }}
              >
                📄 {file.name}
              </div>
              <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 12 }}>
                Size: {(file.size / 1024).toFixed(2)} KB
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  clearFile();
                }}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#fff",
                  border: "2px solid #e5e7eb",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#6b7280",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "#dc2626";
                  e.currentTarget.style.color = "#dc2626";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "#e5e7eb";
                  e.currentTarget.style.color = "#6b7280";
                }}
              >
                Remove File
              </button>
            </>
          )}
        </div>

        {/* Upload Button */}
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={!file || uploading}
          style={{
            width: "100%",
            padding: 16,
            background:
              !file || uploading
                ? "#d1d5db"
                : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "#fff",
            border: "none",
            borderRadius: 12,
            fontSize: 16,
            fontWeight: 700,
            cursor: !file || uploading ? "not-allowed" : "pointer",
            transition: "all 0.3s ease",
            boxShadow:
              !file || uploading
                ? "none"
                : "0 4px 12px rgba(102, 126, 234, 0.4)",
            transform: "translateY(0)",
            marginBottom: 16,
          }}
          onMouseOver={(e) => {
            if (file && !uploading) {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(102, 126, 234, 0.5)";
            }
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 4px 12px rgba(102, 126, 234, 0.4)";
          }}
        >
          {uploading ? (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 16,
                  height: 16,
                  border: "3px solid rgba(255,255,255,0.3)",
                  borderTop: "3px solid #fff",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }}
              />
              Uploading...
            </span>
          ) : (
            "🚀 Upload & Analyze Report"
          )}
        </button>

        {/* Message Display */}
        {message && (
          <div
            style={{
              padding: 16,
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 500,
              backgroundColor: uploadSuccess
                ? "#dcfce7"
                : uploading
                ? "#dbeafe"
                : "#fee2e2",
              color: uploadSuccess
                ? "#166534"
                : uploading
                ? "#1e40af"
                : "#991b1b",
              border: `2px solid ${
                uploadSuccess ? "#86efac" : uploading ? "#93c5fd" : "#fca5a5"
              }`,
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: uploadSuccess && reportData ? 16 : 0,
            }}
          >
            <span style={{ fontSize: 20 }}>
              {uploadSuccess ? "✅" : uploading ? "⏳" : "⚠️"}
            </span>
            <span style={{ flex: 1 }}>{message}</span>
          </div>
        )}

        {/* Report Summary Card */}
        {uploadSuccess && reportData && (
          <div
            style={{
              padding: 20,
              borderRadius: 12,
              background:
                "linear-gradient(135deg, #667eea15 0%, #764ba215 100%)",
              border: "2px solid #667eea30",
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#374151",
                marginBottom: 12,
              }}
            >
              Report Summary:
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 12,
              }}
            >
              <div>
                <div style={{ fontSize: 12, color: "#6b7280" }}>
                  Total Accounts
                </div>
                <div
                  style={{ fontSize: 18, fontWeight: 700, color: "#667eea" }}
                >
                  {reportData.accountsCount || 0}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: "#6b7280" }}>
                  Credit Cards
                </div>
                <div
                  style={{ fontSize: 18, fontWeight: 700, color: "#764ba2" }}
                >
                  {reportData.creditCardsCount || 0}
                </div>
              </div>
            </div>
            <a
              href={`/reports/${reportData.id}`}
              style={{
                display: "block",
                marginTop: 16,
                padding: 12,
                background: "#fff",
                color: "#667eea",
                textAlign: "center",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
                border: "2px solid #667eea",
                transition: "all 0.2s",
              }}
            >
              View Full Report →
            </a>
          </div>
        )}

        {/* Info Section */}
        <div
          style={{
            marginTop: 24,
            padding: 16,
            backgroundColor: "#f9fafb",
            borderRadius: 12,
            border: "1px solid #e5e7eb",
          }}
        >
          <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>
            <div style={{ fontWeight: 600, color: "#374151", marginBottom: 8 }}>
              ℹ️ Supported Format:
            </div>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              <li>Experian XML credit reports</li>
              <li>Maximum file size: 10 MB</li>
              <li>Reports are automatically parsed and analyzed</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

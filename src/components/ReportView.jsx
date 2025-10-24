import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

export default function ReportView() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/api/reports/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch report");
        return r.json();
      })
      .then((data) => {
        setReport(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div style={{ padding: 20 }}>Loading report...</div>;
  if (error)
    return <div style={{ padding: 20, color: "#dc2626" }}>Error: {error}</div>;
  if (!report) return <div style={{ padding: 20 }}>Report not found</div>;

  const Section = ({ title, children }) => (
    <section
      style={{
        marginTop: 16,
        padding: 16,
        borderRadius: 8,
        border: "1px solid #e5e7eb",
        backgroundColor: "#fff",
      }}
    >
      <h3
        style={{
          marginTop: 0,
          marginBottom: 12,
          fontSize: 18,
          fontWeight: 600,
        }}
      >
        {title}
      </h3>
      {children}
    </section>
  );

  const InfoRow = ({ label, value, color }) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "6px 0",
        borderBottom: "1px solid #f3f4f6",
      }}
    >
      <span style={{ color: "#6b7280", fontSize: 14 }}>{label}:</span>
      <span
        style={{ fontWeight: 500, fontSize: 14, color: color || "#111827" }}
      >
        {value || "—"}
      </span>
    </div>
  );

  return (
    <div
      style={{
        padding: 20,
        maxWidth: 1200,
        margin: "0 auto",
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          marginBottom: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ margin: 0 }}>
          Credit Report - {report.basicDetails?.name || "—"}
        </h2>
        <Link
          to="/"
          style={{
            padding: "8px 16px",
            borderRadius: 6,
            border: "1px solid #d1d5db",
            textDecoration: "none",
            color: "#374151",
          }}
        >
          ← Back to Reports
        </Link>
      </div>

      {/* Metadata */}
      {report.metadata && (
        <div
          style={{
            padding: 12,
            backgroundColor: "#eff6ff",
            border: "1px solid #bfdbfe",
            borderRadius: 6,
            marginBottom: 16,
            fontSize: 13,
          }}
        >
          <strong>Report Info:</strong> Generated on{" "}
          {report.metadata.reportDate} at {report.metadata.reportTime} | Report
          #{report.metadata.reportNumber} | Version: {report.metadata.version} |
          Uploaded: {new Date(report.uploadedAt).toLocaleString()}
        </div>
      )}

      {/* Basic Details */}
      <Section title="Personal Information">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 16,
          }}
        >
          <div>
            <InfoRow label="Full Name" value={report.basicDetails?.name} />
            <InfoRow
              label="Date of Birth"
              value={report.basicDetails?.dateOfBirth}
            />
            <InfoRow label="Gender" value={report.basicDetails?.gender} />
            <InfoRow label="Mobile" value={report.basicDetails?.mobile} />
            <InfoRow label="Email" value={report.basicDetails?.email} />
          </div>
          <div>
            <InfoRow label="PAN" value={report.basicDetails?.pan} />
            <InfoRow
              label="Passport"
              value={report.basicDetails?.passportNumber}
            />
            <InfoRow label="Voter ID" value={report.basicDetails?.voterID} />
            <InfoRow
              label="Driving License"
              value={report.basicDetails?.drivingLicense}
            />
            <InfoRow
              label="UID/Aadhaar"
              value={report.basicDetails?.uidNumber}
            />
          </div>
        </div>
      </Section>

      {/* Credit Score */}
      <Section title="Credit Score">
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: 48,
                fontWeight: 700,
                color: getScoreColor(report.creditScore?.bureauScore),
              }}
            >
              {report.creditScore?.bureauScore || "—"}
            </div>
            <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>
              {report.creditScore?.confidenceLevel &&
                `Confidence: ${report.creditScore.confidenceLevel}`}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <InfoRow label="Score Name" value={report.creditScore?.scoreName} />
            <InfoRow label="Score Date" value={report.creditScore?.scoreDate} />
            <InfoRow
              label="Scorecard"
              value={report.creditScore?.scoreCardName}
            />
            {report.creditScore?.reasonCodes?.length > 0 && (
              <div style={{ marginTop: 8, fontSize: 13 }}>
                <strong>Reason Codes:</strong>{" "}
                {report.creditScore.reasonCodes.join(", ")}
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* Report Summary */}
      <Section title="Account Summary">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          <div>
            <InfoRow
              label="Total Accounts"
              value={report.reportSummary?.totalAccounts}
            />
            <InfoRow
              label="Active Accounts"
              value={report.reportSummary?.activeAccounts}
              color="#059669"
            />
            <InfoRow
              label="Closed Accounts"
              value={report.reportSummary?.closedAccounts}
            />
            <InfoRow
              label="Default Accounts"
              value={report.reportSummary?.defaultAccounts}
              color="#dc2626"
            />
          </div>
          <div>
            <InfoRow
              label="Total Balance"
              value={`₹${report.reportSummary?.currentBalance?.toLocaleString(
                "en-IN"
              )}`}
            />
            <InfoRow
              label="Secured Amount"
              value={`₹${report.reportSummary?.securedAmount?.toLocaleString(
                "en-IN"
              )}`}
            />
            <InfoRow
              label="Unsecured Amount"
              value={`₹${report.reportSummary?.unsecuredAmount?.toLocaleString(
                "en-IN"
              )}`}
            />
          </div>
          <div>
            <InfoRow
              label="Last 7 Days"
              value={`${report.reportSummary?.last7DaysEnquiries} enquiries`}
            />
            <InfoRow
              label="Last 30 Days"
              value={`${report.reportSummary?.last30DaysEnquiries} enquiries`}
            />
            <InfoRow
              label="Last 90 Days"
              value={`${report.reportSummary?.last90DaysEnquiries} enquiries`}
            />
            <InfoRow
              label="Last 180 Days"
              value={`${report.reportSummary?.last180DaysEnquiries} enquiries`}
            />
          </div>
        </div>
      </Section>

      {/* Credit Cards Summary */}
      <Section title="Credit Cards & Banks">
        <InfoRow
          label="Total Credit Cards"
          value={report.creditAccountsInformation?.totalCreditCards}
        />
        {report.creditAccountsInformation?.banksOfCreditCards?.length > 0 && (
          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 6 }}>
              Banks:
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {report.creditAccountsInformation.banksOfCreditCards.map(
                (bank, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: "4px 12px",
                      backgroundColor: "#dbeafe",
                      borderRadius: 16,
                      fontSize: 13,
                    }}
                  >
                    {bank}
                  </span>
                )
              )}
            </div>
          </div>
        )}
      </Section>

      {/* Addresses */}
      <Section title="Addresses">
        {report.creditAccountsInformation?.addresses?.length > 0 ? (
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {report.creditAccountsInformation.addresses.map((addr, idx) => (
              <li key={idx} style={{ marginBottom: 8, fontSize: 14 }}>
                {addr}
              </li>
            ))}
          </ul>
        ) : (
          <div>No addresses found</div>
        )}
      </Section>

      {/* Accounts */}
      <Section
        title={`Accounts (${
          report.creditAccountsInformation?.accounts?.length || 0
        })`}
      >
        {report.creditAccountsInformation?.accounts?.length > 0 ? (
          <div style={{ display: "grid", gap: 12 }}>
            {report.creditAccountsInformation.accounts.map((a, idx) => (
              <div
                key={idx}
                style={{
                  padding: 16,
                  border: "1px solid #e5e7eb",
                  borderRadius: 8,
                  backgroundColor: "#fafafa",
                }}
              >
                {/* Account Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 12,
                    paddingBottom: 12,
                    borderBottom: "2px solid #e5e7eb",
                  }}
                >
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 600 }}>
                      {a.subscriberName}
                    </div>
                    <div
                      style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}
                    >
                      {a.accountType} • {a.portfolioType} •{" "}
                      {a.ownershipIndicator}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 18, fontWeight: 600 }}>
                      ₹{a.currentBalance?.toLocaleString("en-IN")}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: a.amountOverdue > 0 ? "#dc2626" : "#059669",
                        marginTop: 2,
                      }}
                    >
                      {a.amountOverdue > 0
                        ? `Overdue: ₹${a.amountOverdue?.toLocaleString(
                            "en-IN"
                          )}`
                        : "No Dues"}
                    </div>
                  </div>
                </div>

                {/* Account Details */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "8px 16px",
                    fontSize: 13,
                  }}
                >
                  <InfoRow label="Account #" value={a.accountNumber} />
                  <InfoRow label="Status" value={a.accountStatus} />
                  <InfoRow
                    label="Credit Limit"
                    value={`₹${a.creditLimit?.toLocaleString("en-IN")}`}
                  />
                  <InfoRow label="Open Date" value={a.openDate} />
                  <InfoRow label="Reported" value={a.dateReported} />
                  {a.dateClosed && (
                    <InfoRow label="Closed" value={a.dateClosed} />
                  )}
                  {a.emi > 0 && (
                    <InfoRow
                      label="EMI"
                      value={`₹${a.emi?.toLocaleString("en-IN")}`}
                    />
                  )}
                  {a.interestRate > 0 && (
                    <InfoRow
                      label="Interest Rate"
                      value={`${a.interestRate}%`}
                    />
                  )}
                  {a.repaymentTenure > 0 && (
                    <InfoRow
                      label="Tenure"
                      value={`${a.repaymentTenure} months`}
                    />
                  )}
                  <InfoRow
                    label="Payment Rating"
                    value={a.paymentRatingDescription || a.paymentRating}
                  />
                  {a.suitFiled === "Yes" && (
                    <InfoRow label="Suit Filed" value="Yes" color="#dc2626" />
                  )}
                </div>

                {/* Payment History */}
                {a.paymentHistory && (
                  <div
                    style={{
                      marginTop: 12,
                      fontSize: 12,
                      color: "#6b7280",
                      fontFamily: "monospace",
                    }}
                  >
                    <strong>Payment History:</strong> {a.paymentHistory}
                  </div>
                )}

                {/* Holder Info */}
                {a.holderDetails?.fullName && (
                  <div
                    style={{ marginTop: 12, fontSize: 13, color: "#6b7280" }}
                  >
                    <strong>Holder:</strong> {a.holderDetails.fullName}{" "}
                    {a.holderDetails.pan && `(PAN: ${a.holderDetails.pan})`}
                  </div>
                )}

                {/* Address */}
                {a.addressDetails?.fullAddress && (
                  <div style={{ marginTop: 8, fontSize: 13, color: "#6b7280" }}>
                    <strong>Address:</strong> {a.addressDetails.fullAddress}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div>No accounts found</div>
        )}
      </Section>

      {/* Credit Enquiries */}
      <Section
        title={`Credit Enquiries (${report.creditEnquiries?.length || 0})`}
      >
        {report.creditEnquiries?.length > 0 ? (
          <div style={{ display: "grid", gap: 8 }}>
            {report.creditEnquiries.map((e, idx) => (
              <div
                key={idx}
                style={{
                  padding: 12,
                  border: "1px solid #e5e7eb",
                  borderRadius: 6,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ fontWeight: 600 }}>{e.subscriber}</div>
                  <div style={{ fontSize: 13, color: "#6b7280" }}>
                    {e.enquiryPurpose}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 500 }}>
                    ₹{e.enquiryAmount?.toLocaleString("en-IN")}
                  </div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>
                    {e.enquiryDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No recent enquiries</div>
        )}
      </Section>
    </div>
  );
}

function getScoreColor(score) {
  if (!score) return "#6b7280";
  if (score >= 750) return "#059669";
  if (score >= 650) return "#d97706";
  return "#dc2626";
}

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ReportList() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = () => {
    setLoading(true);
    fetch('/api/reports')
      .then(r => {
        if (!r.ok) throw new Error('Failed to fetch reports');
        return r.json();
      })
      .then(data => {
        setReports(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  const getScoreColor = (score) => {
    if (!score) return '#6b7280';
    if (score >= 750) return '#059669';
    if (score >= 700) return '#16a34a';
    if (score >= 650) return '#d97706';
    if (score >= 600) return '#ea580c';
    return '#dc2626';
  };

  const getScoreLabel = (score) => {
    if (!score) return 'N/A';
    if (score >= 750) return 'Excellent';
    if (score >= 700) return 'Good';
    if (score >= 650) return 'Fair';
    if (score >= 600) return 'Poor';
    return 'Very Poor';
  };

  const filteredReports = reports.filter(r => 
    !searchQuery || 
    r.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.pan?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: 400,
        color: '#fff'
      }}>
        <div style={{
          width: 50,
          height: 50,
          border: '5px solid rgba(255,255,255,0.3)',
          borderTop: '5px solid #fff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: 16
        }} />
        <div style={{ fontSize: 16, fontWeight: 600 }}>Loading reports...</div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        padding: 40, 
        textAlign: 'center',
        backgroundColor: '#fee2e2',
        borderRadius: 16,
        border: '2px solid #fca5a5'
      }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
        <div style={{ fontSize: 18, fontWeight: 600, color: '#991b1b', marginBottom: 8 }}>
          Error Loading Reports
        </div>
        <div style={{ fontSize: 14, color: '#dc2626', marginBottom: 16 }}>
          {error}
        </div>
        <button
          onClick={fetchReports}
          style={{
            padding: '10px 20px',
            background: '#dc2626',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: 1200, 
      margin: '0 auto',
      padding: '0 20px'
    }}>
      {/* Header Section */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: 16,
        padding: 32,
        marginBottom: 24,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: 24
        }}>
          <div>
            <h2 style={{ 
              margin: '0 0 8px 0', 
              fontSize: 28, 
              fontWeight: 700,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Credit Reports
            </h2>
            <p style={{ margin: 0, color: '#6b7280', fontSize: 14 }}>
              {reports.length} {reports.length === 1 ? 'report' : 'reports'} uploaded
            </p>
          </div>
          <div style={{
            padding: '12px 20px',
            background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
            borderRadius: 12,
            border: '2px solid #667eea30'
          }}>
            <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>
              Total Reports
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#667eea' }}>
              {reports.length}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div style={{ position: 'relative' }}>
          <span style={{
            position: 'absolute',
            left: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: 18
          }}>
            🔍
          </span>
          <input
            type="text"
            placeholder="Search by name or PAN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px 12px 48px',
              fontSize: 14,
              border: '2px solid #e5e7eb',
              borderRadius: 12,
              outline: 'none',
              transition: 'all 0.2s',
              fontFamily: 'inherit'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#667eea';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
        </div>
      </div>

      {/* Reports Grid */}
      {filteredReports.length === 0 ? (
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: 16,
          padding: 60,
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>📭</div>
          <div style={{ fontSize: 20, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
            {searchQuery ? 'No reports found' : 'No reports uploaded yet'}
          </div>
          <div style={{ fontSize: 14, color: '#6b7280', marginBottom: 24 }}>
            {searchQuery ? 'Try adjusting your search query' : 'Upload your first credit report to get started'}
          </div>
          {!searchQuery && (
            <Link
              to="/"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
              }}
            >
              Upload Report
            </Link>
          )}
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 16 }}>
          {filteredReports.map(report => (
            <Link
              key={report._id}
              to={`/reports/${report._id}`}
              style={{
                textDecoration: 'none',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: 16,
                padding: 24,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.3s ease',
                border: '2px solid transparent',
                display: 'block'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(102, 126, 234, 0.2)';
                e.currentTarget.style.borderColor = '#667eea30';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                {/* Left Section */}
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    fontSize: 20, 
                    fontWeight: 700, 
                    color: '#1f2937',
                    marginBottom: 8
                  }}>
                    {report.name}
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    gap: 16, 
                    marginBottom: 16,
                    flexWrap: 'wrap'
                  }}>
                    {report.pan && (
                      <div style={{ 
                        fontSize: 13, 
                        color: '#6b7280',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6
                      }}>
                        <span>🆔</span>
                        <span>{report.pan}</span>
                      </div>
                    )}
                    <div style={{ 
                      fontSize: 13, 
                      color: '#6b7280',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6
                    }}>
                      <span>📅</span>
                      <span>{new Date(report.uploadedAt).toLocaleDateString('en-IN', { 
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric' 
                      })}</span>
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div style={{ 
                    display: 'flex', 
                    gap: 24,
                    flexWrap: 'wrap'
                  }}>
                    <div>
                      <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 4, fontWeight: 600 }}>
                        TOTAL ACCOUNTS
                      </div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: '#374151' }}>
                        {report.totalAccounts || 0}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 4, fontWeight: 600 }}>
                        CREDIT CARDS
                      </div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: '#667eea' }}>
                        {report.totalCreditCards || 0}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 4, fontWeight: 600 }}>
                        BALANCE
                      </div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: '#764ba2' }}>
                        ₹{(report.currentBalance || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Section - Credit Score */}
                <div style={{ 
                  textAlign: 'center',
                  marginLeft: 24,
                  minWidth: 140
                }}>
                  <div style={{
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${getScoreColor(report.creditScore)}15 0%, ${getScoreColor(report.creditScore)}30 100%)`,
                    border: `4px solid ${getScoreColor(report.creditScore)}`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px'
                  }}>
                    <div style={{ 
                      fontSize: 32, 
                      fontWeight: 800, 
                      color: getScoreColor(report.creditScore),
                      lineHeight: 1
                    }}>
                      {report.creditScore || '—'}
                    </div>
                    <div style={{ 
                      fontSize: 10, 
                      color: getScoreColor(report.creditScore),
                      fontWeight: 600,
                      marginTop: 4,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Score
                    </div>
                  </div>
                  <div style={{
                    padding: '6px 12px',
                    borderRadius: 20,
                    fontSize: 11,
                    fontWeight: 700,
                    color: getScoreColor(report.creditScore),
                    backgroundColor: `${getScoreColor(report.creditScore)}15`,
                    border: `2px solid ${getScoreColor(report.creditScore)}30`,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {getScoreLabel(report.creditScore)}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
import React from 'react';
import UploadForm from './components/UploadForm';
import ReportList from './components/ReportList';
import ReportView from './components/ReportView';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

export default function App() {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path === '/reports' && location.pathname.startsWith('/reports')) return true;
    return false;
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px',
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* Top Navigation Bar */}
      <nav
        style={{
          maxWidth: 1400,
          margin: '0 auto 20px',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: 16,
          padding: '16px 32px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
            }}
          >
            📊
          </div>
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: 'clamp(18px, 2.5vw, 24px)',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1.2,
              }}
            >
              CreditSea
            </h1>
            <div
              style={{
                fontSize: 'clamp(9px, 1.2vw, 11px)',
                color: '#6b7280',
                fontWeight: 600,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
              }}
            >
              Soft Pull Reports
            </div>
          </div>
        </Link>

        {/* Navigation Links */}
        <div
          className="nav-links"
          style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
          }}
        >
          <NavLink to="/" label="Upload" emoji="📤" active={isActive('/')} />
          <NavLink to="/reports" label="Reports" emoji="📋" active={isActive('/reports')} />
        </div>
      </nav>

      {/* Main Content Area */}
      <main
        style={{
          maxWidth:
            location.pathname.startsWith('/reports/') &&
            location.pathname.split('/').length === 3
              ? 1400
              : 1200,
          margin: '0 auto',
          minHeight: 'calc(100vh - 140px)',
          padding: '0 10px',
        }}
      >
        <Routes>
          <Route path="/" element={<UploadForm />} />
          <Route path="/reports" element={<ReportList />} />
          <Route path="/reports/:id" element={<ReportView />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer
        style={{
          maxWidth: 1400,
          margin: '32px auto 0',
          padding: '24px 16px',
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: 'clamp(11px, 1.3vw, 13px)',
          fontWeight: 500,
        }}
      >
        <div style={{ marginBottom: 8 }}>🔒 Secure Credit Report Analysis Platform</div>
        <div style={{ fontSize: 'clamp(9px, 1vw, 11px)', opacity: 0.7 }}>
          Powered by Experian XML Parser • Built with React & Node.js
        </div>
      </footer>

      {/* Global Styles */}
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        html {
          scroll-behavior: smooth;
        }

        a {
          color: inherit;
        }

        button {
          font-family: inherit;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          nav {
            flex-direction: column;
            align-items: stretch !important;
            text-align: center;
          }

          .nav-links {
            width: 100%;
            display: flex;
            justify-content: center;
            gap: 10px;
          }

          .nav-links a {
            flex: 1 1 50%;
            text-align: center;
            padding: 12px 0 !important;
            font-size: 14px !important;
          }
        }

        @media (max-width: 480px) {
          nav {
            padding: 12px 16px !important;
          }

          .nav-links a {
            font-size: 13px !important;
            padding: 10px 0 !important;
          }

          footer {
            padding: 16px 8px !important;
          }
        }
      `}</style>
    </div>
  );
}

/* Reusable NavLink Component */
function NavLink({ to, label, emoji, active }) {
  return (
    <Link
      to={to}
      style={{
        textDecoration: 'none',
        padding: '10px 24px',
        borderRadius: 10,
        fontWeight: 600,
        fontSize: 14,
        transition: 'all 0.3s ease',
        background: active
          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          : 'transparent',
        color: active ? '#fff' : '#374151',
        border: active ? 'none' : '2px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        boxShadow: active ? '0 4px 12px rgba(102, 126, 234, 0.3)' : 'none',
        minWidth: 120,
      }}
      onMouseOver={(e) => {
        if (!active) {
          e.currentTarget.style.borderColor = '#667eea';
          e.currentTarget.style.color = '#667eea';
        }
      }}
      onMouseOut={(e) => {
        if (!active) {
          e.currentTarget.style.borderColor = '#e5e7eb';
          e.currentTarget.style.color = '#374151';
        }
      }}
    >
      <span style={{ fontSize: 18 }}>{emoji}</span>
      {label}
    </Link>
  );
}

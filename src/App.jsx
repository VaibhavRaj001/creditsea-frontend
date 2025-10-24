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
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>
      {/* Top Navigation Bar */}
      <nav style={{
        maxWidth: 1400,
        margin: '0 auto 20px',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: 16,
        padding: '16px 32px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo */}
        <Link 
          to="/" 
          style={{ 
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}
        >
          <div style={{
            width: 44,
            height: 44,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
          }}>
            📊
          </div>
          <div>
            <h1 style={{ 
              margin: 0, 
              fontSize: 24, 
              fontWeight: 800,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.2
            }}>
              CreditSea
            </h1>
            <div style={{ 
              fontSize: 11, 
              color: '#6b7280',
              fontWeight: 600,
              letterSpacing: '0.5px',
              textTransform: 'uppercase'
            }}>
              Soft Pull Reports
            </div>
          </div>
        </Link>

        {/* Navigation Links */}
        <div style={{ display: 'flex', gap: 12 }}>
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              padding: '10px 24px',
              borderRadius: 10,
              fontWeight: 600,
              fontSize: 14,
              transition: 'all 0.3s ease',
              background: isActive('/') 
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : 'transparent',
              color: isActive('/') ? '#fff' : '#374151',
              border: isActive('/') ? 'none' : '2px solid #e5e7eb',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: isActive('/') ? '0 4px 12px rgba(102, 126, 234, 0.3)' : 'none'
            }}
            onMouseOver={(e) => {
              if (!isActive('/')) {
                e.currentTarget.style.borderColor = '#667eea';
                e.currentTarget.style.color = '#667eea';
              }
            }}
            onMouseOut={(e) => {
              if (!isActive('/')) {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.color = '#374151';
              }
            }}
          >
            <span style={{ fontSize: 18 }}>📤</span>
            Upload
          </Link>
          <Link
            to="/reports"
            style={{
              textDecoration: 'none',
              padding: '10px 24px',
              borderRadius: 10,
              fontWeight: 600,
              fontSize: 14,
              transition: 'all 0.3s ease',
              background: isActive('/reports')
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : 'transparent',
              color: isActive('/reports') ? '#fff' : '#374151',
              border: isActive('/reports') ? 'none' : '2px solid #e5e7eb',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: isActive('/reports') ? '0 4px 12px rgba(102, 126, 234, 0.3)' : 'none'
            }}
            onMouseOver={(e) => {
              if (!isActive('/reports')) {
                e.currentTarget.style.borderColor = '#667eea';
                e.currentTarget.style.color = '#667eea';
              }
            }}
            onMouseOut={(e) => {
              if (!isActive('/reports')) {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.color = '#374151';
              }
            }}
          >
            <span style={{ fontSize: 18 }}>📋</span>
            Reports
          </Link>
        </div>
      </nav>

      {/* Main Content Area */}
      <main style={{
        maxWidth: location.pathname.startsWith('/reports/') && location.pathname.split('/').length === 3 ? 1400 : 1200,
        margin: '0 auto',
        minHeight: 'calc(100vh - 140px)'
      }}>
        <Routes>
          <Route path="/" element={<UploadForm />} />
          <Route path="/reports" element={<ReportList />} />
          <Route path="/reports/:id" element={<ReportView />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer style={{
        maxWidth: 1400,
        margin: '32px auto 0',
        padding: '24px 32px',
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 13,
        fontWeight: 500
      }}>
        <div style={{ marginBottom: 8 }}>
          🔒 Secure Credit Report Analysis Platform
        </div>
        <div style={{ fontSize: 11, opacity: 0.7 }}>
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

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }

        /* Remove default link styles */
        a {
          color: inherit;
        }

        /* Remove default button styles */
        button {
          font-family: inherit;
        }
      `}</style>
    </div>
  );
}
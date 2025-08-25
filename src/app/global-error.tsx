'use client';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    // global-error must include html and body tags
    <html>
      <body
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            background: '#fff',
            padding: '2rem 3rem',
            borderRadius: '1rem',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            textAlign: 'center',
            maxWidth: 400,
          }}
        >
          <h2 style={{ color: '#e11d48', marginBottom: '1rem' }}>
            ¡Algo salió mal!
          </h2>
          <p style={{ color: '#334155', marginBottom: '2rem' }}>
            Ha ocurrido un error inesperado. Por favor, intenta nuevamente.
          </p>
          <button
            onClick={() => reset()}
            style={{
              background: 'linear-gradient(90deg, #6366f1 0%, #3b82f6 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '0.5rem',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
          >
            Reintentar
          </button>
        </div>
      </body>
    </html>
  );
}

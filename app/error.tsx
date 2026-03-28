'use client';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="error-page">
      <h1>Something went wrong</h1>
      <p>{error.message || 'An unexpected error occurred.'}</p>
      <button onClick={reset}>Try again</button>

      <style>{`
        .error-page {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
          text-align: center;
          font-family: var(--font-sans);
          color: var(--color-text);
          padding: 2rem;
        }
        .error-page h1 {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 800;
          margin: 0 0 0.5em;
        }
        .error-page p {
          font-size: var(--text-base);
          color: var(--color-text-secondary);
          margin: 0 0 1.5em;
          max-width: 40ch;
        }
        .error-page button {
          font-family: var(--font-sans);
          font-size: var(--text-base);
          font-weight: 600;
          padding: 0.6em 1.5em;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          background: var(--color-surface);
          color: var(--color-text);
          cursor: pointer;
          transition: background var(--duration-normal), border-color var(--duration-normal);
        }
        .error-page button:hover {
          background: var(--color-accent-subtle);
          border-color: var(--color-accent);
        }
      `}</style>
    </div>
  );
}

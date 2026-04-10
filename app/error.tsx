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
          color: var(--sc-color-text);
          padding: 2rem;
        }
        .error-page h1 {
          font-family: var(--font-display);
          font-size: var(--sc-text-2xl);
          font-weight: 800;
          margin: 0 0 0.5em;
        }
        .error-page p {
          font-size: var(--sc-text-base);
          color: var(--sc-color-textSecondary);
          margin: 0 0 1.5em;
          max-width: 40ch;
        }
        .error-page button {
          font-family: var(--font-sans);
          font-size: var(--sc-text-base);
          font-weight: 600;
          padding: 0.6em 1.5em;
          border: 1px solid var(--sc-color-border);
          border-radius: var(--sc-radius-md);
          background: var(--sc-color-surface);
          color: var(--sc-color-text);
          cursor: pointer;
          transition: background var(--sc-duration-normal), border-color var(--sc-duration-normal);
        }
        .error-page button:hover {
          background: var(--sc-color-accentSubtle);
          border-color: var(--sc-color-accent);
        }
      `}</style>
    </div>
  );
}

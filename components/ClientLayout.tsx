'use client';

import GlobalStyles from './GlobalStyles';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GlobalStyles />
      <div className="root">{children}</div>
    </>
  );
}

'use client';

import { notFound } from 'next/navigation';

export default function TestErrorPage() {
  if (process.env.NODE_ENV === 'production') notFound();
  throw new Error('This is a test error to preview the error boundary.');
}

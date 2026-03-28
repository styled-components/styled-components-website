const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const longMonths = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/**
 * Format an ISO date string (YYYY-MM-DD) deterministically
 * to avoid hydration mismatches from locale-dependent Date APIs.
 */
export function formatDate(iso: string, style: 'short' | 'long' = 'long') {
  const [y, m, d] = iso.split('-');
  const months = style === 'short' ? shortMonths : longMonths;
  return `${months[Number(m) - 1]} ${Number(d)}, ${y}`;
}

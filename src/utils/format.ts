export function onlyDigits(value: string): string {
  return value.replace(/[^0-9]/g, '');
}

export function groupIndian(value: string): string {
  const digits = onlyDigits(value);
  if (!digits) return '';
  return Number(digits).toLocaleString('en-IN');
}

export function formatRupees(value: string): string {
  const grouped = groupIndian(value);
  return grouped ? `₹${grouped}` : '—';
}

const MONTHS = [
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
'December'];


export function formatLongDate(iso: string): string {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return '—';
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

export function formatShortDate(iso: string): string {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return '—';
  return `${d} ${MONTHS[m - 1].slice(0, 3)} ${y}`;
}

export function fallback(value: string, placeholder: string): string {
  return value.trim() ? value.trim() : placeholder;
}
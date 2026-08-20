export interface Lead {
  date: string;
  name: string;
  workmail: string;
}

const LEADS_KEY = 'incentiv_sar_leads';
const CAPTURED_KEY = 'incentiv_sar_lead_captured';

// Placeholder for production: this should POST to Incentiv's lead-capture
// endpoint once this tool ships under incentiv.finance/tools/. For now leads
// are only persisted locally so the gate can be demoed end-to-end.
export function saveLead(lead: Omit<Lead, 'date'>) {
  const entry: Lead = { date: new Date().toISOString(), ...lead };
  const existing = getLeads();
  localStorage.setItem(LEADS_KEY, JSON.stringify([...existing, entry]));
  localStorage.setItem(CAPTURED_KEY, '1');
  return entry;
}

export function getLeads(): Lead[] {
  try {
    return JSON.parse(localStorage.getItem(LEADS_KEY) ?? '[]');
  } catch {
    return [];
  }
}

export function hasCapturedLead(): boolean {
  return localStorage.getItem(CAPTURED_KEY) === '1';
}

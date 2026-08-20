import type { SettlementMethod, VestingPreset } from '../types/sar';

export const VESTING_PRESETS: {
  id: VestingPreset;
  label: string;
  recommended?: boolean;
  detail: string;
  clause: string;
  reviewLine: string;
}[] = [
{
  id: '4y',
  label: '4 years · 1 year cliff',
  recommended: true,
  detail: '25% vests after 12 months, then monthly over the next 36 months.',
  clause:
  'The SARs vest over four years, with 25% vesting on the first anniversary of the Grant Date and the balance vesting in equal monthly instalments over the following thirty-six months.',
  reviewLine: '25% after year one, monthly thereafter'
},
{
  id: '3y',
  label: '3 years · 1 year cliff',
  detail: '33% vests after 12 months, then monthly over the next 24 months.',
  clause:
  'The SARs vest over three years, with one-third vesting on the first anniversary of the Grant Date and the balance vesting in equal monthly instalments over the following twenty-four months.',
  reviewLine: 'One third after year one, monthly thereafter'
},
{
  id: 'custom',
  label: 'Custom',
  detail: 'Set your own duration, cliff and frequency.',
  clause: '',
  reviewLine: 'Custom schedule'
}];


export const SETTLEMENT_METHODS: {
  id: SettlementMethod;
  label: string;
  explanation: string;
  documentLabel: string;
}[] = [
{
  id: 'cash',
  label: 'Cash',
  explanation: 'The grantee receives the appreciation value in cash when the SAR is settled.',
  documentLabel: 'Cash'
},
{
  id: 'shares',
  label: 'Shares',
  explanation:
  'The appreciation value is settled by issuing equity shares of equivalent value to the grantee.',
  documentLabel: 'Equity shares'
},
{
  id: 'company',
  label: 'Company decides',
  explanation:
  'The Board chooses between cash and shares at the time of settlement, based on what suits the company.',
  documentLabel: 'Cash or shares, at the Company’s election'
}];


export const SETTLEMENT_TIMINGS = [
'On a liquidity event',
'After vesting',
'On exercise by the grantee',
'Custom'];


export const STANDARD_PROVISIONS = [
'Tax withholding',
'No shareholder rights',
'Transfer restrictions',
'Confidentiality',
'Notices',
'Amendments',
'Governing law'];
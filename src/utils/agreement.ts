import { MODULE_MAP } from '../data/optionalModules';
import { SETTLEMENT_METHODS, VESTING_PRESETS } from '../data/presets';
import type { AgreementState, ModuleId } from '../types/sar';
import { fallback, formatLongDate, groupIndian } from './format';

export const SAMPLE = {
  companyName: 'Acme Technologies Private Limited',
  cin: 'U72900MH2022PTC123456',
  registeredOffice: '4th Floor, Prabhat House, Bandra Kurla Complex, Mumbai 400051',
  granteeName: 'Rahul Mehta',
  granteeRole: 'Chief Financial Officer',
  sarCount: '10,000',
  basePrice: '500'
};

export interface Clause {
  number: number;
  title: string;
  body: string;
  optional?: boolean;
  moduleId?: ModuleId;
}

export function vestingSummary(state: AgreementState) {
  if (state.vestingPreset === 'custom') {
    const values = state.modules['custom-vesting'].values;
    const config = MODULE_MAP['custom-vesting'];
    return {
      label: config.summary(values),
      detail: config.clauseText(values),
      reviewLine: config.summary(values),
      documentLine: `${values.total}${values.cliff === 'No cliff' ? '' : `, with a ${values.cliff} cliff`}`
    };
  }
  const preset = VESTING_PRESETS.find((p) => p.id === state.vestingPreset) ?? VESTING_PRESETS[0];
  return {
    label: preset.label,
    detail: preset.clause,
    reviewLine: preset.reviewLine,
    documentLine: preset.id === '4y' ? '4 years, with a 1-year cliff' : '3 years, with a 1-year cliff'
  };
}

export function settlementSummary(state: AgreementState) {
  const method = SETTLEMENT_METHODS.find((m) => m.id === state.settlementMethod) ?? SETTLEMENT_METHODS[0];
  const timing =
  state.settlementTiming === 'Custom' ? 'as separately agreed' : state.settlementTiming.toLowerCase();
  return {
    method,
    documentLine: `${method.documentLabel} ${timing}`,
    reviewTiming: state.settlementTiming
  };
}

export function partiesLine(state: AgreementState) {
  return {
    company: fallback(state.companyName, SAMPLE.companyName),
    grantee: fallback(state.granteeName, SAMPLE.granteeName),
    role: fallback(state.granteeRole, SAMPLE.granteeRole),
    office: fallback(state.registeredOffice, SAMPLE.registeredOffice),
    cin: state.cin.trim(),
    date: formatLongDate(state.grantDate)
  };
}

export function keyTerms(state: AgreementState) {
  const vesting = vestingSummary(state);
  const settlement = settlementSummary(state);
  const count = groupIndian(state.sarCount) || SAMPLE.sarCount;
  const price = groupIndian(state.basePrice) || SAMPLE.basePrice;
  return [
  { label: 'Grant Date', value: formatLongDate(state.grantDate) },
  { label: 'Number of SARs', value: count },
  { label: 'Base Price', value: `₹${price} per SAR` },
  { label: 'Vesting', value: vesting.documentLine },
  { label: 'Settlement', value: settlement.documentLine }];

}

export function buildClauses(state: AgreementState): Clause[] {
  const parties = partiesLine(state);
  const vesting = vestingSummary(state);
  const settlement = settlementSummary(state);
  const count = groupIndian(state.sarCount) || SAMPLE.sarCount;
  const price = groupIndian(state.basePrice) || SAMPLE.basePrice;

  const base: Clause[] = [
  {
    number: 1,
    title: 'Grant of SARs',
    body: `Subject to the terms of this Agreement, the Company grants to the Grantee ${count} Stock Appreciation Rights, each carrying the right to receive the appreciation in value of one equity share of the Company over the Base Price of ₹${price}, as and when settled in accordance with Clause 2.`
  },
  {
    number: 2,
    title: 'Settlement',
    body: `Vested SARs shall be settled in ${settlement.method.documentLabel.toLowerCase()} ${
    state.settlementTiming === 'Custom' ? 'as separately agreed' : state.settlementTiming.toLowerCase()}. The settlement amount payable in respect of each vested SAR shall equal the fair value of one equity share on the settlement date less the Base Price.`

  }];


  if (state.vestingPreset !== 'custom') {
    base.push({ number: 3, title: 'Vesting', body: vesting.detail });
  }

  const optional: Clause[] = Object.keys(state.modules).
  filter((id) => state.modules[id as ModuleId].added).
  map((id) => {
    const config = MODULE_MAP[id as ModuleId];
    return {
      number: config.clauseNumber,
      title: config.clauseTitle,
      body: config.clauseText(state.modules[id as ModuleId].values),
      optional: true,
      moduleId: config.id
    };
  });

  const standard: Clause[] = [
  {
    number: 12,
    title: 'Tax Withholding',
    body: `Any amount settled hereunder shall be subject to deduction of tax at source and all other statutory deductions applicable under Indian law. The Grantee remains solely responsible for the personal tax consequences of the award.`
  },
  {
    number: 13,
    title: 'No Shareholder Rights',
    body: `The SARs do not confer upon the Grantee any right to vote, to receive dividends, or any other right of a shareholder of the Company.`
  },
  {
    number: 14,
    title: 'Transfer Restrictions',
    body: `The SARs are personal to the Grantee and may not be transferred, assigned, pledged or otherwise encumbered, except by operation of law on death.`
  },
  {
    number: 15,
    title: 'Confidentiality',
    body: `The Grantee shall keep the terms of this Agreement confidential and shall not disclose them to any person other than professional advisers, save as required by law.`
  },
  {
    number: 16,
    title: 'Notices',
    body: `Notices under this Agreement shall be in writing and delivered to ${parties.office}, or to such other address as the parties may notify in writing.`
  },
  {
    number: 17,
    title: 'Amendments',
    body: `No amendment to this Agreement shall be effective unless made in writing and signed by both parties.`
  },
  {
    number: 18,
    title: 'Governing Law',
    body: `This Agreement is governed by the laws of India and the courts at the Company's registered office shall have exclusive jurisdiction.`
  }];


  return [...base, ...optional].sort((a, b) => a.number - b.number).concat(standard);
}

export function customTermSummaries(state: AgreementState) {
  return Object.keys(state.modules).
  filter((id) => state.modules[id as ModuleId].added && id !== 'custom-vesting').
  map((id) => {
    const config = MODULE_MAP[id as ModuleId];
    return {
      id: config.id,
      title: config.clauseTitle,
      value: config.summary(state.modules[id as ModuleId].values)
    };
  });
}
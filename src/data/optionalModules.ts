import type { ModuleConfig, ModuleId } from '../types/sar';

export const OPTIONAL_MODULES: ModuleConfig[] = [
{
  id: 'custom-vesting',
  title: 'Add custom vesting',
  description: 'Use a different schedule, milestones or vesting dates.',
  clauseNumber: 3,
  clauseTitle: 'Vesting',
  expandedHeading: 'Custom vesting schedule',
  fields: [
  {
    id: 'total',
    label: 'Total vesting period',
    type: 'select',
    options: ['2 years', '3 years', '4 years', '5 years'],
    defaultValue: '4 years'
  },
  {
    id: 'cliff',
    label: 'Cliff',
    type: 'select',
    options: ['No cliff', '6 months', '12 months', '18 months'],
    defaultValue: '12 months'
  },
  {
    id: 'frequency',
    label: 'Vests',
    type: 'select',
    options: ['Monthly', 'Quarterly', 'Annually'],
    defaultValue: 'Monthly'
  }],

  summary: (v) =>
  `${v.total} · ${v.cliff === 'No cliff' ? 'no cliff' : `${v.cliff} cliff`} · ${v.frequency.toLowerCase()}`,
  clauseText: (v) =>
  `The SARs vest over ${v.total}${
  v.cliff === 'No cliff' ? '' : `, subject to a cliff of ${v.cliff}`}, thereafter vesting ${
  v.frequency.toLowerCase()} in equal instalments until fully vested.`
},
{
  id: 'performance',
  title: 'Add performance conditions',
  description: 'Tie some or all SARs to revenue, EBITDA or other targets.',
  clauseNumber: 4,
  clauseTitle: 'Performance Conditions',
  expandedHeading: 'Performance conditions',
  fields: [
  {
    id: 'metric',
    label: 'Measured on',
    type: 'select',
    options: ['Revenue', 'EBITDA', 'ARR', 'A custom target'],
    defaultValue: 'Revenue'
  },
  {
    id: 'portion',
    label: 'Portion tied to performance',
    type: 'select',
    options: ['25% of SARs', '50% of SARs', '75% of SARs', 'All SARs'],
    defaultValue: '50% of SARs'
  },
  {
    id: 'target',
    label: 'Target',
    type: 'text',
    placeholder: '₹50 crore revenue by FY 2027-28',
    defaultValue: ''
  }],

  summary: (v) => `${v.portion} on ${v.metric.toLowerCase()}`,
  clauseText: (v) =>
  `${v.portion} shall vest only if the ${v.metric.toLowerCase()} condition${
  v.target ? ` of ${v.target}` : ''} is certified as met by the Board.`

},
{
  id: 'valuation',
  title: 'Add custom valuation method',
  description: 'Define how the value of a SAR will be determined.',
  clauseNumber: 5,
  clauseTitle: 'Valuation',
  expandedHeading: 'How a SAR is valued',
  fields: [
  {
    id: 'method',
    label: 'Value determined by',
    type: 'select',
    options: [
    'Latest priced funding round',
    'Registered valuer report',
    'Board-determined fair value',
    'Transaction price on a liquidity event'],

    defaultValue: 'Registered valuer report'
  }],

  summary: (v) => v.method,
  clauseText: (v) =>
  `The fair value of one equity share on the settlement date shall be determined by reference to the ${v.method.toLowerCase()}.`
},
{
  id: 'hurdle',
  title: 'Add hurdle or payout cap',
  description: 'Set an additional valuation hurdle or maximum payout.',
  clauseNumber: 6,
  clauseTitle: 'Hurdle and Payout Cap',
  expandedHeading: 'Hurdle and payout cap',
  fields: [
  {
    id: 'hurdle',
    label: 'Valuation hurdle',
    type: 'text',
    placeholder: '₹750 per share',
    optional: true,
    defaultValue: ''
  },
  {
    id: 'cap',
    label: 'Maximum payout per SAR',
    type: 'text',
    placeholder: '₹2,500',
    optional: true,
    defaultValue: ''
  }],

  summary: (v) =>
  [v.hurdle ? `Hurdle ${v.hurdle}` : '', v.cap ? `Cap ${v.cap}` : ''].filter(Boolean).join(' · ') ||
  'Hurdle and cap to be set',
  clauseText: (v) =>
  `${v.hurdle ? `No amount is payable unless the fair value exceeds ${v.hurdle}. ` : ''}${
  v.cap ? `The payout in respect of each SAR shall not exceed ${v.cap}.` : ''}`.
  trim() || 'A valuation hurdle and maximum payout per SAR shall apply as agreed by the parties.'
},
{
  id: 'exercise-window',
  title: 'Add exercise window',
  description: 'Set how long vested SARs remain exercisable.',
  clauseNumber: 7,
  clauseTitle: 'Exercise Window',
  expandedHeading: 'Exercise window',
  fields: [
  {
    id: 'window',
    label: 'Vested SARs remain exercisable for',
    type: 'select',
    options: ['30 days', '60 days', '90 days', '180 days', '12 months'],
    defaultValue: '90 days'
  },
  {
    id: 'from',
    label: 'Measured from',
    type: 'select',
    options: ['A liquidity event', 'The vesting date', 'The last working day'],
    defaultValue: 'A liquidity event'
  }],

  summary: (v) => `${v.window} from ${v.from.toLowerCase()}`,
  clauseText: (v) =>
  `Vested SARs may be exercised within ${v.window} of ${v.from.toLowerCase()}, after which they lapse without compensation.`
},
{
  id: 'change-of-control',
  title: 'Add change of control terms',
  description: 'Choose what happens to unvested SARs if the company is acquired.',
  clauseNumber: 8,
  clauseTitle: 'Change of Control',
  expandedHeading: 'On a change of control',
  fields: [
  {
    id: 'treatment',
    label: '',
    type: 'radio',
    options: [
    'No accelerated vesting',
    'Vest a proportion early',
    'Vest all remaining SARs',
    'Custom'],

    optionHelpers: {
      'No accelerated vesting': 'Unvested SARs continue on the existing schedule.',
      'Vest a proportion early': 'Typically 50% of unvested SARs vest on completion.',
      'Vest all remaining SARs': 'Often called single-trigger full acceleration.',
      Custom: 'Terms to be drafted with your adviser.'
    },
    defaultValue: 'Vest all remaining SARs'
  }],

  summary: (v) => v.treatment,
  clauseText: (v) => {
    if (v.treatment === 'No accelerated vesting')
    return 'On a change of control, unvested SARs shall continue to vest in accordance with the original schedule.';
    if (v.treatment === 'Vest a proportion early')
    return 'On a change of control, 50% of the then unvested SARs shall vest immediately, with the balance continuing on the original schedule.';
    if (v.treatment === 'Vest all remaining SARs')
    return 'On a change of control, all unvested SARs shall vest in full immediately prior to completion and be settled with the transaction consideration.';
    return 'On a change of control, the treatment of unvested SARs shall be as separately agreed between the Company and the Grantee.';
  }
},
{
  id: 'leaver',
  title: 'Add special leaver treatment',
  description: 'Set different treatment for resignation, termination or other departures.',
  clauseNumber: 9,
  clauseTitle: 'Leaver Treatment',
  expandedHeading: 'If the grantee leaves',
  fields: [
  {
    id: 'resignation',
    label: 'On resignation',
    type: 'radio',
    options: ['Keep vested SARs', 'All SARs lapse'],
    defaultValue: 'Keep vested SARs'
  },
  {
    id: 'cause',
    label: 'On termination for cause',
    type: 'radio',
    options: ['Keep vested SARs', 'All SARs lapse'],
    defaultValue: 'All SARs lapse'
  }],

  summary: (v) => `Resignation: ${v.resignation.toLowerCase()} · For cause: ${v.cause.toLowerCase()}`,
  clauseText: (v) =>
  `Where the Grantee resigns, ${
  v.resignation === 'Keep vested SARs' ?
  'vested SARs shall be retained and unvested SARs shall lapse' :
  'all SARs, vested and unvested, shall lapse'}. Where employment is terminated for cause, ${

  v.cause === 'Keep vested SARs' ? 'vested SARs shall be retained' : 'all SARs shall lapse'}.`

},
{
  id: 'acceleration',
  title: 'Add accelerated vesting',
  description: 'Allow some or all unvested SARs to vest early in specific circumstances.',
  clauseNumber: 10,
  clauseTitle: 'Accelerated Vesting',
  expandedHeading: 'Accelerated vesting',
  fields: [
  {
    id: 'trigger',
    label: 'Accelerate on',
    type: 'select',
    options: [
    'Termination without cause',
    'Death or permanent disability',
    'Board discretion',
    'An initial public offering'],

    defaultValue: 'Death or permanent disability'
  },
  {
    id: 'portion',
    label: 'Portion accelerated',
    type: 'select',
    options: ['25% of unvested', '50% of unvested', 'All unvested'],
    defaultValue: 'All unvested'
  }],

  summary: (v) => `${v.portion} on ${v.trigger.toLowerCase()}`,
  clauseText: (v) =>
  `Upon ${v.trigger.toLowerCase()}, ${v.portion.toLowerCase()} SARs shall vest immediately and become eligible for settlement.`
},
{
  id: 'clawback',
  title: 'Add clawback terms',
  description: 'Allow awards or payouts to be recovered in specified situations.',
  clauseNumber: 11,
  clauseTitle: 'Clawback',
  expandedHeading: 'Clawback',
  fields: [
  {
    id: 'grounds',
    label: 'Recovery permitted on',
    type: 'radio',
    options: [
    'Fraud or wilful misconduct',
    'Material restatement of accounts',
    'Breach of restrictive covenants'],

    defaultValue: 'Fraud or wilful misconduct'
  },
  {
    id: 'period',
    label: 'Recovery period after payout',
    type: 'select',
    options: ['12 months', '24 months', '36 months'],
    defaultValue: '24 months'
  }],

  summary: (v) => `${v.grounds} · ${v.period}`,
  clauseText: (v) =>
  `The Company may recover any amount settled under this Agreement for a period of ${v.period} following payout in the event of ${v.grounds.toLowerCase()}.`
}];


export const MODULE_MAP: Record<ModuleId, ModuleConfig> = OPTIONAL_MODULES.reduce(
  (acc, m) => {
    acc[m.id] = m;
    return acc;
  },
  {} as Record<ModuleId, ModuleConfig>
);
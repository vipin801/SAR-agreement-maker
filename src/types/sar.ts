export type ModuleId =
'custom-vesting' |
'performance' |
'leaver' |
'change-of-control' |
'exercise-window' |
'hurdle' |
'valuation' |
'acceleration' |
'clawback';

export type FieldType = 'text' | 'select' | 'radio';

export interface ModuleField {
  id: string;
  label: string;
  type: FieldType;
  options?: string[];
  optionHelpers?: Record<string, string>;
  placeholder?: string;
  helper?: string;
  optional?: boolean;
  defaultValue: string;
}

export interface ModuleConfig {
  id: ModuleId;
  title: string;
  description: string;
  clauseNumber: number;
  clauseTitle: string;
  expandedHeading: string;
  fields: ModuleField[];
  summary: (values: Record<string, string>) => string;
  clauseText: (values: Record<string, string>) => string;
}

export type VestingPreset = '4y' | '3y' | 'custom';

export type SettlementMethod = 'cash' | 'shares' | 'company';

export interface ModuleState {
  added: boolean;
  values: Record<string, string>;
}

export interface AgreementState {
  companyName: string;
  cin: string;
  registeredOffice: string;
  granteeName: string;
  granteeRole: string;
  granteeAddress: string;
  sarCount: string;
  basePrice: string;
  grantDate: string;
  vestingPreset: VestingPreset;
  settlementMethod: SettlementMethod;
  settlementTiming: string;
  modules: Record<ModuleId, ModuleState>;
}

export type Screen = 'build' | 'review' | 'generated';
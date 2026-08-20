import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MODULE_MAP, OPTIONAL_MODULES } from '../data/optionalModules';
import type { AgreementState, ModuleId, ModuleState, SettlementMethod, VestingPreset } from '../types/sar';

function initialModules(): Record<ModuleId, ModuleState> {
  return OPTIONAL_MODULES.reduce(
    (acc, module) => {
      acc[module.id] = {
        added: false,
        values: module.fields.reduce<Record<string, string>>((values, field) => {
          values[field.id] = field.defaultValue;
          return values;
        }, {})
      };
      return acc;
    },
    {} as Record<ModuleId, ModuleState>
  );
}

const INITIAL: AgreementState = {
  companyName: '',
  cin: '',
  registeredOffice: '',
  granteeName: '',
  granteeRole: '',
  granteeAddress: '',
  sarCount: '',
  basePrice: '',
  grantDate: '2026-08-15',
  vestingPreset: '4y',
  settlementMethod: 'cash',
  settlementTiming: 'On a liquidity event',
  modules: initialModules()
};

export interface AgreementApi {
  state: AgreementState;
  setField: <K extends keyof AgreementState>(key: K, value: AgreementState[K]) => void;
  setVestingPreset: (preset: VestingPreset) => void;
  setSettlementMethod: (method: SettlementMethod) => void;
  toggleModule: (id: ModuleId) => void;
  setModuleValue: (id: ModuleId, fieldId: string, value: string) => void;
  addedModuleIds: ModuleId[];
  highlightedClause: number | null;
  completedEssentials: number;
}

export function useAgreement(): AgreementApi {
  const [state, setState] = useState<AgreementState>(INITIAL);
  const [highlightedClause, setHighlightedClause] = useState<number | null>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const flash = useCallback((clauseNumber: number) => {
    window.clearTimeout(timer.current);
    setHighlightedClause(clauseNumber);
    timer.current = window.setTimeout(() => setHighlightedClause(null), 1800);
  }, []);

  const setField = useCallback<AgreementApi['setField']>((key, value) => {
    setState((prev) => ({ ...prev, [key]: value }));
  }, []);

  const toggleModule = useCallback(
    (id: ModuleId) => {
      setState((prev) => {
        const wasAdded = prev.modules[id].added;
        const next: AgreementState = {
          ...prev,
          modules: { ...prev.modules, [id]: { ...prev.modules[id], added: !wasAdded } }
        };
        if (id === 'custom-vesting') {
          next.vestingPreset = wasAdded ? '4y' : 'custom';
        }
        return next;
      });
      if (!state.modules[id].added) flash(MODULE_MAP[id].clauseNumber);
    },
    [flash, state.modules]
  );

  const setVestingPreset = useCallback(
    (preset: VestingPreset) => {
      setState((prev) => ({
        ...prev,
        vestingPreset: preset,
        modules: {
          ...prev.modules,
          'custom-vesting': { ...prev.modules['custom-vesting'], added: preset === 'custom' }
        }
      }));
      flash(3);
    },
    [flash]
  );

  const setSettlementMethod = useCallback(
    (method: SettlementMethod) => {
      setState((prev) => ({ ...prev, settlementMethod: method }));
      flash(2);
    },
    [flash]
  );

  const setModuleValue = useCallback((id: ModuleId, fieldId: string, value: string) => {
    setState((prev) => ({
      ...prev,
      modules: {
        ...prev.modules,
        [id]: { ...prev.modules[id], values: { ...prev.modules[id].values, [fieldId]: value } }
      }
    }));
  }, []);

  const addedModuleIds = useMemo(
    () =>
    OPTIONAL_MODULES.filter((m) => state.modules[m.id].added).
    sort((a, b) => a.clauseNumber - b.clauseNumber).
    map((m) => m.id),
    [state.modules]
  );

  const completedEssentials = useMemo(() => {
    const checks = [
    state.companyName,
    state.registeredOffice,
    state.granteeName,
    state.granteeRole,
    state.sarCount,
    state.basePrice,
    state.grantDate];

    return checks.filter((value) => value.trim().length > 0).length + 1;
  }, [state]);

  return {
    state,
    setField,
    setVestingPreset,
    setSettlementMethod,
    toggleModule,
    setModuleValue,
    addedModuleIds,
    highlightedClause,
    completedEssentials
  };
}
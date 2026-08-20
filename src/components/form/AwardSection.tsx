import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Field, PrefixInput, SectionHeading, TextInput } from '../ui/Field';
import { ModuleFields } from './ModuleFields';
import { MODULE_MAP } from '../../data/optionalModules';
import { VESTING_PRESETS } from '../../data/presets';
import { groupIndian } from '../../utils/format';
import { vestingSummary } from '../../utils/agreement';
import type { AgreementState, ModuleId, VestingPreset } from '../../types/sar';

interface Props {
  state: AgreementState;
  setField: <K extends keyof AgreementState>(key: K, value: AgreementState[K]) => void;
  setVestingPreset: (preset: VestingPreset) => void;
  setModuleValue: (id: ModuleId, fieldId: string, value: string) => void;
}

export function AwardSection({ state, setField, setVestingPreset, setModuleValue }: Props) {
  const vesting = vestingSummary(state);

  return (
    <section aria-labelledby="award-heading">
      <div id="award-heading">
        <SectionHeading title="The award" helper="What are you granting?" />
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-5">
        <Field label="Number of SARs" htmlFor="sar-count">
          <TextInput
            id="sar-count"
            inputMode="numeric"
            value={groupIndian(state.sarCount)}
            onChange={(e) => setField('sarCount', e.target.value)}
            placeholder="10,000"
            className="font-mono font-light" />

        </Field>
        <Field
          label="Base price per SAR"
          htmlFor="base-price"
          helper="The value above which the SAR participates in appreciation.">

          <PrefixInput
            id="base-price"
            prefix="₹"
            inputMode="numeric"
            value={groupIndian(state.basePrice)}
            onChange={(e) => setField('basePrice', e.target.value)}
            placeholder="500"
            className="font-mono font-light" />

        </Field>
        <Field label="Grant date" htmlFor="grant-date">
          <TextInput
            id="grant-date"
            type="date"
            value={state.grantDate}
            onChange={(e) => setField('grantDate', e.target.value)} />
          
        </Field>
      </div>

      <div className="mt-7">
        <span className="mb-2 block text-[13px] font-medium text-ink">Vesting</span>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Vesting schedule">
          {VESTING_PRESETS.map((preset) => {
            const selected = state.vestingPreset === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setVestingPreset(preset.id)}
                className={`h-10 rounded border px-3.5 text-[13.5px] transition-[background-color,border-color,color] duration-150 ease-out ${
                selected ?
                'border-accent bg-accent/10 font-medium text-accent' :
                'border-line bg-card text-ink-muted hover:border-line-strong hover:text-ink'}`
                }>
                
                {preset.label}
                {preset.recommended &&
                <span
                  className={`ml-2 text-[11px] font-medium ${selected ? 'text-accent/70' : 'text-ink-subtle'}`}>
                  
                    Recommended
                  </span>
                }
              </button>);

          })}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {state.vestingPreset === 'custom' ?
          <motion.div
            key="custom"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="mt-4 border-l-2 border-accent/25 pl-4">
            
              <ModuleFields
              config={MODULE_MAP['custom-vesting']}
              values={state.modules['custom-vesting'].values}
              onChange={setModuleValue} />
            
            </motion.div> :

          <motion.p
            key={state.vestingPreset}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="mt-2.5 text-[12.5px] leading-5 text-ink-subtle">
            
              {VESTING_PRESETS.find((p) => p.id === state.vestingPreset)?.detail}
            </motion.p>
          }
        </AnimatePresence>

        {state.vestingPreset === 'custom' &&
        <p className="mt-3 text-[12.5px] text-ink-subtle">{vesting.label}</p>
        }
      </div>
    </section>);

}
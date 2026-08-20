import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Field, SectionHeading, SelectInput } from '../ui/Field';
import { SETTLEMENT_METHODS, SETTLEMENT_TIMINGS } from '../../data/presets';
import type { AgreementState, SettlementMethod } from '../../types/sar';

interface Props {
  state: AgreementState;
  setField: <K extends keyof AgreementState>(key: K, value: AgreementState[K]) => void;
  setSettlementMethod: (method: SettlementMethod) => void;
}

export function SettlementSection({ state, setField, setSettlementMethod }: Props) {
  const active = SETTLEMENT_METHODS.find((m) => m.id === state.settlementMethod) ?? SETTLEMENT_METHODS[0];

  return (
    <section aria-labelledby="settlement-heading">
      <div id="settlement-heading">
        <SectionHeading title="Settlement" helper="How should the SARs be settled?" />
      </div>

      <div
        role="radiogroup"
        aria-label="Settlement method"
        className="inline-flex rounded border border-line bg-card p-1">
        
        {SETTLEMENT_METHODS.map((method) => {
          const selected = state.settlementMethod === method.id;
          return (
            <button
              key={method.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setSettlementMethod(method.id)}
              className={`relative h-9 rounded px-4 text-[13.5px] transition-colors duration-150 ease-out ${
              selected ? 'text-ink' : 'text-ink-muted hover:text-ink'}`
              }>
              
              {selected &&
              <motion.span
                layoutId="settlement-pill"
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                className="absolute inset-0 rounded bg-surface" />

              }
              <span className={`relative ${selected ? 'font-medium' : ''}`}>{method.label}</span>
            </button>);

        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={active.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="mt-2.5 text-[12.5px] leading-5 text-ink-subtle">
          
          {active.explanation}
        </motion.p>
      </AnimatePresence>

      <Field label="When can vested SARs be settled?" htmlFor="settlement-timing" className="mt-6 max-w-[340px]">
        <SelectInput
          id="settlement-timing"
          options={SETTLEMENT_TIMINGS}
          value={state.settlementTiming}
          onChange={(e) => setField('settlementTiming', e.target.value)} />
        
      </Field>
    </section>);

}
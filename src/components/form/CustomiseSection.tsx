import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRightIcon, CheckIcon, PlusIcon } from 'lucide-react';
import { ModuleFields } from './ModuleFields';
import { OPTIONAL_MODULES } from '../../data/optionalModules';
import type { AgreementState, ModuleConfig, ModuleId } from '../../types/sar';

interface Props {
  state: AgreementState;
  toggleModule: (id: ModuleId) => void;
  setModuleValue: (id: ModuleId, fieldId: string, value: string) => void;
}

export function CustomiseSection({ state, toggleModule, setModuleValue }: Props) {
  return (
    <section aria-labelledby="customise-heading">
      <div className="mb-6">
        <h2 id="customise-heading" className="text-[17px] font-semibold tracking-[-0.02em] text-ink">
          Make it more specific
        </h2>
        <p className="mt-1 text-[13px] text-ink-muted">Only add terms that matter for this grant.</p>
      </div>

      <div className="divide-y divide-line/70 border-y border-line/70">
        {OPTIONAL_MODULES.map((module) =>
        <OptionalRow
          key={module.id}
          config={module}
          added={state.modules[module.id].added}
          values={state.modules[module.id].values}
          onToggle={toggleModule}
          onChange={setModuleValue} />

        )}
      </div>
    </section>);

}

interface RowProps {
  config: ModuleConfig;
  added: boolean;
  values: Record<string, string>;
  onToggle: (id: ModuleId) => void;
  onChange: (id: ModuleId, fieldId: string, value: string) => void;
}

function OptionalRow({ config, added, values, onToggle, onChange }: RowProps) {
  return (
    <div className="group">
      <button
        type="button"
        onClick={() => onToggle(config.id)}
        aria-expanded={added}
        className="flex w-full items-start gap-3 py-4 text-left transition-colors duration-150 ease-out">
        
        <span
          className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full transition-colors duration-150 ease-out ${
          added ? 'bg-success-deep text-white' : 'bg-ink/[0.06] text-ink-muted group-hover:bg-ink/[0.1]'}`
          }>
          
          {added ? <CheckIcon className="h-3 w-3" strokeWidth={3} /> : <PlusIcon className="h-3 w-3" strokeWidth={2.5} />}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-baseline gap-2">
            <span className="text-[14px] font-medium text-ink">
              {added ? config.title.replace('Add ', '').replace(/^./, (c) => c.toUpperCase()) : config.title}
            </span>
            {added && <span className="text-[11.5px] font-medium text-success-deep">Added</span>}
          </span>
          <span className="mt-0.5 block text-[12.5px] leading-5 text-ink-subtle">{config.description}</span>
        </span>
        {!added &&
        <ArrowRightIcon className="mt-1 h-3.5 w-3.5 shrink-0 text-ink-subtle/0 transition-colors duration-150 ease-out group-hover:text-ink-subtle" />
        }
      </button>

      <AnimatePresence initial={false}>
        {added &&
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          className="overflow-hidden">
          
            <div className="mb-5 ml-[30px] border-l-2 border-accent/20 pl-5">
              <p className="mb-3 text-[13px] font-medium text-ink">{config.expandedHeading}</p>
              <ModuleFields config={config} values={values} onChange={onChange} />
              <button
              type="button"
              onClick={() => onToggle(config.id)}
              className="mt-4 text-[12.5px] font-medium text-ink-subtle transition-colors duration-150 ease-out hover:text-ink">
              
                Remove
              </button>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}
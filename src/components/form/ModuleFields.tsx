import React from 'react';
import { Field, SelectInput, TextInput } from '../ui/Field';
import type { ModuleConfig, ModuleId } from '../../types/sar';

interface Props {
  config: ModuleConfig;
  values: Record<string, string>;
  onChange: (id: ModuleId, fieldId: string, value: string) => void;
}

export function ModuleFields({ config, values, onChange }: Props) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-5">
      {config.fields.map((field) => {
        const key = `${config.id}-${field.id}`;
        if (field.type === 'radio') {
          return (
            <fieldset key={key} className="col-span-2">
              {field.label &&
              <legend className="mb-2 text-[13px] font-medium text-ink">{field.label}</legend>
              }
              <div className="space-y-1">
                {field.options?.map((option) => {
                  const selected = values[field.id] === option;
                  return (
                    <label
                      key={option}
                      className="flex cursor-pointer items-start gap-2.5 rounded px-2 py-1.5 transition-colors duration-150 ease-out hover:bg-ink/[0.03]">
                      
                      <input
                        type="radio"
                        name={key}
                        value={option}
                        checked={selected}
                        onChange={() => onChange(config.id, field.id, option)}
                        className="mt-[3px] h-[15px] w-[15px] accent-accent" />
                      
                      <span>
                        <span className="block text-[13.5px] leading-5 text-ink">{option}</span>
                        {field.optionHelpers?.[option] &&
                        <span className="mt-0.5 block text-[12px] leading-5 text-ink-subtle">
                            {field.optionHelpers[option]}
                          </span>
                        }
                      </span>
                    </label>);

                })}
              </div>
            </fieldset>);

        }

        return (
          <Field
            key={key}
            label={field.label}
            htmlFor={key}
            optional={field.optional}
            helper={field.helper}
            className={field.type === 'text' ? 'col-span-2' : ''}>
            
            {field.type === 'select' ?
            <SelectInput
              id={key}
              options={field.options ?? []}
              value={values[field.id]}
              onChange={(e) => onChange(config.id, field.id, e.target.value)} /> :


            <TextInput
              id={key}
              value={values[field.id]}
              placeholder={field.placeholder}
              onChange={(e) => onChange(config.id, field.id, e.target.value)} />

            }
          </Field>);

      })}
    </div>);

}
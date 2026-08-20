import React from 'react';

interface FieldProps {
  label: string;
  htmlFor?: string;
  optional?: boolean;
  helper?: string;
  children: React.ReactNode;
  className?: string;
}

export function Field({ label, htmlFor, optional, helper, children, className = '' }: FieldProps) {
  return (
    <div className={className}>
      <div className="mb-1.5 flex items-baseline gap-2">
        <label htmlFor={htmlFor} className="text-[13px] font-medium text-ink">
          {label}
        </label>
        {optional && <span className="text-[11px] font-medium text-ink-subtle">Optional</span>}
      </div>
      {children}
      {helper && <p className="mt-1.5 text-[12px] leading-5 text-ink-subtle">{helper}</p>}
    </div>);

}

const controlClasses =
'w-full h-11 rounded border border-line bg-card px-3.5 text-[14px] text-ink placeholder:text-ink-subtle/70 outline-none transition-[border-color,box-shadow] duration-150 ease-out focus:border-accent focus:ring-2 focus:ring-accent/15';

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className = '', ...rest } = props;
  return <input {...rest} className={`${controlClasses} ${className}`} />;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
}

export function SelectInput({ options, className = '', ...rest }: SelectProps) {
  return (
    <div className="relative">
      <select
        {...rest}
        className={`${controlClasses} appearance-none pr-10 ${className}`}>
        
        {options.map((option) =>
        <option key={option} value={option}>
            {option}
          </option>
        )}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 12 12"
        className="pointer-events-none absolute right-3.5 top-1/2 h-3 w-3 -translate-y-1/2 text-ink-subtle">
        
        <path d="M2 4.5 6 8.5 10 4.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>);

}

export function PrefixInput({
  prefix,
  className = '',
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & {prefix: string;}) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[14px] text-ink-muted">
        {prefix}
      </span>
      <input {...rest} className={`${controlClasses} pl-8 ${className}`} />
    </div>);

}

export function SectionHeading({ title, helper }: {title: string;helper?: string;}) {
  return (
    <div className="mb-5">
      <h2 className="text-[17px] font-semibold tracking-[-0.02em] text-ink">{title}</h2>
      {helper && <p className="mt-1 text-[13px] text-ink-muted">{helper}</p>}
    </div>);

}
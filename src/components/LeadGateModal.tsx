import React, { useState } from 'react';
import { XIcon } from 'lucide-react';
import { Field, TextInput } from './ui/Field';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (lead: {name: string;workmail: string;}) => void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LeadGateModal({ open, onClose, onSubmit }: Props) {
  const [name, setName] = useState('');
  const [workmail, setWorkmail] = useState('');
  const [touched, setTouched] = useState(false);

  if (!open) return null;

  const nameValid = name.trim().length > 1;
  const emailValid = EMAIL_RE.test(workmail.trim());
  const canSubmit = nameValid && emailValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!canSubmit) return;
    onSubmit({ name: name.trim(), workmail: workmail.trim() });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true">

      <div className="w-full max-w-[420px] rounded border border-line bg-card p-6 shadow-doc">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-serif text-[19px] italic leading-tight text-ink">
              Before you download
            </h2>
            <p className="mt-1.5 text-[13px] leading-5 text-ink-muted">
              Tell us who you are so we can follow up if you need help with SAR grants. No spam.
            </p>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="-mt-1 -mr-1 flex h-7 w-7 shrink-0 items-center justify-center rounded text-ink-muted transition-colors duration-150 ease-out hover:bg-ink/[0.05] hover:text-ink">

            <XIcon className="h-4 w-4" />
          </button>
        </div>

        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <Field label="Name" htmlFor="lead-name">
            <TextInput
              id="lead-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Priya Nair"
              autoFocus />

            {touched && !nameValid &&
            <p className="mt-1.5 text-[12px] text-red-600">Enter your name.</p>
            }
          </Field>
          <Field label="Work email" htmlFor="lead-email">
            <TextInput
              id="lead-email"
              type="email"
              value={workmail}
              onChange={(e) => setWorkmail(e.target.value)}
              placeholder="priya@company.com" />

            {touched && !emailValid &&
            <p className="mt-1.5 text-[12px] text-red-600">Enter a valid work email.</p>
            }
          </Field>

          <button
            type="submit"
            className="h-11 w-full rounded bg-accent text-[13.5px] font-medium text-white transition-colors duration-150 ease-out hover:bg-accent-hover">

            Continue to download
          </button>
        </form>
      </div>
    </div>);

}

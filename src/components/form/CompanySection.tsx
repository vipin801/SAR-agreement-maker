import React from 'react';
import { Field, SectionHeading, TextInput } from '../ui/Field';
import type { AgreementState } from '../../types/sar';

interface Props {
  state: AgreementState;
  setField: <K extends keyof AgreementState>(key: K, value: AgreementState[K]) => void;
}

export function CompanySection({ state, setField }: Props) {
  return (
    <section aria-labelledby="company-heading">
      <div id="company-heading">
        <SectionHeading title="Company" helper="Who is issuing the SARs?" />
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-4">
        <Field label="Company name" htmlFor="company-name">
          <TextInput
            id="company-name"
            value={state.companyName}
            onChange={(e) => setField('companyName', e.target.value)}
            placeholder="Acme Technologies Private Limited" />
          
        </Field>
        <Field label="CIN" htmlFor="cin" optional>
          <TextInput
            id="cin"
            value={state.cin}
            onChange={(e) => setField('cin', e.target.value)}
            placeholder="U72900MH2022PTC123456" />
          
        </Field>
        <Field label="Registered office" htmlFor="registered-office" className="col-span-2">
          <TextInput
            id="registered-office"
            value={state.registeredOffice}
            onChange={(e) => setField('registeredOffice', e.target.value)}
            placeholder="4th Floor, Prabhat House, Bandra Kurla Complex, Mumbai 400051" />
          
        </Field>
      </div>
    </section>);

}
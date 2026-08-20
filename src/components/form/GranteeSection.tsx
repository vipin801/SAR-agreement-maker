import React from 'react';
import { Field, SectionHeading, TextInput } from '../ui/Field';
import type { AgreementState } from '../../types/sar';

interface Props {
  state: AgreementState;
  setField: <K extends keyof AgreementState>(key: K, value: AgreementState[K]) => void;
}

export function GranteeSection({ state, setField }: Props) {
  return (
    <section aria-labelledby="grantee-heading">
      <div id="grantee-heading">
        <SectionHeading title="Grantee" helper="Who is receiving the SARs?" />
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-4">
        <Field label="Grantee name" htmlFor="grantee-name">
          <TextInput
            id="grantee-name"
            value={state.granteeName}
            onChange={(e) => setField('granteeName', e.target.value)}
            placeholder="Rahul Mehta" />
          
        </Field>
        <Field label="Role" htmlFor="grantee-role">
          <TextInput
            id="grantee-role"
            value={state.granteeRole}
            onChange={(e) => setField('granteeRole', e.target.value)}
            placeholder="Chief Financial Officer" />
          
        </Field>
        <Field label="Address" htmlFor="grantee-address" optional className="col-span-2">
          <TextInput
            id="grantee-address"
            value={state.granteeAddress}
            onChange={(e) => setField('granteeAddress', e.target.value)}
            placeholder="B-1204, Lodha Bellissimo, Mahalaxmi, Mumbai 400011" />
          
        </Field>
      </div>
    </section>);

}
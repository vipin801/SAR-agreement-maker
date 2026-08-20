import React from 'react';
import { ArrowUpRightIcon } from 'lucide-react';
import { AgreementDocument } from './AgreementDocument';
import type { AgreementState } from '../../types/sar';

interface Props {
  state: AgreementState;
  highlightedClause: number | null;
  onOpenFull: () => void;
}

export function PreviewPanel({ state, highlightedClause, onOpenFull }: Props) {
  return (
    <aside className="sticky top-[72px] flex h-[calc(100vh-96px)] flex-col" aria-label="Agreement preview">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-[13px] font-semibold text-ink">Agreement preview</h2>
        <button
          type="button"
          onClick={onOpenFull}
          className="inline-flex items-center gap-1 text-[12.5px] font-medium text-ink-muted transition-colors duration-150 ease-out hover:text-accent">
          
          Preview full agreement
          <ArrowUpRightIcon className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden rounded border border-line bg-card shadow-doc">
        <div className="doc-scroll h-full overflow-y-auto px-10 py-10">
          <AgreementDocument state={state} highlightedClause={highlightedClause} />
          <div className="h-24" />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-card via-card/85 to-transparent" />
      </div>
    </aside>);

}
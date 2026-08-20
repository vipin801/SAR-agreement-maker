import React from 'react';
import { customTermSummaries, partiesLine, settlementSummary, vestingSummary, SAMPLE } from '../utils/agreement';
import { STANDARD_PROVISIONS } from '../data/presets';
import { formatLongDate, groupIndian } from '../utils/format';
import { GradientText } from '../components/ui/GradientText';
import type { AgreementState } from '../types/sar';

interface Props {
  state: AgreementState;
  onBack: () => void;
  onGenerate: () => void;
}

export function Review({ state, onBack, onGenerate }: Props) {
  const parties = partiesLine(state);
  const vesting = vestingSummary(state);
  const settlement = settlementSummary(state);
  const custom = customTermSummaries(state);
  const count = groupIndian(state.sarCount) || SAMPLE.sarCount;
  const price = groupIndian(state.basePrice) || SAMPLE.basePrice;

  const sections: {title: string;lines: string[];}[] = [
  { title: 'Parties', lines: [parties.company, `${parties.grantee} — ${parties.role}`] },
  {
    title: 'Award',
    lines: [`${count} SARs`, `₹${price} base price`, `Granted ${formatLongDate(state.grantDate)}`]
  },
  { title: 'Vesting', lines: [vesting.label, vesting.reviewLine] },
  { title: 'Settlement', lines: [settlement.method.label, settlement.reviewTiming] },
  {
    title: 'Custom terms',
    lines: custom.length ?
    custom.map((term) => `${term.title} — ${term.value}`) :
    ['No additional custom terms']
  }];


  return (
    <div className="mx-auto max-w-[760px] px-6 pb-24 pt-14">
      <header>
        <h1 className="font-serif text-[30px] italic leading-[1.15] tracking-[-0.03em] text-ink">
          Review your <GradientText>agreement</GradientText>
        </h1>
        <p className="mt-2.5 text-[14.5px] leading-6 text-ink-muted">
          Here’s what you’ve chosen. You can edit anything before generating the document.
        </p>
      </header>

      <dl className="mt-10 divide-y divide-line border-y border-line">
        {sections.map((section) =>
        <div key={section.title} className="flex items-start gap-6 py-5">
            <dt className="w-[150px] shrink-0 text-[13px] font-medium text-ink-muted">{section.title}</dt>
            <dd className="flex-1 space-y-1">
              {section.lines.map((line) =>
            <p key={line} className="text-[14px] leading-6 text-ink">
                  {line}
                </p>
            )}
            </dd>
            <button
            type="button"
            onClick={onBack}
            className="shrink-0 text-[13px] font-medium text-accent transition-colors duration-150 ease-out hover:text-accent-hover">
            
              Edit
            </button>
          </div>
        )}
      </dl>

      <section className="mt-8 rounded bg-surface px-5 py-4">
        <h2 className="text-[13px] font-medium text-ink">Included automatically</h2>
        <p className="mt-1.5 text-[12.5px] leading-5 text-ink-muted">
          Standard provisions covering {STANDARD_PROVISIONS.join(' · ')}
        </p>
      </section>

      <div className="mt-10 flex items-center gap-3">
        <button
          type="button"
          onClick={onGenerate}
          className="h-11 rounded bg-accent px-5 text-[14px] font-medium text-white transition-colors duration-150 ease-out hover:bg-accent-hover">

          Generate SAR Agreement
        </button>
        <button
          type="button"
          onClick={onBack}
          className="h-11 rounded border border-line bg-card px-4 text-[14px] font-medium text-ink-muted transition-colors duration-150 ease-out hover:border-line-strong hover:text-ink">
          
          Back to edit
        </button>
      </div>
      <p className="mt-3 text-[12.5px] text-ink-subtle">
        You’ll be able to review the full document before downloading it.
      </p>
    </div>);

}
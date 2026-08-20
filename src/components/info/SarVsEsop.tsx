import React from 'react';
import { CheckIcon, XIcon } from 'lucide-react';
import { GradientText } from '../ui/GradientText';

const SAR_POINTS = [
'No exercise price — the grantee pays nothing to receive the appreciation value',
'Settled in cash or shares, at the company’s choice',
'Cash settlement issues no new shares at all',
'No shareholder rights unless the company chooses to settle in shares'];


const ESOP_POINTS = [
'Grantee pays an exercise price to convert options into shares',
'Always settled in equity — real shares are issued',
'Every exercise dilutes existing shareholders',
'Becomes an actual shareholder, with voting and dividend rights'];


export function SarVsEsop() {
  return (
    <section aria-labelledby="sar-vs-esop-heading" className="border-t border-line/70 py-16">
      <div className="mx-auto max-w-[1440px] px-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-accent">Choosing your instrument</p>
        <h2
          id="sar-vs-esop-heading"
          className="mt-2.5 max-w-[560px] font-serif text-[30px] italic leading-[1.15] tracking-[-0.03em] text-ink">

          How SARs compare to <GradientText>ESOPs</GradientText>
        </h2>
        <p className="mt-3 max-w-[560px] text-[14.5px] leading-6 text-ink-muted">
          Both reward performance. They differ in what the grantee pays, what they receive, and how much of the
          cap table it costs you.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="rounded border border-accent/30 bg-accent/[0.04] p-6">
            <p className="text-[13px] font-semibold text-ink">Stock Appreciation Rights</p>
            <p className="mt-1 text-[12px] text-ink-subtle">What this tool generates</p>
            <ul className="mt-5 space-y-3">
              {SAR_POINTS.map((point) =>
              <li key={point} className="flex gap-2.5 text-[13.5px] leading-[1.6] text-ink">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-success-deep" strokeWidth={2.5} />
                  {point}
                </li>
              )}
            </ul>
          </div>
          <div className="rounded border border-line bg-card p-6">
            <p className="text-[13px] font-semibold text-ink">Employee Stock Options</p>
            <p className="mt-1 text-[12px] text-ink-subtle">The more familiar alternative</p>
            <ul className="mt-5 space-y-3">
              {ESOP_POINTS.map((point) =>
              <li key={point} className="flex gap-2.5 text-[13.5px] leading-[1.6] text-ink-muted">
                  <XIcon className="mt-0.5 h-4 w-4 shrink-0 text-ink-subtle" strokeWidth={2.5} />
                  {point}
                </li>
              )}
            </ul>
          </div>
        </div>

        <p className="mt-6 max-w-[640px] text-[12.5px] leading-5 text-ink-subtle">
          Most Indian private companies reach for SARs when they want to reward performance without growing the
          cap table. Reach for an ESOP instead when the grantee should hold real shares from day one.
        </p>
      </div>
    </section>);

}

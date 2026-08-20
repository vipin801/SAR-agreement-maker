import React from 'react';
import { CalendarClockIcon, FileSignatureIcon, TrendingUpIcon, WalletIcon } from 'lucide-react';
import { GradientText } from '../ui/GradientText';

const STEPS = [
{
  icon: FileSignatureIcon,
  title: 'Grant',
  body: 'The company grants a fixed number of SARs at a Base Price — the value above which appreciation starts counting.'
},
{
  icon: CalendarClockIcon,
  title: 'Vesting',
  body: 'SARs vest over time, usually with a cliff, so the grantee earns the right to them gradually rather than all at once.'
},
{
  icon: TrendingUpIcon,
  title: 'Appreciation',
  body: 'As the share value rises above the Base Price, each vested SAR accrues the difference — at no cost to exercise.'
},
{
  icon: WalletIcon,
  title: 'Settlement',
  body: 'Once vested, SARs are settled in cash or shares, and the grantee receives the appreciation value directly.'
}];


export function HowItWorks() {
  return (
    <section aria-labelledby="how-it-works-heading" className="border-t border-line/70 py-16">
      <div className="mx-auto max-w-[1440px] px-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-accent">How it works</p>
        <h2
          id="how-it-works-heading"
          className="mt-2.5 max-w-[560px] font-serif text-[30px] italic leading-[1.15] tracking-[-0.03em] text-ink">

          How your <GradientText>SAR grant</GradientText> turns into a payout
        </h2>
        <p className="mt-3 max-w-[520px] text-[14.5px] leading-6 text-ink-muted">
          Four moments define every Stock Appreciation Right — from the day it’s granted to the day it’s paid out.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) =>
          <div key={step.title}>
              <div className="flex h-12 w-12 items-center justify-center rounded bg-accent text-white">
                <step.icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <p className="mt-4 font-mono text-[11px] font-light text-ink-subtle">0{i + 1}</p>
              <h3 className="mt-1 text-[15px] font-semibold tracking-[-0.02em] text-ink">{step.title}</h3>
              <p className="mt-1.5 text-[13.5px] leading-[1.65] text-ink-muted">{step.body}</p>
            </div>
          )}
        </div>
      </div>
    </section>);

}

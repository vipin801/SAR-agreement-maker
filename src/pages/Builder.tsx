import React from 'react';
import { CheckIcon } from 'lucide-react';
import { CompanySection } from '../components/form/CompanySection';
import { GranteeSection } from '../components/form/GranteeSection';
import { AwardSection } from '../components/form/AwardSection';
import { SettlementSection } from '../components/form/SettlementSection';
import { CustomiseSection } from '../components/form/CustomiseSection';
import { PreviewPanel } from '../components/preview/PreviewPanel';
import { GradientText } from '../components/ui/GradientText';
import { HowItWorks } from '../components/info/HowItWorks';
import { SarVsEsop } from '../components/info/SarVsEsop';
import type { AgreementApi } from '../hooks/useAgreement';

interface Props {
  agreement: AgreementApi;
  onReview: () => void;
  onOpenFull: () => void;
}

export function Builder({ agreement, onReview, onOpenFull }: Props) {
  const { state, setField, setVestingPreset, setSettlementMethod, toggleModule, setModuleValue } = agreement;

  return (
    <>
    <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 pt-10 lg:grid-cols-[minmax(0,57fr)_minmax(0,43fr)]">
      <div className="min-w-0">
        <header>
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-accent">
            SAR Agreement
          </p>
          <h1 className="mt-2.5 font-serif text-[32px] italic leading-[1.15] tracking-[-0.03em] text-ink">
            Create your <GradientText>SAR agreement</GradientText>
          </h1>
          <p className="mt-2.5 max-w-[520px] text-[14.5px] leading-6 text-ink-muted">
            Start with the essentials. You can customise the terms only if you need to.
          </p>
          <p className="mt-5 text-[12.5px] text-ink-subtle">About 3 minutes · 8 essentials</p>
        </header>

        <div className="mt-11 space-y-12 pb-8">
          <CompanySection state={state} setField={setField} />
          <GranteeSection state={state} setField={setField} />
          <AwardSection
            state={state}
            setField={setField}
            setVestingPreset={setVestingPreset}
            setModuleValue={setModuleValue} />
          
          <SettlementSection state={state} setField={setField} setSettlementMethod={setSettlementMethod} />

          <div>
            <div className="h-px w-full bg-line" />
            <div className="mt-7 flex gap-3 rounded bg-success/10 px-4 py-3.5">
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-success-deep" strokeWidth={2.5} />
              <div>
                <p className="text-[13.5px] font-medium text-ink">Your basic agreement is ready</p>
                <p className="mt-1 max-w-[520px] text-[12.5px] leading-5 text-ink-muted">
                  Standard provisions for tax withholding, transfer restrictions, shareholder rights, notices,
                  amendments and governing law are included automatically.
                </p>
              </div>
            </div>
          </div>

          <CustomiseSection state={state} toggleModule={toggleModule} setModuleValue={setModuleValue} />
        </div>

        <div className="sticky bottom-0 z-20 -mx-2 border-t border-line/80 bg-canvas/90 px-2 py-3.5 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <p className="text-[12.5px] text-ink-subtle">
              {agreement.completedEssentials} of 8 essential terms completed
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="h-9 rounded border border-line bg-card px-3.5 text-[13px] font-medium text-ink-muted transition-colors duration-150 ease-out hover:border-line-strong hover:text-ink">

                Save draft
              </button>
              <button
                type="button"
                onClick={onReview}
                className="h-9 rounded bg-accent px-4 text-[13px] font-medium text-white transition-colors duration-150 ease-out hover:bg-accent-hover">

                Review agreement →
              </button>
            </div>
          </div>
        </div>
      </div>

      <PreviewPanel
        state={state}
        highlightedClause={agreement.highlightedClause}
        onOpenFull={onOpenFull} />

    </div>

    <HowItWorks />
    <SarVsEsop />
    </>);

}
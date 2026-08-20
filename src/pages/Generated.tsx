import React, { useState } from 'react';
import { CheckIcon, CopyIcon, DownloadIcon, FileTextIcon } from 'lucide-react';
import { AgreementDocument } from '../components/preview/AgreementDocument';
import { LeadGateModal } from '../components/LeadGateModal';
import { partiesLine } from '../utils/agreement';
import { formatShortDate } from '../utils/format';
import { agreementFilename, buildAgreementDocx, downloadBlob } from '../utils/exportDocx';
import { printAgreementToPdf } from '../utils/exportPdf';
import { hasCapturedLead, saveLead } from '../utils/leads';
import { GradientText } from '../components/ui/GradientText';
import type { AgreementState } from '../types/sar';

interface Props {
  state: AgreementState;
  onEdit: () => void;
}

type PendingDownload = 'word' | 'pdf' | null;

export function Generated({ state, onEdit }: Props) {
  const parties = partiesLine(state);
  const [copied, setCopied] = useState(false);
  const [downloadingWord, setDownloadingWord] = useState(false);
  const [pendingDownload, setPendingDownload] = useState<PendingDownload>(null);

  const handleCopy = () => {
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const runDownload = async (kind: 'word' | 'pdf') => {
    if (kind === 'word') {
      setDownloadingWord(true);
      try {
        const blob = await buildAgreementDocx(state);
        downloadBlob(blob, agreementFilename(state, 'docx'));
      } finally {
        setDownloadingWord(false);
      }
    } else {
      printAgreementToPdf();
    }
  };

  const requestDownload = (kind: 'word' | 'pdf') => {
    if (hasCapturedLead()) {
      runDownload(kind);
    } else {
      setPendingDownload(kind);
    }
  };

  const handleLeadSubmit = (lead: {name: string;workmail: string;}) => {
    saveLead(lead);
    const kind = pendingDownload;
    setPendingDownload(null);
    if (kind) runDownload(kind);
  };

  return (
    <div className="mx-auto max-w-[880px] px-6 pb-24 pt-14">
      <header className="flex items-start gap-3.5">
        <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-success/10">
          <CheckIcon className="h-4 w-4 text-success-deep" strokeWidth={2.5} />
        </span>
        <div>
          <h1 className="font-serif text-[28px] italic leading-[1.2] tracking-[-0.03em] text-ink">
            Your <GradientText>SAR Agreement</GradientText> is ready
          </h1>
          <p className="mt-2 text-[13.5px] text-ink-muted">
            {parties.company} · {parties.grantee} · {formatShortDate(state.grantDate)}
          </p>
        </div>
      </header>

      <div className="mt-8 flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={downloadingWord}
          onClick={() => requestDownload('word')}
          className="inline-flex h-10 items-center gap-2 rounded bg-accent px-4 text-[13.5px] font-medium text-white transition-colors duration-150 ease-out hover:bg-accent-hover disabled:opacity-60">

          <DownloadIcon className="h-4 w-4" />
          {downloadingWord ? 'Preparing…' : 'Download Word'}
        </button>
        <button
          type="button"
          onClick={() => requestDownload('pdf')}
          className="inline-flex h-10 items-center gap-2 rounded border border-line bg-card px-4 text-[13.5px] font-medium text-ink transition-colors duration-150 ease-out hover:border-line-strong">

          <FileTextIcon className="h-4 w-4 text-ink-muted" />
          Download PDF
        </button>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex h-10 items-center gap-2 rounded px-3 text-[13.5px] font-medium text-ink-muted transition-colors duration-150 ease-out hover:bg-ink/[0.05] hover:text-ink">
          
          {copied ?
          <CheckIcon className="h-4 w-4 text-success-deep" strokeWidth={2.5} /> :

          <CopyIcon className="h-4 w-4" />
          }
          {copied ? 'Copied' : 'Copy agreement'}
        </button>
        <button
          type="button"
          onClick={onEdit}
          className="ml-auto text-[13px] font-medium text-accent transition-colors duration-150 ease-out hover:text-accent-hover">
          
          Edit terms
        </button>
      </div>

      <div className="print-area mt-8 rounded border border-line bg-card px-14 py-14 shadow-doc">
        <AgreementDocument state={state} full />
      </div>

      <p className="mt-5 text-[12.5px] leading-5 text-ink-subtle">
        Generated from the information you provided. Consider having the final agreement reviewed by your legal
        or tax adviser before execution.
      </p>

      <LeadGateModal
        open={pendingDownload !== null}
        onClose={() => setPendingDownload(null)}
        onSubmit={handleLeadSubmit} />

    </div>);

}
import React from 'react';
import { motion } from 'framer-motion';
import { buildClauses, keyTerms, partiesLine } from '../../utils/agreement';
import type { AgreementState } from '../../types/sar';

interface Props {
  state: AgreementState;
  highlightedClause?: number | null;
  full?: boolean;
}

export function AgreementDocument({ state, highlightedClause = null, full = false }: Props) {
  const parties = partiesLine(state);
  const terms = keyTerms(state);
  const allClauses = buildClauses(state);
  const clauses = full ? allClauses : allClauses.filter((c) => c.number <= 11);

  return (
    <article className="font-sans text-ink">
      <header className="text-center">
        <h1 className="font-serif text-[15px] italic uppercase tracking-[0.09em]">
          Stock Appreciation Rights Agreement
        </h1>
        <div className="mx-auto mt-4 h-px w-10 bg-line-strong" />
      </header>

      <p className="mt-6 text-[13.5px] leading-[1.75]">
        This Stock Appreciation Rights Agreement is entered into on{' '}
        <strong className="font-semibold">{parties.date}</strong> between{' '}
        <strong className="font-semibold">{parties.company}</strong>
        {parties.cin && <span>, CIN {parties.cin}</span>}, having its registered office at {parties.office} (the
        “Company”) and <strong className="font-semibold">{parties.grantee}</strong>, {parties.role} (the
        “Grantee”).
      </p>

      <dl className="mt-6 divide-y divide-line/70 border-y border-line/70">
        {terms.map((term) => {
          const isFigure = term.label === 'Number of SARs' || term.label === 'Base Price';
          return (
            <div key={term.label} className="flex gap-4 py-2.5">
              <dt className="w-[38%] shrink-0 text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-subtle">
                {term.label}
              </dt>
              <dd className={`text-[13.5px] leading-6 ${isFigure ? 'font-mono font-light' : ''}`}>
                {term.value}
              </dd>
            </div>
          );
        })}
      </dl>

      <div className="mt-7 space-y-5">
        {clauses.map((clause) =>
        <motion.section
          key={`${clause.number}-${clause.title}`}
          animate={{
            backgroundColor:
            highlightedClause === clause.number ? 'rgba(52,130,255,0.10)' : 'rgba(52,130,255,0)'
          }}
          transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
          className="-mx-2 rounded px-2 py-1">
          
            <h2 className="text-[13.5px] font-semibold">
              {clause.number}. {clause.title}
            </h2>
            <p className="mt-1.5 text-[13px] leading-[1.75] text-ink/90">{clause.body}</p>
          </motion.section>
        )}
      </div>

      {full &&
      <footer className="mt-10 grid grid-cols-2 gap-8 border-t border-line/70 pt-8 text-[12.5px]">
          <div>
            <div className="h-10 border-b border-line-strong" />
            <p className="mt-2 font-semibold">For {parties.company}</p>
            <p className="text-ink-muted">Authorised signatory</p>
          </div>
          <div>
            <div className="h-10 border-b border-line-strong" />
            <p className="mt-2 font-semibold">{parties.grantee}</p>
            <p className="text-ink-muted">Grantee</p>
          </div>
        </footer>
      }
    </article>);

}
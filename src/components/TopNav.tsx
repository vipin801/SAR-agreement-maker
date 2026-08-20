import React from 'react';
import { CheckIcon, MoonIcon, MoreHorizontalIcon, SunIcon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export function TopNav() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-canvas/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <span className="font-sans text-[19px] font-extrabold leading-none tracking-tight text-ink">
            incentiv<span className="text-accent">.</span>
          </span>
          <span className="h-4 w-px bg-line" />
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px]">
            <a href="#" className="font-medium text-ink transition-colors duration-150 ease-out hover:text-accent">
              Agreements
            </a>
            <span className="text-ink-subtle/60">/</span>
            <span className="text-ink-muted">New SAR Agreement</span>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <span className="mr-1 inline-flex items-center gap-1.5 text-[12px] text-ink-subtle">
            <CheckIcon className="h-3.5 w-3.5 text-success-deep" strokeWidth={2.5} />
            Saved
          </span>
          <button
            type="button"
            aria-label="More options"
            className="flex h-8 w-8 items-center justify-center rounded text-ink-muted transition-colors duration-150 ease-out hover:bg-ink/[0.05] hover:text-ink">

            <MoreHorizontalIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="flex h-8 w-8 items-center justify-center rounded-[10px] border border-line bg-card text-ink-muted transition-colors duration-150 ease-out hover:border-line-strong hover:text-ink">

            {theme === 'dark' ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
          </button>
          <button
            type="button"
            className="h-8 rounded-[10px] border border-line bg-card px-3.5 text-[13px] font-medium text-ink transition-colors duration-150 ease-out hover:border-line-strong">

            Save draft
          </button>
          <div
            aria-label="Priya Nair"
            className="ml-1 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-[11px] font-semibold text-white">

            PN
          </div>
        </div>
      </div>
    </header>);

}
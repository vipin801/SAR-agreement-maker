import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TopNav } from './components/TopNav';
import { Builder } from './pages/Builder';
import { Review } from './pages/Review';
import { Generated } from './pages/Generated';
import { useAgreement } from './hooks/useAgreement';
import type { Screen } from './types/sar';

export function App() {
  const agreement = useAgreement();
  const [screen, setScreen] = useState<Screen>('build');

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [screen]);

  return (
    <div className="min-h-full w-full bg-canvas font-sans">
      <TopNav />
      <main>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={screen}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}>
            
            {screen === 'build' &&
            <Builder
              agreement={agreement}
              onReview={() => setScreen('review')}
              onOpenFull={() => setScreen('generated')} />

            }
            {screen === 'review' &&
            <Review
              state={agreement.state}
              onBack={() => setScreen('build')}
              onGenerate={() => setScreen('generated')} />

            }
            {screen === 'generated' &&
            <Generated state={agreement.state} onEdit={() => setScreen('build')} />
            }
          </motion.div>
        </AnimatePresence>
      </main>
    </div>);

}
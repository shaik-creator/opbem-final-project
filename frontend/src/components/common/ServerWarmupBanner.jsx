import { useEffect, useState } from 'react';
import { Loader2, Server, X } from 'lucide-react';
import api from '../../services/api';

/**
 * Shows a banner when the Render backend is cold-starting.
 * Automatically dismisses once the health endpoint responds,
 * or can be closed manually by the user.
 */
export default function ServerWarmupBanner() {
  const [visible, setVisible] = useState(false);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    let dismissed = false;

    async function checkHealth() {
      setChecking(true);
      const start = Date.now();
      try {
        await api.get('/api/health', { timeout: 5000 });
        // Responded quickly — no banner needed
      } catch {
        // Took too long or failed — show warmup banner if slow
        if (Date.now() - start >= 4500 && !dismissed) {
          setVisible(true);
          pollUntilReady();
        }
      } finally {
        setChecking(false);
      }
    }

    async function pollUntilReady() {
      // Poll every 5s until backend responds
      for (let i = 0; i < 12; i++) {
        await new Promise((r) => setTimeout(r, 5000));
        try {
          await api.get('/api/health', { timeout: 8000 });
          if (!dismissed) setVisible(false);
          return;
        } catch {
          // still starting...
        }
      }
    }

    checkHealth();

    return () => {
      dismissed = true;
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="relative z-50 flex flex-wrap items-center gap-3 bg-[#0f1f3d] px-4 py-2.5 text-sm text-white sm:flex-nowrap">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10">
        <Server className="h-4 w-4 text-[#5ee6bb]" />
      </span>
      <div className="min-w-0 flex-1 break-words">
        <span className="font-semibold text-white">Backend is starting up</span>
        <span className="ml-2 text-white/65">
          The server is waking from sleep — this can take up to 30 seconds on first load.
        </span>
      </div>
      <Loader2 className="h-4 w-4 shrink-0 animate-spin text-[#5ee6bb]" />
      <button
        type="button"
        className="ml-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-white/60 hover:bg-white/10 hover:text-white"
        onClick={() => setVisible(false)}
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

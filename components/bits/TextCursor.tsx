"use client";

import { useEffect, useMemo, useState } from "react";

const DEFAULT_PHRASES = [
  "What emotion needs space today?",
  "What do you want to let go?",
  "What feels grounded right now?",
];

export function TextCursor({
  phrases = DEFAULT_PHRASES,
  holdMs = 1500,
  typeMs = 40,
  deleteMs = 20,
  className = "font-medium",
}: {
  phrases?: string[];
  holdMs?: number;
  typeMs?: number;
  deleteMs?: number;
  className?: string;
}) {
  const safePhrases = useMemo(() => {
    const cleaned = (phrases || []).map((p) => p.trim()).filter(Boolean);
    return cleaned.length ? cleaned : DEFAULT_PHRASES;
  }, [phrases]);

  const [i, setI] = useState(0);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let mounted = true;
    let dir: 1 | -1 = 1; // 1 typing, -1 deleting
    let idx = 0;
    let t: ReturnType<typeof setTimeout>;

    const loop = () => {
      if (!mounted) return;

      const target = safePhrases[i % safePhrases.length];

      if (dir === 1) {
        setTyped(target.slice(0, idx + 1));
        idx++;

        if (idx >= target.length) {
          dir = -1;
          t = setTimeout(loop, holdMs);
          return;
        }

        t = setTimeout(loop, typeMs);
      } else {
        setTyped(target.slice(0, Math.max(0, idx - 1)));
        idx--;

        if (idx <= 0) {
          dir = 1;
          setI((v) => v + 1);
        }

        t = setTimeout(loop, deleteMs);
      }
    };

    loop();
    return () => {
      mounted = false;
      clearTimeout(t);
    };
  }, [i, safePhrases, holdMs, typeMs, deleteMs]);

  return (
    <span className={className}>
      {typed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

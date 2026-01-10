import { TextCursor } from "../../components/bits/TextCursor";

export function PauseReflect({
  label = "Pause & Reflect",
  phrases = [],
}: {
  label?: string;
  phrases?: string[];
}) {
  return (
    <section className="relative z-10 pointer-events-auto">
      <div className="mx-auto max-w-3xl px-4 text-center py-16">
        <p className="text-sm uppercase tracking-wide opacity-60">{label}</p>

        <p className="mt-3 text-2xl">
          <TextCursor phrases={phrases} />
        </p>
      </div>
    </section>
  );
}

import { TextCursor } from "../../components/bits/TextCursor";
// export function PauseReflect(){
// return (
// <section className="mx-auto max-w-4xl px-4 py-2 text-center">
// <p className="text-sm uppercase tracking-wide opacity-60">Pause & Reflect</p>
// <p className="mt-2 text-2xl"><TextCursor/></p>
// </section>
// );
// }
export function PauseReflect() {
  return (
    <section className="relative z-10">
      {/* CONTENT RAIL */}
      <div className="mx-auto max-w-3xl px-4 text-center py-16">
        <p className="text-sm uppercase tracking-wide opacity-60">
          Pause & Reflect
        </p>
        <p className="mt-3 text-2xl ">
          <TextCursor />
        </p>
      </div>
    </section>
  );
}

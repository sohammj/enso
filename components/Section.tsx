export function Section({ id, title, children, subtitle }: { id?: string; title?: string; subtitle?: string; children: React.ReactNode }) {
return (
<section id={id} className="section">
<div className="container">
{title && <h2 className="h2">{title}</h2>}
{subtitle && <p className="p mt-2">{subtitle}</p>}
<div className="mt-8 grid gap-6">{children}</div>
</div>
</section>
)
}

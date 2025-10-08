import Link from 'next/link'

export function Card({ title, body, cta, href }: { title: string; body: string; cta?: string; href?: string }) {
const Wrapper = href ? (props: any) => <Link href={href} {...props} /> : (props: any) => <div {...props} />
return (
<Wrapper className="card">
<h3 className="h3">{title}</h3>
<p className="p mt-2">{body}</p>
{cta && href && <span className="btn mt-4 inline-block">{cta}</span>}
</Wrapper>
)
}

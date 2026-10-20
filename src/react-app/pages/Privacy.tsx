import { CONTACT_EMAIL } from "../config";
import type { Strings } from "../i18n";

export default function Privacy({ t }: { t: Strings }) {
	const p = t.privacy;
	return (
		<article className="container doc">
			<h1>{p.title}</h1>
			<p className="doc-meta">{p.updated}</p>
			<p className="lead">{p.intro}</p>
			{p.sections.map((s) => (
				<section key={s.title}>
					<h2>{s.title}</h2>
					{s.body.map((para) => (
						<p key={para}>{para}</p>
					))}
				</section>
			))}
			<section>
				<h2>{t.support.contactTitle}</h2>
				<p>
					<a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
				</p>
			</section>
		</article>
	);
}

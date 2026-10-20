import { CONTACT_EMAIL } from "../config";
import type { Strings } from "../i18n";

export default function Support({ t }: { t: Strings }) {
	const s = t.support;
	return (
		<article className="container doc">
			<h1>{s.title}</h1>
			<p className="lead">{s.intro}</p>

			<h2>{s.faqTitle}</h2>
			<div className="faq">
				{s.faqs.map((f) => (
					<details key={f.q} className="card">
						<summary>{f.q}</summary>
						<p>{f.a}</p>
					</details>
				))}
			</div>

			<div className="card contact">
				<h2>{s.contactTitle}</h2>
				<p>{s.contactBody}</p>
				<a className="btn btn-secondary" href={`mailto:${CONTACT_EMAIL}`}>
					✉ {CONTACT_EMAIL}
				</a>
			</div>
		</article>
	);
}

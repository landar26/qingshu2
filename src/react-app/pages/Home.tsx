import DownloadButton from "../components/DownloadButton";
import type { Strings } from "../i18n";

// 用 HTML/CSS 画的编辑器样机，内容取自 App 首次打开时的使用指南。
function PhoneMock({ t }: { t: Strings }) {
	const m = t.mock;
	return (
		<div className="phone" aria-hidden="true">
			<div className="phone-screen">
				<div className="phone-notch" />
				<div className="mock-page">
					<div className="mock-icon">📖</div>
					<div className="mock-title">{m.pageTitle}</div>
					<div className="mock-callout">
						<span>👋</span>
						{m.callout}
					</div>
					<div className="mock-h2">{m.heading}</div>
					<div className="mock-todo done">
						<span className="box">✓</span>
						{m.todoDone}
					</div>
					<div className="mock-todo">
						<span className="box" />
						{m.todoOpen}
					</div>
					<div className="mock-toggle">
						<span className="tri">▸</span>
						{m.toggle}
					</div>
					<div className="mock-quote">{m.quote}</div>
					<div className="mock-code">
						<span className="kw">func</span> hello() {"{"}
						<br />
						&nbsp;&nbsp;print(<span className="str">"轻书笔记"</span>)
						<br />
						{"}"}
					</div>
					<div className="mock-slash">
						<span className="caret">{m.slash}</span>
						<div className="mock-menu">
							{m.menu.map((item, i) => (
								<div key={item} className={i === 0 ? "sel" : undefined}>
									{item}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default function Home({ t }: { t: Strings }) {
	return (
		<>
			<section className="hero">
				<div className="container hero-inner">
					<div className="hero-copy">
						<p className="eyebrow">{t.hero.eyebrow}</p>
						<h1>
							{t.hero.title.split("\n").map((line) => (
								<span key={line}>{line}</span>
							))}
						</h1>
						<p className="lead">{t.hero.subtitle}</p>
						<div className="hero-actions">
							<DownloadButton t={t} />
						</div>
						<p className="hero-note">{t.hero.note}</p>
					</div>
					<PhoneMock t={t} />
				</div>
			</section>

			<section className="section">
				<div className="container">
					<h2 className="section-title">{t.features.title}</h2>
					<p className="section-sub">{t.features.subtitle}</p>
					<div className="feature-grid">
						{t.features.items.map((f) => (
							<article key={f.title} className="card feature">
								<div className="feature-icon">{f.icon}</div>
								<h3>{f.title}</h3>
								<p>{f.body}</p>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className="section">
				<div className="container">
					<div className="privacy-band">
						<div>
							<h2>{t.privacyBand.title}</h2>
							<p>{t.privacyBand.body}</p>
						</div>
						<ul>
							{t.privacyBand.points.map((p) => (
								<li key={p}>{p}</li>
							))}
						</ul>
					</div>
				</div>
			</section>

			<section className="section cta">
				<div className="container">
					<img src="/icon.png" alt="" width={88} height={88} className="cta-icon" />
					<h2>{t.cta.title}</h2>
					<p>{t.cta.body}</p>
					<DownloadButton t={t} />
				</div>
			</section>
		</>
	);
}

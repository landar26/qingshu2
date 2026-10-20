import { useEffect, useState, type ReactNode } from "react";
import { CONTACT_EMAIL } from "./config";
import { strings, useLang, type Lang } from "./i18n";
import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import Support from "./pages/Support";
import "./App.css";

type Route = "/" | "/privacy" | "/support";

function routeFrom(pathname: string): Route {
	const path = pathname.replace(/\/+$/, "") || "/";
	return path === "/privacy" || path === "/support" ? path : "/";
}

// 站内链接走 pushState，不整页刷新。
function navigate(to: Route) {
	window.history.pushState(null, "", to);
	window.dispatchEvent(new PopStateEvent("popstate"));
	window.scrollTo(0, 0);
}

function NavLink({ to, current, children }: { to: Route; current: Route; children: ReactNode }) {
	return (
		<a
			href={to}
			className={current === to ? "active" : undefined}
			onClick={(e) => {
				if (e.metaKey || e.ctrlKey || e.shiftKey) return;
				e.preventDefault();
				navigate(to);
			}}
		>
			{children}
		</a>
	);
}

function App() {
	const [lang, setLang] = useLang();
	const [route, setRoute] = useState<Route>(() => routeFrom(window.location.pathname));
	const t = strings[lang];

	useEffect(() => {
		const onPop = () => setRoute(routeFrom(window.location.pathname));
		window.addEventListener("popstate", onPop);
		return () => window.removeEventListener("popstate", onPop);
	}, []);

	const other: Lang = lang === "zh" ? "en" : "zh";

	return (
		<>
			<header className="site-header">
				<div className="container header-inner">
					<NavLink to="/" current={route}>
						<span className="brand">
							<img src="/icon.png" alt="" width={32} height={32} />
							{t.appName}
						</span>
					</NavLink>
					<nav className="site-nav">
						<NavLink to="/support" current={route}>
							{t.nav.support}
						</NavLink>
						<NavLink to="/privacy" current={route}>
							{t.nav.privacy}
						</NavLink>
						<button className="lang-switch" onClick={() => setLang(other)} aria-label="Switch language">
							{other === "en" ? "EN" : "中文"}
						</button>
					</nav>
				</div>
			</header>

			<main>
				{route === "/" && <Home t={t} />}
				{route === "/privacy" && <Privacy t={t} />}
				{route === "/support" && <Support t={t} />}
			</main>

			<footer className="site-footer">
				<div className="container footer-inner">
					<span>
						© {new Date().getFullYear()} {t.appName}. {t.footer.rights}
					</span>
					<span className="footer-links">
						<NavLink to="/support" current={route}>
							{t.nav.support}
						</NavLink>
						<NavLink to="/privacy" current={route}>
							{t.nav.privacy}
						</NavLink>
						<a href={`mailto:${CONTACT_EMAIL}`}>{t.footer.contact}</a>
					</span>
				</div>
			</footer>
		</>
	);
}

export default App;

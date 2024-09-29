import type { FC } from "preact/compat";
import headerStyle from "./Header.module.css";

const Header: FC = () => {
	return (
		<header className={headerStyle.wrapper}>
			<h1 className={headerStyle.title}>js_playground</h1>
			<a href="https://github.com/taga3s/js-playground">Github</a>
		</header>
	);
};

export { Header };

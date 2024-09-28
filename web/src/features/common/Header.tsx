import type { FC } from "preact/compat";
import headerStyle from "./Header.module.css";
import { FaGithub } from "react-icons/fa";

const Header: FC = () => {
	return (
		<header className={headerStyle.wrapper}>
			<h1 className={headerStyle.title}>js_playground</h1>
			<a href="https://github.com/taga3s/js-playground">
				<FaGithub color="black" size={32} />
			</a>
		</header>
	);
};

export { Header };

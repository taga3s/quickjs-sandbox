import type { FC } from "preact/compat";
import headerStyle from "./Header.module.css";
import { GitHubIcon } from "./icons/Github";

const Header: FC = () => {
	return (
		<header className={headerStyle.wrapper}>
			<h1 className={headerStyle.title}>js-playground</h1>
			<a
				className={headerStyle.githubIcon}
				href="https://github.com/taga3s/js-playground"
			>
				<GitHubIcon />
			</a>
		</header>
	);
};

export { Header };

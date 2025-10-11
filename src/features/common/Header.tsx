import type { FC } from "preact/compat";
import headerStyle from "./Header.module.css";
import { GitHub } from "./icons/GitHub";

const Header: FC = () => {
	return (
		<header className={headerStyle.wrapper}>
			<h1 className={headerStyle.title}>quickjs-sandbox</h1>
			<a
				className={headerStyle.githubIcon}
				href="https://github.com/taga3s/quickjs-sandbox"
			>
				<GitHub />
			</a>
		</header>
	);
};

export { Header };

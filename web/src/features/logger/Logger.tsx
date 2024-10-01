import { type FC } from "preact/compat";
import loggerStyle from "./Logger.module.css";

type Props = {
	logger: string[];
};

const Logger: FC<Props> = ({ logger }) => {
	const loggerRef = (node: HTMLDivElement | null) => {
		if (node) {
			node.scrollTop = node.scrollHeight;
		}
	};

	return (
		<div className={loggerStyle.container}>
			<span className={loggerStyle.title}>Logger</span>
			<div className={loggerStyle.inner} ref={loggerRef}>
				{logger.map((message, index) => (
					<span key={index} className={loggerStyle.message}>
						{message}
					</span>
				))}
			</div>
		</div>
	);
};

export { Logger };

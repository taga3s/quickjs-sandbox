import type { FC } from "preact/compat";
import loggerStyle from "./Logger.module.css";
import type { TLogger } from "../../app";

type Props = {
	loggerMessages: TLogger[];
};

const Logger: FC<Props> = ({ loggerMessages }) => {
	const loggerRef = (node: HTMLDivElement | null) => {
		if (node) {
			node.scrollTop = node.scrollHeight;
		}
	};

	return (
		<div className={loggerStyle.container}>
			<span className={loggerStyle.title}>▶︎ LOGGER</span>
			<div className={loggerStyle.inner} ref={loggerRef}>
				{loggerMessages.map((message, index) => (
					<div
						key={`${message.timestamp.toLocaleDateString()}${index}`}
						className={loggerStyle.message}
					>
						<span>{message.text}</span>
						<span>{message.timestamp.toLocaleTimeString()}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export { Logger };

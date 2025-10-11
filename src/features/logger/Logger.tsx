import type { FC } from "preact/compat";
import loggerStyle from "./Logger.module.css";
import type { TLog } from "../../app";

type Props = {
	logs: TLog[];
};

const Logger: FC<Props> = ({ logs }) => {
	const loggerRef = (node: HTMLDivElement | null) => {
		if (node) {
			node.scrollTop = node.scrollHeight;
		}
	};

	return (
		<div className={loggerStyle.container}>
			<span className={loggerStyle.title}>▶︎ LOGGER</span>
			<div className={loggerStyle.inner} ref={loggerRef}>
				{logs.map((msg, index) => (
					<div
						key={`${msg.timestamp.toLocaleDateString()}${index}`}
						className={loggerStyle.message}
					>
						<span>{msg.text}</span>
						<span>{msg.timestamp.toLocaleTimeString()}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export { Logger };

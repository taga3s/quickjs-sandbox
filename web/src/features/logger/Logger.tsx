import { FC } from "preact/compat";
import loggerStyle from "./Logger.module.css";

type Props = {
	logger: string[];
};

const Logger: FC<Props> = ({ logger }) => {
	return (
		<div className={loggerStyle.container}>
			<span className={loggerStyle.title}>Logger</span>
			<div className={loggerStyle.inner}>
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

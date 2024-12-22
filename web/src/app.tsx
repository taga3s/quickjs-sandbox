import AppLayout from "./app.module.css";

import { Header } from "./features/common/Header";
import { Editor } from "./features/editor/Editor";
import { Logger } from "./features/logger/Logger";
import { useState } from "preact/hooks";

export type TLoggerMessage = {
	text: string;
	timestamp: Date;
};

export function App() {
	const [loggerMessages, setLoggerMessages] = useState<TLoggerMessage[]>([]);

	const handleLoggerMessages = (texts: string[]) => {
		const newMessages = texts.map((text) => ({
			text: text,
			timestamp: new Date(),
		}));
		setLoggerMessages((prev) => [...prev, ...newMessages]);
	};

	return (
		<>
			<Header />
			<div className={AppLayout.container}>
				<div class={AppLayout.editor}>
					<Editor handleLoggerMessages={handleLoggerMessages} />
				</div>
				<Logger loggerMessages={loggerMessages} />
			</div>
		</>
	);
}

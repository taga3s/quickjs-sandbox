import AppLayout from "./app.module.css";

import { Header } from "./features/common/Header";
import { Editor } from "./features/editor/Editor";
import { Logger } from "./features/logger/Logger";
import { useState } from "preact/hooks";

export type TLog = {
	text: string;
	timestamp: Date;
};

export function App() {
	const [logs, setLogs] = useState<TLog[]>([]);

	const handleAddLoggerMessages = (logs: string[]) => {
		const newLogs = logs.map((text) => ({
			text: text,
			timestamp: new Date(),
		}));
		setLogs((prev) => [...prev, ...newLogs]);
	};

	return (
		<>
			<Header />
			<div className={AppLayout.container}>
				<div class={AppLayout.editor}>
					<Editor handleAddLoggerMessages={handleAddLoggerMessages} />
				</div>
				<Logger logs={logs} />
			</div>
		</>
	);
}

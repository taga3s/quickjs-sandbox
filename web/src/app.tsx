import AppLayout from "./styles/app.module.css";

import { Header } from "./features/common/Header";
import { Editor } from "./features/editor/Editor";
import { Logger } from "./features/logger/Logger";
import { useState } from "preact/hooks";

export function App() {
	const [logger, setLogger] = useState<string[]>([]);

	const handleLogger = (messages: string[]) => {
		setLogger((prev) => [...prev, ...messages]);
	};

	return (
		<>
			<Header />
			<div className={AppLayout.container}>
				<div class={AppLayout.editor}>
					<Editor handleLogger={handleLogger} />
				</div>
				<Logger logger={logger} />
			</div>
		</>
	);
}

import { useState } from "preact/hooks";
import editorStyle from "./Editor.module.css";
import { useJSEditor } from "./hooks/useEditor";
import { useRunCode } from "./hooks/useRunCode";
import type { FC } from "preact/compat";

//TODO: use indexedDB or localStorage to store and pick up the code
const INITIAL_CODE = `// let's try some code
const add = (a, b) => a + b;
const result = add(1, 2);
console.log(result);
`;

type Props = {
	handleLoggerMessages: (messages: string[]) => void;
};

const Editor: FC<Props> = ({ handleLoggerMessages }) => {
	const [code, setCode] = useState<string>(INITIAL_CODE);
	const { editor } = useJSEditor({ code, setCode });
	const { runJS } = useRunCode();

	const handleClick = async () => {
		const texts = await runJS({ code });
		handleLoggerMessages(texts);
	};

	return (
		<div className={editorStyle.container}>
			<div class={editorStyle.buttonGroup}>
				<button
					type="button"
					className={editorStyle.runButton}
					onClick={handleClick}
				>
					Run Code
				</button>
			</div>
			<div ref={editor} />
		</div>
	);
};

export { Editor };

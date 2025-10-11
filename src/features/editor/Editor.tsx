import { useState } from "preact/hooks";
import editorStyle from "./Editor.module.css";
import { useJSEditor } from "./hooks/useEditor";
import { useRunCode } from "./hooks/useRunCode";
import type { FC } from "preact/compat";

const EXAMPLE_CODE =
	localStorage.getItem("code") ??
	`// let's try some code here
const add = (a, b) => a + b;
const result = add(1, 2);

// output the result
console.log(result);
`;

type Props = {
	handleAddLoggerMessages: (messages: string[]) => void;
};

const Editor: FC<Props> = ({ handleAddLoggerMessages }) => {
	const [code, setCode] = useState<string>(EXAMPLE_CODE);
	const { editor } = useJSEditor({ code, setCode });
	const { runJS } = useRunCode();

	const handleClick = async () => {
		const result = await runJS({ code });
		handleAddLoggerMessages(result);
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

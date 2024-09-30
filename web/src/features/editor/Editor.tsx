import { useState } from "preact/hooks";
import editorStyle from "./styles/editor.module.css";
import { useJSEditor } from "./hooks/useJSEditor";
import { useRunCode } from "./hooks/useRunCode";
import { FC } from "preact/compat";

type Props = {
	handleLogger: (messages: string[]) => void;
};

const Editor: FC<Props> = ({ handleLogger }) => {
	const [code, setCode] = useState<string>("");
	const { editor } = useJSEditor({ code, setCode });
	const { runJS } = useRunCode();

	const handleClick = async () => {
		const evaluated = await runJS({ code });
		handleLogger(evaluated);
	};

	return (
		<div className={editorStyle.container}>
			<div class={editorStyle.buttonGroup}>
				<button className={editorStyle.runButton} onClick={handleClick}>
					Run Code
				</button>
			</div>
			<div ref={editor} />
		</div>
	);
};

export { Editor };

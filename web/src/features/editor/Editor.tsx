import { useState } from "preact/hooks";
import editorStyle from "./styles/Editor.module.css";
import { useJSEditor } from "./hooks/useJSEditor";

const Editor = () => {
	const [code, setCode] = useState<string>("");
	const { editor } = useJSEditor({ code, setCode });

	const handleClick = async () => {};

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

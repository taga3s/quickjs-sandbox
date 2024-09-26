import { useState } from "preact/hooks";
import editorStyle from "./styles/Editor.module.css";
import { useJSEditor } from "./hooks/useJSEditor";

const Editor = () => {
	const [doc, setDoc] = useState<string>("");
	const { editor } = useJSEditor({ doc, setDoc });

	return (
		<div className={editorStyle.container}>
			<div ref={editor} />
		</div>
	);
};

export { Editor };

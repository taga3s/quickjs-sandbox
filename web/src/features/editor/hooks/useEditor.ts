import {
	defaultKeymap,
	history,
	historyKeymap,
	indentWithTab,
} from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";
import { indentUnit } from "@codemirror/language";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap, type ViewUpdate } from "@codemirror/view";
import { basicSetup } from "codemirror";
import {
	type Dispatch,
	type StateUpdater,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from "preact/hooks";

type UseJSEditorProps = {
	code: string;
	setCode: Dispatch<StateUpdater<string>>;
};

export const useJSEditor = ({ code, setCode }: UseJSEditorProps) => {
	const editor = useRef(null);
	const [container, setContainer] = useState<HTMLDivElement>();
	const [view, setView] = useState<EditorView>();

	const editorStyle = useMemo(() => {
		return EditorView.theme({
			"&": {
				backgroundColor: "#ffffff",
			},
			"&.cm-editor": {
				outline: "none",
			},
			"&.cm-editor .cm-scroller": {
				fontFamily: `'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace, 'Segoe UI Emoji'`,
				"-webkit-font-smoothing": "antialiased",
				letterSpacing: "0.02em",
				fontSize: "15px",
				lineHeight: "1.8",
				color: "#000000",
			},
			".cm-selectionMatch": {
				backgroundColor: "transparent",
			},
			".cm-gutterElement": {
				textAlign: "center !important",
			},
		});
	}, []);

	const updateListener = useMemo(() => {
		return EditorView.updateListener.of((update: ViewUpdate) => {
			if (update.docChanged) {
				setCode(update.state.doc.toString());
			}
		});
	}, [setCode]);

	// wrap extensions
	const extensions = useMemo(() => {
		return [
			basicSetup,
			updateListener,
			editorStyle,
			history(),
			keymap.of(defaultKeymap),
			keymap.of(historyKeymap),
			keymap.of([indentWithTab]),
			indentUnit.of("  "),
			EditorView.lineWrapping,
			EditorState.tabSize.of(4),
			javascript(),
		];
	}, [updateListener, editorStyle]);

	useEffect(() => {
		if (editor.current) {
			setContainer(editor.current);
		}
	}, []);

	useEffect(() => {
		if (!view && container) {
			const state = EditorState.create({
				doc: code,
				extensions,
			});
			const viewCurrent = new EditorView({
				state,
				parent: container,
			});
			setView(viewCurrent);
		}
	}, [view, code, extensions, container]);

	useLayoutEffect(() => {
		if (view) {
			const minNumOfLines = 20;
			const currentNumOfLines = view.state.doc.lines;
			const currentStr = view.state.doc.toString();

			if (currentNumOfLines >= minNumOfLines) {
				return;
			}

			const lines = minNumOfLines - currentNumOfLines;

			const appendLines = "\n".repeat(lines);

			view.dispatch({
				changes: { from: currentStr.length, insert: appendLines },
			});
		}
	}, [view, view?.state.doc]);

	return {
		editor,
	};
};

import { getQuickJS } from "quickjs-emscripten";

export const useRunCode = () => {
	return {
		runJS: async ({ code }: { code: string }): Promise<string> => {
			const QuickJS = await getQuickJS();
			const vm = QuickJS.newContext();

			// const logHandle = vm.newFunction("log", (...args) => {
			// 	const nativeArgs = args.map(vm.dump);
			// 	evaluated += nativeArgs.join(" ") + "\n";
			// });
			// const consoleHandle = vm.newObject();
			// vm.setProp(consoleHandle, "log", logHandle);
			// vm.setProp(vm.global, "console", consoleHandle);
			// consoleHandle.dispose();
			// logHandle.dispose();

			let evaluated = "";

			const result = vm.evalCode(code);
			if (result.error) {
				evaluated = `Execution failed: ${vm.dump(result.error)}`;
				result.error.dispose();
			} else {
				evaluated = vm.dump(result.value);
				result.value.dispose();
			}

			vm.dispose();

			return evaluated;
		},
	};
};

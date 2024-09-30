import { getQuickJS } from "quickjs-emscripten";

export const useRunCode = () => {
	return {
		runJS: async ({ code }: { code: string }): Promise<string[]> => {
			const QuickJS = await getQuickJS();
			const vm = QuickJS.newContext();

			const evaluated = [];

			const logHandle = vm.newFunction("log", (...args) => {
				const nativeArgs = args.map(vm.dump);
				evaluated.push(`[LOG] ${nativeArgs.join(" ")}`);
			});

			const consoleHandle = vm.newObject();

			vm.setProp(consoleHandle, "log", logHandle);
			vm.setProp(vm.global, "console", consoleHandle);

			consoleHandle.dispose();

			logHandle.dispose();

			const result = vm.evalCode(code);
			if (result.error) {
				evaluated.push(`[ERROR] Execution failed: ${vm.dump(result.error)}`);
				result.error.dispose();
			} else {
				result.value.dispose();
			}

			vm.dispose();

			return evaluated;
		},
	};
};

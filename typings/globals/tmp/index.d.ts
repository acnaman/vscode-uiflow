// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/5d6115f046550714a28caa3555f47a1aec114fe5/tmp/tmp.d.ts
declare module "tmp" {

	namespace tmp {
		interface Options extends SimpleOptions {
			mode?: number;
		}

		interface SimpleOptions {
			prefix?: string;
			postfix?: string;
			template?: string;
			dir?: string;
			tries?: number;
			keep?: boolean;
			unsafeCleanup?: boolean;
		}

		interface SynchrounousResult {
			name: string;
			fd: number;
			removeCallback: () => void;
		}

		function file(callback: (err: any, path: string, fd: number, cleanupCallback: () => void) => void): void;
		function file(config: Options, callback?: (err: any, path: string, fd: number, cleanupCallback: () => void) => void): void;

		function fileSync(config?: Options): SynchrounousResult;

		function dir(callback: (err: any, path: string, cleanupCallback: () => void) => void): void;
		function dir(config: Options, callback?: (err: any, path: string, cleanupCallback: () => void) => void): void;

		function dirSync(config?: Options): SynchrounousResult;

		function tmpName(callback: (err: any, path: string) => void): void;
		function tmpName(config: SimpleOptions, callback?: (err: any, path: string) => void): void;

		function tmpNameSync(config?: SimpleOptions): string;

		function setGracefulCleanup(): void;
	}

	export = tmp;
}

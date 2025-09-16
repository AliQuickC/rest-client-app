/// <reference types="vite/client" />

interface ViteRsc {
  loadBootstrapScriptContent(entry: string): Promise<string>;

  loadModule<T = unknown>(entry: string): Promise<T>;
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  loadModule<T = unknown>(bundle: string, entry: string): Promise<T>;
}

interface ImportMeta {
  viteRsc: ViteRsc;
}

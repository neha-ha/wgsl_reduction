const { Parser, loadWasmLanguage } = require("./wasm-loader");

(async () => {
    const wasmPath = "C:\\Users\\nehab\\webgpu\\test\\grammar\\tree-sitter-wgsl.wasm";

    try {
        const WGSL = await loadWasmLanguage(wasmPath);

        const parser = new Parser();
        parser.setLanguage(WGSL);

        console.log("WGSL language loaded and parser configured successfully.");
    } catch (err) {
        console.error("Error loading WGSL language:", err);
    }
})();

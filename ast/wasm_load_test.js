const Parser = require("tree-sitter");
const fs = require("fs");
const path = require("path");

(async () => {
    const wasmPath = path.resolve("C:\\Users\\nehab\\webgpu\\test\\grammar\\tree-sitter-wgsl.wasm");

    try {
        // Read and compile the WASM file manually
        const wasmBuffer = fs.readFileSync(wasmPath);
        const wasmModule = await WebAssembly.compile(wasmBuffer);

        // Create the Tree-Sitter language from the compiled WASM module
        const WGSL = new Parser.Language(wasmModule);

        // Set up the parser
        const parser = new Parser();
        parser.setLanguage(WGSL);

        console.log("Language loaded and parser configured successfully.");
    } catch (error) {
        console.error("Failed to load or configure the parser:", error);
    }
})();
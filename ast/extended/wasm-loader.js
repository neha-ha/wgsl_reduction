const Parser = require("tree-sitter");
const fs = require("fs");

const loadWasmLanguage = async (wasmPath) => {
    // Read the WASM file as a buffer
    const wasmBuffer = fs.readFileSync(wasmPath);

    // Define the required imports for Tree-Sitter
    const imports = {
        env: {
            // Add any necessary imports here if required by the WASM file
        }
    };

    // Compile and instantiate the WASM module with the imports
    const wasmModule = await WebAssembly.compile(wasmBuffer);
    const wasmInstance = await WebAssembly.instantiate(wasmModule, imports);

    // Return the instantiated module to Tree-Sitter
    return new Parser(wasmInstance.exports);
};

module.exports = {
    Parser,
    loadWasmLanguage,
};

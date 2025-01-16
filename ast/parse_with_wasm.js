const Parser = require("tree-sitter"); // Import Tree-Sitter
const fs = require("fs");
const path = require("path");

const loadWasmLanguage = async (wasmPath) => {

    console.log("Parser:", Parser);
    console.log("Parser.Language:", Parser.Language);
    console.log("Parser.Language.load:", Parser.Language ? Parser.Language.load : "undefined");

    console.log("Loading WASM file...");
    const wasmBuffer = fs.readFileSync(wasmPath);
    console.log("WASM file loaded, compiling with Tree-Sitter...");
    console.log(typeof Parser.Language.load);
    const Language = await Parser.Language.load(wasmBuffer);
    console.log("Language loaded successfully!");
    return Language;
};


const initParser = async () => {
    const wasmPath = path.resolve("C:\\Users\\nehab\\webgpu\\test\\grammar\\tree-sitter-wgsl.wasm");
    const WGSL = await loadWasmLanguage(wasmPath); // Load the WGSL language using WASM

    const parser = new Parser();
    parser.setLanguage(WGSL); // Set WGSL as the parser language

    return parser;
};

const main = async () => {
    const parser = await initParser();

    // Example WGSL code snippet to parse
    const code = `
struct data_index_pair {
    index: i32,
    data: u32,
}

@group(0)
@binding(0)
var<storage, read_write> mem: array<u32>;

@group(0)
@binding(1)
var<storage, read_write> uninit_vars: array<i32>;

@group(0)
@binding(2)
var<storage, read_write> index_buf: array<i32>;

@group(0)
@binding(3)
var<storage, read_write> data_buf: array<u32>;

@group(0)
@binding(4)
var<storage, read_write> output_buf: array<data_index_pair>;

var<workgroup> workgroup_buf: array<u32, 256>;

@compute
@workgroup_size(1)
fn main(@builtin(num_workgroups) num_workgroups: vec3<u32>, @builtin(global_invocation_id) global_invocation_id: vec3<u32>, @builtin(local_invocation_id) local_invocation_id: vec3<u32>) {
    var local_data: array<u32, 8>;
    let total_ids = num_workgroups.x * 1u;
    let pattern_index = global_invocation_id.x * 3u;
    var var_0: u32 = 1u;
    var var_3: u32 = 1u;
    var var_4: u32 = 1u;
    var var_7: u32 = 1u;
    var var_1: u32 = 1u;
    var var_2: u32 = 1u;
    var var_5: u32 = 1u;
    var var_6: u32 = 1u;
    var uninit_var_0: i32;
    var uninit_var_1: i32;
    var uninit_var_2: i32;
    var uninit_var_3: i32;
    var uninit_var_4: i32;
    var uninit_var_5: i32;
    var uninit_var_6: i32;
    var uninit_var_7: i32;
    (uninit_vars)[(global_invocation_id.x * 8u) + 0u] = uninit_var_0;
    (uninit_vars)[(global_invocation_id.x * 8u) + 1u] = uninit_var_1;
    (uninit_vars)[(global_invocation_id.x * 8u) + 2u] = uninit_var_2;
    (uninit_vars)[(global_invocation_id.x * 8u) + 3u] = uninit_var_3;
    (uninit_vars)[(global_invocation_id.x * 8u) + 4u] = uninit_var_4;
    (uninit_vars)[(global_invocation_id.x * 8u) + 5u] = uninit_var_5;
    (uninit_vars)[(global_invocation_id.x * 8u) + 6u] = uninit_var_6;
    (uninit_vars)[(global_invocation_id.x * 8u) + 7u] = uninit_var_7;
    if (local_invocation_id.x < 2u) {
    (workgroup_buf)[0u] = 0u;
}
    var_2 = mem[(((global_invocation_id.x + 515u) % total_ids) * 8u) + 16u] + mem[10u];
    for (var i_1: u32 = min(var_7, 10u); i_1 > 0u; i_1 = i_1 - 1u) {
    var_1 = (1u + mem[15u]) + mem[(global_invocation_id.x * 8u) + 22u];
    var_7 = mem[(global_invocation_id.x * 8u) + 20u] + mem[(global_invocation_id.x * 8u) + 19u];
    var_2 = var_7 + mem[1u];
}
    var_1 = var_3 + var_2;
    var_0 = mem[(global_invocation_id.x * 8u) + 20u] + 0u;
    (mem)[(global_invocation_id.x * 8u) + 17u] = var_4 + var_0;
    var var_dummy: u32 = mem[(global_invocation_id.x * 8u) + 19u];
    var dummy_index_var: i32 = index_buf[0u];
    var dummy_data_var: u32 = data_buf[0u];
    var dummy_output_var: u32 = output_buf[0u].data;
}
`;

    // Parse the code and generate the AST
    const tree = parser.parse(code);

    // Function to recursively print the AST
    function printNode(node, depth = 0) {
        const indent = "  ".repeat(depth);
        console.log(`${indent}${node.type}`);

        // Recursively print child nodes
        for (let i = 0; i < node.childCount; i++) {
            printNode(node.child(i), depth + 1);
        }
    }

    // Print the AST
    printNode(tree.rootNode);
};

main().catch((error) => {
    console.error("Error:", error);
});
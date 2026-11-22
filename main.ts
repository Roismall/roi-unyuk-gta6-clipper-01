import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// This program does exactly one thing: it copies VIDEO.json from the
// repository root into the grader's output directory, byte for byte.

const repoRoot = dirname(fileURLToPath(import.meta.url));
const sourceFile = join(repoRoot, "VIDEO.json");

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const targetFile = join(outputDir, "VIDEO.json");

let contents: Buffer;
try {
  contents = readFileSync(sourceFile);
} catch (error) {
  console.error(`could not read ${sourceFile}: ${(error as Error).message}`);
  process.exit(1);
}

try {
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(targetFile, contents);
} catch (error) {
  console.error(`could not write ${targetFile}: ${(error as Error).message}`);
  process.exit(1);
}

console.log(`copied VIDEO.json (${contents.length} bytes) to ${targetFile}`);

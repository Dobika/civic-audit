import { execa } from "execa";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PARSER_SCRIPT = path.resolve(__dirname, "../../python/parser.py");
const PYTHON_BIN = process.env.PYTHON_PATH ?? "python3";

export interface ProcessResult {
  inputPath: string;
  outputPath: string;
}

export async function processPdf(
  inputPath: string,
  outputDir: string
): Promise<ProcessResult> {
  const absoluteInput = path.resolve(inputPath);

  if (!fs.existsSync(absoluteInput)) {
    throw new Error(`Input file not found: ${absoluteInput}`);
  }

  const baseName = path.basename(absoluteInput, ".pdf");
  const outputPath = path.resolve(outputDir, `${baseName}.md`);

  fs.mkdirSync(outputDir, { recursive: true });

  const result = await execa(PYTHON_BIN, [PARSER_SCRIPT, absoluteInput, outputPath], {
    all: true,
  });

  if (result.exitCode !== 0) {
    throw new Error(`Parser failed:\n${result.all}`);
  }

  return { inputPath: absoluteInput, outputPath };
}

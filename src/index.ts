#!/usr/bin/env node
import "dotenv/config";
import { Command } from "commander";
import path from "node:path";
import { processPdf } from "./utils/pdf-processor.js";

const RAW_DIR = process.env.DATA_RAW_DIR ?? "data/raw";
const PROCESSED_DIR = process.env.DATA_PROCESSED_DIR ?? "data/processed";

const program = new Command();

program
  .name("civic-audit")
  .description("AI-powered tool to analyze public procurement and EU funding data")
  .version("0.1.0");

program
  .command("process <filename>")
  .description("Convert a PDF in data/raw to Markdown in data/processed")
  .option("-o, --output-dir <dir>", "Override the output directory", PROCESSED_DIR)
  .action(async (filename: string, options: { outputDir: string }) => {
    const inputPath = path.join(RAW_DIR, filename);

    console.log(`Processing: ${inputPath}`);

    try {
      const result = await processPdf(inputPath, options.outputDir);
      console.log(`Done. Markdown saved to: ${result.outputPath}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`Error: ${message}`);
      process.exit(1);
    }
  });

program.parse();

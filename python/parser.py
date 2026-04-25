#!/usr/bin/env python3
"""
Convert a PDF file to Markdown using Docling and write the result to disk.

Usage:
    python parser.py <input_pdf_path> <output_md_path>
"""

import sys
from pathlib import Path


def convert_pdf_to_markdown(input_path: Path, output_path: Path) -> None:
    try:
        from docling.document_converter import DocumentConverter
    except ImportError:
        print("ERROR: docling is not installed. Run: pip install docling", file=sys.stderr)
        sys.exit(1)

    if not input_path.exists():
        print(f"ERROR: Input file not found: {input_path}", file=sys.stderr)
        sys.exit(1)

    converter = DocumentConverter()
    result = converter.convert(str(input_path))
    markdown = result.document.export_to_markdown()

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(markdown, encoding="utf-8")

    print(f"OK: {output_path}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print(f"Usage: {sys.argv[0]} <input_pdf> <output_md>", file=sys.stderr)
        sys.exit(1)

    convert_pdf_to_markdown(Path(sys.argv[1]), Path(sys.argv[2]))

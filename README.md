# 🏛️ CivicAudit

**CivicAudit** is an AI-powered, open-source investigative engine designed to bring transparency to public procurement and EU funding. It helps citizens and journalists uncover structural anomalies, price discrepancies, and hidden networks.

## 🚀 Key Features

- **Automated Collection:** Scraping public procurement portals (EKR, EU sources).
- **Deep Document Analysis:** Using IBM's `Docling` and `Marker` to convert complex PDFs/Tables into LLM-ready Markdown.
- **Agentic RAG:** A specialized Claude MCP server to query local document stores for corruption patterns.
- **Network Mapping:** Identifying connections between decision-makers and recurring winners.

## 🛠️ Tech Stack

- **Runtime:** Node.js / TypeScript
- **OCR/Parsing:** Python (Docling)
- **AI Logic:** Claude 3.5 Sonnet via MCP
- **Database:** SQLite & ChromaDB (Local vector storage)

## ⚖️ Legal & Privacy

This tool is designed to process **publicly available data only**. CivicAudit does not store or share sensitive personal information. Users are responsible for complying with local data protection laws (GDPR).

## 🤝 Contribution

This is an early-stage, open-source project. Whether you're a developer, an investigative journalist, or a data analyst, **feel free to help!** If you have ideas, find a bug, or want to add a new scraper/analyzer, just open an issue or submit a Pull Request. Let's build a more transparent future together.

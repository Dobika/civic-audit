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

We are a group of developers fighting for transparency. If you want to help building the automated audit of the future, check out our [Contribution Guide](CONTRIBUTING.md).

# Module 4 — Claude Code CLI & Model Context Protocol (MCP)

Claude Code brings Anthropic's frontier reasoning directly into the terminal environment. Paired with Model Context Protocol (MCP), Claude becomes an active software engineer capable of inspecting files, creating commits, running tests, and interfacing with external databases.

### Lesson 4.1 — Setting Up Claude Code & CLAUDE.md Memory

The `CLAUDE.md` file at the root of your project acts as the agent's long-term operational memory:
- **Build Commands**: The exact commands needed to verify code (`npm run build`, `pytest`, `cargo check`).
- **Coding Style & Invariants**: Framework versions, typing rules, and security guidelines.
- **Forbidden Actions**: Rules against committing secrets or mutating production databases without approval.

### Lesson 4.2 — Model Context Protocol (MCP) as the Universal Adapter

MCP standardizes how AI agents communicate with tools:
- Database MCP (PostgreSQL, SQLite, Supabase)
- GitHub & GitLab MCP (pull requests, commit history, issues)
- Chrome DevTools MCP (DOM inspection, accessibility tree, performance audits)
- File System & Cloud MCP (S3, Google Drive, Vercel API)

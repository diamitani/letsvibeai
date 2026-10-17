#!/usr/bin/env python3
"""
LetsVibeAI — Autonomous Video ROSTR & YouTube Tutorial Synchronization Engine
Maintains:
- Curated YouTube Tutorial ROSTR across vibe coding sub-disciplines
- Daily Vibe Brief Video synchronizations
- Typed TypeScript manifest in src/data/videoRostrData.ts

Usage examples:
  # Add a new YouTube tutorial:
  python3 scripts/update_video_rostr.py --add \\
      --url "https://youtu.be/dQw4w9WgXcQ" \\
      --title "Cursor Rules & Composer Workflow" \\
      --creator "Cursor Community" \\
      --category "Harness Setup" \\
      --duration "14:20" \\
      --level "Intermediate" \\
      --summary "Learn how to configure .cursorrules for zero-regression TypeScript." \\
      --takeaways "Strict typing,Targeted @symbols,Scoping rules" \\
      --tags "Cursor,Composer,TypeScript"

  # Sync a daily brief video:
  python3 scripts/update_video_rostr.py --sync-daily \\
      --date "October 9, 2026" \\
      --title "Agent Memory & MCP Mesh Standards" \\
      --mp4 "/videos/daily/ai-daily-brief-2026-10-09.mp4" \\
      --duration "3:50" \\
      --highlights "Context engineering,MCP servers,Verification gates"

  # List all items in the ROSTR:
  python3 scripts/update_video_rostr.py --list
"""

import os
import sys
import re
import json
import argparse
from pathlib import Path

WORKSPACE_DIR = Path(__file__).resolve().parent.parent
DATA_FILE = WORKSPACE_DIR / "src" / "data" / "videoRostrData.ts"

def extract_youtube_id(url_or_id: str) -> str:
    """Extracts a clean 11-character YouTube video ID from various URL formats."""
    url_or_id = url_or_id.strip()
    if len(url_or_id) == 11 and not ("/" in url_or_id or "?" in url_or_id):
        return url_or_id
    
    match = re.search(r"(?:v=|\/|youtu\.be\/|embed\/)([0-9A-Za-z_-]{11})", url_or_id)
    if match:
        return match.group(1)
    return url_or_id

def add_tutorial(args):
    yt_id = extract_youtube_id(args.url)
    takeaways = [t.strip() for t in args.takeaways.split(",") if t.strip()] if args.takeaways else [
        "Core architectural takeaway",
        "Verification checklist"
    ]
    tags = [t.strip() for t in args.tags.split(",") if t.strip()] if args.tags else ["Tutorial", "VibeCoding"]

    new_item = {
        "id": f"yt-{int(os.times().elapsed * 1000) % 10000:04d}",
        "title": args.title,
        "creator": args.creator,
        "creatorUrl": args.creator_url or "https://youtube.com",
        "youtubeId": yt_id,
        "category": args.category,
        "duration": args.duration or "15:00",
        "level": args.level or "All Levels",
        "summary": args.summary or "Curated tutorial on AI engineering and vibe coding.",
        "takeaways": takeaways,
        "tags": tags,
        "featured": bool(args.featured),
        "publishedDate": args.published_date or "2026"
    }

    if not DATA_FILE.exists():
        sys.exit(f"[!] Error: {DATA_FILE} not found.")

    content = DATA_FILE.read_text(encoding="utf-8")
    
    # Locate YOUTUBE_ROSTR_TUTORIALS array
    marker = "export const YOUTUBE_ROSTR_TUTORIALS: YouTubeRostrItem[] = ["
    if marker not in content:
        sys.exit("[!] Error: YOUTUBE_ROSTR_TUTORIALS marker not found in data file.")

    parts = content.split(marker, 1)
    formatted_entry = f"\n  {json.dumps(new_item, indent=2).replace(chr(10), chr(10) + '  ')},"

    updated_content = parts[0] + marker + formatted_entry + parts[1]
    DATA_FILE.write_text(updated_content, encoding="utf-8")
    print(f"[✓] Added tutorial '{args.title}' (ID: {yt_id}) to {DATA_FILE}")

def sync_daily_brief(args):
    highlights = [h.strip() for h in args.highlights.split(",") if h.strip()] if args.highlights else [
        "Daily model capability update",
        "Agent execution pattern"
    ]
    
    daily_item = {
        "id": f"daily-{args.date.lower().replace(' ', '-').replace(',', '')}",
        "date": args.date,
        "title": args.title,
        "videoUrl": args.mp4,
        "youtubeId": extract_youtube_id(args.youtube_id) if args.youtube_id else "b_7h2uP5-lI",
        "duration": args.duration or "3:30",
        "summary": args.summary or f"Daily Vibe Brief for {args.date}.",
        "highlights": highlights,
        "status": "live",
        "keyTool": args.tool or "Claude Code & Antigravity"
    }

    content = DATA_FILE.read_text(encoding="utf-8")
    marker = "export const DAILY_BRIEF_VIDEOS: DailyBriefVideo[] = ["
    if marker not in content:
        sys.exit("[!] Error: DAILY_BRIEF_VIDEOS marker not found in data file.")

    parts = content.split(marker, 1)
    formatted_entry = f"\n  {json.dumps(daily_item, indent=2).replace(chr(10), chr(10) + '  ')},"

    updated_content = parts[0] + marker + formatted_entry + parts[1]
    DATA_FILE.write_text(updated_content, encoding="utf-8")
    print(f"[✓] Synced Daily Brief '{args.title}' ({args.date}) to {DATA_FILE}")

def list_rostr():
    if not DATA_FILE.exists():
        sys.exit(f"[!] Error: {DATA_FILE} not found.")
    content = DATA_FILE.read_text(encoding="utf-8")
    matches = re.findall(r"title:\s*['\"]([^'\"]+)['\"],\s*creator:\s*['\"]([^'\"]+)['\"]", content)
    print(f"=== Current YouTube Tutorial ROSTR ({len(matches)} items) ===")
    for i, (title, creator) in enumerate(matches, 1):
        print(f"{i:2d}. {title} — by {creator}")

def main():
    parser = argparse.ArgumentParser(description="LetsVibeAI ROSTR Video Synchronization Engine")
    parser.add_argument("--add", action="store_true", help="Add a new YouTube tutorial")
    parser.add_argument("--sync-daily", action="store_true", help="Sync a daily video brief")
    parser.add_argument("--list", action="store_true", help="List current ROSTR items")

    # Tutorial options
    parser.add_argument("--url", help="YouTube video URL or ID")
    parser.add_argument("--title", help="Tutorial title")
    parser.add_argument("--creator", help="Creator or channel name")
    parser.add_argument("--creator-url", help="Creator channel URL")
    parser.add_argument("--category", default="Fullstack Vibe Coding", help="Tutorial category")
    parser.add_argument("--duration", help="Video duration (e.g. 14:20)")
    parser.add_argument("--level", default="All Levels", help="Difficulty level")
    parser.add_argument("--summary", help="Short summary")
    parser.add_argument("--takeaways", help="Comma-separated takeaways")
    parser.add_argument("--tags", help="Comma-separated tags")
    parser.add_argument("--featured", action="store_true", help="Mark as featured")
    parser.add_argument("--published-date", help="Publication date/year")

    # Daily brief options
    parser.add_argument("--date", help="Date string (e.g. October 9, 2026)")
    parser.add_argument("--mp4", help="Path to local or hosted mp4")
    parser.add_argument("--youtube-id", help="Optional YouTube ID for daily brief")
    parser.add_argument("--highlights", help="Comma-separated highlights")
    parser.add_argument("--tool", help="Key tool featured")

    args = parser.parse_args()

    if args.add:
        if not (args.url and args.title and args.creator):
            sys.exit("[!] Error: --url, --title, and --creator are required for --add.")
        add_tutorial(args)
    elif args.sync_daily:
        if not (args.date and args.title and args.mp4):
            sys.exit("[!] Error: --date, --title, and --mp4 are required for --sync-daily.")
        sync_daily_brief(args)
    elif args.list:
        list_rostr()
    else:
        parser.print_help()

if __name__ == "__main__":
    main()

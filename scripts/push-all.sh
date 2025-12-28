#!/usr/bin/env bash
set -euo pipefail

MAIN_BRANCH="${MAIN_BRANCH:-main}"
WIKI_BRANCH="${WIKI_BRANCH:-master}"

repo_root="$(git rev-parse --show-toplevel)"

git -C "$repo_root" push origin "$MAIN_BRANCH" --tags

if [ -d "$repo_root/wiki/.git" ]; then
  wiki_dir="$repo_root/wiki"
elif [ -d "$repo_root/../Mindwtr.wiki/.git" ]; then
  wiki_dir="$repo_root/../Mindwtr.wiki"
else
  echo "Wiki repo not found. Expected 'wiki/.git' or '../Mindwtr.wiki/.git'." >&2
  exit 1
fi

git -C "$wiki_dir" push origin "$WIKI_BRANCH"

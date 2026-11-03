---
name: start-feature-branch
description: Start feature implementation in this repository by creating and switching to a new Git branch from main before editing files. Use when beginning a feature described in the current chat or when the user asks to prepare a feature branch; branch names must describe the feature and must never contain "codex".
---

# Start Feature Branch

Before making any file edits for the requested feature, create and switch to a dedicated branch whose starting commit is the local `main` branch.

## Choose the branch name

- Infer the feature's clearest user-visible purpose from the current request and relevant chat context.
- Use the form `feature/<short-kebab-case-purpose>`.
- Keep the slug concise and specific, using meaningful product or implementation terms from the feature.
- Never include `codex` anywhere in the branch name, regardless of the current branch naming convention or tool defaults.
- If the preferred name already exists, choose a short meaningful variant or numeric suffix rather than reusing an unrelated branch.

## Create the branch before editing

1. Confirm this is a Git worktree and that a local `main` branch exists.
2. Run `git status --short --branch` before changing branches.
3. If the worktree contains pre-existing uncommitted changes, do not stash, reset, discard, or overwrite them. Explain that they prevent a clean pre-edit branch setup and ask the user how those changes should be handled.
4. Create and switch directly from local `main` with `git switch -c <branch-name> main`.
5. Verify all of the following before editing:
   - `git branch --show-current` returns the new branch.
   - The branch name does not contain `codex`, case-insensitively.
   - `git rev-parse HEAD` equals `git rev-parse main` immediately after branch creation.
6. Briefly tell the user which branch was created, then continue implementing the feature from the chat.

Do not fetch, pull, merge, rebase, push, or delete branches unless the user separately requests it. If branch creation or verification fails, stop before editing and report the exact issue.

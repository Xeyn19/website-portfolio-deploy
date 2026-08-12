---
name: draft-git-change-descriptions
description: Draft a commit message, pull request title, and pull request description together in one response from the current Git branch's actual committed or pending changes. Use when Codex is asked for copy-ready Git/GitHub text without committing, pushing, or opening a pull request.
---

# Draft Git Change Descriptions

## Overview

Inspect local Git evidence and always return a commit message, pull request title, and pull request description together in one response. Pending staged, unstaged, and untracked changes may be used to preview the eventual pull request. Keep every operation read-only: never stage, commit, amend, push, create a branch, or open or edit a pull request.

## Workflow

1. Confirm the working directory is inside a Git repository with `git rev-parse --show-toplevel`.
2. Inspect `git status --short --branch` and determine the current branch with `git branch --show-current`.
3. Resolve the PR base branch using this precedence:
   - Use a base branch explicitly supplied by the user.
   - Otherwise read the remote default from `git symbolic-ref --quiet --short refs/remotes/origin/HEAD` and keep the resulting ref available for comparisons.
   - Otherwise use an existing local or `origin/` ref for `main`, then `master`.
   - If none exists, ask the user for the base branch instead of guessing.
4. Gather commit evidence and PR evidence using the rules below.
5. Describe the intent and outcome of the changes, not merely the filenames.
6. Return all three requested drafts in the exact output structure below. Do not perform any Git or GitHub write.

## Gather Commit Evidence

- Check for staged changes with `git diff --cached --quiet`.
- If staged changes exist, base the commit draft only on:
  - `git diff --cached --stat`
  - `git diff --cached --name-status`
  - `git diff --cached`
- If nothing is staged, base the commit draft on pending working-tree changes:
  - `git diff --stat`
  - `git diff --name-status`
  - `git diff`
  - `git ls-files --others --exclude-standard`
- For relevant untracked text files, inspect their contents before describing them. Do not reproduce credentials, tokens, private keys, or other secrets in the output.
- When staged and unstaged changes coexist, exclude unstaged changes from the commit draft and briefly note that they were excluded.
- When no eligible changes exist, say that there is no pending commit to describe and omit the commit subject and body.

Write the commit subject in lowercase imperative form to match this repository's history. Keep it concise and omit a trailing period. Add a short body only when it explains motivation, important behavior, or related changes that the subject cannot capture. If the evidence contains unrelated concerns, recommend splitting them before presenting the best available draft.

## Gather Pull Request Evidence

- First inspect committed changes between the resolved base ref and `HEAD`:
  - `git log --oneline --no-merges <base>..HEAD`
  - `git diff --stat <base>...HEAD`
  - `git diff --name-status <base>...HEAD`
  - `git diff <base>...HEAD`
- Also inspect staged, unstaged, and relevant untracked changes using the commit-evidence commands above.
- Draft the PR title and description from the combined committed and pending change set so the user receives a preview of the eventual pull request before committing.
- Avoid double-counting a file or behavior when committed and pending evidence overlap.
- Do not fetch or update remote refs unless the user explicitly asks. If local refs may be stale, describe the limitation.
- If there is no committed branch delta but pending changes exist, still produce the PR title and description from those pending changes.
- Only omit all drafts when there are no committed, staged, unstaged, or untracked changes to describe.

Make the PR title concise and outcome-focused. Structure the PR description with `## Summary`, `## Changes`, and `## Testing`. Use short bullets under `Changes`. Never claim a command, test, lint check, build, or manual verification ran merely because test files or configuration changed. Use the user's confirmation or commands observed in the current session; otherwise write `Not run.` under `Testing`.

## Output Format

Return only the applicable sections, with each draft in a fenced text block so it can be copied directly.

### Commit Message

```text
<lowercase imperative subject>
```

### PR Title

```text
<concise outcome-focused title>
```

### PR Description

```text
## Summary

<one short paragraph>

## Changes

- <important change>

## Testing

Not run.
```

After the drafts, add only material caveats such as an uncertain base ref, pending changes included as a PR preview, or a recommendation to split unrelated changes.

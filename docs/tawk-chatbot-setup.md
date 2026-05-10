# Tawk Portfolio Chatbot Setup

This project now includes the site-side Tawk integration plus a local source of truth for the chatbot content.

## Source Of Truth

Use these exports from [`src/data/tawkChatbotContent.js`](/E:/my-codes/website-portfolio-deploy-main/src/data/tawkChatbotContent.js):

- `tawkBasePrompt`
- `tawkKnowledgeText`
- `tawkFaqEntries`
- `tawkShortcutDefinitions`
- `getTawkRouteContext`

Use this copy-ready text file for the AI Assist Text data source:

- [`docs/tawk-chatbot-knowledge.txt`](/E:/my-codes/website-portfolio-deploy-main/docs/tawk-chatbot-knowledge.txt)

## What The App Already Does

- Loads the Tawk widget only on public pages.
- Hides the widget on `/login`.
- Hides the widget on `/projects` when the admin view is active.
- Sends route context into Tawk with:
  - `page-path`
  - `page-type`
  - `page-label`
  - `portfolio-section`

## Tawk Dashboard Setup

1. Open the correct Tawk property.
2. Enable `AI Assist` for the website widget.
3. In `Automation -> Data Sources`, add a `Text` source using the contents of [`docs/tawk-chatbot-knowledge.txt`](/E:/my-codes/website-portfolio-deploy-main/docs/tawk-chatbot-knowledge.txt).
4. Add FAQ entries using `tawkFaqEntries` from [`src/data/tawkChatbotContent.js`](/E:/my-codes/website-portfolio-deploy-main/src/data/tawkChatbotContent.js).
5. In `Administration -> Shortcuts`, create the shortcuts from `tawkShortcutDefinitions` exactly as written.
6. In the AI Assist `Base Prompt`, paste `tawkBasePrompt`.

## Recommended Guided Flow

Use `Main Menu` as the root shortcut. The visitor should see exactly 4 top-level options:

- `About Edgar`
- `Skills & Experience`
- `Projects & Certificates`
- `Contact / Hire Edgar`

Each shortcut already follows the 4-option limit for Suggested Messages. Keep the labels exactly the same as the AI Questions they are meant to trigger.

## Suggested Launch Behavior

Use AI Assist so that if a visitor opens the chat without a clear question, the bot responds with the `Main Menu` shortcut flow.

Recommended starter behavior:

- greet the visitor briefly
- present the `Main Menu` options
- stay limited to Edgar's actual portfolio content
- redirect unknown questions back to the menu or contact options

## Maintenance Notes

- If you update portfolio content, also update [`src/data/tawkChatbotContent.js`](/E:/my-codes/website-portfolio-deploy-main/src/data/tawkChatbotContent.js).
- If the AI Assist text source is already pasted into Tawk, re-paste it after changing the knowledge file.
- Keep shortcut labels stable. Changing button labels without updating matching AI Questions will break the guided flow.

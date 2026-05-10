# Tawk Live Chat Fix Steps

Use this guide if the widget still shows default Tawk content like:

- `Customer Support`
- `Hi! How can we help?`
- `Tell me more`

That means the default widget content is still showing instead of your AI Assist greeting and menu flow.

## Goal

Make the live widget open with Edgar's chatbot greeting and menu options instead of the default support content.

## Step 0. Create The AI Agent In Apollo

If Tawk shows this screen:

- `Hi edgar, let's build your AI Agent!`
- `Describe the agent you need and we'll build it for you.`
- `Describe your AI agent...`
- template choices like `E-commerce`, `Retail`, `Restaurant`, `Healthcare`, `Real Estate`

Do not use the templates.

Paste this into `Describe your AI agent...`:

```text
Create a portfolio assistant for Edgar Orosa. The agent should answer only questions about Edgar’s background, skills, experience, projects, certificates, testimonials, availability, and contact details. It should greet visitors briefly, speak in a professional and concise way, and guide them using these menu options: About Edgar, Skills & Experience, Projects & Certificates, Contact / Hire Edgar. It must not invent pricing, services, or personal details not found in the portfolio content.
```

Then continue the Apollo setup.

When Apollo asks how to set up the agent, use:

1. `https://eg-deploy.vercel.app/`
2. Optional upload: [tawk-chatbot-knowledge.txt](/E:/my-codes/website-portfolio-deploy-main/docs/tawk-chatbot-knowledge.txt)
3. `Describe my business`

If Apollo asks for a business description, paste this:

```text
Edgar Orosa is a full-stack developer based in Las Pinas City, Philippines. This website is his personal portfolio. It highlights his background, skills, internship experience at X-META Technologies Inc., featured projects, certificates, testimonials, and contact details. The AI agent should only answer portfolio-related questions and guide visitors using these options: About Edgar, Skills & Experience, Projects & Certificates, and Contact / Hire Edgar.
```

Then continue through these Apollo sections:

- `Your business`
- `FAQs`
- `Persona & Avatar`
- `Description`
- `Base prompt`
- `Tools`
- `Channels`
- `Launch`

Use the rest of this guide for the important settings after the agent is created.

## Step 1. Confirm AI Assist Is Enabled

In Tawk:

- open the correct property
- go to `Add-ons -> AI Assist`
- make sure AI Assist is turned `ON`

If AI Assist is off, your shortcut flow will not drive the conversation the way you expect.

## Step 2. Assign Your AI Agent To Live Chat

In Tawk:

- go to `Automation -> Agents`
- open your AI agent
- open the `Channels` section
- make sure `Live Chat` is enabled for that agent

If the AI agent is not assigned to `Live Chat`, the website widget will continue to behave like a normal support widget.

## Step 3. Replace The Base Prompt Greeting

In Tawk:

- go to `Automation -> Agents`
- open your AI agent
- open `Instructions` or `Base Prompt`

Paste this near the top of the prompt:

```text
When a new live chat starts, always greet the visitor first before answering anything.

Say exactly:

Hi! I'm Edgar's portfolio assistant. I can help you explore my background, projects, certificates, and contact details. What would you like to know?

[option] About Edgar
[option] Skills & Experience
[option] Projects & Certificates
[option] Contact / Hire Edgar
```

Then click `Save`.

This is what makes the AI send the first greeting and show your menu buttons inside the live chat.

## Step 4. Remove The Default Widget Greeting

If you still see `Hi! How can we help?`, edit the widget content.

In Tawk:

- go to `Administration -> Chat Widget`
- open `Widget Content`

Check these tabs:

- `Online`
- `Pre-Chat`

Look for default cards or text like:

- `Customer Support`
- `Hi! How can we help?`
- `Tell me more`

Edit or remove those defaults if you do not want them shown.

## Step 5. Disable Pre-Chat If You Want A Cleaner Start

In `Administration -> Chat Widget -> Widget Content`:

- open the `Pre-Chat` state
- if the Pre-Chat form is enabled and you do not need it, turn it off

Reason:

- Pre-Chat can appear before AI Assist replies
- it can make the experience look like the default support widget instead of your portfolio chatbot

## Step 6. Keep Shortcut Names And Button Labels Consistent

Your buttons must match the shortcut flow.

Example:

- base prompt option: `About Edgar`
- shortcut name: `About Edgar`
- shortcut questions include: `about edgar`

Do the same for:

- `Skills & Experience`
- `Projects & Certificates`
- `Contact / Hire Edgar`

This is how Tawk connects button clicks to shortcuts through AI Questions.

## Step 7. Test In Incognito

After saving everything:

- open your website in incognito/private mode
- click the Tawk widget
- start a new chat

Expected result:

- the AI greets first
- the chatbot says it is Edgar's portfolio assistant
- you see these 4 buttons:
  - `About Edgar`
  - `Skills & Experience`
  - `Projects & Certificates`
  - `Contact / Hire Edgar`

If you still see default support content first, go back to:

- `Automation -> Agents -> Live Chat assignment`
- `Automation -> Agents -> Base Prompt`
- `Administration -> Chat Widget -> Widget Content`

## Step 8. Production Check

After local testing:

- deploy the latest site build
- open the live production URL in incognito
- repeat the same widget test

Expected production behavior:

- widget loads on public pages
- widget stays hidden on `/login`
- AI greeting and options show instead of the default support message

## Notes

- Your React project already embeds the Tawk widget correctly.
- The remaining behavior is mostly controlled from the Tawk dashboard.
- The website cannot directly force a specific shortcut through JavaScript.
- Tawk uses:
  - AI Assist
  - Base Prompt
  - Suggested Messages
  - Shortcut Questions
  - Widget Content

to decide what the visitor sees first.

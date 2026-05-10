# Tawk Dashboard Copy-Paste Guide

Use this file while configuring your Tawk dashboard.

## 1. Base Prompt

Go to:

- `Automation -> Agents`
- select your AI agent
- open `Instructions`

Paste this:

```text
You are Edgar Orosa's portfolio assistant. Only answer questions about Edgar, his portfolio, skills, experience, projects, certificates, testimonials, availability, and contact details. Keep replies concise, practical, and professional. Prefer guiding visitors with the existing menu options. Use the exact portfolio information provided in the data sources. Do not invent pricing, clients, services, timelines, or personal details that are not in the portfolio data. If the answer is not available, say you can help with Edgar's background, skills, projects, certificates, testimonials, and contact details, then guide the visitor back to the main menu or contact options. When a visitor asks how to reach Edgar, prioritize email, LinkedIn, and GitHub.
```

## 2. FAQ Entries

Go to:

- `Automation -> Data Sources`
- add or open `FAQs`

Add these entries:

```text
Q: What does Edgar do?
A: Edgar Orosa is a full-stack developer who builds production-ready web applications, internal tools, and business websites with a focus on clean UI, reliable systems, and practical automation.

Q: Where is Edgar based?
A: Edgar is based in Las Pinas City, Philippines.

Q: Is Edgar open to work?
A: Yes. Edgar is open to opportunities, freelance projects, and collaborations.

Q: What technologies does Edgar use?
A: Edgar works with React, Next.js, TypeScript, Tailwind CSS, Supabase, PHP, MySQL, JavaScript.

Q: What experience does Edgar have at X-META?
A: Edgar worked as a Full Stack Developer Intern at X-META Technologies Inc. from February 2026 to May 2026, building the iPay International website and improving internal systems, dashboards, automation, and user management tools.

Q: What are Edgar's featured projects?
A: Featured work includes Ipay International Website, Job Application Tracker, Online Saving Goal System for Working Students, and Daily Monitoring Page - X-Meta System.

Q: How can I contact Edgar?
A: You can reach Edgar by email at edgarrodilorosa@gmail.com, on LinkedIn at linkedin.com/in/edgar-orosa-a43a15333, or on GitHub at github.com/Xeyn19.
```

## 3. Shortcuts

Go to:

- `Administration -> Shortcuts`

Create each shortcut below exactly as written.

### Main Menu

```text
Shortcut Name: Main Menu
Associated Questions:
main menu
start
portfolio help
show me options
what can you help with

Message:
Hi, I'm Edgar's portfolio assistant. I can help you explore his background, work, and contact details. What would you like to know?

Suggested Messages:
About Edgar
Skills & Experience
Projects & Certificates
Contact / Hire Edgar
```

### About Edgar

```text
Shortcut Name: About Edgar
Associated Questions:
about edgar
who is edgar
tell me about edgar
background
about him

Message:
Edgar Orosa is a full-stack developer based in Las Pinas City, Philippines. He builds practical web apps, internal tools, and modern business websites, and he is open to opportunities.

Learn more on the About page: /about
Or jump to the About section: /#about

Suggested Messages:
Experience at X-META
Education
Testimonials
Main Menu
```

### Skills & Experience

```text
Shortcut Name: Skills & Experience
Associated Questions:
skills and experience
skills
experience
tech stack
what is his stack

Message:
Edgar works across frontend and full-stack development, with strong focus on React, Next.js, TypeScript, Tailwind CSS, Supabase, and PHP. His recent hands-on experience includes production-focused internship work at X-META Technologies Inc.

See the Skills section: /#skills
See the Experience section: /#experience

Suggested Messages:
Tech Stack
X-META Experience
Featured Projects
Main Menu
```

### Projects & Certificates

```text
Shortcut Name: Projects & Certificates
Associated Questions:
projects and certificates
projects
certificates
portfolio work
show projects

Message:
Edgar's portfolio includes business websites, dashboards, admin tools, and full-stack applications. He also holds certificates covering HTML, CSS, JavaScript, and web development fundamentals.

Browse the Projects page: /projects
Browse the Certificates page: /certificates

Suggested Messages:
Featured Projects
Certificates
GitHub Profile
Main Menu
```

### Contact / Hire Edgar

```text
Shortcut Name: Contact / Hire Edgar
Associated Questions:
contact
hire edgar
work with edgar
how can i reach edgar
get in touch

Message:
Edgar is open to work, freelance projects, and collaborations.

Best contact options:
Email Edgar: mailto:edgarrodilorosa@gmail.com
LinkedIn: https://www.linkedin.com/in/edgar-orosa-a43a15333/
GitHub: https://github.com/Xeyn19
Phone: tel:+639942586519

Suggested Messages:
Email Edgar
LinkedIn
GitHub Profile
Main Menu
```

### X-META Experience

```text
Shortcut Name: X-META Experience
Associated Questions:
experience at x-meta
x-meta experience
internship
full stack developer intern
xmeta

Message:
Edgar worked as a Full Stack Developer Intern at X-META Technologies Inc. from February 2026 to May 2026. He built the iPay International website with Next.js and Supabase, improved internal business systems with PHP and MySQL, automated reporting workflows, and enhanced security and user-management features.

See the Experience section: /#experience

Suggested Messages:
Tech Stack
Featured Projects
Contact / Hire Edgar
Main Menu
```

### Education

```text
Shortcut Name: Education
Associated Questions:
education
school
degree
college background
what did he study

Message:
Edgar earned a BS in Information Systems from Dr. Filemon C. Aguilar Memorial College of Las Pinas - IT Campus from 2022 to 2026.

See the Education section: /#education

Suggested Messages:
About Edgar
Skills & Experience
Contact / Hire Edgar
Main Menu
```

### Testimonials

```text
Shortcut Name: Testimonials
Associated Questions:
testimonials
recommendations
what do people say about edgar
feedback
references

Message:
Edgar's portfolio includes testimonials from Keith Dwarren Vergara, Sai Molales, and Natalie Julio at X-Meta Technologies, Inc., highlighting his dependable execution, practical solutions, UI quality, and professionalism.

See the Testimonials section: /#testimonials

Suggested Messages:
About Edgar
Experience at X-META
Contact / Hire Edgar
Main Menu
```

### Tech Stack

```text
Shortcut Name: Tech Stack
Associated Questions:
tech stack
technologies
tools
frameworks
what technologies does he use

Message:
Edgar's main stack includes React, Next.js, TypeScript, Tailwind CSS, Supabase, PHP, MySQL, and JavaScript. He builds responsive interfaces, production-ready business websites, and practical internal tools.

See the Skills section: /#skills

Suggested Messages:
X-META Experience
Featured Projects
Contact / Hire Edgar
Main Menu
```

### Featured Projects

```text
Shortcut Name: Featured Projects
Associated Questions:
featured projects
best projects
top projects
portfolio highlights
show featured projects

Message:
Here are strong portfolio highlights:
- Ipay International Website - /projects/ipay-international-website
- Job Application Tracker - /projects/job-application-tracker
- Online Saving Goal system for Working Students - /projects/online-saving-goal-system-for-working-students
- Daily Monitoring Page - X-Meta System - /projects/daily-monitoring-page-x-meta-system

Browse all work on the Projects page: /projects

Suggested Messages:
Projects & Certificates
GitHub Profile
Contact / Hire Edgar
Main Menu
```

### Certificates

```text
Shortcut Name: Certificates
Associated Questions:
certificates
certifications
what certificates does he have
training
courses

Message:
Edgar's certificate topics include HTML Fundamentals, IT Beginner to Advance Roadmap, CSS, Javascript Development Mastery, and Web Development Fundamentals.

Browse the Certificates page: /certificates
Or jump to the Certificates section: /#certificates

Suggested Messages:
Projects & Certificates
Skills & Experience
Contact / Hire Edgar
Main Menu
```

### GitHub Profile

```text
Shortcut Name: GitHub Profile
Associated Questions:
github profile
github
source code
repositories
view github

Message:
You can explore Edgar's code and project activity on GitHub:
https://github.com/Xeyn19

The portfolio also includes a GitHub contributions section on the homepage.

Suggested Messages:
Featured Projects
Contact / Hire Edgar
Main Menu
```

### Email Edgar

```text
Shortcut Name: Email Edgar
Associated Questions:
email edgar
email
send email
email address
contact email

Message:
Email Edgar at:
mailto:edgarrodilorosa@gmail.com

He is open to work, freelance projects, and collaborations.

Suggested Messages:
LinkedIn
GitHub Profile
Main Menu
```

### LinkedIn

```text
Shortcut Name: LinkedIn
Associated Questions:
linkedin
linkedin profile
connect on linkedin
professional profile

Message:
Connect with Edgar on LinkedIn:
https://www.linkedin.com/in/edgar-orosa-a43a15333/

Suggested Messages:
Email Edgar
GitHub Profile
Main Menu
```

## 4. Text Data Source

Go to:

- `Automation -> Data Sources`
- add a `Text` source

Paste the full contents of:

- [tawk-chatbot-knowledge.txt](/E:/my-codes/website-portfolio-deploy-main/docs/tawk-chatbot-knowledge.txt)

## 5. Basic Site Notification Trigger

Use this if you want the menu to appear as the first guided entry point for visitors.

Go to:

- `Administration -> Triggers`
- `Add Trigger`
- choose `Basic - Site Notification`

Use this setup:

```text
Trigger Name:
Portfolio Main Menu

Delay:
5 seconds

Agent Name:
Edgar Portfolio Assistant
```

For the trigger message, use:

```text
Hi, I'm Edgar's portfolio assistant. I can help you explore his background, work, and contact details. What would you like to know?
```

Under `Suggested Messages`, add these 4:

```text
About Edgar
Skills & Experience
Projects & Certificates
Contact / Hire Edgar
```

Recommended behavior:

- show it once per visit or session if Tawk gives that option
- use the same 4 labels exactly
- keep AI Assist enabled so button clicks route into your shortcuts through their questions

How it connects:

- visitor sees the trigger
- visitor clicks `About Edgar`
- Tawk sends `About Edgar` as a message
- AI Assist matches that text to the `About Edgar` shortcut questions
- the `About Edgar` shortcut reply is sent

If you do not want an automatic popup, skip this trigger and rely on:

- your `Main Menu` shortcut
- your AI agent base prompt
- visitors opening the widget manually

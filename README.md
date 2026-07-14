<div align="center">
  <img src="public/logo.png" alt="Feedbase" width="84" height="64" />
  <h1>Feedbase</h1>
  <p>Open-source, self-hosted feedback boards for your users and team.</p>

  <p>
    <a href="https://github.com/breadddevv/feedbase/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-pink?style=flat-square" alt="MIT License" /></a>
    <a href="https://github.com/breadddevv/feedbase/stargazers"><img src="https://img.shields.io/github/stars/breadddevv/feedbase?style=flat-square&color=pink" alt="Stars" /></a>
    <a href="https://github.com/breadddevv/feedbase/issues"><img src="https://img.shields.io/github/issues/breadddevv/feedbase?style=flat-square&color=pink" alt="Issues" /></a>
    <a href="https://github.com/breadddevv/feedbase/releases"><img src="https://img.shields.io/github/v/release/breadddevv/feedbase?style=flat-square&color=pink" alt="Latest release" /></a>
  </p>

  <p>
    <a href="https://feedbase.breaddevv.cc">Website</a> ·
    <a href="https://feedbase.breaddevv.cc/docs">Docs</a> ·
    <a href="https://discord.gg/aYYFyfJSJC">Discord</a> ·
    <a href="https://github.com/breadddevv/feedbase/releases">Changelog</a>
  </p>

  <br />

  <img src="public/og.png" alt="Feedbase screenshot" width="100%" />
</div>

> [!WARNING]
> Feedbase is a work in progress. By the time you're reading this, some features listed here may not yet be available — or new ones may have shipped that aren't documented yet. Have a suggestion or found something off? Open an [issue](https://github.com/breadddevv/feedbase/issues) or join us on [Discord](https://discord.gg/aYYFyfJSJC).

---

## Contents

- [What is Feedbase?](#what-is-feedbase)
- [Features](#features)
- [Stack](#stack)
- [Getting started](#getting-started)
- [Configuration](#configuration)
- [Upgrading](#upgrading)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [FAQ](#faq)
- [License](#license)

---

## What is Feedbase?

Feedbase is a self-hosted, open-source feedback management tool. Give your users a place to submit ideas, report bugs, and upvote what matters — all on your own infrastructure.

No SaaS subscriptions. No vendor lock-in. Your data stays yours.

> Inspired by tools like Canny, Fider, and Productboard — but free, open, and self-hosted.

|  | Feedbase | Canny | Fider |
|---|:---:|:---:|:---:|
| Self-hosted | ✅ | ❌ | ✅ |
| Open source | ✅ | ❌ | ✅ |
| Free | ✅ | Paid tiers | ✅ |
| Discord-native workflow | ✅ | ❌ | ❌ |

---

## Features

**Feedback & roadmap**
- Public or private feedback boards per project, with upvotes and threaded comments
- Customisable suggestion statuses (Under Review, Planned, In Progress, Done, Won't Do)
- Kanban-style public roadmap your users can follow
- Changelog publishing tied to resolved suggestions

**Integrations & notifications**
- Discord: webhooks on new posts, slash commands to update statuses without leaving Discord
- Email notifications when a suggestion's status changes
- Roblox OAuth sign-in for user authentication

**Admin & operations**
- Role-based access: Owner, Admin, Member, Viewer
- Admin panel at `/admin` for managing users, projects, and instance settings
- Automatic update checks with an in-panel banner when a new release ships
- Version tracking baked in via Docker build args

MIT licensed — fork it, modify it, ship it.

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js (App Router) |
| Auth | better-auth |
| Database | PostgreSQL + Prisma |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Deployment | Docker / docker-compose |

---

## Getting started

### Prerequisites

- Node.js 22+
- PostgreSQL 15+
- Docker (recommended — handles the database and app together with the least setup)

### Option 1 — Docker (recommended)

```bash
git clone https://github.com/breadddevv/feedbase.git
cd feedbase
cp .env.example .env
# Fill in your .env values — see Configuration below
docker compose up -d
```

Feedbase will be available at `http://localhost:3000`.

### Option 2 — Manual

```bash
git clone https://github.com/breadddevv/feedbase.git
cd feedbase
cp .env.example .env
# Fill in your .env values — see Configuration below
npm install
npx prisma migrate deploy
npm run build
npm start
```

### One-click deploys

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/feedbase)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/breadddevv/feedbase&project-name=feedbase&root-directory=apps/web&framework=nextjs&env=DATABASE_URL,BETTER_AUTH_URL,DISCORD_CLIENT_ID,DISCORD_CLIENT_SECRET,DISCORD_BOT_TOKEN,DISCORD_WEBHOOK_URL,DISCORD_GUILD_ID&envDescription=PostgreSQL%20Connection%20URL,Better%20Auth%20Base%20URL%20(no%20trailing%20slash),Discord%20OAuth%20Client%20ID,Discord%20OAuth%20Client%20Secret,Discord%20Bot%20Token,Discord%20Webhook%20URL,Discord%20Guild%20ID)

> Note: Vercel is a serverless platform and won't run the Discord bot's persistent connection. Use Docker or a Railway/VPS deploy if you need slash commands.

---

## Configuration

Copy `.env.example` to `.env` and fill in the values below.

| Variable | Required | Description |
|---|:---:|---|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `BETTER_AUTH_URL` | ✅ | Base URL Feedbase is served from, no trailing slash |
| `DISCORD_CLIENT_ID` | Optional | Discord OAuth client ID, for Discord login |
| `DISCORD_CLIENT_SECRET` | Optional | Discord OAuth client secret |
| `DISCORD_BOT_TOKEN` | Optional | Enables slash commands for updating suggestion statuses from Discord |
| `DISCORD_WEBHOOK_URL` | Optional | Posts new suggestions to a Discord channel |
| `DISCORD_GUILD_ID` | Optional | Discord server the bot and webhooks operate in |
| `ROBLOX_CLIENT_ID` | Optional | Roblox OAuth client ID, for Roblox login |
| `ROBLOX_CLIENT_SECRET` | Optional | Roblox OAuth client secret |

Only `DATABASE_URL` and `BETTER_AUTH_URL` are required to run Feedbase. Discord and Roblox variables are needed only if you want those sign-in and integration options.

---

## Upgrading

Feedbase checks for updates automatically against the [GitHub releases page](https://github.com/breadddevv/feedbase/releases). When a new version is available, you'll see a banner in the admin panel.

To upgrade with Docker:

```bash
docker compose pull
docker compose up -d
```

---

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

```bash
# Run locally in dev mode
npm run dev

# Run database migrations
npx prisma migrate dev

# Lint
npm run lint
```

---

## Roadmap

- [ ] Slack integration
- [ ] GitHub Issues sync
- [ ] REST API + API keys
- [ ] Import from Canny / Fider
- [ ] AI duplicate detection

Have a feature request? Open an [issue](https://github.com/breadddevv/feedbase/issues) or suggest it on our own [Feedbase board](https://feedbase.app).

---

## FAQ

**Does Feedbase support SSO / SAML?**
Not yet — currently Discord and Roblox OAuth are supported. See the roadmap for what's planned.

**Can I run multiple projects/boards on one instance?**
Yes, boards are scoped per project within a single instance.

**Where do I report a bug?**
Open a [GitHub issue](https://github.com/breadddevv/feedbase/issues) or ping us on [Discord](https://discord.gg/aYYFyfJSJC).

---

## License

Feedbase is open-source software released under the [MIT License](LICENSE).

---

<div align="center">
  <p>Built with 🩷 by <a href="https://github.com/breadddevv">@breadddevv</a></p>
  <p>
    <a href="https://feedbase.breadddevv.cc/privacy">Privacy policy</a> ·
    <a href="https://feedbase.breadddevv.cc/terms">Terms of service</a>
  </p>
</div>

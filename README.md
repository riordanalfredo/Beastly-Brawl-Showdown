<div align="center">

<img src="https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/misc/LOGO.png" alt="Beastly Brawl Showdown Logo" width="300" />

# Beastly Brawl Showdown

> A web-based multiplayer RPG battle game where monsters clash in epic turn-based combat!

[![Production](https://img.shields.io/badge/prod-beastlybrawl.app-green)](https://www.beastlybrawl.app/)
[![Test](https://img.shields.io/badge/test-beastlybrawl--test.app-blue)](https://www.beastlybrawl-test.app/)
[![License](https://img.shields.io/badge/license-MIT-orange)]()

</div>

---

## 📑 Table of Contents

- [About the Game](#-about-the-game)
- [Game Modes](#-game-modes)
- [Quick Start](#-quick-start)
- [Tech Stack](#-tech-stack)
- [Development](#-development)
  - [Local Setup](#local-setup)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [Deployment](#-deployment)
  - [Infrastructure](#infrastructure)
  - [CI/CD Pipeline](#cicd-pipeline)
  - [GitHub Secrets](#github-secrets)
- [Versioning](#-versioning)
- [Project Resources](#-project-resources)
- [Team](#-team)
- [Contact](#-contact)

---

## 🎯 About the Game

Beastly Brawl Showdown is a web-based role-playing game where players battle each other using unique monsters with distinct abilities, inspired by classic tabletop games like Dungeons & Dragons. The game features simple attack and defend mechanics, live match updates, and a variety of tournament formats (adventure and battle royale), making it accessible and engaging for both new and experienced players. Its social, in-person focus encourages interaction and serves as a fun party or icebreaker game. The combination of strategy, luck, and diverse monster abilities ensures each match feels fresh and unpredictable.

### ✨ Key Features

- **🎲 Dice-Based Combat** - Classic D&D-style attack and defense mechanics
- **🐉 Unique Monsters** - Diverse roster with special abilities and stats
- **⚡ Real-Time Action** - Live turn-based battles with instant updates
- **🎊 Social Gaming** - Perfect for parties, classrooms, and gatherings
- **📱 Accessibility** - Simple mechanics, strategic depth

> [!NOTE]
>
> The game emphasises in-person social interaction and serves as an excellent icebreaker!

---

## 🎮 Game Modes

| Mode                  | Description                    | Players |
| --------------------- | ------------------------------ | ------- |
| **Battle Royale**     | Last monster standing wins     | 2+      |
| **Scored Tournament** | Points across multiple rounds  | 2+      |
| **Adventure Mode**    | Story-driven single-player RPG | 1       |

---

## 🚀 Quick Start

### Hosted Versions

- **Production:** https://www.beastlybrawl.app/ _(active during milestone presentations)_
- **Test Environment:** https://www.beastlybrawl-test.app/ _(generally up 24/7)_

### Local Development

```bash
# Clone the repository
git clone https://github.com/Monash-FIT3170/2025W2-Beastly-Brawl-Showdown.git
cd 2025W2-Beastly-Brawl-Showdown

# Install dependencies
meteor npm install

# Set up environment variables
echo "MONGO_URL=your_mongodb_connection_string" > .env

# Start the application
npm start
```

> [!CAUTION]
>
> Make sure you have Node.js v22.14.0+ and Meteor v3.2 installed before starting!

---

## 🛠️ Tech Stack

### Frontend Stack

| Technology           | Purpose                 |
| -------------------- | ----------------------- |
| **React**            | UI framework            |
| **TypeScript**       | Type-safe development   |
| **Tailwind CSS**     | Utility-first styling   |
| **Socket.io Client** | Real-time communication |

📂 [Frontend Source Code](https://github.com/Monash-FIT3170/2025W2-Beastly-Brawl-Showdown/tree/main/client)

### Backend Stack

| Technology     | Purpose               |
| -------------- | --------------------- |
| **Meteor**     | Full-stack framework  |
| **TypeScript** | Type-safe server code |
| **MongoDB**    | Game data storage     |
| **Socket.io**  | WebSocket server      |

📂 [Backend Source Code](https://github.com/Monash-FIT3170/2025W2-Beastly-Brawl-Showdown/tree/main/server)

### Infrastructure

| Service            | Usage                                        |
| ------------------ | -------------------------------------------- |
| **DigitalOcean**   | Cloud hosting (TEST: 1GB RAM, PROD: 8GB RAM) |
| **MongoDB Atlas**  | Database hosting (free tier)                 |
| **Docker**         | Containerisation                             |
| **Nginx**          | Reverse proxy & SSL termination              |
| **Terraform**      | Infrastructure as Code                       |
| **GitHub Actions** | CI/CD automation                             |

---

## 💻 Development

### Prerequisites

Before you begin, ensure you have the following installed:

| Tool    | Minimum Version | Check Command      |
| ------- | --------------- | ------------------ |
| Node.js | v22.14.0+       | `node -v`          |
| npm     | v10.9.2+        | `npm -v`           |
| Meteor  | v3.2            | `meteor --version` |

### Local Setup

#### 1. Install Node.js

Download and install from [nodejs.org](https://nodejs.org/en/download)

```bash
# Verify installation
node -v  # Should show v22.14.0 or higher
npm -v   # Should show v10.9.2 or higher
```

#### 2. Install Meteor

Run in an administrator terminal:

```bash
npx meteor
```

Verify installation:

```bash
meteor --version  # Should show v3.1.2
```

#### 3. Clone the Repository

```bash
git clone https://github.com/Monash-FIT3170/2025W2-Beastly-Brawl-Showdown.git
cd 2025W2-Beastly-Brawl-Showdown
```

#### 4. Install Dependencies

```bash
npm i
```

> [!WARNING]
>
> Make sure you're in the project root directory before running this command!

### Environment Variables

Create a `.env` file in the project root:

```bash
# .env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
```

> [!CAUTION]
>
> **Security Note:** Never commit your `.env` file to version control. It's already included in `.gitignore`.

### Running the Application

```bash
npm start
```

The application will be available at `http://localhost:3000`

> [!TIP]
>
> Use `meteor reset` if you need to clear the local database and start fresh.

---

## 🚢 Deployment

### Infrastructure

#### DigitalOcean Droplets

| Environment | Specs           | Status    |
| ----------- | --------------- | --------- |
| **TEST**    | 1 vCPU, 1GB RAM | Always on |
| **PROD**    | 4 vCPU, 8GB RAM | On-demand |

#### Static Assets

- Served via **DigitalOcean Spaces CDN**
- Optimised for global delivery
- Reduced load on application servers

📂 [Terraform Configuration](https://github.com/Monash-FIT3170/2025W2-Beastly-Brawl-Showdown/tree/main/terraform)

### Containerisation (Docker & Docker Compose)

- Application is containerised using Docker.
- 📄 [Dockerfile](https://github.com/Monash-FIT3170/2025W2-Beastly-Brawl-Showdown/blob/main/Dockerfile)
- Two containers are run:
  - The Meteor application
  - Nginx

### SSL & DNS

- **SSL Certificates:** From Namecheap/Name.com (expires August 2026)
- **DNS:** Human-readable domains via GitHub Student Developer Pack
- **Configuration:**
  - [Production Nginx Config](https://github.com/Monash-FIT3170/2025W2-Beastly-Brawl-Showdown/blob/main/deployment/default.prod.conf)
  - [Test Nginx Config](https://github.com/Monash-FIT3170/2025W2-Beastly-Brawl-Showdown/blob/main/deployment/default.test.conf)

### CI/CD Pipeline

#### Available Workflows

| Workflow                    | Trigger           | Branch | Description                |
| --------------------------- | ----------------- | ------ | -------------------------- |
| **Test - Startup & Deploy** | Manual, PR, Merge | Any    | Deploy to test environment |
| **Prod - Startup & Deploy** | Manual only       | `main` | Deploy to production       |
| **Test - Shutdown**         | Manual            | Any    | Shutdown test droplet      |
| **Prod - Shutdown**         | Manual, Scheduled | `main` | Shutdown at 11:55PM AEST   |

#### Startup Workflow Process

```mermaid
graph LR
    A[Trigger Workflow] --> B[Start Droplet]
    B --> C[Build Docker Image]
    C --> D[Deploy w/ Docker Compose]
    D --> E[Application Live]
```

📄 [Startup Workflow](https://github.com/Monash-FIT3170/2025W2-Beastly-Brawl-Showdown/blob/main/.github/workflows/startup-template.yaml)

#### Shutdown Workflow Process

```mermaid
graph LR
    A[Trigger Workflow] --> B[Create Snapshot]
    B --> C[Destroy Droplet]
```

📄 [Shutdown Workflow](https://github.com/Monash-FIT3170/2025W2-Beastly-Brawl-Showdown/blob/main/.github/workflows/shutdown-template.yaml)

> [!NOTE]
>
> **Cost Optimisation:** Destroying droplets but keeping snapshots is cheaper than keeping them running 24/7.

### GitHub Secrets

The following secrets must be configured in the repository:

#### Application Secrets

| Secret                           | Description               |
| -------------------------------- | ------------------------- |
| `BEASTLYBRAWL_APP_ROOT_URL_PROD` | Production site URL       |
| `BEASTLYBRAWL_APP_ROOT_URL_TEST` | Test site URL             |
| `MONGO_URL`                      | MongoDB connection string |

#### SSL Certificates

| Secret                           | Description                |
| -------------------------------- | -------------------------- |
| `BEASTLYBRAWL_APP_SSL_CERT_PROD` | Production SSL certificate |
| `BEASTLYBRAWL_APP_SSL_CERT_TEST` | Test SSL certificate       |
| `BEASTLYBRAWL_APP_SSL_KEY_PROD`  | Production SSL private key |
| `BEASTLYBRAWL_APP_SSL_KEY_TEST`  | Test SSL private key       |

#### Infrastructure Secrets

| Secret                                       | Description              |
| -------------------------------------------- | ------------------------ |
| `DIGITAL_OCEAN_DROPLET_IP_PROD`              | Production VM IP address |
| `DIGITAL_OCEAN_DROPLET_IP_TEST`              | Test VM IP address       |
| `DIGITAL_OCEAN_DROPLET_SSH_PRIVATE_KEY_PROD` | Production SSH key       |
| `DIGITAL_OCEAN_DROPLET_SSH_PRIVATE_KEY_TEST` | Test SSH key             |
| `DIGITAL_OCEAN_PAT`                          | Personal Access Token    |
| `DIGITAL_OCEAN_SPACES_ACCESS_KEY_ID`         | Spaces CDN access key    |
| `DIGITAL_OCEAN_SPACES_SECRET_KEY`            | Spaces CDN secret        |

#### Package Registry

| Secret                | Description                     |
| --------------------- | ------------------------------- |
| `GHCR_PACKAGES_TOKEN` | GitHub Container Registry token |

---

## 📦 Versioning

This project follows [Semantic Versioning](https://semver.org/) (SemVer):

### Version Format

```
MAJOR.MINOR.PATCH
```

| Component | When to Increment                              | Example           |
| --------- | ---------------------------------------------- | ----------------- |
| **MAJOR** | Breaking changes or major architecture updates | `1.0.0` → `2.0.0` |
| **MINOR** | New features (backwards-compatible)            | `1.0.0` → `1.1.0` |
| **PATCH** | Bug fixes (backwards-compatible)               | `1.0.0` → `1.0.1` |

### Release Types

- **Production Releases** - Tagged releases deployed to production
- **Release Candidates** - Pre-release testing versions (e.g., `v1.2.0-rc.1`)
- **Development Builds** - Continuous deployment from `main` branch

### Version Roadmap

| Version  | Focus Area                           |
| -------- | ------------------------------------ |
| **v1.x** | Core gameplay & stability            |
| **v2.x** | Tournament systems & enhanced UI     |
| **v3.x** | Mobile optimisation & new game modes |

> [!NOTE]
>
> **Current Version:** Check [Releases](https://github.com/Monash-FIT3170/2025W2-Beastly-Brawl-Showdown/releases) or `package.json`

---

## 📚 Project Resources

### Development Resources

- **📊 Project Roadmap:** [View Roadmap](https://docs.google.com/spreadsheets/d/1LVmPafwmwKz3nCVNsdRHvRaFhsA7vkvqLH_jOoptPvI/edit?pli=1&gid=709279970#gid=709279970)
- **🐛 Issue Tracker:** [Report Bugs](https://github.com/Monash-FIT3170/2025W2-Beastly-Brawl-Showdown/issues)
- **📦 Releases:** [View All Releases](https://github.com/Monash-FIT3170/2025W2-Beastly-Brawl-Showdown/releases)

### Documentation

- **Project Specification:** [Beastly Brawl Showdown Brief](https://docs.google.com/document/d/12ZjfWY1G1ZawmGyEGR2xWK4Z9R0LrddaOyLp6WQfOL0/edit?tab=t.0#heading=h.tmorypdm36gp)
- **Quality Assurance:** [M3 Quality Assurance Plan](https://docs.google.com/document/d/1WSFQay4wkQg4IAswG74WGYNLTrJmeFxdMgQ8MlSqxMM/edit?tab=t.0#heading=h.we6blnmvmibu)
- **Privacy:** [Technical Report 3](https://docs.google.com/document/d/1KsqyCbb8MQ1KZamjoDCdnmBkjai44RHoI--ODwx7uZk/edit?tab=t.0#heading=h.we6blnmvmibu)

> [!IMPORTANT]
>
> **Contributing:** To report bugs or request features, please create a new issue using the appropriate template.

---

## 👥 Team

<div align="center">

### Team Roles Legend

| Emoji | Role                   |
| :---: | ---------------------- |
|  🧑‍💼   | Product Manager        |
|  🚂   | Release Train Engineer |
|  🏗️   | System Architect       |

### Team Cobra 🐍

<img src="https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/character/CHARMER_COBRA.png" alt="Team Cobra" width="150" />

| Member         | Role         | Email                       |
| -------------- | ------------ | --------------------------- |
| **Luna**       | 🚂 RTE       | pnag0009@student.monash.edu |
| **Huu Nguyen** | 🚂 RTE       | hngu0187@student.monash.edu |
| **Omar**       | 🧑‍💼 PM        | osal0004@student.monash.edu |
| **Naveen**     | 🧑‍💼 PM        | nsel0009@student.monash.edu |
| **Danniel**    | 🏗️ Architect | dyou0009@student.monash.edu |

### Team Rhino 🦏

<img src="https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/character/ROCKY_RHINO.png" alt="Team Rhino" width="150" />

| Member           | Role         | Email                       |
| ---------------- | ------------ | --------------------------- |
| **Aden**         | 🚂 RTE       | atra0066@student.monash.edu |
| **Will Richter** | 🚂 RTE       | wric0006@student.monash.edu |
| **Devan**        | 🏗️ Architect | dfed0003@student.monash.edu |
| **Meng**         | 🧑‍💼 PM        | hsia0003@student.monash.edu |

### Team Pogo 🐸

<img src="https://spaces-beastly-brawl.syd1.cdn.digitaloceanspaces.com/assets/character/POISON_POGO.png" alt="Team Pogo" width="150" />

| Member         | Role         | Email                        |
| -------------- | ------------ | ---------------------------- |
| **Cameron**    | 🚂 RTE       | cameronhumphreys77@gmail.com |
| **Anika**      | 🚂 RTE       | akam0020@student.monash.edu  |
| **Tinesia**    | 🧑‍💼 PM        | tyuu0023@student.monash.edu  |
| **Derek**      | 🧑‍💼 PM        | derek.jcao@gmail.com         |
| **Daniel Loh** | 🏗️ Architect | dloh0003@student.monash.edu  |

</div>

---

## 📞 Contact

### Primary Contact

**Product Owner:** Riordan Alfredo  
📧 riordan.alfredo1@monash.edu

### Alternative Contacts

| Issue Type       | Contact                              | Email                       |
| ---------------- | ------------------------------------ | --------------------------- |
| Technical Issues | Devan Fedhi (Architect - Team Rhino) | dfed0003@student.monash.edu |
| General Issues   | Derek Cao (PM - Team Pogo)           | derek.jcao@gmail.com        |
| Process Issues   | Anika Kamleshwaran (RTE - Team Pogo) | akam0020@student.monash.edu |

> [!NOTE]
>
> **Preferred:** For technical support, bug reports, or feature requests, please use the [Issues Page](https://github.com/Monash-FIT3170/2025W2-Beastly-Brawl-Showdown/issues) instead of direct email.

---

<div align="center">

**Made with ❤️ by the Beastly Brawl Team**

[🌐 Website](https://www.beastlybrawl.app/) • [📊 Roadmap](https://docs.google.com/spreadsheets/d/1LVmPafwmwKz3nCVNsdRHvRaFhsA7vkvqLH_jOoptPvI/edit?pli=1&gid=709279970#gid=709279970) • [🐛 Issues](https://github.com/Monash-FIT3170/2025W2-Beastly-Brawl-Showdown/issues)

</div>

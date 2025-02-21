![hero](Github.png)

<p align="center">
	<h1 align="center"><b>Omniplex</b></h1>
<p align="center">
    Open-Source Perplexity
    <br />
    <br />
    <a href="https://omniplex.ai">Website</a>
    ·
    <a href="https://discord.gg/87Mh7q5ZSd">Discord</a>
    ·
    <a href="https://www.reddit.com/r/omniplex_ai">Reddit</a>
  </p>
</p>

# :construction: Under Active Development

> Our focus is on establishing core functionality and essential features. As we continue to develop Omniplex, we are committed to implementing best practices, refining the codebase, and introducing new features to enhance the user experience.

## Table Of Contents

- [Overview](#overview)
- [Features](#features)
  - [Core Features](#core-features)
  - [Technical Capabilities](#technical-capabilities)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
- [Development](#development)
  - [Running Locally](#running-locally)
  - [Build Commands](#build-commands)
- [API Integration](#api-integration)
  - [Required API Keys](#required-api-keys)
  - [API Setup Guide](#api-setup-guide)
- [Architecture](#architecture)
  - [Tech Stack](#tech-stack)
  - [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Community](#community)

## Overview

Omniplex is an open-source alternative to Perplexity AI, focusing on providing powerful search and AI capabilities while maintaining transparency and community involvement.

## Features

### Core Features
- AI-powered search and responses
- Real-time weather integration
- Financial data analysis
- Background removal tool
- User authentication
- Chat history and persistence

### Technical Capabilities
- Server-side rendering with Next.js
- Real-time updates using Firebase
- Modern UI with TailwindCSS
- Type-safe development with TypeScript
- Automated testing and deployment

## Getting Started

### Prerequisites
- Node.js 18+ installed
- Yarn package manager
- Firebase account
- Various API keys (listed below)

To run the project, modify the code in the Chat component to use the `// Development Code`.

1. Fork & Clone the repository

```bash
git clone git@github.com:[YOUR_GITHUB_ACCOUNT]/omniplex.git
```

### Installation

2. Install the dependencies

```bash
yarn
```

### Running Locally

3. Run this locally 
```bash
yarn dev
```

### Build Commands

4. Build command
```bash
yarn build
```

### Environment Setup

3. Fill out secrets in `.env.local`
Create a `.env.local` file in the root directory with these keys:
```bash
BING_API_KEY=
OPENAI_API_KEY=

OPENWEATHERMAP_API_KEY=
ALPHA_VANTAGE_API_KEY=
FINNHUB_API_KEY=
API_KEY=
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

```

# Omniplex - Internship Assignment

This repository contains my internship assignment work where I implemented several features and improvements to the Omniplex project. The main tasks included UI revamping, adding new functionality, and creating an automation bot.

## 🚀 Implemented Features

### 1. Login Page UI Revamp
- Redesigned the login page with a modern and responsive layout
- Added animated text blocks for better user engagement
- Implemented smooth transitions and hover effects
- Enhanced mobile responsiveness

### 2. Background Removal Tool
- Integrated RapidAPI's background removal service
- Added support for various image formats (PNG, JPG, JPEG)
- Implemented file size validation (max 5MB)
- Added download functionality for processed images
- Real-time preview of original and processed images

### 3. AutomateBot Integration
- Created a separate automation bot using Puppeteer
- Bot Repository: [AutomateBot](https://github.com/Amancodes26/AutomateBot/tree/main)
- Automated various web interactions and tasks
- Implemented headless browser automation

## 🛠️ Technical Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: TailwindCSS, CSS Modules
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **APIs**: OpenAI, RapidAPI, Various Weather & Finance APIs
- **Automation**: Puppeteer

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ installed
- Yarn package manager
- Firebase account
- Various API keys (listed below)




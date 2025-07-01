# 🧪 UI Automation Testing for Wallee Shop

## 📖 Project Overview

This repository contains **end-to-end UI automated tests** for the [Magento 2](https://magento-2.showcase-wallee.com) and [WooCommerce](https://woocommerce.showcase-wallee.com) demo shops provided by Wallee.  
Tests are written using **[Playwright](https://playwright.dev/)** in **TypeScript** and cover key user flows like account creation, login, cart actions, and checkout.

---

## 📂 Project Structure

📦 Wallee/
├── 📂 tests/ # UI test specs
├── 📂 pageObjects/ # Page Object Models (POMs)
├── 📂 data/ # Test data (e.g., generated user info)
├── 📂 utils/ # Helpers, constants, etc.
├── 📂 fixtures/ # Optional test fixtures
├── 🛠 playwright.config.ts # Playwright configuration
├── 📄 Dockerfile # Docker setup for test execution
├── 📄 README.md # Project documentation


---

## 🛠 Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)
- (Optional) [Docker](https://www.docker.com/)

---

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository

git clone https://github.com/Denisss21/Wallee.git
cd Wallee

### 2️⃣ Install Dependencies
npm install

### 3️⃣ Install Playwright Browsers
npx playwright install


### 🔐 Environment Variables
Create a .env file in the root of the project with variables like:

ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=AdminPassword123
MAILSLURP_API_KEY=3e119df835a57e9074cd2769f6008efa7f0a648ed356ce6d3cec34aa3d1f3340

## 🧪 Running Tests
🖥 Run in headed mode (interactive browser)
npx playwright test --headed

## 🧪 Run in headless mode
npx playwright test

## 🌐 Open HTML Report
npx playwright show-report

# Mini Job Board - Setup Guide

## 🚀 Getting Started
This guide will help you set up and run the Mini Job Board project using **Bun**.

### Prerequisites
Make sure you have **Bun** installed. If not, install it using:

```sh
curl -fsSL https://bun.sh/install | bash
```

Then, restart your terminal and verify the installation:

```sh
bun --version
```

## 📦 Installation
1. **Clone the Repository**

```sh
git clone <repository-url>
cd <repository-folder>
```

2. **Install Dependencies**

```sh
bun install
```

## 🔧 Configuration
### Environment Variables
Create a `.env` file in the project root and add the necessary environment variables:

```sh
DATABASE_URL=your_neon_db_url
NEXT_PUBLIC_API_BASE_URL=your_api_url
```

## 🏗 Running the Project
To start the development server:

```sh
bun dev
```

For a production build:

```sh
bun run build
```

To start the production server:

```sh
bun start
```

## ✅ Linting & Formatting
To lint the code:

```sh
bun run lint
```

To format the code:

```sh
bun run format
```

## 🚀 Deployment
This project is deployed on **Vercel**. To deploy manually, run:

```sh
vercel
```

Make sure you have the **Vercel CLI** installed:

```sh
bun add -g vercel
```

## 📜 License
This project is licensed under the MIT License.


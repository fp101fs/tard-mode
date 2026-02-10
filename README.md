# Gemini Focus Mode

A modern, AI-powered todo list that breaks down complex tasks into simple, actionable steps. Built with React, Tailwind CSS, Framer Motion, and the Gemini API.

## Features

- **AI Breakdown**: Uses Google's Gemini API to decompose tasks.
- **Focus Mode**: An immersive, full-screen step-by-step guide to help you get things done.
- **Modern UI**: Clean, minimal interface with smooth animations.

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/fp101fs/tard-mode.git
    cd tard-mode
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    - Create a `.env` file in the root directory.
    - Add your Gemini API key:
      ```
      VITE_GEMINI_API_KEY=your_api_key_here
      ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

## Deployment on Vercel

1.  Push your code to GitHub (already done if you are reading this on GitHub!).
2.  Go to [Vercel](https://vercel.com) and log in.
3.  Click **"Add New..."** -> **"Project"**.
4.  Import your `tard-mode` repository.
5.  In the **Environment Variables** section, add:
    - Key: `VITE_GEMINI_API_KEY`
    - Value: `your_actual_gemini_api_key`
6.  Click **Deploy**.

## Tech Stack

- **Framework**: React + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **AI**: Google Gemini API
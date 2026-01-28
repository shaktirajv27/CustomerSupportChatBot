# Customer Support Chatbot

Customer Support Chatbot is a web-based application designed to automate customer queries and provide quick, meaningful responses through a simple and clean chat interface.

This project focuses on building a modern frontend with a scalable structure and integrating it with backend services and AI APIs to simulate a real-world customer support system.

---

## Live Demo

https://customersupportai.lovable.app/

---

## About the Project

Customer support is an essential part of any product, but handling repeated queries manually can be time-consuming and inefficient.

This project was built to:

1. Provide instant responses to common user queries  
2. Reduce dependency on manual customer support  
3. Offer a clean, responsive, and easy-to-use chat interface  
4. Demonstrate how modern frontend tools can be used in real-world applications  

The main focus is on usability, clean code structure, and practical implementation.

---

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

### Backend & Services
- Supabase (database, authentication, edge functions)
- API-based AI integration

### Tools
- Node.js
- npm
- Git & GitHub
- ESLint

---

## Features

- Real-time chat interface  
- Clean and minimal UI  
- Fully responsive design  
- Modular and scalable folder structure  
- Secure handling of environment variables  
- Fast development workflow using Vite  

---

## Project Structure

Customer-Support-Chatbot/
├── public/ # Static assets (favicon, icons)
├── src/
│ ├── components/ # Reusable UI components
│ ├── contexts/ # Global state management
│ ├── hooks/ # Custom React hooks
│ ├── integrations/ # API and service integrations
│ ├── lib/ # Utility functions
│ ├── pages/ # Application pages
│ ├── types/ # TypeScript types
│ ├── App.tsx
│ └── main.tsx
├── supabase/
│ ├── functions/ # Supabase edge functions
│ └── migrations/ # Database migrations
├── .env # Environment variables (ignored)
├── package.json
├── tailwind.config.ts
├── vite.config.ts
└── README.md

yaml
Copy code

---

## How to Run Locally

### Prerequisites
- Node.js (v18 or later)
- npm

### Steps

1. Clone the repository
   ```bash
   git clone https://github.com/shaktirajv27/CustomerSupportChatBot.git
Navigate to the project directory

bash
Copy code
cd CustomerSupportChatBot
Install dependencies

bash
Copy code
npm install
Start the development server

bash
Copy code
npm run dev
Open the application in your browser

arduino
Copy code
http://localhost:5173
Environment Variables
Create a .env file in the root directory and add the required values:

ini
Copy code
VITE_API_URL=your_api_url_here
VITE_API_KEY=your_api_key_here
Note:

Do not commit the .env file to GitHub

Make sure .env is listed in .gitignore

Production Build
To generate a production-ready build:

bash
Copy code
npm run build
The optimized build will be created inside the dist/ folder.

Code Quality
TypeScript is used for better maintainability

Components and logic are separated clearly

Reusable hooks and utilities are used

ESLint ensures consistent code style

Author
Developed by Shaktiraj Vala

GitHub:
https://github.com/shaktirajv27

Support
If you find this project useful:

Star the repository

Fork it

Share it with others

Your support helps encourage further development and learning.

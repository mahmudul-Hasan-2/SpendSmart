# 💰 SpendSmart - Full-Stack Expense Tracker

SpendSmart is a modern, responsive full-stack web application designed to help users efficiently track, categorize, and visualize their daily expenses. Built as a bootcamp final submission project, it features robust state management, a visual breakdown of spending habits, and a seamless user experience.

## 🚀 Live Demo & Preview

- **Live URL:** [https://spendsmart-client.vercel.app](https://spendsmart-client.vercel.app/)

- **Client App Directory:** `/SpendSmart-client`

- **Server Directory:** `/server`

## 🛠️ Tech Stack

### **Frontend:**

- **Framework:** Next.js 14/15 (App Router, TypeScript)

- **Styling:** Tailwind CSS

- **State Management:** Redux Toolkit (`react-redux`)

- **Data Visualization:** Recharts (Pie Chart distribution)

- **Routing:** Next.js Navigation

### **Backend:**

- **Runtime:** Node.js, Express.js

- **Database:** MongoDB & Mongoose ODM

- **Middleware:** CORS, Dotenv

## ✨ Key Features

- 📊 **Visual Analytics:** Interactive Pie Chart powered by Recharts showing expense distribution by category.

- 🏷️ **Dynamic Filtering:** Filter expenses instantly by category (Food, Transport, Utilities, Entertainment, etc.).

- ➕ **CRUD Operations:** Seamlessly add, edit, and delete expense records.

- 📱 **Responsive UI:** Fully mobile-friendly layout built with Tailwind CSS.

- 🔄 **Global State:** Centralized application state management using Redux Toolkit.

## 📁 Project Structure

```
SpendSmart/
├── server/                 # Express backend API
│   ├── config/             # Database connection
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   └── index.js            # Entry point
└── SpendSmart-client/      # Next.js frontend
    ├── src/
    │   ├── app/            # App router pages (Home, Expenses, Add)
    │   ├── components/     # Modular UI components (Chart, Card, Filter, Form)
    │   ├── store/          # Redux store & expense slice
    │   └── types/          # TypeScript interfaces
    └── package.json

```

## ⚙️ Getting Started Locally

Follow these instructions to run the project locally on your machine.

### **Prerequisites:**

- Node.js installed on your machine

- MongoDB local instance or MongoDB Atlas connection string

### **1. Clone the Repository:**

```
git clone https://github.com/your-username/SpendSmart.git
cd SpendSmart

```

### **2. Setup & Run the Backend:**

```
cd server
npm install

```

Create a `.env` file inside the `server/` directory:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string_here

```

Start the backend server:

```
npm run dev

```

### **3. Setup & Run the Frontend:**

Open a new terminal tab, navigate to the client folder, and start the app:

```
cd SpendSmart-client
npm install
npm run dev

```

Open <http://localhost:3000> in your browser to view the application.

## 👨‍💻 Author

Developed with ❤️ for the bootcamp submission.

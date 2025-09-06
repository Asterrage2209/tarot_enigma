# ✨ Tarot Enigma ✨

Welcome to **Tarot Enigma** – a mystical, AI-powered full-stack application that provides personalized tarot readings. Share your question with the cosmos, and let our intelligent tarot reader unveil the secrets the universe holds for you!

Witness enchanting animations as the AI selects and interprets a three-card spread tailored specifically to your situation, offering guidance and insight just like a real tarot expert.

---

## 🌟 Features

- **AI-Powered Card Selection**: The AI analyzes your question to draw three of the most relevant cards from the 78-card Rider-Waite deck.
- **Personalized AI Interpretations**: Receive a unique reading where the AI interprets each card's meaning in the direct context of your problem, along with a final summary.
- **Full-Stack Architecture**: A robust backend powered by Node.js and Express handles the AI logic and database interactions.
- **MongoDB Database**: All 78 tarot cards, including their descriptions and image URLs, are stored and managed in a MongoDB database.
- **Mystical Animations**: Enjoy a magical user experience with a starry background, glowing effects, and a dynamic card-flip reveal.
- **Responsive Design**: A seamless experience on all devices, from desktops to mobile phones.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or later)
- **npm** or **yarn**
- **MongoDB Atlas Account**: A free account is required to host your database.
- **OpenAI API Key**: To power the AI readings.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/tarot-enigma.git](https://github.com/your-username/tarot-enigma.git)
    cd tarot-enigma
    ```

2.  **Install all dependencies (for server & client):**
    ```sh
    npm install
    ```

3.  **Set up Environment Variables:**
    In the `server/` directory, create a `.env` file and add your secret keys.
    ```
    # server/.env
    MONGO_URI="your_mongodb_connection_string"
    OPENAI_API_KEY="your_openai_api_key"
    ```

4.  **Seed the Database:**
    This one-time command populates your MongoDB database with all 78 tarot cards.
    ```sh
    npm run seed
    ```

5.  **Start the application:**
    This will launch both the backend server and the frontend client.
    ```sh
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧙‍♂️ How to Use

1.  **Enter your name** to begin your journey.
2.  **Ask a question** or describe the problem you're facing.
3.  Click **"Reveal My Reading"** and let the AI consult the cosmos.
4.  Watch as three cards are drawn and revealed for you.
5.  Receive your **personalized, AI-generated tarot reading**.
6.  Click **"Ask Another Question"** to start a new session.

---

## 🪬 Tech Stack

-   **Frontend**: React, TypeScript, Vite, Tailwind CSS
-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB with Mongoose
-   **AI**: OpenAI API

---

## 🗂️ Project Structure
```
/
├── client/         # React Frontend
│   ├── public/
│   ├── src/
│   └── ...
├── server/         # Node.js Backend
│   ├── db/
│   ├── routes/
│   ├── seed/
│   └── ...
├── package.json    # Root package for running both client/server
└── ...
```
---
## 💌 Feedback & Contributions

If you encounter any **issues or bugs**, please let me know at **slapandya1407@gmail.com**.  
Suggestions, improvements, or solutions are always welcome and greatly appreciated!

---

May the stars guide your path! 🌌

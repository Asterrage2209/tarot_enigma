# ✨ Tarot Enigma ✨

Welcome to **Tarot Enigma** – a fully immersive, AI-powered tarot reading experience. Built with a modern full-stack architecture, this application provides deeply personalized guidance by analyzing your unique questions and revealing your destiny through a magical, animated card spread.

Watch as a full deck of 78 cards is laid out before you, overlaid with a mystical, multi-layered background of parallax stars and drifting fog. The AI will select and reveal the three cards most relevant to your journey, providing an insightful interpretation to help you navigate your path.

---

## 🌟 Features

-   **AI-Powered Readings**: Utilizes the Google Gemini API to analyze your problem and select three highly relevant cards from a MongoDB database.
-   **Personalized Interpretations**: The AI generates unique, context-aware interpretations for each card and a final summary, providing guidance tailored to your specific situation.
-   **Immersive 78-Card Grid Animation**: A full deck is displayed face-down, and only the three cards chosen by the AI magically flip and zoom in to reveal your reading.
-   **Dynamic Mystical Background**: A multi-layered background system featuring:
    -   A parallax **starfield** that responds to mouse movement.
    -   A beautiful, shapeless **fog** that drifts slowly and endlessly.
-   **Full-Stack Architecture**: A robust and scalable application with a React/TypeScript frontend and a Node.js/Express backend.
-   **Responsive Design**: A seamless and beautiful experience on all devices, from mobile phones to desktops.

---

## 🚀 Getting Started

### Prerequisites

-   **Node.js** (v18 or later)
-   **npm** or **yarn**
-   **MongoDB Atlas Account**: A free account is required to host the tarot card database.
-   **Google Gemini API Key**: A free key is needed to power the AI readings.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/tarot-enigma.git](https://github.com/your-username/tarot-enigma.git)
    cd tarot-enigma
    ```

2.  **Install all dependencies (for server & client):**
    This command installs packages for both the root, server, and client directories.
    ```sh
    npm install
    ```

3.  **Set up Environment Variables:**
    In the `server/` directory, create a `.env` file by copying `.env.example`. Then, add your secret keys.
    ```
    # server/.env
    MONGO_URI="your_mongodb_connection_string"
    GEMINI_API_KEY="your_google_gemini_api_key"
    ```

4.  **Seed the Database:**
    This one-time command populates your MongoDB database with all 78 tarot cards.
    ```sh
    npm run seed
    ```

5.  **Start the application:**
    This will launch both the backend server and the frontend client concurrently.
    ```sh
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧙‍♂️ How to Use

1.  **Enter your name** to begin your journey.
2.  **Ask a question** or describe the problem weighing on your soul.
3.  Click **"Reveal My Reading"** and watch as the full 78-card spread appears.
4.  Witness the animation as the three cards chosen for you are magically flipped and enlarged.
5.  After the reveal, you'll transition to the reading screen to receive your **personalized, AI-generated tarot reading**.

---

## 🪬 Tech Stack

-   **Frontend**: React, TypeScript, Vite, Tailwind CSS
-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB with Mongoose
-   **AI**: Google Gemini API
-   **Animation**: CSS Animations, JavaScript with HTML Canvas

---

## 🗂️ Project Structure
```
/
├── client/         # React Frontend
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
"""

# To use this, simply copy the text between the triple quotes and paste it into your README.md file.
print("Final README.md content is ready to be copied.")
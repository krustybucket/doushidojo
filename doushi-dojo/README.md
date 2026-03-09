# ⛩️ DoushiDojo

**DoushiDojo** is an interactive, mobile-friendly Japanese verb conjugation practice application built specifically for English speakers. Master your conjugations, build your streak, and conquer the complexities of Japanese grammar.

[**Live Demo**](https://doushidrill.com)

---

## ✨ Features

* 🧠 **Interactive Drilling:** Practice conjugating verbs into essential forms: *Masu, Mashita, Te-form, Nai, and Ta.*
* ⌨️ **Auto-Romaji Conversion:** No Japanese keyboard required! Type in Romaji, and the app automatically converts your input to Hiragana in real-time.
* 👁️ **Masked Readings:** Stuck on a Kanji? Toggle the sentence reading. The answer remains masked until you successfully complete the conjugation.
* 📖 **Verb Form Guide:** A built-in reference guide explaining conjugation rules and highlighting irregular exceptions.
* 🔥 **Gamified Learning:** Track your score and build a daily streak. A "Needs Review" screen at the end of each round helps you learn from your mistakes.
* 🔊 **Text-to-Speech:** Click the speaker icon to hear native Japanese pronunciation for every sentence.
* 🌙 **Dark Mode:** A beautifully designed interface with full support for Light and Dark mode preferences.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | [React](https://reactjs.org/) (Vite) |
| **Styling** | [Tailwind CSS v3](https://tailwindcss.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 🚀 Local Development

To run **DoushiDojo** on your local machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/krustybucket/doushidojo.git](https://github.com/krustybucket/doushidojo.git)
   cd doushidojo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View the app:**
   Open your browser and navigate to `http://localhost:5173`.

---

## 📚 Adding New Verbs

DoushiDojo is designed to be easily expandable. You can add new verbs, tenses, and practice sentences by updating the `CUSTOM_LIBRARY` array in the data section of the code.

### JSON Schema
Use the following format to add a new sentence:

```json
{
  "verb": "読む (yomu)",
  "tense": "Polite Present (Masu)",
  "text": "毎晩、本を[読みます]。",
  "translation": "I read a book every night.",
  "kana": "よみます",
  "reading": "まいばん、 ほん を よみます。",
  "exception": "Optional note about irregular conjugations" 
}
```

> **Note:** Once added to the array, the app automatically detects the new verb and tense, adding them to the **Practice Setup** menu!

---

## 📄 License

This project is open-source and available under the **MIT License**.
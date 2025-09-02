# Infinite Scrollable Calendar

A responsive, infinite-scroll calendar that displays journal entries with a smooth vertical scrolling experience. The visible month updates dynamically in the header based on scroll position. Clicking on a journal entry opens a swipable card interface for browsing entries.

## 🚀 How to Run Locally

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the App**
   ```bash
   npm run dev
   ```
   or
   ```bash
   npm start
   ```

4. **View in Browser**  
   Open http://localhost:5173 (or the port specified in your terminal)

---

## ✅ Assumptions & Design Choices

- **Custom Calendar Rendering**: The calendar grid was built manually without using any pre-built calendar components.
- **Infinite Scrolling**: Implemented to allow seamless navigation through past and future months with minimal performance impact.
- **Dynamic Month Header**: The month and year displayed in the header update based on the month most visible in the viewport.
- **Journal Entry Integration**: Entries are displayed on their respective dates. Clicking an entry opens a swipeable interface to browse other entries.
- **Swipable Card UI**: Enables smooth left/right navigation between journal entries.
- **Responsiveness**: Fully optimized for mobile, tablet, and desktop views.
- **Performance Consideration**: Only the necessary months are rendered to ensure fluid scrolling and reduce memory usage.

---

## 🌐 Live Demo

View Live Demo

## 📁 GitHub Repository

GitHub Repo


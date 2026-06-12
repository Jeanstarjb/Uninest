# UniNest 🏠🤝

**UniNest** is a database-driven student accommodation and roommate matching system designed specifically for university students in Kenya. It centralizes verified property listings and features an empirical roommate compatibility algorithm to help students find suitable housing and compatible living partners.

## 🌟 Features

- **Verified Property Listings:** Browse secure, verified off-campus rental properties tailored for students.
- **Intelligent Roommate Matchmaking:** A weighted compatibility algorithm pairs students based on budget, cleanliness, study hours, and guest tolerance.
- **Secure Registration:** Built with students in mind, providing a safe, verified ecosystem.
- **Intuitive Dashboard:** A responsive single-page application (SPA) offering a seamless search and matching experience.

## 🛠️ Technology Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Django, Django REST Framework (DRF)
- **Database:** SQLite (for MVP)

## 🚀 Getting Started

### Prerequisites
- Node.js
- Python 3.8+

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows use: venv\Scripts\activate
   # On macOS/Linux use: source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install django djangorestframework django-cors-headers
   ```
4. Run migrations and seed the database (if applicable):
   ```bash
   python manage.py migrate
   python seed_db.py
   ```
5. Start the development server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

## 🧠 Roommate Compatibility Algorithm

The core roommate matching engine computes a percentage score based on absolute differences in user preferences. Key weighted factors include:
- **Strict Filter:** Budget differences exceeding 25% are automatically discarded.
- **Cleanliness & Guest Tolerance (40% weight each):** Deductions based on difference scales.
- **Study Hours (20% weight):** Categorical comparisons (e.g., Early Bird vs. Night Owl).

## 📄 Documentation

For a detailed academic breakdown of the system design, algorithms, and implementation, please refer to the [UniNest Project Report](./UniNest_Project_Report.md).
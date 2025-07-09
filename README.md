# NatureHive

**NatureHive** is a platform designed for solo travelers and nature lovers who want to explore beautiful destinations, connect with like-minded people, and feel safe doing so.

---

## project url : https://naturehive-lszi.onrender.com
testuser : 
name : test
gmail : test@gmail.com
password : 1212


## Problem it Solves

Many people, especially solo travelers, want to visit nature spots but don’t always have friends or family to join them. Finding travel groups or strangers online can feel random, unsafe, or unorganized.

**NatureHive** solves this by creating a trusted platform where users can:
- Easily book tickets to nature destinations
- Connect with other travelers who share similar interests
- Share travel stories and photos to build trust and community

---

## Trust and Community

- **Community Sharing:** Users can post their travel stories and photos so others can see real experiences before they book.
- **Verified Profiles:** The plan is to expand with detailed user profiles and interests, so travelers can connect with people who share similar hobbies and travel styles — making trips safer and more enjoyable.

---

## Technologies Used

### Frontend

- **React** — Component-based UI library for building reusable, dynamic interfaces.
- **Vite** — Modern build tool for fast development and instant reloads.
- **React Redux** — State management for bookings, posts, and profiles.
- **React Router** — Navigation between pages like bookings, community posts, and profiles.
- **React Hook Form** — Simple, reliable form handling for signup, posting, and bookings.

### Backend

- **Node.js + Express** — Server for handling APIs for bookings, users, and posts.
- **MongoDB Atlas** — Cloud database to store user data, bookings, and posts.
- **Multer** — Middleware to handle image uploads.
- **Cloudinary** — Image storage and delivery service for user-uploaded photos.
- **Stripe** — Secure payment gateway for booking trips.

---

## Key Features

- Book trips to nature destinations easily.
- Connect with other travelers with similar interests.
- Share travel stories and photos to build trust.
- Make secure payments for bookings directly through the platform.
- Safe, community-based user experience.

---

## Future Improvements

- Add detailed user interests and hobbies for better matching.
- Enhanced user profiles with travel styles and preferences.
- More community features like comments, likes, and verified badges.

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/seyjall/naturehive.git

# Install dependencies
cd naturehive
npm install

# Add environment variables
# Create a .env file for API keys (MongoDB, Cloudinary, Stripe, etc.)

# Run the application
npm run dev

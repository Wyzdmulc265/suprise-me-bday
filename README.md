# Happy Birthday Wishing Site

A fun and interactive birthday wishing application designed for you and your friends.

## Features
- **Runaway Button:** A playful "Surprise Me" button that runs away from the user if they try to click it without entering their name.
- **Countdown & Reveal:** A full-screen 3-2-1 countdown followed by a personalized letter-by-letter reveal of the user's name.
- **Personalized Quotes:** As each letter is revealed, a matching celebratory quote is displayed.
- **The Big Finish:** A final "Happy Birthday {name}!" message with a random birthday wish and a fun confetti effect.

## Tech Stack
- Frontend: React, Tailwind CSS, Framer Motion (for animations), React Confetti (for celebratory effects)
- Backend: Express.js
- Database: PostgreSQL (with Drizzle ORM)
- Routing: wouter
- API Client: React Query

## Database Schema
The database contains two main tables:
1. `wishes`: Stores random birthday wishes.
2. `letter_quotes`: Stores positive, celebratory quotes for each letter of the alphabet.

## Project Structure
- `client/src`: Frontend React application.
- `server`: Backend Express application handling API requests.
- `shared/schema.ts`: Shared database schema and Zod validation types.
- `shared/routes.ts`: Shared API route definitions.
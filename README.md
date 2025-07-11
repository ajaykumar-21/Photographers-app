# Photographer Listing App

A responsive web application built using **Next.js (App Router)**, **Tailwind CSS**, and **Context API**, featuring a Category Listing Page and Photographer Profile Page with filtering, sorting, pagination, and search functionality.

---

## 🔍 Features

### 🏠 Category Listing Page

- Photographer Cards with:
  - Name, Location, Price, Rating, Tags, and Profile Picture
- 🔍 Search Bar (fuzzy match: name, tags, location)
- 🎯 Filters:
  - Price Range
  - Rating
  - Styles (checkbox)
  - City dropdown
- 🔃 Sorting:
  - Price: Low to High
  - Rating: High to Low
  - Recently Added
- 📄 Pagination with “Load More” button
- 💡 Debounced search input

### 📄 Photographer Profile Page

- Detailed profile:
  - Bio, Styles, Price, Tags
- Gallery (grid view)
- Reviews with rating and date
- Inquiry form (modal popup)

---

## 🛠 Tech Stack

- **Framework**: Next.js (App Router, JavaScript)
- **Styling**: Tailwind CSS
- **State Management**: Context API
- **API**: Mock API using `json-server`
- **Deployment**: Vercel

---

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/ajaykumar-21/Photographers-app.git
cd photographer-app
```

## Install Dependencies

- npm install

## Start JSON Server (Mock API)

- npx json-server --watch db.json --port 3001

## Start the App

- npm run dev

## 📁 Folder Structure

src/
├── app/ # App Router structure
│ ├── page.js # Category Listing Page
│ └── [id]/page.js # Photographer Profile Page
├── components/ # Reusable UI components
├── context/ # PhotographerContext for state
public/images/ # Static profile & gallery images
db.json # Mock API data

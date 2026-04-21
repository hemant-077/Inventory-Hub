# Inventory Hub

Inventory Hub is a React + Vite product catalog app for managing inventory items with a clean dark UI.

## Features

- View all products in a responsive dashboard
- Filter products by category
- Add new products
- Edit existing products
- View detailed product page
- Delete products
- Local persistence using `localStorage`

## Tech Stack

- React 18
- React Router DOM
- Vite
- Tailwind CSS
- Axios
- React Toastify

## Project Structure

```text
src/
  components/    UI screens and shared UI blocks
  Utils/         context and API utility
  App.jsx        route layout
  main.jsx       app bootstrap
```

## Routes

- `/` - Home dashboard
- `/create` - Add product form
- `/details/:id` - Product details
- `/edit/:id` - Edit product form

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

## Lint

```bash
npm run lint
```

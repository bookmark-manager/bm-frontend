# 🔖 Bookmark Manager Frontend

A modern React frontend for the Bookmark Manager API, built with TypeScript, Vite, and Mantine UI components.

## ✨ Features

- **Modern UI** - Clean, minimalist design with Mantine components
- **Real-time Search** - Debounced search across bookmark titles and URLs
- **CRUD Operations** - Create, read, update, and delete bookmarks with intuitive modals
- **Pagination** - Efficient browsing through large bookmark collections
- **Export Functionality** - Download bookmarks as Netscape HTML format
- **TypeScript** - Full type safety and excellent developer experience
- **Form Validation** - Client-side validation with helpful error messages

## 🛠 Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **UI Library**: Mantine 8
- **State Management**: TanStack Query (React Query)
- **Form Handling**: Mantine Form with validation
- **Icons**: Lucide React
- **Styling**: CSS Modules + PostCSS

## 🚀 Quick Start

### Prerequisites

- Node.js 22+ and pnpm
- Docker (for containerized deployment)
- Running Bookmark Manager API backend

### Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/bookmark-manager/bm-frontend.git
   cd bookmark-manager-frontend
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Configure environment**

   ```bash
   # Create .env file
   echo "VITE_BASE_URL=http://localhost:8080/api/v1" > .env
   ```

4. **Start development server**

   ```bash
   pnpm dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

### Docker Deployment

1. **Build and run with Docker Compose**

   ```bash
   # Using justfile (recommended)
   just up

   # Or directly with Docker Compose
   docker compose up -d
   ```

2. **Access the application**
   ```
   http://localhost:5173
   ```

### Production Build

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 📋 Available Scripts

| Command   | Description              |
| --------- | ------------------------ |
| `dev`     | Start development server |
| `build`   | Build for production     |
| `lint`    | Run ESLint               |
| `preview` | Preview production build |

### Justfile Commands

```bash
just up          # Start containerized app
just down        # Stop containers
just logs        # View container logs
just rebuild     # Rebuild and restart
just fresh-start # Clean restart
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Backend API base URL
VITE_BASE_URL=http://localhost:8080/api/v1

# Development server host (optional)
VITE_HOST=0.0.0.0
```

### API Integration

The frontend expects the backend API to be running with the following endpoints:

- `GET /api/v1/bookmarks` - List bookmarks with pagination & search
- `POST /api/v1/bookmarks` - Create bookmark
- `PATCH /api/v1/bookmarks/:id` - Update bookmark
- `DELETE /api/v1/bookmarks/:id` - Delete bookmark
- `GET /api/v1/bookmarks/export/html` - Export bookmarks

## 🎨 Features Overview

### Bookmark Management

- **Add Bookmarks**: Modal form with URL validation
- **Edit Bookmarks**: In-place editing with pre-populated data
- **Delete Bookmarks**: Confirmation modal to prevent accidental deletion
- **Search**: Real-time search with 500ms debouncing

### User Experience

- **Favicon Display**: Automatic favicon fetching for visual recognition
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages
- **Export Feature**: One-click HTML bookmark export

### Technical Features

- **Type Safety**: Full TypeScript coverage
- **Query Caching**: Optimized API calls with React Query
- **Form Validation**: Real-time validation with helpful messages
- **Code Splitting**: Optimized bundle sizes

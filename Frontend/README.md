# Frontend - Campus Sathi

Modern React + TypeScript application with a clean, intuitive interface for querying academic documents.

## 🎨 Tech Stack

- **Framework**: React 18.3 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Animations**: Framer Motion
- **Routing**: React Router
- **State**: React Context API
- **Notifications**: Sonner

## 🚀 Quick Start

1. **Install dependencies**
```bash
npm install
# or
bun install
```

2. **Configure environment**
```bash
cp .env.example .env
# Edit .env if backend URL is different
```

3. **Run development server**
```bash
npm run dev
# or
bun run dev
```

App will be available at `http://localhost:5173` or `http://localhost:8080`

4. **Build for production**
```bash
npm run build
```

## 📂 Project Structure

```
Frontend/
├── src/
│   ├── pages/              # Page components
│   │   ├── Login.tsx       # Role selection page
│   │   ├── UserDashboard.tsx    # Student portal
│   │   └── AdminDashboard.tsx   # Admin portal
│   ├── components/         # Reusable components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── Navigation.tsx # Top navigation bar
│   │   └── UserProfile.tsx # Profile component
│   ├── contexts/          # React contexts
│   │   ├── AuthContext.tsx    # Authentication
│   │   └── DataContext.tsx    # Global state
│   ├── lib/               # Utilities
│   │   ├── api.ts        # API client
│   │   └── utils.ts      # Helper functions
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
├── tailwind.config.ts   # Tailwind configuration
├── tsconfig.json        # TypeScript config
└── package.json         # Dependencies
```

## 🎭 Features

### Student Portal
- **Document Selection** - Choose specific documents or query all
- **Natural Language Queries** - Ask questions in plain English
- **Example Questions** - Quick-start with pre-written queries
- **Structured Responses** - Answers with collapsible reasoning and sources
- **Processing Time** - See how fast the AI responds
- **Tips Sidebar** - Helpful guidance for better queries

### Admin Portal
- **Upload Documents** - Add new PDFs for indexing
- **View All Documents** - See list of indexed PDFs with metadata
- **Delete Documents** - Remove documents from the system
- **Statistics Dashboard** - Total documents, chunks, and system stats

### Common Features
- **No Authentication** - Simple role selection (Student/Admin)
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Dark Theme** - Modern glassmorphism design
- **Real-time Updates** - Instant feedback via toast notifications

## 🔌 API Integration

The frontend communicates with the backend via `src/lib/api.ts`:

```typescript
// Query documents
const response = await queryDocuments({
  query: "When is the DBMS exam?",
  document_id: "optional_doc_id",
  top_k: 5
});

// Upload document
const response = await uploadDocument(pdfFile);

// List documents
const docs = await listDocuments();

// Delete document
await deleteDocument(documentId);
```

Environment variable for API URL:
```env
VITE_API_URL=http://localhost:8000
```

## 🎨 UI Components

Built with **shadcn/ui** and **Radix UI**:

- `Button` - Custom styled buttons
- `Input` - Text input fields
- `Select` - Dropdown selectors
- `Badge` - Status indicators
- `Card` - Container components
- `Dialog` - Modal dialogs
- `Tooltip` - Hover tooltips

All components in `src/components/ui/` are from shadcn/ui.

## 🎯 Key Pages

### Login.tsx
- Two clickable cards for role selection
- Instant navigation to respective portal
- No username/password required

### UserDashboard.tsx
- Left sidebar with:
  - Document selector dropdown
  - Tips section
  - Example questions
  - Quick actions
- Main chat area with:
  - Welcome message (empty state)
  - Message bubbles (user/AI)
  - Collapsible reasoning
  - Collapsible sources with relevance scores
- Bottom input with send button

### AdminDashboard.tsx
- Statistics cards at top
- Upload button for new documents
- List of all indexed documents
- Delete button per document
- Document metadata (filename, chunks, ID)

## 🎨 Styling

**Tailwind CSS** with custom configuration:

```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      // Custom purple/blue theme
    },
    animation: {
      // Custom animations
    }
  }
}
```

**Custom CSS** in `index.css`:
- Neural grid background pattern
- Glassmorphism effects
- Nebula glow animations
- Custom scrollbars

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Adding New Pages

1. Create component in `src/pages/`
2. Add route in `App.tsx`:
```tsx
<Route path="/new-page" element={<NewPage />} />
```
3. Update navigation if needed

### Adding New UI Components

Use shadcn/ui CLI:
```bash
npx shadcn@latest add <component-name>
```

Example:
```bash
npx shadcn@latest add alert
```

## 📱 Responsive Breakpoints

- `sm`: 640px (mobile)
- `md`: 768px (tablet)
- `lg`: 1024px (laptop)
- `xl`: 1280px (desktop)
- `2xl`: 1536px (large desktop)

## 🐛 Troubleshooting

**Build errors?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors?**
- Check `tsconfig.json` includes all necessary files
- Run `npm run build` to see all errors

**Styling not working?**
- Ensure Tailwind is processing: check `tailwind.config.ts`
- Clear build cache: `rm -rf dist .vite`

**API calls failing?**
- Verify backend is running on correct port
- Check `VITE_API_URL` in `.env`
- Open browser console for CORS errors

## 🔐 Environment Variables

Create `.env` file:
```env
VITE_API_URL=http://localhost:8000
```

Access in code:
```tsx
const apiUrl = import.meta.env.VITE_API_URL;
```

## 📦 Build Output

Production build creates:
```
dist/
├── assets/
│   ├── index-*.js      # Bundled JavaScript
│   └── index-*.css     # Bundled CSS
└── index.html          # Entry HTML
```

Deploy the `dist/` folder to your hosting service.

## 🚀 Deployment

### Vercel/Netlify
```bash
npm run build
# Deploy dist/ folder
```

### Custom Server
```bash
npm run build
# Serve dist/ with nginx, apache, etc.
```

---

For more details, see the [main README](../README.md).

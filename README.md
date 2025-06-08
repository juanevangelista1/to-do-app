# 📋 To-Do App

A modern, responsive task management application built with Next.js 14, TypeScript, and SCSS. Features a clean interface with light/dark theme support, drag-and-drop functionality, and intuitive task organization.

## ✨ Features

### 🎯 Core Functionality

- **Task Management**: Create, edit, delete, and mark tasks as complete
- **Date-based Organization**: Organize tasks by specific dates with a weekly calendar view
- **Drag & Drop**: Reorder tasks using intuitive drag-and-drop functionality
- **Persistent Storage**: Tasks are saved locally using localStorage
- **Responsive Design**: Fully responsive interface that works on desktop, tablet, and mobile

### 🎨 User Experience

- **Light/Dark Theme**: Toggle between light and dark modes with persistent preference
- **Modern UI**: Clean, minimalist design with smooth animations and transitions
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support
- **User Personalization**: Custom username setup with welcome messages
- **Task Editing**: Inline editing with save/cancel buttons and keyboard support

### 📅 Calendar Integration

- **Weekly Calendar**: Visual calendar interface for date selection
- **Today Highlighting**: Current date is highlighted in the calendar
- **Date-based Task Filtering**: View tasks for specific dates
- **Intuitive Navigation**: Easy date switching with visual feedback

## 🛠️ Technology Stack

### Frontend Framework

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **React 18**: Latest React features and hooks

### Styling & UI

- **SCSS/Sass**: Advanced CSS preprocessing
- **CSS Custom Properties**: Dynamic theming with CSS variables
- **Responsive Design**: Mobile-first approach

### State Management & Data

- **React Context**: Theme management and global state
- **localStorage**: Persistent data storage
- **Custom Hooks**: Reusable logic and state management

### Drag & Drop

- **@dnd-kit/core**: Core drag-and-drop functionality
- **@dnd-kit/sortable**: Task reordering implementation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/juan-evangelista/to-do-app.git
   cd to-do-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/
│   ├── components/          # React components
│   │   ├── Header.tsx      # Application header with theme toggle
│   │   ├── SimpleThemeToggle.tsx  # Theme switching component
│   │   ├── WeekCalendar.tsx       # Weekly calendar view
│   │   ├── TaskList.tsx           # Task list with drag & drop
│   │   ├── TaskItem.tsx           # Individual task component
│   │   ├── SortableTaskItem.tsx   # Draggable task wrapper
│   │   ├── AddTaskModal.tsx       # Add new task modal
│   │   ├── ConfirmDeleteModal.tsx # Delete confirmation modal
│   │   └── Button.tsx             # Reusable button component
│   ├── styles/             # SCSS stylesheets
│   │   ├── globals.scss           # Global styles and theme variables
│   │   ├── header.scss            # Header component styles
│   │   ├── tasks.scss             # Task-related styles
│   │   ├── weekCalendar.scss      # Calendar component styles
│   │   ├── taskList.scss          # Task list styles
│   │   ├── modals.scss            # Modal component styles
│   │   ├── buttons.scss           # Button component styles
│   │   └── themeToggle.scss       # Theme toggle styles
│   ├── services/           # Business logic
│   │   └── taskStorage.ts         # Local storage service
│   ├── types/              # TypeScript type definitions
│   │   └── task.ts               # Task and component interfaces
│   ├── utils/              # Utility functions
│   │   └── dateUtils.ts          # Date formatting utilities
│   ├── layout.tsx          # Root layout component
│   └── page.tsx            # Main application page
```

## 🎨 Theme System

The application features a comprehensive theming system with:

### Light Theme

- Clean white backgrounds
- Dark text for optimal readability
- Subtle shadows and borders
- Blue accent colors

### Dark Theme

- Dark backgrounds for reduced eye strain
- Light text for contrast
- Enhanced shadows for depth
- Adjusted color palette for dark mode

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

## 📱 Responsive Design

The application is fully responsive with breakpoints for:

- **Desktop**: Full feature set with optimal layout
- **Tablet**: Adjusted spacing and touch-friendly interactions
- **Mobile**: Stacked layout with mobile-optimized controls

## 🔒 Data Persistence

- Tasks are stored locally using localStorage
- Theme preferences are persisted across sessions
- User names are saved for personalized experience
- No external database required

## 🎯 Key Features Explained

### Task Management

- **Create**: Add new tasks with a modal interface
- **Edit**: Click on task names to edit with save/cancel buttons
- **Delete**: Remove tasks with confirmation dialog
- **Complete**: Toggle task completion status
- **Reorder**: Drag and drop to reorder tasks

### Calendar Integration

- **Weekly View**: See tasks organized by week
- **Date Selection**: Click dates to filter tasks
- **Visual Feedback**: Today and selected dates are highlighted
- **Responsive**: Calendar adapts to screen size

## 🤝 Contributing

This is an open-source project. Contributions are welcome!

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Drag and drop powered by [@dnd-kit](https://dndkit.com/)
- Icons from [Feather Icons](https://feathericons.com/)
- Font: [Inter Tight](https://fonts.google.com/specimen/Inter+Tight)

## 📞 Support

If you have any questions or need help, please:

- Open an issue on GitHub
- Check the existing issues for solutions
- Review the documentation

---

**Made with ❤️ by Juan Evangelista using Next.js and TypeScript**

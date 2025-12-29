
https://github.com/user-attachments/assets/7997cb21-6b3a-4c88-9004-305ca7d84ec5
# Research Discovery Platform

A professional web application that helps researchers discover relevant academic papers by analyzing Google Scholar profiles and generating AI-powered recommendations.

## Features

### Authentication & User Management
- **User Registration & Login**: Secure authentication system with email and password
- **Protected Dashboard**: Access saved profiles and manage your research library
- **User Profile**: Personalized user experience with avatar and account management
- **Session Management**: Persistent login with secure logout functionality

### Profile Analysis & Management
- **Multi-Platform Support**: Paste any Google Scholar profile URL to analyze a researcher's work
- **Editable Profiles**: Customize and refine retrieved research profiles
  - Edit researcher name and affiliation
  - Add or remove research areas
  - Modify research topics
  - Update research summary
- **Profile Saving**: Save analyzed profiles to your dashboard for quick access
- **Comprehensive Research Insights**: View detailed research areas, topics, and AI-generated summaries

### Smart Paper Recommendations
- **AI-Powered Suggestions**: Intelligent paper recommendations based on research profile analysis
- **Advanced Filtering System**:
  - Filter papers by publication year range (2000-2025)
  - Filter by research topics and keywords
  - Real-time filter updates showing X of Y papers
- **Rich Paper Information**:
  - Title, authors, venue, and publication year
  - Full abstracts with text highlighting
  - Keywords and research topics
  - Relevance scores (0-100%) with AI-generated reasoning
- **Text Highlighting**: Select and highlight important text in abstracts and relevance explanations
- **Paper Management**:
  - Add custom papers to recommendations
  - Edit and remove papers from the list
  - Save personalized paper lists to profiles
- **Multiple Access Methods**:
  - Direct links to papers and Google Scholar
  - PDF viewer for uploaded papers
  - Support for both URL links and PDF attachments

### Email Generation & Outreach
- **One-Click Email Templates**: Generate professional emails to contact paper authors
- **Customizable Information**:
  - Your name and affiliation
  - Personalized message templates
- **Copy to Clipboard**: Easy sharing and sending

### Dashboard & Organization
- **Saved Profiles Dashboard**: Centralized view of all analyzed research profiles
- **Profile Cards**: Visual overview with:
  - Researcher name and affiliation
  - Profile type (Google Scholar, etc.)
  - Top research areas
  - Date saved
- **Quick Actions**: View or delete saved profiles with one click
- **Empty State Guidance**: Helpful prompts when no profiles are saved

### User Interface & Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI Components**: Built with shadcn/ui for a polished look
- **Sticky Navigation**: Always-accessible header with authentication state
- **Filter Sidebar**: Collapsible sidebar with year range slider and topic checkboxes
- **Loading States**: Skeleton screens and loading indicators
- **Toast Notifications**: Real-time feedback for user actions
- **Dark Mode Ready**: Theme support with next-themes

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Authentication**: React Context API with localStorage
- **Analytics**: Vercel Analytics
- **State Management**: React Hooks and Context

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd research-platform
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout with fonts and providers
│   ├── page.tsx                # Landing page with hero and features
│   ├── globals.css             # Global styles and design tokens
│   ├── login/
│   │   └── page.tsx            # User login page
│   ├── signup/
│   │   └── page.tsx            # User registration page
│   ├── dashboard/
│   │   └── page.tsx            # Saved profiles dashboard
│   └── profile/[id]/
│       └── page.tsx            # Profile analysis page
├── components/
│   ├── navigation.tsx          # Header navigation with auth
│   ├── hero.tsx                # Landing page hero section
│   ├── features.tsx            # Features showcase
│   ├── profile-header.tsx      # Profile header with save button
│   ├── research-profile.tsx    # Research areas, topics, and summary
│   ├── paper-recommendations.tsx # Paper cards with recommendations
│   ├── filter-sidebar.tsx      # Year and topic filters
│   ├── add-paper-dialog.tsx    # Manual paper addition
│   ├── pdf-viewer-dialog.tsx   # PDF viewing modal
│   ├── email-dialog.tsx        # Email generation modal
│   ├── highlightable-text.tsx  # Text selection and highlighting
│   └── ui/                     # shadcn/ui components
├── contexts/
│   └── auth-context.tsx        # Authentication state management
└── README.md
```

## Usage

### For New Users

1. **Sign Up**: Create an account on the signup page
2. **Log In**: Access your account with email and password
3. **Analyze a Profile**: On the landing page, paste a Google Scholar profile URL
4. **Review Results**: View research profile analysis and paper recommendations
5. **Filter Papers**: Use the sidebar to filter by year and topics
6. **Edit & Customize**: Click "Edit Profile" or "Edit Papers" to refine results
7. **Save**: Click "Save Profile" to add to your dashboard
8. **Contact Authors**: Use "Contact Authors" to generate outreach emails

### Advanced Features

- **Text Highlighting**: Select text in abstracts or relevance reasons to highlight important information
- **Add Custom Papers**: Click "Add Paper" while editing to manually include relevant papers
- **PDF Upload**: Attach PDF files when adding papers for offline viewing
- **Filter Combinations**: Use multiple topic filters with year ranges for precise results

## Development

### Build for Production

```bash
npm run build
```

### Run Production Build

```bash
npm start
```

### Lint Code

```bash
npm run lint
```

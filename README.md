# Research Discovery Platform MVP

A professional web application that helps researchers discover relevant academic papers by analyzing Google Scholar profiles and generating AI-powered recommendations.

## Features

### 🔍 Profile Analysis
- Paste any Google Scholar profile URL to analyze a researcher's work
- View comprehensive research areas and topics
- Get AI-generated summaries of research focus

### 📚 Smart Paper Recommendations
- AI-powered paper suggestions based on research profile
- Detailed information including title, authors, venue, year, and abstract
- Relevance scores with reasoning for each recommendation
- Direct links to papers and Google Scholar

### ✉️ Email Generation
- One-click email template generation for contacting paper authors
- Customizable sender information (name and affiliation)
- Professional, personalized outreach messages
- Copy to clipboard functionality

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository or download the project files

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

\`\`\`
├── app/
│   ├── layout.tsx          # Root layout with fonts and providers
│   ├── page.tsx            # Landing page
│   ├── globals.css         # Global styles and design tokens
│   └── profile/[id]/
│       └── page.tsx        # Profile analysis page
├── components/
│   ├── hero.tsx            # Landing page hero section
│   ├── features.tsx        # Features showcase
│   ├── profile-header.tsx  # Profile header with back navigation
│   ├── research-profile.tsx # Research areas and topics display
│   ├── paper-recommendations.tsx # Paper cards with recommendations
│   ├── email-dialog.tsx    # Email generation modal
│   └── ui/                 # shadcn/ui components
└── README.md
\`\`\`

## Usage

### Testing the Sample Profile

1. On the landing page, paste any URL into the search box (e.g., `https://scholar.google.com/citations?user=example`)
2. Click "Analyze Profile" to view the sample profile
3. Browse the research areas, topics, and AI-generated summary
4. Scroll down to see recommended papers with relevance scores
5. Click "Contact Authors" on any paper to generate a personalized email
6. Customize your name and affiliation, then copy the email template

### Customization

The design uses CSS custom properties defined in `app/globals.css`. You can easily customize:
- Colors (primary, accent, background, foreground)
- Border radius
- Fonts (configured in `app/layout.tsx`)

## Future Enhancements

- Real Google Scholar API integration
- User authentication and saved profiles
- Advanced filtering and sorting for recommendations
- Export recommendations to citation managers
- Collaboration features for research teams

## License

This is an MVP demonstration project.

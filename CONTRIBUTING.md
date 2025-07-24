# Contributing to Woozi Chrome Extension

Thank you for your interest in contributing to Woozi! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Issues

1. **Search existing issues** to avoid duplicates
2. **Use clear, descriptive titles** for your issue
3. **Provide detailed information** including:
   - Steps to reproduce the issue
   - Expected vs actual behavior
   - Chrome version and OS
   - Extension version
   - Screenshots if applicable

### Suggesting Features

1. **Check existing feature requests** to avoid duplicates
2. **Create detailed feature requests** including:
   - Clear description of the feature
   - Use cases and benefits
   - Possible implementation approach
   - Mockups or wireframes if applicable

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+ and pnpm
- Chrome browser for testing
- Supabase account for database access
- Git for version control

### Initial Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/woozi-wxt.git
   cd woozi-wxt
   ```

3. **Install dependencies**:
   ```bash
   pnpm install
   ```

4. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

5. **Start development server**:
   ```bash
   pnpm dev
   ```

6. **Load extension in Chrome**:
   - Go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select `.output/chrome-mv3/`

## 📝 Coding Standards

### Code Style

- **TypeScript**: Use TypeScript for all new code
- **Naming**: Use camelCase for variables/functions, PascalCase for components
- **Components**: Use functional components with hooks
- **Imports**: Use absolute imports when possible

### Component Structure

```typescript
// Good component structure
import React, { useState } from 'react';
import { ComponentProps } from '../types/component';

interface MyComponentProps {
  title: string;
  onAction: () => void;
}

export function MyComponent({ title, onAction }: MyComponentProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    onAction();
    setIsLoading(false);
  };

  return (
    <div className="component-container">
      <h2>{title}</h2>
      <button onClick={handleClick} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Action'}
      </button>
    </div>
  );
}
```

### File Organization

```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── auth/         # Authentication components
│   ├── collections/  # Feature-specific components
│   └── screens/      # Page-level components
├── lib/              # Utility functions & API clients
├── types/            # TypeScript type definitions
└── assets/           # Static assets
```

## 🎨 UI Guidelines

### Design System

- **Colors**: Use Tailwind CSS color palette
- **Typography**: Consistent font sizes and weights
- **Spacing**: Follow Tailwind spacing conventions
- **Icons**: Use Lucide React icons consistently

### Responsive Design

- **Mobile First**: Design for small screens first
- **Chrome Extension**: Optimize for 400-800px widths
- **Side Panel**: Consider Chrome's side panel constraints

## 🧪 Testing

### Manual Testing

1. **Test in Chrome**: Always test in actual Chrome extension environment
2. **Different States**: Test loading, error, and success states
3. **Authentication**: Test sign-in/sign-out flows
4. **Data Operations**: Test CRUD operations for collections

### Before Submitting

- [ ] Extension loads without errors
- [ ] All features work as expected
- [ ] No console errors or warnings
- [ ] TypeScript compilation passes
- [ ] Code follows style guidelines

## 📦 Pull Request Process

### Before Creating PR

1. **Create feature branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Make your changes** following coding standards

3. **Test thoroughly** in Chrome extension environment

4. **Commit with clear messages**:
   ```bash
   git commit -m "feat: add amazing new feature"
   ```

### PR Guidelines

1. **Clear Title**: Use descriptive, concise titles
2. **Detailed Description**: Explain what, why, and how
3. **Screenshots**: Include before/after screenshots for UI changes
4. **Testing**: Describe how you tested the changes
5. **Breaking Changes**: Highlight any breaking changes

### PR Template

```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested in Chrome extension environment
- [ ] Manual testing completed
- [ ] No console errors

## Screenshots
(If applicable, add screenshots here)

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
```

## 🌟 Good First Issues

Looking for ways to contribute? Look for issues labeled:
- `good first issue`: Perfect for newcomers
- `help wanted`: Community contributions welcome
- `bug`: Bug fixes needed
- `enhancement`: Feature improvements

## 🔄 Code Review Process

1. **Maintainer Review**: All PRs reviewed by maintainers
2. **Feedback Address**: Address all review comments
3. **Approval Required**: At least one approval needed
4. **Merge**: Maintainers will merge approved PRs

## 📋 Development Commands

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm type-check   # Run TypeScript checks

# Extension testing
pnpm zip          # Create ZIP for testing
```

## 🚀 Release Process

1. **Version Bump**: Update version in `package.json`
2. **Changelog**: Update CHANGELOG.md with changes
3. **Build**: Create production build
4. **Test**: Thorough testing of built extension
5. **Tag**: Create git tag for release
6. **Publish**: Release to Chrome Web Store

## 💬 Communication

- **Issues**: Use GitHub issues for bugs and features
- **Discussions**: Use GitHub discussions for questions
- **Email**: Contact maintainers for sensitive issues

## 📜 Code of Conduct

### Our Standards

- **Respectful**: Be respectful and inclusive
- **Collaborative**: Work together constructively
- **Professional**: Maintain professional communication
- **Helpful**: Help others learn and contribute

### Unacceptable Behavior

- Harassment or discrimination
- Trolling or insulting comments
- Publishing private information
- Inappropriate conduct

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to Woozi! 🎉
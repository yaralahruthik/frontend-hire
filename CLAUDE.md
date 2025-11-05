# CLAUDE.md - Project Context for Claude Code

## Project Overview

**Frontend Hire** is a Next.js application built with Fumadocs, focused on delivering high-quality, structured frontend content.

## Tech Stack

- **Framework**: Next.js
- **Documentation**: Fumadocs
- **Package Manager**: pnpm
- **Language**: TypeScript

## Project Structure

- `/app` - Next.js app directory
- `/content` - Documentation content
- `/components` - React components
- `/public` - Static assets
- Configuration files: `next.config.mjs`, `tsconfig.json`, `source.config.ts`

## Development Guidelines

### Package Management
- This project uses **pnpm** as the package manager
- Install dependencies: `pnpm install`
- Run dev server: `pnpm dev`
- Build: `pnpm build`

### Code Quality
- TypeScript is used throughout the project
- Follow the existing code style and patterns
- Maintain high quality standards consistent with the project's goals

### Contributions
- This project does **not accept external contributions**
- The author maintains consistent quality standards
- Issues are welcome for bug reports, suggestions, and content ideas

## Common Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

## Image Optimization

- The project includes a `convert_to_webp.sh` script for image optimization
- WebP format is preferred for images

## Documentation

- Built with Fumadocs
- Configuration in `source.config.ts`
- Content likely stored in a content directory

## Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Fumadocs Documentation](https://fumadocs.vercel.app)

## Notes for Claude Code

When working on this project:
1. Use pnpm for all package operations
2. Maintain TypeScript typing throughout
3. Follow Next.js best practices
4. Respect the project's quality standards
5. Be mindful that this is a documentation-focused project

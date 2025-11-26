import Fuse from 'fuse.js';

export interface RouteMatch {
  path: string;
  score: number;
}

export interface FuzzyMatchOptions {
  /**
   * Maximum score threshold for considering a match valid (0-1, lower is better).
   * Default: 0.4
   */
  threshold?: number;

  /**
   * Whether to include extended match information
   * Default: false
   */
  includeScore?: boolean;
}

/**
 * Finds the closest matching route using fuzzy matching.
 *
 * This function helps handle:
 * - Hallucinated URLs from AI assistants (ChatGPT, etc.)
 * - User typos in manually typed URLs
 * - Slightly renamed routes (backward compatibility)
 *
 * @param targetPath - The path that was attempted (e.g., "/learn/frontend-develpoment")
 * @param availablePaths - List of all valid paths (e.g., ["/learn/frontend-development", ...])
 * @param options - Configuration options for fuzzy matching
 * @returns The best matching path if found within threshold, otherwise null
 *
 * @example
 * ```ts
 * const match = findClosestRoute('/learn/frontend-develpoment', [
 *   '/learn/frontend-development',
 *   '/learn/backend-development',
 * ]);
 * // Returns: '/learn/frontend-development'
 * ```
 */
export function findClosestRoute(
  targetPath: string,
  availablePaths: string[],
  options: FuzzyMatchOptions = {}
): string | null {
  const { threshold = 0.4, includeScore = false } = options;

  if (!targetPath || availablePaths.length === 0) {
    return null;
  }

  // Normalize paths for comparison
  const normalizedTarget = normalizePath(targetPath);
  const normalizedPaths = availablePaths.map(normalizePath);

  // First try exact match (case-insensitive)
  const exactMatchIndex = normalizedPaths.indexOf(normalizedTarget);
  if (exactMatchIndex !== -1) {
    return availablePaths[exactMatchIndex];
  }

  // Configure Fuse.js for fuzzy matching
  const fuse = new Fuse(availablePaths, {
    includeScore: true,
    threshold, // 0.0 = exact match, 1.0 = match anything
    keys: ['path'],
    ignoreLocation: true, // Don't consider position of match
    minMatchCharLength: 2,
    distance: 100, // How far apart matched characters can be
    // Use extended search for better matching
    useExtendedSearch: false,
  });

  // Perform fuzzy search
  const results = fuse.search(targetPath);

  if (results.length === 0) {
    return null;
  }

  const bestMatch = results[0];

  // Return best match if it's within threshold
  if (bestMatch.score !== undefined && bestMatch.score <= threshold) {
    return bestMatch.item;
  }

  return null;
}

/**
 * Finds the closest matching route with detailed match information.
 *
 * @param targetPath - The path that was attempted
 * @param availablePaths - List of all valid paths
 * @param options - Configuration options for fuzzy matching
 * @returns Match information including path and score, or null if no match
 */
export function findClosestRouteWithScore(
  targetPath: string,
  availablePaths: string[],
  options: FuzzyMatchOptions = {}
): RouteMatch | null {
  const { threshold = 0.4 } = options;

  if (!targetPath || availablePaths.length === 0) {
    return null;
  }

  const normalizedTarget = normalizePath(targetPath);
  const normalizedPaths = availablePaths.map(normalizePath);

  // Check for exact match
  const exactMatchIndex = normalizedPaths.indexOf(normalizedTarget);
  if (exactMatchIndex !== -1) {
    return {
      path: availablePaths[exactMatchIndex],
      score: 0,
    };
  }

  const fuse = new Fuse(availablePaths, {
    includeScore: true,
    threshold,
    ignoreLocation: true,
    minMatchCharLength: 2,
    distance: 100,
  });

  const results = fuse.search(targetPath);

  if (results.length === 0) {
    return null;
  }

  const bestMatch = results[0];

  if (bestMatch.score !== undefined && bestMatch.score <= threshold) {
    return {
      path: bestMatch.item,
      score: bestMatch.score,
    };
  }

  return null;
}

/**
 * Normalizes a path for comparison:
 * - Removes leading/trailing slashes
 * - Converts to lowercase
 * - Removes query strings and hash fragments
 */
function normalizePath(path: string): string {
  return path
    .toLowerCase()
    .replace(/^\/+|\/+$/g, '') // Remove leading/trailing slashes
    .split('?')[0] // Remove query string
    .split('#')[0]; // Remove hash
}

/**
 * Extracts all page slugs from a fumadocs source and converts them to full paths.
 *
 * @param pages - Array of page objects with slugs property
 * @param baseUrl - Base URL to prepend to slugs (e.g., '/learn')
 * @returns Array of full paths
 */
export function getPagesAsPaths(
  pages: Array<{ slugs: string[] }>,
  baseUrl: string = ''
): string[] {
  return pages.map((page) => {
    const slugPath = page.slugs.join('/');
    return baseUrl ? `${baseUrl}/${slugPath}` : `/${slugPath}`;
  });
}

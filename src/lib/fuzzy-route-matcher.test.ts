import { describe, expect, it } from 'vitest';
import {
  findClosestRoute,
  findClosestRouteWithScore,
  getPagesAsPaths,
} from './fuzzy-route-matcher';

describe('fuzzy-route-matcher', () => {
  describe('findClosestRoute', () => {
    it('should return exact match when available', () => {
      const availablePaths = [
        '/learn/frontend-development',
        '/learn/backend-development',
        '/learn/devops',
      ];

      const result = findClosestRoute(
        '/learn/frontend-development',
        availablePaths
      );

      expect(result).toBe('/learn/frontend-development');
    });

    it('should handle case-insensitive exact matches', () => {
      const availablePaths = [
        '/learn/Frontend-Development',
        '/learn/Backend-Development',
      ];

      const result = findClosestRoute(
        '/learn/frontend-development',
        availablePaths
      );

      expect(result).toBe('/learn/Frontend-Development');
    });

    it('should find close match for typos', () => {
      const availablePaths = [
        '/learn/frontend-development',
        '/learn/backend-development',
        '/learn/devops',
      ];

      // "develpoment" is missing an 'o'
      const result = findClosestRoute(
        '/learn/frontend-develpoment',
        availablePaths
      );

      expect(result).toBe('/learn/frontend-development');
    });

    it('should find close match for hallucinated URLs', () => {
      const availablePaths = [
        '/learn/react-hooks',
        '/learn/vue-composition-api',
        '/learn/angular-directives',
      ];

      // ChatGPT might hallucinate "react-hook" instead of "react-hooks"
      const result = findClosestRoute('/learn/react-hook', availablePaths);

      expect(result).toBe('/learn/react-hooks');
    });

    it('should handle missing characters', () => {
      const availablePaths = [
        '/learn/javascript-fundamentals',
        '/learn/typescript-basics',
      ];

      const result = findClosestRoute(
        '/learn/javascrpt-fundamentals',
        availablePaths
      );

      expect(result).toBe('/learn/javascript-fundamentals');
    });

    it('should handle extra characters', () => {
      const availablePaths = [
        '/learn/css-grid',
        '/learn/css-flexbox',
        '/learn/css-animations',
      ];

      const result = findClosestRoute('/learn/css-grids', availablePaths);

      expect(result).toBe('/learn/css-grid');
    });

    it('should handle swapped characters', () => {
      const availablePaths = ['/learn/algorithms', '/learn/data-structures'];

      const result = findClosestRoute('/learn/algortihms', availablePaths);

      expect(result).toBe('/learn/algorithms');
    });

    it('should return null when no close match exists', () => {
      const availablePaths = [
        '/learn/frontend-development',
        '/learn/backend-development',
      ];

      const result = findClosestRoute(
        '/learn/completely-different-topic',
        availablePaths
      );

      expect(result).toBeNull();
    });

    it('should return null for empty path', () => {
      const availablePaths = ['/learn/some-page'];

      const result = findClosestRoute('', availablePaths);

      expect(result).toBeNull();
    });

    it('should return null for empty available paths', () => {
      const result = findClosestRoute('/learn/some-page', []);

      expect(result).toBeNull();
    });

    it('should respect custom threshold', () => {
      const availablePaths = [
        '/learn/react',
        '/learn/vue',
        '/learn/angular',
      ];

      // With strict threshold, very different strings should not match
      const strictResult = findClosestRoute(
        '/learn/completely-different-framework',
        availablePaths,
        {
          threshold: 0.1,
        }
      );

      expect(strictResult).toBeNull();

      // With lenient threshold, even different strings might match
      const lenientResult = findClosestRoute(
        '/learn/completely-different-framework',
        availablePaths,
        {
          threshold: 0.9,
        }
      );

      // Should find some match with very lenient threshold
      expect(lenientResult).not.toBeNull();
    });

    it('should ignore query strings and hash fragments', () => {
      const availablePaths = ['/learn/react-hooks'];

      const result1 = findClosestRoute(
        '/learn/react-hooks?section=useState',
        availablePaths
      );
      const result2 = findClosestRoute(
        '/learn/react-hooks#introduction',
        availablePaths
      );

      expect(result1).toBe('/learn/react-hooks');
      expect(result2).toBe('/learn/react-hooks');
    });

    it('should handle paths with trailing slashes', () => {
      const availablePaths = ['/learn/frontend-development'];

      const result = findClosestRoute(
        '/learn/frontend-development/',
        availablePaths
      );

      expect(result).toBe('/learn/frontend-development');
    });

    it('should handle multi-level paths', () => {
      const availablePaths = [
        '/learn/frontend/react/hooks',
        '/learn/frontend/vue/composition',
        '/learn/backend/node/express',
      ];

      const result = findClosestRoute(
        '/learn/frontend/react/hook',
        availablePaths
      );

      expect(result).toBe('/learn/frontend/react/hooks');
    });
  });

  describe('findClosestRouteWithScore', () => {
    it('should return match with score 0 for exact match', () => {
      const availablePaths = ['/learn/react', '/learn/vue'];

      const result = findClosestRouteWithScore('/learn/react', availablePaths);

      expect(result).toEqual({
        path: '/learn/react',
        score: 0,
      });
    });

    it('should return match with score > 0 for fuzzy match', () => {
      const availablePaths = ['/learn/react-hooks', '/learn/vue-composition'];

      const result = findClosestRouteWithScore(
        '/learn/react-hook',
        availablePaths
      );

      expect(result).not.toBeNull();
      expect(result?.path).toBe('/learn/react-hooks');
      expect(result?.score).toBeGreaterThan(0);
      expect(result?.score).toBeLessThanOrEqual(0.4);
    });

    it('should return null when no match within threshold', () => {
      const availablePaths = ['/learn/react', '/learn/vue'];

      const result = findClosestRouteWithScore(
        '/learn/completely-different',
        availablePaths,
        { threshold: 0.4 }
      );

      expect(result).toBeNull();
    });
  });

  describe('getPagesAsPaths', () => {
    it('should convert slugs to paths without base URL', () => {
      const pages = [
        { slugs: ['frontend', 'react'] },
        { slugs: ['backend', 'node'] },
      ];

      const result = getPagesAsPaths(pages);

      expect(result).toEqual(['/frontend/react', '/backend/node']);
    });

    it('should convert slugs to paths with base URL', () => {
      const pages = [
        { slugs: ['frontend', 'react'] },
        { slugs: ['backend', 'node'] },
      ];

      const result = getPagesAsPaths(pages, '/learn');

      expect(result).toEqual([
        '/learn/frontend/react',
        '/learn/backend/node',
      ]);
    });

    it('should handle single-level slugs', () => {
      const pages = [{ slugs: ['introduction'] }, { slugs: ['getting-started'] }];

      const result = getPagesAsPaths(pages, '/docs');

      expect(result).toEqual(['/docs/introduction', '/docs/getting-started']);
    });

    it('should handle empty slugs array', () => {
      const pages = [{ slugs: [] as string[] }];

      const result = getPagesAsPaths(pages, '/learn');

      expect(result).toEqual(['/learn/']);
    });
  });

  describe('real-world scenarios', () => {
    it('should handle ChatGPT hallucinated route variations', () => {
      const availablePaths = [
        '/learn/frontend-interview-questions',
        '/learn/system-design-interview',
        '/learn/coding-interview-patterns',
      ];

      // ChatGPT might generate these variations
      const variations = [
        '/learn/frontend-interview-question', // Missing 's'
        '/learn/frontend-interviews', // Different plural
        '/learn/frontend-interview-prep', // Similar topic
      ];

      const result1 = findClosestRoute(variations[0], availablePaths);
      const result2 = findClosestRoute(variations[1], availablePaths);

      expect(result1).toBe('/learn/frontend-interview-questions');
      expect(result2).toBe('/learn/frontend-interview-questions');
    });

    it('should handle renamed routes (backward compatibility)', () => {
      const availablePaths = [
        '/learn/react-fundamentals', // New name
        '/learn/vue-composition-api',
        '/learn/angular-directives',
      ];

      // Old route name was "react-basics", should match "react-fundamentals"
      // because they both start with "react"
      const result = findClosestRoute('/learn/react-basics', availablePaths);

      expect(result).toBe('/learn/react-fundamentals');
    });

    it('should handle user typos in manual URL entry', () => {
      const availablePaths = [
        '/learn/authentication-and-authorization',
        '/learn/database-optimization',
      ];

      const typos = [
        '/learn/authentification-and-authorization', // Common typo
        '/learn/authetication-and-authorization', // Missing 'n'
      ];

      const result1 = findClosestRoute(typos[0], availablePaths);
      const result2 = findClosestRoute(typos[1], availablePaths);

      expect(result1).toBe('/learn/authentication-and-authorization');
      expect(result2).toBe('/learn/authentication-and-authorization');
    });

    it('should prefer more similar routes when multiple matches exist', () => {
      const availablePaths = [
        '/learn/react-hooks-overview',
        '/learn/react-hooks-usestate',
        '/learn/react-hooks-useeffect',
      ];

      const result = findClosestRoute(
        '/learn/react-hooks-overvew', // Typo in 'overview'
        availablePaths
      );

      expect(result).toBe('/learn/react-hooks-overview');
    });
  });
});

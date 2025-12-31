/* eslint-disable complexity */
/* eslint-disable max-statements */
import path from "path";

/**
 * Travels up the directory tree from the starting directory,
 * applying the predicate function at each level.
 * Returns the first directory for which the predicate returns true,
 * or null if no such directory is found.
 *
 * @param predicate - A function that takes a directory path and returns a boolean
 * @param startDir - The directory to start from (defaults to process.cwd())
 * @returns The first directory that satisfies the predicate, or null
 */
export function travelUp(
  predicate: (dir: string) => boolean,
  startDir: string = process.cwd(),
): string | null {
  let currentDir = startDir;

  while (true) {
    if (predicate(currentDir)) {
      return currentDir;
    }

    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) {
      break; // Reached the root directory
    }
    currentDir = parentDir;
  }

  return null;
}

/**
 * A simple greeting function
 * @param name - The name to greet
 * @returns A greeting message
 */
export function greet(name: string): string {
  return `Hello, ${name}!`;
}

/**
 * An example class demonstrating the monorepo setup
 */
export class Example {
  private readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  getValue(): string {
    return this.value;
  }

  toUpperCase(): string {
    return this.value.toUpperCase();
  }
}

export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function sum(array: number[]): number {
  return array.reduce((sum, item) => sum + item, 0);
}

export function identity<T>(value: T): T {
  return value;
}

export function countMatching<T>(array: T[], predicate: (v: T) => boolean): number {
  return array.filter((v) => predicate(v)).length;
}

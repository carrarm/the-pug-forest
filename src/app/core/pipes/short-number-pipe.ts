import { Pipe, PipeTransform } from '@angular/core';

const SUFFIXES = [
  { value: 1e12, suffix: 'T' },
  { value: 1e9, suffix: 'B' },
  { value: 1e6, suffix: 'M' },
  { value: 1e3, suffix: 'k' },
];

@Pipe({
  name: 'shortNumber',
})
export class ShortNumberPipe implements PipeTransform {
  transform(value: number): string {
    if (!Number.isFinite(value)) {
      return '';
    }
    if (value < 100000) {
      return value.toString();
    }

    // Start shortening starting at 100k

    for (const item of SUFFIXES) {
      if (value >= item.value) {
        const shortened = (value / item.value).toFixed(2);
        return shortened + item.suffix;
      }
    }

    // Fallback (should not be reached)
    return value.toString();
  }
}

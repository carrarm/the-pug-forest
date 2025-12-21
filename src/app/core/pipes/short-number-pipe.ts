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
  transform(value: number, allowDecimals = false, maxPlainNumber = 100000): string {
    if (!Number.isFinite(value)) {
      return '';
    }

    const valueAsInt = allowDecimals ? value : Math.floor(value);
    if (valueAsInt < maxPlainNumber) {
      return valueAsInt.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
    }

    // Start shortening starting at 100k

    for (const item of SUFFIXES) {
      if (valueAsInt >= item.value) {
        const shortened = (valueAsInt / item.value).toFixed(2);
        return shortened + item.suffix;
      }
    }

    // Fallback (should not be reached)
    return valueAsInt.toString();
  }
}

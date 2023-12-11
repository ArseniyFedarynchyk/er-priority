import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sex',
  standalone: true,
})
export class SexPipe implements PipeTransform {
  transform(value: string): unknown {
    if (value === 'male') return 'mężczyzna';
    else return 'kobieta';
  }
}

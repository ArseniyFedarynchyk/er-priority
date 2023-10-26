import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age',
  standalone: true,
})
export class AgePipe implements PipeTransform {
  transform(dateOfBirthIso: string): string {
    const currentDate = new Date();
    const dateOfBirth = new Date(dateOfBirthIso);
    let age = currentDate.getFullYear() - dateOfBirth.getFullYear();
    const month = currentDate.getMonth() - dateOfBirth.getMonth();
    const day = currentDate.getDay() - dateOfBirth.getDay();
    if (
      month < 0 ||
      (month === 0 && currentDate.getDate() < dateOfBirth.getDate())
    ) {
      age--;
    }

    if (age < 1) {
      if (month >= 1) return `${month} mies.`;
      if (month < 1) return `${day} dni`;
      if (day === 1) return `${day} dzień`;
    }
    return `${age} lat`;
  }
}

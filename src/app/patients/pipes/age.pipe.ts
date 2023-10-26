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
    const ageToString = age.toString();
    const month = currentDate.getMonth() - dateOfBirth.getMonth();

    if (
      month < 0 ||
      (month === 0 && currentDate.getDate() < dateOfBirth.getDate())
    ) {
      age--;
    }

    if (age === 1) return `${age} rok`;
    if (age >= 12 && age <= 14) return `${age} lat`;
    if (
      ageToString[ageToString.length - 1] === '2' ||
      ageToString[ageToString.length - 1] === '3' ||
      ageToString[ageToString.length - 1] === '4'
    ) {
      return `${age} lata`;
    }

    return `${age} lat`;
  }
}

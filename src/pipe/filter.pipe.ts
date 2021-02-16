import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appFilter' })
export class FilterPipe implements PipeTransform {
  /**
   * Transform
   *
   * @param {any[]} data
   * @param {string} searchText
   * @returns {any[]}
   */
  transform(data: any[], searchText: string): any[] {
    if (!data) {
      return [];
    }
    if (!searchText) {
      return data;
    }
    searchText = searchText.toLocaleLowerCase();

    return data.filter(it => {
      return it.Fullname.toLocaleLowerCase().includes(searchText);
    });
  }
}
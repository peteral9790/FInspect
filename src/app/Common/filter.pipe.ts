import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "orderBy"
})
export class orderBy  implements PipeTransform {
  transform(array: any[], field: string): any[] {
    array.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}

/* *ngFor="let myObj of myArr | sort:'fieldName'" */
import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTime'
})
export class DateTimePipe implements PipeTransform {

  transform(input: string) {
    if (!input) {
      return "";
    }
    try {
      input = formatDate(input, "dd/MM/yyyy HH:mm:ss", "fr");
    } finally {
      let datetime = input.split(" "); // [0]: 04/06/2018 [1]: 09:11:45
      let date = datetime[0].split("/");  // 04 06  2018
      if (datetime[1]) {
        return new Date(date[2] + "-" + date[1] + "-" + date[0] + "T" + datetime[1]);
      } else {
        return new Date(date[2] + "-" + date[1] + "-" + date[0] + "T" + "00:00:00");
      }

    }



  }

}

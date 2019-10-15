import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

const months = {
  'January': 'Январь',
  'February': 'Февраль',
  'March': 'Март',
  'April': 'Апрель',
  'May': 'Май',
  'June': 'Июнь',
  'July': 'Июль',
  'August': 'Август',
  'September': 'Сентябрь',
  'October': 'Октябрь',
  'November': 'Ноябрь',
  'December': 'Декабрь',
};

@Pipe({
  name: 'moment',
  pure: false,
})
export class MomentPipe implements PipeTransform {
  transform(m: moment.Moment, format: string = 'MMMM YYYY'): string {
    // const rough = m.format(format).split(' ');
    // const roughMonth = rough[0];
    // const roughYear = rough[1];
    // return `${months[roughMonth]} ${roughYear}`;
    return m.format(format);
  }

}

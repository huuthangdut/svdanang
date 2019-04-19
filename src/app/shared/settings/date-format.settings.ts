import { MatDateFormats } from "@coachcare/datepicker";

export const MAT_MOMENT_DATE_FORMATS: MatDateFormats = {
  parse: {
    date: ['DD/MM/YYYY', 'DD-MM-YYYY', 'll'],
    datetime: ['DD/MM/YYYY HH:mm', 'DD-MM-YYYY HH:mm', 'll h:mma'],
    time: ['HH:mm', 'H:mm', 'h:mm a', 'hh:mm a'],
  },
  display: {
    date: 'DD/MM/YYYY',
    datetime: 'DD/MM/YYYY HH:mm',
    time: 'HH:mm',
    dateA11yLabel: 'DD/MM/YYYY HH:mm',
    monthDayLabel: 'DD/MM',
    monthDayA11yLabel: 'DD/MM',
    monthYearLabel: 'MM/YYYY',
    monthYearA11yLabel: 'MM/YYYY',
    timeLabel: 'HH:mm',
  }
};
/* eslint-disable max-len */
import {extendTheme, type ThemeConfig} from '@chakra-ui/react';
import {mode} from '@chakra-ui/theme-tools';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};
// FIXME: ABSTRACT CSS VARS TO JS VARS
// const bgDark = 'var(--bgDark)';
// const bgLight = 'var(--bgLight)';
export const bgDark = '#121619';
export const bgLight = 'white';
export const theme = extendTheme({
  config,
  components: {
    Modal: {
      baseStyle: (props:any) => ({
        dialog: {
          bg: mode(
              bgLight,
              'transparent',
          ),

        },
      }),
    },
  },
  styles: {
    global: (props: any) => ({
      'body': {
        bg: mode(
            bgLight,
            bgDark,
        )(props),
      },
      'nav': {
        bg: mode(
            bgLight,
            bgDark,
        )(props),
      },
      'dialog': {
        bg: mode(
            bgLight,
            bgDark,
        )(props),
      },


      '.DayPicker': {
        bg: mode(
            bgLight,
            bgDark,
        )(props),
      },
      'CalendarMonthGrid_month__horizontal': {
        display: 'none',
      },
      '.CalendarMonthGrid': {
        bg: mode(
            'white',
            bgDark,
        )(props),
      },
      '.CalendarMonth': {
        bg: mode(
            'white',
            bgDark,
        )(props),
      },
      '.CalendarDay__selected': {
        bg: 'var(--purple) !important',
      },
      '.CalendarDay__selected_span': {
        bg: 'var(--purpleLight) !important',
      },
      '.CalendarDay__blocked_calendar': {
        bg: 'lightgray !important',
      },
      '.CalendarDay': {
        bg: mode(
            'white',
            bgDark,
        )(props),
      },
      '.DateRangePickerInput': {
        bg: mode(
            bgLight,
            bgDark,
        )(props),
      },
      '.DateInput': {
        bg: mode(
            bgLight,
            bgDark,
        )(props),
      },
      '.DateInput_input': {
        bg: mode(
            bgLight,
            bgDark,
        )(props),
      },
      '.DayPickerNavigation_button': {
        bg: mode(
            bgLight,
            bgDark,
        )(props),
      },
      'CalendarDay__blocked_out_of_range': {
        color: mode(
            'pink !important',
            'pink',
        )(props),

      },
    }),
  },
});

export default theme;

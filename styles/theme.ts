import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  styles: {
    global: (props: any) => ({
      body: {
        bg: mode(
          "radial-gradient(50% 50% at 50% 50%, rgba(183, 120, 255, 0.062) 0%, rgba(183, 120, 255, 0.082) 100%), #F6F6F6",
          "radial-gradient(50% 50% at 50% 50%, rgba(183, 120, 255, 0.062) 0%, rgba(183, 120, 255, 0.082) 100%), #000000 "
        )(props),
      },
      ".nav": {
        bg: mode(
          "radial-gradient(50% 50% at 50% 50%, rgba(183, 120, 255, 0.062) 0%, rgba(183, 120, 255, 0.082) 100%), #F6F6F6",
          "black"
        )(props),
      },
      ".DayPicker": {
        bg: mode(
          "white",
          "radial-gradient(50% 50% at 50% 50%, rgba(183, 120, 255, 0.062) 0%, rgba(183, 120, 255, 0.082) 100%), #000000 "
        )(props),
      },
      ".CalendarMonthGrid": {
        bg: mode(
          "white",
          "radial-gradient(50% 50% at 50% 50%, rgba(183, 120, 255, 0.062) 0%, rgba(183, 120, 255, 0.082) 100%), #000000 "
        )(props),
      },
      ".CalendarMonth": {
        bg: mode(
          "white",
          "radial-gradient(50% 50% at 50% 50%, rgba(183, 120, 255, 0.062) 0%, rgba(183, 120, 255, 0.082) 100%), #000000 "
        )(props),
      },
      ".CalendarDay__selected": {
        bg: " #00a699 !important",
      },
      ".CalendarDay__selected_span": {
        bg: "#66e2da !important",
      },
      ".CalendarDay__blocked_calendar": {
        bg: "lightgray !important",
      },
      ".CalendarDay": {
        bg: mode(
          "white",
          "radial-gradient(50% 50% at 50% 50%, rgba(183, 120, 255, 0.062) 0%, rgba(183, 120, 255, 0.082) 100%), #000000 "
        )(props),
      },
      ".DateRangePickerInput": {
        bg: mode(
          "radial-gradient(50% 50% at 50% 50%, rgba(183, 120, 255, 0.062) 0%, rgba(183, 120, 255, 0.082) 100%), #F6F6F6",
          "radial-gradient(50% 50% at 50% 50%, rgba(183, 120, 255, 0.062) 0%, rgba(183, 120, 255, 0.082) 100%), #000000 "
        )(props),
      },
      ".DateInput": {
        bg: mode(
          "radial-gradient(50% 50% at 50% 50%, rgba(183, 120, 255, 0.062) 0%, rgba(183, 120, 255, 0.082) 100%), #F6F6F6",
          "radial-gradient(50% 50% at 50% 50%, rgba(183, 120, 255, 0.062) 0%, rgba(183, 120, 255, 0.082) 100%), #000000 "
        )(props),
      },
      ".DateInput_input": {
        bg: mode(
          "radial-gradient(50% 50% at 50% 50%, rgba(183, 120, 255, 0.062) 0%, rgba(183, 120, 255, 0.082) 100%), #F6F6F6",
          "radial-gradient(50% 50% at 50% 50%, rgba(183, 120, 255, 0.062) 0%, rgba(183, 120, 255, 0.082) 100%), #000000 "
        )(props),
      },
      ".DayPickerNavigation_button": {
        bg: mode(
          "radial-gradient(50% 50% at 50% 50%, rgba(183, 120, 255, 0.062) 0%, rgba(183, 120, 255, 0.082) 100%), #F6F6F6",
          "radial-gradient(50% 50% at 50% 50%, rgba(183, 120, 255, 0.062) 0%, rgba(183, 120, 255, 0.082) 100%), #000000 "
        )(props),
      },
    }),
  },
});

export default theme;

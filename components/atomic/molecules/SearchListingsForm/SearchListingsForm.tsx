import { Field, Form, FormikProvider, useFormik } from "formik";
import { Input, Button, Textarea, Box, Stack } from "@chakra-ui/react";
import { DatePickerWithFormik } from "../DateRangePicker/DateRangePicker";
import moment, { Moment } from "moment";
import { DateRangePickerNormal } from "../DateRangePickerNormal/DateRangePickerNormal";
import styled from "styled-components";
import { useContext } from "react";
import { SearchContext } from "../../../../context/searchContext";
import { setDates } from "../../../../context/actionNames";
interface MyFormValues {
  submit?: (_startDate: number, endDate: number) => void;
}

declare global {
  interface Date {
    getDate(start?: number): [Date, Date];
  }
}

const StyledSearchForm = styled.div`
  border: 1px solid #a2a2a22f;
  border-radius: var(--border-radius);
  padding: 4px 6px;
  /* background-color: #a2a2a22f; */
`;

export function SearchListingsForm({ submit }: MyFormValues) {
  const { state, dispatch } = useContext(SearchContext);

  const formik = useFormik({
    initialValues: {
      startDate: moment(),
      endDate: moment(),
    },
    onSubmit: (values) => {
      enumerateDaysBetweenDates(values.startDate, values.endDate);
      // dispatch({
      //   type: setDates,
      //   payload: values,
      // });
    },
  });

  const enumerateDaysBetweenDates = function (
    _startDate: Moment,
    _endDate: Moment
  ) {
    var dates = [];
    var currDate = moment(_startDate).startOf("day");
    var lastDate = moment(_endDate).startOf("day");

    while (currDate.add(1, "days").diff(lastDate) < 0) {
      const format2 = "YYYY-MM-DD";

      dates.push(currDate.clone().format(format2));
    }
    console.log("dates ", dates);
    return dates;
  };

  return (
    <StyledSearchForm>
      <FormikProvider value={formik}>
        <Form>
          <Stack direction="row" alignItems={"center"} spacing={1}>
            <div>
              <Field
                component={Input}
                name="DateRangePickerNormal"
                className="form-control"
                type="number"
                placeHolder="Guests"
              />
            </div>
            <div>
              <Field
                component={Input}
                name="DateRangePickerNormal"
                className="form-control"
                type="text"
                placeHolder="Location"
              />
            </div>
            <Field
              component={DateRangePickerNormal}
              name="DateRangePickerNormal"
              className="form-control"
            />
          </Stack>
        </Form>
      </FormikProvider>
    </StyledSearchForm>
  );
}

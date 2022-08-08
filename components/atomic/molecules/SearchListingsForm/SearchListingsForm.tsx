import { Field, Form, FormikProvider, useFormik } from "formik";
import { Input, Stack } from "@chakra-ui/react";
import moment, { Moment } from "moment";
import { DateRangePickerNormal } from "../DateRangePickerNormal/DateRangePickerNormal";
import styled from "styled-components";
import { useContext } from "react";
import { SearchContext } from "../../../../context/searchContext";
import { setDates, setRange } from "../../../../context/actionNames";

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
  /* padding: 4px 6px; */
`;

export function SearchListingsForm({ submit }: MyFormValues) {
  const { state, dispatch } = useContext(SearchContext);

  const formik = useFormik({
    initialValues: {
      startDate: moment(),
      endDate: moment(),
    },
    onSubmit: (values) => {
      dispatch({
        type: setDates,
        payload: values,
      });
      dispatch({
        type: setRange,
        payload: enumerateDaysBetweenDates(values.startDate, values.endDate),
      });
    },
  });

  const enumerateDaysBetweenDates = function (
    _startDate: Moment,
    _endDate: Moment
  ) {
    var currentDate = _startDate.clone(),
      dates = [];

    while (currentDate.isSameOrBefore(_endDate)) {
      dates.push(currentDate.format("YYYY-MM-DD"));
      currentDate.add(1, "days");
    }
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

import React from "react";
import styled from "styled-components";
interface Props {
  onChange: () => void;
  id: string;
  value: string;
  name: string;
}

const StyledPicker = styled.input`
  border-radius: 20px;
  width: 100%;
  position: relative;
  border: none;
  font-size: 20px;
  background: ${({ theme }) => theme.inputBg};
  color-scheme: ${({ theme }) => theme.colorScheme};
  font-size: 18px;
  font-family: "Roboto Mono", monospace !important;
  font-weight: 500;

  ::-webkit-datetime-edit {
    padding: 16px;
  }
  ::-webkit-datetime-edit-fields-wrapper {
  }
  ::-webkit-datetime-edit-text {
  }

  ::-webkit-inner-spin-button {
    display: none;
  }
  ::-webkit-calendar-picker-indicator {
    color: white;
    fill: white;
    stroke: white;
    /* transform: scale(1.3); */
    cursor: pointer;
    margin-right: 18px;
  }
`;
const Container = styled.div`
  width: 100%;
  /* padding: 20px; */
  cursor: pointer;
`;

export const DateTimePicker = ({ onChange, id, value, name }: Props) => {
  const today = new Date().toISOString();

  return (
    <Container>
      <StyledPicker
        type="datetime-local"
        id={id}
        onChange={onChange}
        name={name}
        min={today}
        max="2024-06-14T00:00"
      />
    </Container>
  );
};

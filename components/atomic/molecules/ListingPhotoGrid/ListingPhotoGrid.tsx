import React from "react";
import styled from "styled-components";

type Props = {};
const StyledPhotoGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  height: 50vh;
  align-items: center;
  justify-content: center;
  gap: 5px;

  img {
    height: 300px;
    border-radius: var(--border-radius);
    transition: all 0.2s;
  }
`;

const StyledPhoto = styled.div`
  transition: all 0.3s;
  cursor: pointer;
  height: 100%;
  background-size: cover;
  background-image: url(https://a0.muscache.com/im/pictures/bd45cdfe-40b7-4307-b3a0-e163dea5964a.jpg?im_w=1200);
  &:hover {
    filter: brightness(0.9);
  }
`;
const StyledLargePhoto = styled(StyledPhoto)`
  grid-column: 1;
  grid-row: 1 / 3;
  height: 100%;
  border-top-left-radius: var(--border-radius);
  border-bottom-left-radius: var(--border-radius);
  background-image: url(https://destinationlesstravel.com/wp-content/uploads/2022/04/A-boat-dock-on-the-beautiful-Lake-Bacalar-Mexico.jpg.webp);
`;

const StyledTopRightPhoto = styled(StyledPhoto)`
  border-top-right-radius: var(--border-radius);
  background-color: blue;
  height: 100%;
  background-image: url(https://a0.muscache.com/im/pictures/41ad184a-fdee-4158-afa9-f971e0763ed1.jpg?im_w=1440);
`;
const StyledBottomRightPhoto = styled(StyledPhoto)`
  border-bottom-right-radius: var(--border-radius);

  background-image: url(https://a0.muscache.com/im/pictures/miso/Hosting-34224785/original/25e8db0a-6c58-4a2c-8764-04a65765ee9e.jpeg?im_w=1200);
`;
export const ListingPhotoGrid = (props: Props) => {
  return (
    <StyledPhotoGrid>
      <StyledLargePhoto></StyledLargePhoto>
      <StyledPhoto></StyledPhoto>
      <StyledTopRightPhoto></StyledTopRightPhoto>
      <StyledPhoto></StyledPhoto>
      <StyledBottomRightPhoto></StyledBottomRightPhoto>
    </StyledPhotoGrid>
  );
};

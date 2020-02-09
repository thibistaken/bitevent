import styled from "styled-components";

const ImageRotateHome = styled.img`
  animation: rotation 4s infinite linear;
  width: 150px;
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`;
export default ImageRotateHome;

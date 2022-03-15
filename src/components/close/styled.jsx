import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  cursor: pointer;

  span {
    position: absolute;
    display: block;
    width: 100%;
    height: 2px;
    border-radius: 50%;
    background: black;
  }

  span:last-child {
    transform: rotate(45deg);
  }
  span:first-child {
    transform: rotate(-45deg);
  }
`;

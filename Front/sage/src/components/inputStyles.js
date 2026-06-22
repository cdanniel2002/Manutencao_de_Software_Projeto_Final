import styled from "styled-components";

import { backgroundWhite } from "@/assets/colors";

const green = "#24b36b";

export const StyledLabel = styled.label`
  position: absolute;
  top: -9px;
  left: 14px;
  background: linear-gradient(to bottom, ${backgroundWhite} 55%, #ffffff 45%);
  padding: 0 8px;
  font-size: 12px;
  color: #7a7a7a;
  font-weight: 500;
  letter-spacing: 0.2px;
  border-radius: 6px;
  z-index: 1;
  transition: color 0.2s ease;
`;

export const Container = styled.div`
  position: relative;
  width: 100%;
  background-color: transparent;

  &:focus-within ${StyledLabel} {
    color: ${green};
  }
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 14px 16px;
  font-size: 14px;
  border: 1px solid #e0e0e0;
  background-color: #ffffff;
  color: #2e2e2e;
  font-weight: 400;
  border-radius: 12px;
  outline: none;
  height: 3.1rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &::placeholder {
    color: #b5b5b5;
    font-size: 13px;
    font-weight: 400;
  }

  &:hover {
    border-color: #c9c9c9;
  }

  &:focus {
    border-color: ${green};
    box-shadow: 0 0 0 4px rgba(36, 179, 107, 0.12);
  }

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px #ffffff inset;
    -webkit-text-fill-color: #2e2e2e;
  }
`;

export const ButtonEye = styled.button`
  position: absolute;
  right: 14px;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  background-color: transparent;
  color: #8a8a8a;
  padding: 0;

  &:hover {
    color: ${green};
  }
`;

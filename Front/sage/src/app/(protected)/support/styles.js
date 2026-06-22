"use client";

import styled from "styled-components";

const colors = {
  primaryGreen: "#28a745",
  primaryGreenHover: "#218838",
  background: "#f8f9fa",
  white: "#ffffff",
  textPrimary: "#212529",
  textSecondary: "#6c757d",
  border: "#dee2e6",
  lightGreen: "#c2f0d1",
  darkGreenText: "#0a2917",
};

export const PageContainer = styled.div`
  display: flex;
  background-color: ${colors.background};
  min-height: 100vh;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const MainContent = styled.main`
  flex-grow: 1;
  padding: 40px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const Header = styled.header`
  margin-bottom: 40px;

  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
`;

export const HeaderInfo = styled.div``;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${colors.textPrimary};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1rem;
  color: ${colors.textSecondary};
  margin: 4px 0 0;
`;

export const Content = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-start;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export const FormContainer = styled.div`
  flex: 2;
  width: 100%;
  background-color: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin-bottom: -8px;
`;

export const Input = styled.input`
  padding: 12px 15px;
  border: 1px solid ${colors.border};
  border-radius: 8px;
  font-size: 0.9rem;
  color: ${colors.textPrimary};
  background-color: ${colors.white};
  color-scheme: light;
  transition: border-color 0.2s, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${colors.primaryGreen};
    box-shadow: 0 0 0 2px rgba(40, 167, 69, 0.2);
  }

  &::placeholder {
    color: ${colors.textSecondary};
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid ${colors.border};
  border-radius: 8px;
  font-size: 0.9rem;
  color: ${colors.textPrimary};
  background-color: ${colors.white};
  color-scheme: light;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${colors.primaryGreen};
    box-shadow: 0 0 0 2px rgba(40, 167, 69, 0.2);
  }
`;

export const TextArea = styled.textarea`
  padding: 12px 15px;
  border: 1px solid ${colors.border};
  border-radius: 8px;
  font-size: 0.9rem;
  color: ${colors.textPrimary};
  background-color: ${colors.white};
  color-scheme: light;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.2s, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${colors.primaryGreen};
    box-shadow: 0 0 0 2px rgba(40, 167, 69, 0.2);
  }

  &::placeholder {
    color: ${colors.textSecondary};
  }
`;

export const FileInput = styled.input`
  padding: 10px 12px;
  border: 1px dashed ${colors.border};
  border-radius: 8px;
  font-size: 0.85rem;
  color: ${colors.textSecondary};
  background-color: ${colors.white};
  color-scheme: light;
  cursor: pointer;

  &::file-selector-button {
    margin-right: 12px;
    padding: 8px 14px;
    border: none;
    border-radius: 6px;
    background-color: ${colors.lightGreen};
    color: ${colors.darkGreenText};
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  &::file-selector-button:hover {
    background-color: #aee6c1;
  }
`;

export const Button = styled.button`
  margin-top: 8px;
  background-color: ${colors.primaryGreen};
  color: ${colors.white};
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.2s, box-shadow 0.2s ease, transform 0.2s ease;
  box-shadow: 0 2px 8px rgba(40, 167, 69, 0.25);

  &:hover {
    background-color: ${colors.primaryGreenHover};
    box-shadow: 0 4px 14px rgba(40, 167, 69, 0.35);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const GuideContainer = styled.div`
  flex: 1;
  width: 100%;
  background-color: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
`;

export const GuideTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${colors.textPrimary};
  margin: 0 0 16px;
`;

export const GuideStep = styled.div`
  margin-bottom: 1.25rem;
  line-height: 1.6;
  font-size: 0.9rem;
  color: ${colors.textSecondary};

  &:last-child {
    margin-bottom: 0;
  }

  strong {
    color: ${colors.textPrimary};
  }

  & > strong:first-child {
    display: block;
    margin-bottom: 0.35rem;
    color: ${colors.primaryGreen};
    font-size: 0.95rem;
  }

  ul {
    margin: 0.5rem 0 0;
    padding-left: 1.25rem;
  }

  li {
    margin-bottom: 0.25rem;
  }
`;

import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 2rem;
`;

export const Title = styled.h1`
  margin-bottom: 2rem;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 700px;
`;

export const Input = styled.input`
  padding: 12px;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
`;

export const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  resize: vertical;
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 16px;
  font-size: 16px;
`;

export const FileInput = styled.input`
  padding: 12px;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
`;

export const Button = styled.button`
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

export const Content = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-start;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export const FormContainer = styled.div`
  flex: 2;
`;

export const GuideContainer = styled.div`
  flex: 1;
  background: #1f1f1f;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #333;
`;

export const GuideTitle = styled.h3`
  margin-bottom: 1rem;
`;

export const GuideStep = styled.div`
  margin-bottom: 1rem;
  line-height: 1.6;

  strong {
    display: block;
    margin-bottom: 0.25rem;
  }
`;

export const Label = styled.label`
  font-weight: 600;
  margin-bottom: -0.5rem;
`;
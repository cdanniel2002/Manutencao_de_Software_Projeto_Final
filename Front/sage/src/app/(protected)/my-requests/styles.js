"use client";

import styled from "styled-components";

const colors = {
  primaryGreen: "#28a745",
  background: "#f8f9fa",
  white: "#ffffff",
  textPrimary: "#212529",
  textSecondary: "#6c757d",
  border: "#dee2e6",
};

// Cores de cada status, usadas no badge de acompanhamento.
const statusColors = {
  ABERTO: { color: "#0a5b86", background: "#d4ecf7" },
  ANALISE: { color: "#8a4b00", background: "#ffe8cc" },
  CORRIGIDO: { color: "#1c6b2c", background: "#d7f0dd" },
  FECHADO: { color: "#495057", background: "#e9ecef" },
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
  overflow-x: auto;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const Header = styled.header`
  margin-bottom: 32px;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${colors.textPrimary};
  margin: 0;
`;

export const Subtitle = styled.p`
  font-size: 1rem;
  color: ${colors.textSecondary};
  margin: 4px 0 0;
`;

export const TableWrapper = styled.div`
  background-color: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 12px;
  overflow: hidden;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
`;

export const Th = styled.th`
  text-align: left;
  padding: 14px 16px;
  background-color: ${colors.background};
  color: ${colors.textSecondary};
  font-weight: 600;
  border-bottom: 1px solid ${colors.border};
  white-space: nowrap;
`;

export const Td = styled.td`
  padding: 14px 16px;
  color: ${colors.textPrimary};
  border-bottom: 1px solid ${colors.border};
  vertical-align: top;
`;

export const Tr = styled.tr`
  &:last-child td {
    border-bottom: none;
  }
`;

export const TypeBadge = styled.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 600;
  white-space: nowrap;
  color: ${({ $tipo }) => ($tipo === "MELHORIA" ? "#0a5b86" : "#8a4b00")};
  background-color: ${({ $tipo }) =>
    $tipo === "MELHORIA" ? "#d4ecf7" : "#ffe8cc"};
`;

export const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 600;
  white-space: nowrap;
  color: ${({ $status }) =>
    (statusColors[$status] || statusColors.ABERTO).color};
  background-color: ${({ $status }) =>
    (statusColors[$status] || statusColors.ABERTO).background};
`;

export const Description = styled.div`
  max-width: 360px;
  white-space: pre-wrap;
  color: ${colors.textSecondary};
`;

export const EmptyState = styled.div`
  padding: 60px 20px;
  text-align: center;
  color: ${colors.textSecondary};
  font-size: 1rem;
`;

export const RefreshButton = styled.button`
  margin-top: 16px;
  padding: 8px 16px;
  border: 1px solid ${colors.border};
  border-radius: 8px;
  background-color: ${colors.white};
  color: ${colors.textPrimary};
  font-size: 0.85rem;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;

  &:hover {
    border-color: ${colors.primaryGreen};
    color: ${colors.primaryGreen};
  }
`;

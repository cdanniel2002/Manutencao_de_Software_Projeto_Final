"use client";

import styled from "styled-components";

const colors = {
  primary: "#28a745",
  background: "#f8f9fa",
  white: "#ffffff",
  textPrimary: "#212529",
  textSecondary: "#6c757d",
  border: "#dee2e6",
  income: "#28a745",
  expense: "#dc3545",
  lightGreen: "rgba(40, 167, 69, 0.1)",
  lightRed: "rgba(220, 53, 69, 0.1)",
};

export const Container = styled.div`
  display: flex;
  background-color: ${colors.background};
  min-height: 100vh;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Sidebar = styled.aside`
  width: 260px;
  min-height: 100vh;
  /* Sem align-self: o flex estica a sidebar até o fim da página,
     mesmo quando o conteúdo é maior que a tela. */
  background: linear-gradient(170deg, #166534 0%, #1f8a3d 55%, #28a745 100%);
  color: ${colors.white};
  padding: 28px 18px 22px;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 24px rgba(20, 83, 45, 0.18);

  > img {
    margin: 0 auto 20px;
  }

  @media (max-width: 768px) {
    width: 100%;
    min-height: auto;
    position: static;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
    flex-wrap: wrap;

    > img {
      margin: 0;
    }
  }
`;

export const NavMenu = styled.nav`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 8px;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 10px;
  }
`;

export const NavItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 12px 14px;
  border-radius: 10px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;

  /* Indicador lateral do item ativo */
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    width: 4px;
    height: 60%;
    border-radius: 0 4px 4px 0;
    background-color: ${colors.white};
    transform: translateY(-50%) scaleY(0);
    transition: transform 0.2s ease;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.12);
    color: ${colors.white};
    transform: translateX(4px);
  }

  &.active {
    background-color: rgba(255, 255, 255, 0.18);
    color: ${colors.white};
    font-weight: 600;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.15);

    &::before {
      transform: translateY(-50%) scaleY(1);
    }
  }

  span {
    margin-left: 12px;
    letter-spacing: 0.2px;
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 0.85rem;

    &:hover {
      transform: none;
    }

    &::before {
      display: none;
    }
  }
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  padding: 12px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.14);

  .avatar {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ffffff 0%, #d9f5e3 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: #1f8a3d;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    flex-shrink: 0;
  }

  .userInfo {
    margin-left: 12px;
    flex-grow: 1;
    overflow: hidden;

    strong {
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .logoutIcon {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.18);
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 10px;
    padding: 8px 12px;
    justify-content: space-between;
  }
`;

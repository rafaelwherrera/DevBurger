import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.nav`
  position: fixed; /* <-- fixo na tela */
  top: 0;
  left: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  width: ${(props) => (props.$collapsed ? '80px' : '250px')};
  height: 100vh;
  background: #1f1f2e;
  color: #ffffff;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.15);
  transition: width 0.3s ease;
`;
export const Logo = styled.img`
  width: 60%;
  margin: 40px 0;
  display: ${(props) => (props.$collapsed ? 'none' : 'block')};
`;

export const CollapsedLogo = styled.div`
  font-size: 26px;
  font-weight: bold;
  margin: 40px 0;
  color: #f7a53d;
  display: ${(props) => (props.$collapsed ? 'block' : 'none')};
`;

export const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #ffffffcc;
  cursor: pointer;
  font-size: 20px;
  align-self: ${(props) => (props.$collapsed ? 'center' : 'flex-end')};
  margin: 10px 20px;
  transition: transform 0.2s;

  &:hover {
    color: #f7a53d;
    transform: scale(1.1);
  }
`;

export const NavLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
`;

export const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${(props) => (props.$collapsed ? '0' : '12px')};
  justify-content: ${(props) => (props.$collapsed ? 'center' : 'flex-start')};
  padding: 12px 20px;
  text-decoration: none;
  color: white;
  transition: background 0.3s, gap 0.3s;
  cursor: pointer;
  background-color: ${props => props.$isActive ? '#f7a53d' : 'transparent'};

  svg {
    min-width: 24px;
  }

  span {
    display: ${(props) => (props.$collapsed ? 'none' : 'inline')};
  }

  &:hover {
    background-color: #f7a53d;
  }
`;

export const Footer = styled.footer`
  margin-top: auto;
  padding: 16px;
  font-size: 13px;
  color: #ffffffaa;
  text-align: center;
`;

import React from 'react';
import { navLinks } from './NavLinks';
import { useResolvedPath } from 'react-router-dom';
import Logo from '../../assets/logo.svg';
import { SignOut, List as MenuIcon } from '@phosphor-icons/react';
import {
  Container,
  NavLinkContainer,
  NavLink,
  Footer,
  ToggleButton,
  CollapsedLogo,
} from './styles';
import { useUser } from '../../hooks/UserContext';

export function SideNavAdmin({ isCollapsed, setIsCollapsed }) {
  const { logout } = useUser();
  const { pathname } = useResolvedPath();
  function toggleMenu() {
    setIsCollapsed(prev => !prev);
  }

  return (
    <Container $collapsed={isCollapsed}>
      <ToggleButton onClick={toggleMenu}>
        <MenuIcon size={24} color="#fff" />
      </ToggleButton>

      {!isCollapsed && <img src={Logo} alt="Logo" />}
      {isCollapsed && <CollapsedLogo>🍔</CollapsedLogo>}

      <NavLinkContainer>
        {navLinks.map(link => (
          <NavLink
            key={link.id}
            to={link.path}
            $isActive={pathname === link.path}
            $collapsed={isCollapsed}>
            {link.icon}
            {!isCollapsed && <span>{link.label}</span>}
          </NavLink>
        ))}
      </NavLinkContainer>

      <Footer>
        <NavLink to="/login" onClick={logout} $collapsed={isCollapsed}>
          <SignOut />
          {!isCollapsed && <span>Sair</span>}
        </NavLink>
      </Footer>
    </Container>
  );
}

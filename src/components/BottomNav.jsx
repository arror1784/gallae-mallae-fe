import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FiHome, FiCompass, FiMap, FiUser } from 'react-icons/fi';

const BottomNav = () => {
    return (
        <NavWrapper>
            <NavItem to="/" end>
                <FiHome size={24} />
                <span>홈</span>
            </NavItem>
            <NavItem to="/course">
                <FiCompass size={24} />
                <span>코스</span>
            </NavItem>
            <NavItem to="/map">
                <FiMap size={24} />
                <span>지도</span>
            </NavItem>
            <NavItem to="/my">
                <FiUser size={24} />
                <span>MY</span>
            </NavItem>
        </NavWrapper>
    );
};

// --- Styled Components ---

const NavWrapper = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.colors.lightGray};
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
`;

const NavItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.gray};
  font-size: 0.75rem;
  gap: 4px;

  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export default BottomNav;
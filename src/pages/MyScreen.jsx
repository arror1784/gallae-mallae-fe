import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

const MyScreen = ({ user }) => {
    return (
        <Container>
            <ProfileHeader>
                <ProfileImage src={user.profileImageUrl} alt="Profile" />
                <UserInfo>
                    <UserName>{user.name}</UserName>
                    <UserMeta>{user.location} • 스탬프 {user.stamps}개</UserMeta>
                </UserInfo>
            </ProfileHeader>

            <MenuSection>
                <SectionTitle>개인 설정</SectionTitle>
                <MenuItem to="/profile-edit">
                    <span>프로필 수정</span>
                    <FiChevronRight color="#C5C5C5" />
                </MenuItem>
                <MenuItem>
                    <span>선호 혼잡도</span>
                    <PreferenceLabel>{user.congestionPreference}</PreferenceLabel>
                </MenuItem>
            </MenuSection>

            <MenuSection>
                <SectionTitle>소셜</SectionTitle>
                <MenuItem to="/friends">
                    <span>친구 관리</span>
                    <FiChevronRight color="#C5C5C5" />
                </MenuItem>
            </MenuSection>

            <MenuSection>
                <SectionTitle>활동</SectionTitle>
                <MenuItem>
                    <span>완료한 코스</span>
                    <ValueLabel>{user.completedCourses}개</ValueLabel>
                </MenuItem>
                <MenuItem>
                    <span>수집한 스탬프</span>
                    <ValueLabel>{user.stamps}개</ValueLabel>
                </MenuItem>
            </MenuSection>
        </Container>
    );
};

// --- Styled Components ---

const Container = styled.div`
  padding: 20px;
  background-color: #F9F9F9;
  min-height: 100vh;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 40px 10px;
  margin: -20px -20px 20px -20px;
  background: ${({ theme }) => theme.gradients.header};
  color: white;
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 20px;
  border: 3px solid rgba(255, 255, 255, 0.5);
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
`;

const UserMeta = styled.p`
  margin: 5px 0 0;
  font-size: 0.9rem;
  opacity: 0.9;
`;

const MenuSection = styled.div`
  margin-bottom: 30px;
  background-color: white;
  border-radius: 12px;
  padding: 10px 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
`;

const SectionTitle = styled.h3`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: 15px;
  margin-top: 15px;
  font-weight: 500;
`;

const MenuItem = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 0;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.black};
  text-decoration: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};

  &:last-child {
    border-bottom: none;
  }
`;

const PreferenceLabel = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
`;

const ValueLabel = styled.span`
  color: ${({ theme }) => theme.colors.gray};
  font-weight: 500;
`;

export default MyScreen;
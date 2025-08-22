import React, { useState } from 'react';
import styled from 'styled-components';


const locationData = {
    name: '전체',
    children: [
        {
            name: '대전',
            progress: 80,
            children: [
                {
                    name: '서구',
                    progress: 40,
                    children: [
                        { name: '도마동', progress: 20, children: [] },
                        { name: '둔산동', progress: 20, children: [] },
                    ],
                },
                { name: '중구', progress: 30, children: [] },
                { name: '동구', progress: 10, children: [] },
            ],
        },
        {
            name: '서울',
            progress: 20,
            children: [
            ],
        },
    ],
};


const HomeScreen = () => {
    const [viewStack, setViewStack] = useState([locationData]);

    const currentView = viewStack[viewStack.length - 1];
    const itemsToDisplay = currentView.children || [];
    const isRoot = viewStack.length === 1;

    const handleItemClick = (item) => {
        if (item.children && item.children.length > 0) {
            setViewStack([...viewStack, item]);
        }
    };

    const handleBackClick = () => {
        if (!isRoot) {
            setViewStack(viewStack.slice(0, -1));
        }
    };

    return (
        <Container>
            <ProfileSection>
                <StatsContainer>
                    <StatItem>
                        <StatValue>52</StatValue>
                        <StatLabel>생성 코스</StatLabel>
                    </StatItem>
                    <StatItem>
                        <StatValue>8</StatValue>
                        <StatLabel>완료 코스</StatLabel>
                    </StatItem>
                    <StatItem>
                        <StatValue>5</StatValue>
                        <StatLabel>방문 지역</StatLabel>
                    </StatItem>
                </StatsContainer>
            </ProfileSection>

            <ContentSection>
                <Header>
                    {!isRoot && <BackButton onClick={handleBackClick}>‹</BackButton>}
                    <Title>{currentView.name}</Title>
                </Header>

                {itemsToDisplay.map((item, index) => (
                    <LocationCard key={index} onClick={() => handleItemClick(item)}>
                        <LocationInfo>
                            <LocationName>{item.name}</LocationName>
                            <LocationType>{item.type}</LocationType>
                        </LocationInfo>
                        <ProgressBarContainer>
                            <ProgressBarBackground>
                                <ProgressBarFill progress={item.progress} />
                            </ProgressBarBackground>
                            <ProgressText>{item.progress}%</ProgressText>
                        </ProgressBarContainer>
                    </LocationCard>
                ))}
            </ContentSection>
        </Container>
    );
};

export default HomeScreen;


// --- Styled Components ---

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #f5f5f5;
`;

const ProfileSection = styled.div`
    padding: 60px 24px 24px 24px;
    background: linear-gradient(135deg, #866DE6, #5B44C6);
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    color: ${({ theme }) => theme.colors.white};
`;

const StatsContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const StatItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
`;

const StatValue = styled.span`
    font-size: 1.5rem;
    font-weight: bold;
`;

const StatLabel = styled.span`
    font-size: 0.8rem;
    font-weight: 500;
`;

const ContentSection = styled.div`
  padding: 24px;
  flex: 1;
  overflow-y: auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 16px;
`;

const BackButton = styled.button`
  position: absolute;
  left: 0;
  background: none;
  border: none;
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  padding: 0 10px;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0;
  color: ${({ theme }) => theme.colors.black};
`;

const LocationCard = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
  }
`;

const LocationInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 12px;
`;

const LocationName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.colors.black};
`;

const LocationType = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.gray};
`;

const ProgressBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ProgressBarBackground = styled.div`
  flex-grow: 1;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressBarFill = styled.div`
  height: 100%;
  width: ${({ progress }) => progress}%;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  transition: width 0.3s ease-in-out;
`;

const ProgressText = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.gray};
  font-weight: 500;
  min-width: 30px;
`;
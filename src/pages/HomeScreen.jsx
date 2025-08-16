import React, { useState } from 'react';
import styled from 'styled-components';
import mapImage from '../assets/map_background.png';

const HomeScreen = () => {
    const [activeCourse, setActiveCourse] = useState(null);

    setTimeout(() => {
        if (!activeCourse) {
            setActiveCourse({ name: '서울 역사 탐방 코스' });
        }
    }, 2000);

    return (
        <Container>
            <Header>
                {activeCourse ? (
                    <CourseInProgress>
                        <CourseName>{activeCourse.name}</CourseName>
                        <ProgressBar>
                            {[...Array(8)].map((_, i) => <ProgressDot key={i} active={i < 3} />)}
                        </ProgressBar>
                    </CourseInProgress>
                ) : (
                    <NoCourseText>현재 진행중인 코스가 없습니다.</NoCourseText>
                )}
            </Header>
            <MapImage />

        </Container>
    );
};

// --- Styled Components ---

const Container = styled.div`
  padding: 24px;
  position: relative;
  height: 100vh;
`;

const Header = styled.div`
  padding-top: 50px;
  text-align: center;
`;

const NoCourseText = styled.h2`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.gray};
  font-weight: 500;
`;

const CourseInProgress = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const CourseName = styled.h2`
  font-size: 1.4rem;
  font-weight: bold;
  margin: 0;
`;

const ProgressBar = styled.div`
  display: flex;
  gap: 8px;
`;

const ProgressDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ active, theme }) => active ? theme.colors.primary : theme.colors.lightGray};
`;

const MapImage = styled.div`
  position: absolute;
  width: 366px;
  height: 562px;
  left: 12px;
  top: 146px;
  background: url(${mapImage});
  background-size: contain;
  background-repeat: no-repeat;
`;

export default HomeScreen;
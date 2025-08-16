import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import HomeScreen from './pages/HomeScreen.jsx';
import MyScreen from './pages/MyScreen.jsx';
import BottomNav from './components/BottomNav.jsx';

function App() {
    // 실제 앱에서는 유저 정보를 서버에서 받아오거나 상태 관리 라이브러리를 사용합니다.
    const mockUser = {
        name: '아무개',
        location: '대전 동구 용도동',
        stamps: 23,
        completedCourses: 8,
        congestionPreference: '보통',
        profileImageUrl: 'https://via.placeholder.com/80' // 프로필 이미지 URL
    };

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Router>
                {/* <div style={{ paddingBottom: '80px' }}> */} {/* BottomNav 높이만큼 패딩 */}
                <Routes>
                    {/* 기본 경로 '/'에 HomeScreen이 잘 연결되어 있는지 확인 */}
                    <Route path="/" element={<HomeScreen />} />
                    <Route path="/my" element={<MyScreen user={mockUser} />} />
                </Routes>
                {/* </div> */}
                <BottomNav />
            </Router>
        </ThemeProvider>
    );
}

export default App;

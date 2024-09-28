import React, { useState } from 'react'
import styled from 'styled-components'
import { logout } from './services/authService';
import { useNavigate } from 'react-router-dom';
import Login from './login';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  font-family: Arial, sans-serif;
`


const LogoutButton = styled.button`
  background-color: #f44336;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;

  &:hover {
    background-color: #d32f2f;
  }
`;

const TopHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2c3e50;
  color: white;
  padding: 15px 20px;
`

const SearchBar = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: none;
  width: 300px;
  font-size: 16px;
`

const ProfileIcon = styled.div`
  background-color: #34495e;
  border-radius: 50%;
  width: 40px;
  height: 40px;
`

const Greeting = styled.div`
  font-size: 18px;
  color: white;
`

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  background-color: #ecf0f1;
  height: calc(100% - 70px); /* Adjust height excluding top header */
  overflow-y: auto;
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const Title = styled.h1`
  margin: 0;
  color: #2c3e50;
`

const Button = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #2980b9;
  }
`

const OverviewButtons = styled.div`
  display: flex;
  gap: 10px;
  margin: 20px 0;
`

const OverviewButton = styled(Button)`
  width: 120px;
`

const Card = styled.div`
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  flex: 1;
`

const CardTitle = styled.h2`
  margin-top: 0;
  color: #2c3e50;
`

const CardContent = styled.div`
  color: #34495e;
`

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`

const RankingsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const ListItem = styled.li`
  padding: 15px;
  background-color: white;
  margin-bottom: 10px;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #ecf0f1;
  }
`

function Dash({name}) {
  const [activeTab, setActiveTab] = useState('overview')
  const username = 'JohnDoe'
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <DashboardContainer>
      {/* Top Header with Search, Profile Icon, and Greeting */}
      <TopHeader>
        <Greeting>Hey! `${name}`</Greeting>
        <SearchBar type="text" placeholder="Search..." />
        <ProfileIcon />
      </TopHeader>

      {/* Main Content */}
      <MainContent>
        <Header>
          <Title>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</Title>
          <LogoutButton>Logout</LogoutButton>
        </Header>

        {/* Overview and Rankings Buttons */}
        <OverviewButtons>
          <OverviewButton onClick={() => setActiveTab('overview')}>Overview</OverviewButton>
          <OverviewButton onClick={() => setActiveTab('rankings')}>Rankings</OverviewButton>
        </OverviewButtons>

        {activeTab === 'overview' && (
          <BottomRow>
            <Card>
              <CardTitle>Graph</CardTitle>
              <CardContent>
                {/* Placeholder for the graph */}
                <p>Graph content here...</p>
              </CardContent>
            </Card>
            <Card>
              <CardTitle>Candidate Info</CardTitle>
              <CardContent>
                <p>John Doe - Frontend Developer</p>
                <p>Jane Smith - UX Designer</p>
                <p>Mike Johnson - Data Analyst</p>
              </CardContent>
            </Card>
          </BottomRow>
        )}

        {activeTab === 'rankings' && (
          <RankingsList>
            <ListItem>John Doe - Rank 1</ListItem>
            <ListItem>Jane Smith - Rank 2</ListItem>
            <ListItem>Mike Johnson - Rank 3</ListItem>
            <ListItem>Sarah Brown - Rank 4</ListItem>
            <ListItem>Tom Wilson - Rank 5</ListItem>
          </RankingsList>
        )}
      </MainContent>
    </DashboardContainer>
  )
}

export default Dash;

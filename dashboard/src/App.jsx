import React, { useState } from 'react'
import styled from 'styled-components'

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  font-family: Arial, sans-serif;
`

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

const Sidebar = styled.aside`
  width: 20%;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  height: calc(100% - 70px); /* Adjust height excluding top header */
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
  color: #f5f5f5;
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
  margin-bottom: 20px;
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

const NavItem = styled.div`
  padding: 10px 0;
  cursor: pointer;

  &:hover {
    background-color: #34495e;
  }
`

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const username = 'JohnDoe'

  return (
    <DashboardContainer>
      <TopHeader>
        <ProfileIcon />
        <SearchBar type="text" placeholder="Search..." />
        <Greeting>Hey! {username}</Greeting>
      </TopHeader>

      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar>
          <Title>HR Dashboard</Title>
          <nav>
            <NavItem onClick={() => setActiveTab('dashboard')}>Dashboard</NavItem>
            <NavItem onClick={() => setActiveTab('candidates')}>Candidates</NavItem>
            <NavItem onClick={() => setActiveTab('jobs')}>Jobs</NavItem>
            <NavItem onClick={() => setActiveTab('analytics')}>Analytics</NavItem>
          </nav>
          <OverviewButtons>
            <OverviewButton>Overview</OverviewButton>
            <OverviewButton>Rankings</OverviewButton>
          </OverviewButtons>
        </Sidebar>

        <MainContent>
          <Header>
            <Title>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</Title>
            <Button>Add New</Button>
          </Header>
          {activeTab === 'dashboard' && (
            <>
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
            </>
          )}
          {activeTab === 'candidates' && (
            <Card>
              <CardTitle>Candidate List</CardTitle>
              <CardContent>
                <p>John Doe - Frontend Developer</p>
                <p>Jane Smith - UX Designer</p>
                <p>Mike Johnson - Data Analyst</p>
                <p>Sarah Brown - Project Manager</p>
                <p>Tom Wilson - Backend Developer</p>
              </CardContent>
            </Card>
          )}
          {activeTab === 'jobs' && (
            <Card>
              <CardTitle>Open Positions</CardTitle>
              <CardContent>
                <p>Frontend Developer - 3 openings</p>
                <p>UX Designer - 1 opening</p>
                <p>Data Analyst - 2 openings</p>
                <p>Project Manager - 1 opening</p>
              </CardContent>
            </Card>
          )}
          {activeTab === 'analytics' && (
            <Card>
              <CardTitle>Hiring Analytics</CardTitle>
              <CardContent>
                <p>Total Applications: 150</p>
                <p>Interviews Conducted: 30</p>
                <p>Offers Extended: 10</p>
                <p>Positions Filled: 8</p>
              </CardContent>
            </Card>
          )}
        </MainContent>
      </div>
    </DashboardContainer>
  )
}

export default App

import React, { useState } from 'react'
import styled from 'styled-components'
import DownloadPDFButton from './downloadButton'
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

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  background-color: #ecf0f1;
  height: calc(100% - 70px);
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

function Dash({ username }) {
  const [selectedUser, setSelectedUser] = useState(null)
  const [name, setName] = useState('User')

  if (username) {
    setName(username)
  }

  const rankings = [
    { name: 'John Doe', rank: 1, role: 'Frontend Developer' },
    { name: 'Jane Smith', rank: 2, role: 'UX Designer' },
    { name: 'Mike Johnson', rank: 3, role: 'Data Analyst' },
    { name: 'Sarah Brown', rank: 4, role: 'Backend Developer' },
    { name: 'Tom Wilson', rank: 5, role: 'Product Manager' },
  ]

  const handleUserClick = (user) => {
    setSelectedUser(user)
  }

  return (
    <DashboardContainer>
      <TopHeader>
        <Greeting>Hey! {name}</Greeting>
        <SearchBar type="text" placeholder="Search..." />
        <ProfileIcon />
      </TopHeader>

      <MainContent>
        <Header>
          <Title>{selectedUser ? 'User Overview' : 'Rankings'}</Title>
          {selectedUser && <DownloadPDFButton>Download</DownloadPDFButton>}
        </Header>

        {selectedUser ? (
          <BottomRow>
            <Card>
              <CardTitle>Graph</CardTitle>
              <CardContent>
                <p>Graph content for {selectedUser.name} here...</p>
              </CardContent>
            </Card>
            <Card>
              <CardTitle>Candidate Info</CardTitle>
              <CardContent>
                <p>{selectedUser.name} - {selectedUser.role}</p>
                <p>Rank: {selectedUser.rank}</p>
                <Button onClick={() => setSelectedUser(null)}>Back to Rankings</Button>
              </CardContent>
            </Card>
          </BottomRow>
        ) : (
          <RankingsList>
            {rankings.map((user) => (
              <ListItem key={user.rank} onClick={() => handleUserClick(user)}>
                {user.name} - Rank {user.rank}
              </ListItem>
            ))}
          </RankingsList>
        )}
      </MainContent>
    </DashboardContainer>
  )
}

export default Dash;
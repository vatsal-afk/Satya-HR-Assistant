import React, { useState } from 'react';
import styled from 'styled-components';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'; // Import the styles for the progress bar
import DownloadPDFButton from './downloadButton';
import NavBar from './navBar';
import graph1 from '../assets/graph1.jpg';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  font-family: Arial, sans-serif;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  background-color: #ecf0f1;
  height: calc(100% - 70px);
  overflow-y: auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  margin: 0;
  color: #2c3e50;
`;

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
`;

const Card = styled.div`
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  flex: 1;
`;

const CardTitle = styled.h2`
  margin-top: 0;
  color: #2c3e50;
`;

const CardContent = styled.div`
  color: #34495e;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const ScoreSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const RankingsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

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
`;

function Dash({ username }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [name, setName] = useState('User');

  if (username) {
    setName(username);
  }

  const rankings = [
    { name: 'John Doe', rank: 1, role: 'Frontend Developer', weightedScore: 85, resumeScore: 88, riskFactor: 30, graph: graph1,riskFactor:33 },
    { name: 'Jane Smith', rank: 2, role: 'UX Designer', weightedScore: 72, resumeScore: 75, riskFactor: 40 },
    { name: 'Mike Johnson', rank: 3, role: 'Data Analyst', weightedScore: 90, resumeScore: 92, riskFactor: 25 },
    { name: 'Sarah Brown', rank: 4, role: 'Backend Developer', weightedScore: 65, resumeScore: 70, riskFactor: 55 },
    { name: 'Tom Wilson', rank: 5, role: 'Product Manager', weightedScore: 78, resumeScore: 80, riskFactor: 45 },
  ];

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <DashboardContainer>
      <NavBar />
      <MainContent>
        <Header>
          <Title>{selectedUser ? 'User Overview' : 'Rankings'}</Title>
          {selectedUser && <DownloadPDFButton>Download</DownloadPDFButton>}
        </Header>

        {selectedUser ? (
          <BottomRow>
            
            <Card>
              <CardTitle>Candidate Info</CardTitle>
              <CardContent>
                <p>{selectedUser.name} - {selectedUser.role}</p>
                <p>Rank: {selectedUser.rank}</p>
                <Button onClick={() => setSelectedUser(null)}>Back to Rankings</Button>
              </CardContent>
            </Card>

            {/* Score Meters Section */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',marginTop:50}}>
              
              {/* Resume Score Meter */}
              <ScoreSection>
                
                <div style={{ width: 150, height: 150 }}>
                  <CircularProgressbar value={selectedUser.resumeScore} text={`${selectedUser.resumeScore}%`} />
                </div>
                <h3 style={{color:'black',marginTop:10}}>Resume Score</h3>
              </ScoreSection>

              {/* Risk Factor Meter */}
              <ScoreSection style={{ marginTop: '7rem' }}>
                
                <div style={{ width: 150, height: 150 }}>
                  <CircularProgressbar value={selectedUser.riskFactor} text={`${selectedUser.riskFactor}%`} />
                </div>
                <h3 style={{color:'black',marginTop:10}}>Risk Factor</h3>
              </ScoreSection>

            </div>

            <Card>
              <CardTitle>Graph</CardTitle>
              <CardContent>
                {selectedUser.graph ? (
                  <img src={selectedUser.graph} alt="Graph" style={{ width: '100%' }} /> // Display graph if available
                ) : (
                  <p>Graph content for {selectedUser.name} here...</p>
                )}
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
  );
}

export default Dash;

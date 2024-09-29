import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import DownloadPDFButton from '../components/downloadButton';
import NavBar from '../components/navBar';

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
  // display: grid;
  // grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  color:black;
  
  
`;

const ListItem = styled.li`
  
  padding: 15px;
  background-color: white;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #ecf0f1;
  }
`;

function Dash({ username }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/sortedApplicants')
      .then((response) => response.json())
      .then((data) => {
        setApplicants(data);
      })
      .catch((error) => {
        console.error('Error fetching applicants:', error);
      });
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    console.log(user)
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
                <p>ID: {selectedUser.ID}</p>
                <p>Number of Jobs: {selectedUser.Number_of_Jobs}</p>
                <p>Years of Experience: {selectedUser.Years_of_Experience}</p>
                <p>Risk Category: {selectedUser.Risk_Category}</p>
                <Button onClick={() => setSelectedUser(null)}>Back to Applicants</Button>
              </CardContent>
            </Card>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 50 }}>
              <ScoreSection>
                <div style={{ width: 150, height: 150 }}>
                  <CircularProgressbar value={selectedUser.Weighted_Score_Normalized} text={`${selectedUser.Weighted_Score_Normalized.toFixed(2)}`} />
                </div>
                <h3 style={{ color: 'black', marginTop: 10 }}>Weighted Score</h3>
              </ScoreSection>
            </div>

            <Card>
              <CardTitle>Skills</CardTitle>
              <CardContent>
                <p>Soft Skills: {selectedUser.Soft_skill_count}</p>
                <p>Technical Skills: {selectedUser.Technical_skill_count}</p>
                <p>Number of Adjectives: {selectedUser.Number_of_Adjectives}</p>
                <p>Number of Degrees: {selectedUser.Number_of_Degrees}</p>
                <p>Number of Certificates: {selectedUser.Number_of_Certificates}</p>
              </CardContent>
            </Card>
          </BottomRow>
        ) : (
          <RankingsList>
            {applicants.map((applicant) => (
              <ListItem key={applicant._id} onClick={() => handleUserClick(applicant)}>
                ID: {applicant.ID}<br />
                Experience: {applicant.Years_of_Experience} years<br />
                Risk: {applicant.Risk_Category}
              </ListItem>
            ))}
          </RankingsList>
        )}
      </MainContent>
    </DashboardContainer>
  );
}

export default Dash;
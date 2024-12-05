import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import NavBar from "../components/navBar";
import { useNavigate } from "react-router-dom";
import graph1 from '../assets/graph1.jpg';
import graph2 from '../assets/graphd2.jpg';
import graph3 from '../assets/graphd3.jpg';
import graph4 from '../assets/graphd4.jpg';

const Container = styled.div`
  background-color: #ecf0f1;
  min-height: 100vh;
  // padding: 20px;
`;

const Title = styled.h1`
  margin-top: 1.8rem;
  margin-left: 1.3rem;
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
  margin-top: 2rem;
  margin-left: 1.3rem;
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2rem 1.3rem;
  flex-wrap: wrap;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  flex: 1 1 calc(33.333% - 20px);
  margin: 10px;
  text-align: center;
  min-width: 200px;
`;

const CardTitle = styled.h3`
  color: #34495e;
  margin-bottom: 10px;
`;

const CardNumber = styled.p`
  font-size: 2rem;
  color: #2c3e50;
  margin: 0;
`;

const GraphsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 2rem 1.3rem;
`;

const GraphCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 15px;
  width: calc(50% - 10px);
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const GraphImageWrapper = styled.div`
  width: 100%;
  padding-top: 75%; // 4:3 aspect ratio
  position: relative;
  overflow: hidden;
`;

const GraphImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const GraphTitle = styled.h4`
  color: #34495e;
  margin-top: 10px;
  margin-bottom: 0;
  text-align: center;
`;

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalResumes: 0,
    qualifiedResumes: 0,
    riskyResumes: 0,
  });
  const handleFileUploadClick = () => {
    navigate('/upload'); // Navigate to file upload page
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/dashboard-stats");
        const data = await response.json();
        setStats({
          totalResumes: data.totalResumes,
          qualifiedResumes: data.qualifiedResumes,
          riskyResumes: data.riskyResumes,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  const handleRanking = () => {
    navigate("dash");
  };

  return (
    <Container>
      <NavBar />
      <Title>Dashboard</Title>
      <Button onClick={handleFileUploadClick}>Upload</Button>
      
      <CardsContainer>
        <Card>
          <CardTitle>Total Resumes</CardTitle>
          <CardNumber>{stats.totalResumes}</CardNumber>
        </Card>
        <Card>
          <CardTitle>Qualified Resumes</CardTitle>
          <CardNumber>{stats.qualifiedResumes}</CardNumber>
        </Card>
        <Card>
          <CardTitle>Risky Resumes</CardTitle>
          <CardNumber>{stats.riskyResumes}</CardNumber>
        </Card>
      </CardsContainer>

      <GraphsContainer>
        <GraphCard>
          <GraphImageWrapper>
            <GraphImage src={graph1} alt="Resume Distribution" />
          </GraphImageWrapper>
          <GraphTitle>Resume Distribution</GraphTitle>
        </GraphCard>
        <GraphCard>
          <GraphImageWrapper>
            <GraphImage src={graph2} alt="Qualification Trends" />
          </GraphImageWrapper>
          <GraphTitle>Qualification Trends</GraphTitle>
        </GraphCard>
        <GraphCard>
          <GraphImageWrapper>
            <GraphImage src={graph3} alt="Risk Assessment" />
          </GraphImageWrapper>
          <GraphTitle>Risk Assessment</GraphTitle>
        </GraphCard>
        <GraphCard>
          <GraphImageWrapper>
            <GraphImage src={graph4} alt="Monthly Statistics" />
          </GraphImageWrapper>
          <GraphTitle>Monthly Statistics</GraphTitle>
        </GraphCard>
      </GraphsContainer>

      <Button onClick={handleRanking}>Rankings</Button>
    </Container>
  );
}

export default Dashboard;
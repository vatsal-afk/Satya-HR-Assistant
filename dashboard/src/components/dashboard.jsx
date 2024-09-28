import React from "react";
import styled from 'styled-components'
import NavBar from "./navBar";
import { Navigate, useNavigate } from "react-router-dom";


const Container= styled.div`
background-color: #ecf0f1;
height:100vh`;
const Title = styled.h1`
  margin-top:1.8rem;
  margin-left:1.3rem;
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
    margin-top:5rem;
    margin-left:1.8rem;
`

function Dashboard(){
    const navigate=useNavigate();


    const handleRanking=()=>{
        navigate("dash");
    }


    return(
       <Container>
        <NavBar/>
        <Title>Dashboard</Title>
        <Button onClick={handleRanking}>Rankings</Button>
            
                
        </Container>
            
       
    )
    
}

export default Dashboard;
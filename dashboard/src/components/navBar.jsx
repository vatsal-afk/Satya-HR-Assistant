import React, { useEffect, useState } from "react" 
import styled from 'styled-components'

// Styled components
const TopHeader = styled.div`
width:100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2c3e50;
  color: white;
  padding: 15px 20px;
  top:0;
  left:0;
  
  
  
`;

const SearchBar = styled.input`
  padding: 10px;
  border-radius: 1.3rem;
  border: none;
  width: 300px;
  font-size: 16px;
`;

const ProfileIcon = styled.div`
  background-color: #34495e;
  border-radius: 50%;
  width: 40px;
  height: 40px;
`;

const Greeting = styled.div`
  font-size: 18px;
  color: white;
`;

// NavBar component with username as a prop
function NavBar({ username }) {
    const[name,setName]=useState('user')
    if(username){
        setName({username})
    }
  return (
    <TopHeader>
      <Greeting>Hey! {name}</Greeting>
      <SearchBar type="text" placeholder="Search..." />
      <ProfileIcon />
    </TopHeader>
  );
}

export default NavBar;

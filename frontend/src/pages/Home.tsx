import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const HomeContainer = styled.div`
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f7f7f7; /* Light Gray */
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 30px;
  color: #333; /* Dark Gray */
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc; /* Gray */
  border-radius: 4px;
  outline: none;
`;

const EnterButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff; /* Vibrant Blue */
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
`;

const Home: React.FC = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const handleEnterClick = () => {
    // Add your logic here to handle the user's input
    if (userName.trim() !== '') {
      console.log(`User name entered: ${userName}`);
      navigate('/main'); // Navigate to the Main page
    }
  };

  return (
    <HomeContainer>
      <Title>Welcome to Education Tracker</Title>
      <InputContainer>
        <Input
          type="text"
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </InputContainer>
      <EnterButton onClick={handleEnterClick}>Enter</EnterButton>
    </HomeContainer>
  );
};

export default Home;

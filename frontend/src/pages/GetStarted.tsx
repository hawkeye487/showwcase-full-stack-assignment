import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

const BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

const GetStartedContainer = styled.div`
	font-family: 'Roboto', sans-serif;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	background-color: #f7f7f7; /* Light Gray */
`;

const Welcome = styled.h3`
	font-size: 20px;
	margin-bottom: 40px;
	font-weight: 500;
`;

const Title = styled.h1`
	font-size: 25px;
	margin-bottom: 20px;
	font-weight: 500;
`;

const InputContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 20px;
`;

const Input = styled.input`
	padding: 10px;
	font-size: 16px;
	border-radius: 4px;
	outline: none;
  letter-spacing: normal;
  word-spacing: normal;
  line-height: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  display: inline-block;
  text-align: start;
  appearance: auto;
  -webkit-rtl-ordering: logical;
  cursor: text;
  background-color: field;
  border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
  border-image: initial;
}
`;

const EnterButton = styled.button`
	padding: 0.5rem;
	font-size: 1rem;
	font-family: monospace;
	background-color: #292929;
	border: 1px solid #292929;
	transition: all 0.1s ease-in-out;
	text-decoration: none;
	color: #f3f3f3;

	&:hover {
		background-color: transparent;
		color: #292929;
		cursor: pointer;
	}
`;

const GetStarted: React.FC = () => {
	const [userName, setUserName] = useState('');
	const navigate = useNavigate();

	const { getToken } = useAuth();

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				// Get the user's access token from Clerk
				const accessToken = await getToken();

				const response = await fetch(`${BASE_URL}/user`, {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${accessToken}`, // Include the access token in the request headers
					},
				});
				const data = await response.json();

				if (data.name) {
					navigate('/main');
				}
			} catch (error) {
				console.error('Error:', error);
				// Handle the error if needed
			}
		};

		fetchUserData();
	}, []);

	const handleEnterClick = async () => {
		// Add your logic here to handle the user's input
		if (userName.trim() !== '') {
			try {
				// Get the user's access token from Clerk
				const accessToken = await getToken();

				const response = await fetch(`${BASE_URL}/user`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`, // Include the access token in the request headers
					},
					body: JSON.stringify({ name: userName }),
				});

				if (!response.ok) {
					throw new Error('Failed to send data to the server.');
				}

				// If the POST request is successful, navigate to the Main page
				navigate('/main');
			} catch (error) {
				console.error('Error:', error);
				// Handle the error if needed
			}
		}
	};

	return (
		<GetStartedContainer>
			<Welcome>Hi there ! welcome to your education showwcase</Welcome>
			<Title>Type your name and click "Enter" below to begin !</Title>
			<InputContainer>
				<Input
					type='text'
					placeholder='Enter your name'
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
				/>
			</InputContainer>
			<EnterButton onClick={handleEnterClick}>Enter</EnterButton>
		</GetStartedContainer>
	);
};

export default GetStarted;

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LandingContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	background-color: #f5f5f5;
`;

const Title = styled.h1`
	font-size: 36px;
	margin-bottom: 30px;
	font-weight: 500;
`;

const ButtonContainer = styled.div`
	display: flex;
	gap: 20px;
    margin: 20px;
`;

const GetStartedButton = styled(Link)`
	// text-transform: uppercase;
	padding: 0.5rem;
	font-size: 1rem;
	font-family: monospace;
	background-color: transparent;
	border: 1px solid #292929;
	transition: all 0.1s ease-in-out;
	text-decoration: none;
	color: #292929;

	&:hover {
		background-color: #292929;
		color: #f3f3f3;
		cursor: pointer;
	}
`;

const SignInSection = styled.p`
    margin-top: 20px;
    color: #292929;
`;

const LandingPage: React.FC = () => {
	return (
		<LandingContainer>
			<Title>Hi there 👋! Welcome to showwcase !</Title>
			<ButtonContainer>
				<GetStartedButton to='/get-started'>Get Started</GetStartedButton>
			</ButtonContainer>
                <SignInSection>Already have an account ? <Link to='/sign-in'>Log in here</Link></SignInSection>
		</LandingContainer>
	);
};

export default LandingPage;

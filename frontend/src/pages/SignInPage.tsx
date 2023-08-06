import React from 'react';
import styled from 'styled-components';


import {
	SignIn,
} from '@clerk/clerk-react';

const SignInContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

const SignInPage: React.FC = () => {


	return (
		<SignInContainer>
			<SignIn redirectUrl={'/main'} routing='path' path='/sign-in' />
		</SignInContainer>
	);
};

export default SignInPage;

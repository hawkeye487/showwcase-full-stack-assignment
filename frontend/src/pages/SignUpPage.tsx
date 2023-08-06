import React from 'react';
import styled from 'styled-components';

import {
	SignUp,
} from '@clerk/clerk-react';

const SignUpContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

const SignUpPage: React.FC = () => {
	return (
		<SignUpContainer>
			<SignUp
							redirectUrl={'/get-started'}
							routing='path'
							path='/sign-up'
						/>
		</SignUpContainer>
	);
};

export default SignUpPage;

import React from 'react';
import styled from 'styled-components';
// import { useClerk } from '@clerk/clerk-react';
// import { useNavigate } from 'react-router-dom';

import {
	// ClerkProvider,
	// SignedIn,
	// SignedOut,
	// RedirectToSignIn,
	SignUp,
	// UserButton,
} from '@clerk/clerk-react';

const SignUpContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

const SignUpPage: React.FC = () => {
	//   const { authenticated } = useClerk();
	//   const navigate = useNavigate();

	//   React.useEffect(() => {
	//     if (authenticated) {
	//       navigate('/main'); // Redirect to the main page if the user is already signed in
	//     }
	//   }, [authenticated, navigate]);

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

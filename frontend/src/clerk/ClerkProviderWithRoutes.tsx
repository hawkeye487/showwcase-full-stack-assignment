import { Routes, Route, useNavigate } from 'react-router-dom';
import {
	ClerkProvider,
	SignedIn,
	SignedOut,
	RedirectToSignIn,
} from '@clerk/clerk-react';
import GetStarted from '../pages/GetStarted';
import Main from '../pages/Main';
import LandingPage from '../pages/LandingPage';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import { QueryClientWrapper } from '../query/queryClient';
import RedirectToMain from '../components/RedirectToMain';

if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
	throw new Error('Missing Publishable Key');
}

const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

const ClerkProviderWithRoutes: React.FC = () => {
	const navigate = useNavigate();

	return (
		<ClerkProvider
			publishableKey={clerkPubKey}
			navigate={(to) => navigate(to)}
		>
			<QueryClientWrapper>
				<Routes>
					<Route
						path='/'
						element={
							<>
								<SignedIn>
									<RedirectToMain />
								</SignedIn>
								<SignedOut>
									<LandingPage />
								</SignedOut>
							</>
						}
					/>
					<Route
						path='/get-started'
						element={
							<SignedIn>
								<GetStarted />
							</SignedIn>
						}
					/>
					<Route path='/sign-in/*' element={<SignInPage />} />
					<Route path='/sign-up/*' element={<SignUpPage />} />
					<Route
						path='/main'
						element={
							<>
								<SignedIn>
									<Main />
								</SignedIn>
								<SignedOut>
									<RedirectToSignIn />
								</SignedOut>
							</>
						}
					/>
				</Routes>
			</QueryClientWrapper>
		</ClerkProvider>
	);
};

export default ClerkProviderWithRoutes;

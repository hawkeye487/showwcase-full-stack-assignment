import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// import { SignIn, SignUp, UserButton } from '@clerk/clerk-react';
import './App.css';
import ClerkProviderWithRoutes from './clerk/ClerkProviderWithRoutes';

const App: React.FC = () => {
	return (
		<Router>
			<ClerkProviderWithRoutes />
		</Router>
	);
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Main from './components/Main';

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/main' element={<Main />} />
			</Routes>
		</Router>
	);
};

export default App;

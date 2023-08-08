import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const RedirectToMain: React.FC = () => {
	const navigate = useNavigate();
	useEffect(() => {
		navigate('/main');
	}, []);

	return null;
};

export default RedirectToMain;

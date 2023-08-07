import React, { useState } from 'react';
import EducationForm from '../components/EducationForm';
import EducationList from '../components/EducationList';
import styled from 'styled-components';
import { useAuth } from '@clerk/clerk-react';
import { useQueryClient, useQuery } from 'react-query';
import Loading from '../components/Loading';

interface EducationData {
	school: string;
	degree: string;
	fieldOfStudy: string;
	startYear: string;
	endYear: string;
	description: string;
}

const MainContainer = styled.div`
	display: flex;
	justify-content: center;
	font-family: 'Roboto', sans-serif;
	flex-direction: column;
`;

const ContentContainer = styled.div`
	flex: 1;
	min-height: 25vh;
	padding: 20px;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
`;

const AddButton = styled.button`
	margin-bottom: 20px;
	padding: 8px 16px;
	background-color: #007bff;
	color: #fff;
	border: none;
	border-radius: 4px;
	cursor: pointer;
`;

const EducationWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
`;

const SidePanel = styled.div`
	position: sticky;
	top: 20px;
	flex: 0.2;
	background-color: #f7f7f7;
	border-right: 1px solid #ccc;
	padding: 20px;
`;

const BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

const Main: React.FC = () => {
	const { userId, getToken } = useAuth();

	console.log({ userId });

	const [showModal, setShowModal] = useState(false);
	const [selectedEducationIndex, setSelectedEducationIndex] = useState<
		number | null
	>(null);

	const queryClient = useQueryClient();

	// Use React Query to fetch education data
	const {
		isLoading,
		error,
		data: educations,
	} = useQuery<EducationData[]>(
		'educations',
		async () => {
			const token = await getToken();
			const response = await fetch(`${BASE_URL}/education`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			return response.json();
		},
		{
			// Refetch the data on window focus or when the component mounts
			refetchOnWindowFocus: true,
			initialData:
				queryClient.getQueryData<EducationData[]>('educations'), // Use initial data from the cache, if available
		}
	);

	if (isLoading) return <Loading />;
	if (error) return <div>Error fetching data: {error.message}</div>;

	const handleAddEducation = (newEducation: EducationData) => {
		queryClient.setQueryData<EducationData[]>('educations', (prevData) => [
			newEducation,
			...prevData,
		]);
		setShowModal(false);
		setSelectedEducationIndex(0);
	};

	const handleSelectEducation = (index: number) => {
		setSelectedEducationIndex(index);
	};

	return (
		<MainContainer>
			<ContentContainer>
				<h2>Main Screen</h2>
				<AddButton onClick={() => setShowModal(true)}>
					Add Education
				</AddButton>
			</ContentContainer>
			<EducationWrapper>
				{educations && educations.length > 0 && (
					<SidePanel>
						<h3>Education Highlights</h3>
						<ul>
							{educations.map((education, index) => (
								<li
									key={index}
									className={
										index === selectedEducationIndex
											? 'selected'
											: ''
									}
									onClick={() => handleSelectEducation(index)}
								>
									{education.school}
								</li>
							))}
						</ul>
					</SidePanel>
				)}
				<EducationList
					educations={educations || []}
					onSelect={handleSelectEducation}
				/>
			</EducationWrapper>
			<EducationForm
				isOpen={showModal}
				onClose={() => setShowModal(false)}
				onSubmit={handleAddEducation}
			/>
		</MainContainer>
	);
};

export default Main;

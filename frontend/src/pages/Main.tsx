import React, { useState, useEffect } from 'react';
import EducationForm from '../components/EducationForm';
import EducationList from '../components/EducationList';
import styled from 'styled-components';
import { useAuth, UserButton } from '@clerk/clerk-react';
import Loading from '../components/Loading';
import { EducationData } from '../types/types';
import {
	useEducations,
	useAddEducation,
	useUpdateEducation,
	useDeleteEducation,
} from '../api/EducationAPI';

const BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

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
	background-color: #292929;
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
	border-right: 1px solid #ccc;
	padding: 20px;
`;

const EducationHighlightList = styled.ul`
	list-style: none;
	padding: 0;
`;

const EducationHighlightItem = styled.li<{ isSelected: boolean }>`
	cursor: pointer;
	padding: 8px;
	border-radius: 4px;

	color: ${({ isSelected }) => (isSelected ? 'black' : 'grey')};
`;

const UserButtonWrapper = styled.div`
	position: absolute;
	top: 7%;
	right: 7%;
`;

const Title = styled.h2`
	font-size: 25px;
	// margin-bottom: 30px;
	font-weight: 500;
`;

const Main: React.FC = () => {
	const { getToken } = useAuth();
	const [userName, setUserName] = useState('');

	const [showModal, setShowModal] = useState(false);
	const [selectedEducationId, setSelectedEducationId] = useState<number | null>(null);
	const [editingEducation, setEditingEducation] = useState<EducationData | null>(null);

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

				if (!response.ok) {
					throw new Error('Failed to fetch user data.');
				}

				const data = await response.json();

				// Set the user's name in the state
				setUserName(data.name);
			} catch (error) {
				console.error('Error:', error);
				// Handle the error if needed
			}
		};

		fetchUserData();
	}, []);

	const { isLoading, educations, refetch } = useEducations();
	const { addEducationMutation } = useAddEducation();
	const { updateEducationMutation } = useUpdateEducation();
	const { deleteEducationMutation } = useDeleteEducation();

	if (isLoading) return <Loading />;

	const handleAddEducation = (newEducation: EducationData) => {
		addEducationMutation.mutate(newEducation);
		refetch();
		setShowModal(false);
		setSelectedEducationId(null);
	};

	const handleEditEducation = (education: EducationData) => {
		setEditingEducation(education);
		setShowModal(true);
	};

	const handleUpdateEducation = (updatedEducation: EducationData) => {
		updateEducationMutation.mutate(updatedEducation);
		setShowModal(false);
		setEditingEducation(null);
	};

	const handleSelectEducation = (id: number) => {
		setSelectedEducationId(id);
	};

	const handleHoverEducation = (id: number | null) => {
		setSelectedEducationId(id);
	};

	const handleDeleteEducation = (id: number) => {
		deleteEducationMutation.mutate(id);
	};

	return (
		<MainContainer>
			<UserButtonWrapper>
				<UserButton />
			</UserButtonWrapper>
			<ContentContainer
				style={{
					minHeight:
						educations && educations.length === 0
							? '100vh'
							: '25vh',
				}}
			>
				<Title>Welcome to {userName}'s education showwcase</Title>
				<AddButton onClick={() => setShowModal(true)}>
					Add new education
				</AddButton>
			</ContentContainer>
			<EducationWrapper>
				{educations && educations.length > 0 && (
					<SidePanel>
						<EducationHighlightList>
							{educations
								.slice()
								.reverse()
								.map((education) => (
									<EducationHighlightItem
										key={education.id}
										isSelected={
											education.id === selectedEducationId
										}
										onClick={() =>
											handleSelectEducation(education.id)
										}
									>
										{education.school}
									</EducationHighlightItem>
								))}
						</EducationHighlightList>
					</SidePanel>
				)}
				<EducationList
					educations={educations || []}
					onEdit={handleEditEducation}
					onDelete={handleDeleteEducation}
					selectedEducationId={selectedEducationId}
					onHoverEducation={handleHoverEducation}
				/>
			</EducationWrapper>
			<EducationForm
				isOpen={showModal}
				onClose={() => setShowModal(false)}
				onSubmit={handleAddEducation}
				isEditing={!!editingEducation}
				setIsEditing={setEditingEducation}
				editEducationData={editingEducation}
				onUpdate={handleUpdateEducation}
			/>
		</MainContainer>
	);
};

export default Main;

import React, { useState } from 'react';
import EducationForm from '../components/EducationForm';
import EducationList from '../components/EducationList';
import styled from 'styled-components';

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

const Main: React.FC = () => {
	const [showModal, setShowModal] = useState(false);
	const [educations, setEducations] = useState<EducationData[]>([]);
	const [selectedEducationIndex, setSelectedEducationIndex] = useState<
		number | null
	>(null);

	const handleAddEducation = (newEducation: EducationData) => {
		setEducations([newEducation, ...educations]);
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
				{educations.length > 0 && selectedEducationIndex !== null && (
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
					educations={educations}
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

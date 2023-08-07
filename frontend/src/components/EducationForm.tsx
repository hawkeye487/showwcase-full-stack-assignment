import React, { useState, ChangeEvent, useEffect } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import useSWR from 'swr';
import { EducationData } from '../types/types';

interface EducationFormProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (education: EducationData) => void;
	isEditing?: boolean;
	editEducationData?: EducationData | null;
	onUpdate?: (education: EducationData) => void;
	setIsEditing?: (isEditing: boolean) => void;
}

const ModalHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	min-width: 100%;
	padding: 20px 0;
`;

const ModalTitle = styled.h3`
	margin: 0;
`;

const CloseButton = styled.button`
	background: none;
	border: none;
	cursor: pointer;
	font-size: 18px;
`;

const ModalContent = styled.div`
	padding: 0 20px 20px;
	position: relative;
`;

const FormLabel = styled.label`
	font-size: small;
	margin-bottom: 8px;
`;

const InputField = styled.input`
	width: 100%;
	padding: 8px;
	margin: 5px 0 10px;
	border: 1px solid #ccc;
	border-radius: 4px;
`;

const SelectField = styled.select`
	width: 100%;
	padding: 8px;
	border: 1px solid #ccc;
	border-radius: 4px;
	flex: 0.45;
`;

const DatePickerContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 16px;
`;

const DateLabel = styled.label`
	font-size: small;
`;

const DescriptionField = styled.textarea`
	width: 100%;
	padding: 8px;
	margin-bottom: 16px;
	border: 1px solid #ccc;
	border-radius: 4px;
	resize: vertical;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const Button = styled.button`
	padding: 8px 16px;
	background-color: #292929;
	color: #f3f3f3;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	margin-left: 8px;
`;

const SuggestionsDropdown = styled.div`
	position: absolute;
	background-color: #fff;
	border: 1px solid #ccc;
	border-radius: 4px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	max-height: 200px;
	max-width: -webkit-fill-available;
	overflow-y: auto;
	z-index: 1;
	width: 100%;
	padding: 8px;
`;

const Option = styled.div`
	padding: 8px 0;
	cursor: pointer;

	&:hover {
		background-color: #f8f8f8;
	}
`;

const MandatoryFieldMessage = styled.span`
	color: red;
	font-size: 12px;
	margin-top: 4px;
`;

const EducationForm: React.FC<EducationFormProps> = ({
	isOpen,
	onClose,
	onSubmit,
	isEditing = false,
	editEducationData,
	onUpdate,
	setIsEditing,
}) => {
	const initialEducationState: EducationData = {
		id: 0,
		school: '',
		degree: '',
		fieldOfStudy: '',
		startMonth: '',
		startYear: '',
		endMonth: '',
		endYear: '',
		description: '',
	};

	const [education, setEducation] = useState<EducationData>(
		initialEducationState
	);
	const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
	// const [isEditing , setIsEditing] = useState<boolean>(false);

	useEffect(() => {
		// Reset the state when the modal is closed
		console.log('isOpen', isOpen);

		if (!isOpen) {
			setEducation(initialEducationState);
			setShowSuggestions(false);
			setIsEditing(false);
			console.log({ isEditing });
		}
	}, [isOpen]);

	const currentYear = new Date().getFullYear();
	const years = Array.from({ length: currentYear - 1950 + 1 }, (_, index) =>
		(currentYear - index).toString()
	);

	// Function to fetch school suggestions using SWR
	const fetcher = async (url: string) => {
		const response = await fetch(url);
		return response.json();
	};

	const { data: suggestions } = useSWR<{ name: string }[]>(
		education.school
			? `http://universities.hipolabs.com/search?name=${education.school}`
			: null,
		fetcher
	);

	useEffect(() => {
		if (isEditing && editEducationData) {
			setEducation(editEducationData);
		} else {
			setEducation(initialEducationState);
		}
	}, [isEditing, editEducationData]);

	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value;
		setEducation((prevEducation) => ({
			...prevEducation,
			school: inputValue,
		}));
		setShowSuggestions(true);
	};

	const handleSuggestionSelect = (selectedSchool: string) => {
		setEducation((prevEducation) => ({
			...prevEducation,
			school: selectedSchool,
		}));
		setShowSuggestions(false);
	};

	const handleSubmit = () => {
		// Validate the data if needed
		if (
			!education.school ||
			!education.degree ||
			!education.fieldOfStudy ||
			!education.startMonth ||
			!education.startYear ||
			!education.endMonth ||
			!education.endYear
		) {
			alert('Please fill in all mandatory fields.');
			return;
		}

		if (isEditing && onUpdate) {
			onUpdate(education);
		} else {
			onSubmit(education);
		}

		// Clear the form fields after submitting
		setEducation(initialEducationState);
		onClose();
	};

	const handleCancel = () => {
		// Clear the form fields on cancel
		setEducation(initialEducationState);
		onClose();
	};

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={handleCancel}
			style={{
				content: {
					width: '600px',
					height: 'fit-content',
					margin: 'auto',
				},
				overlay: {
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
				},
			}}
		>
			<ModalContent>
				<ModalHeader>
					<ModalTitle>
						{isEditing ? 'Edit Education' : 'Add new Education'}
					</ModalTitle>
					<CloseButton onClick={handleCancel}>X</CloseButton>
				</ModalHeader>
				<FormLabel>
					School Name
					{education.school === '' && (
						<MandatoryFieldMessage>
							{' '}
							(Required)
						</MandatoryFieldMessage>
					)}
				</FormLabel>
				<InputField
					type='text'
					value={education.school}
					onChange={handleSearchChange}
					placeholder='Search for School Name'
				/>
				{/* Suggestions dropdown */}
				{showSuggestions && suggestions && suggestions.length > 0 && (
					<SuggestionsDropdown>
						{suggestions.map((suggestion, index) => (
							<Option
								key={index}
								onClick={() =>
									handleSuggestionSelect(suggestion.name)
								}
							>
								{suggestion.name}
							</Option>
						))}
					</SuggestionsDropdown>
				)}
				<FormLabel>
					Degree
					{education.degree === '' && (
						<MandatoryFieldMessage>
							{' '}
							(Required)
						</MandatoryFieldMessage>
					)}
				</FormLabel>
				<InputField
					type='text'
					value={education.degree}
					onChange={(e) =>
						setEducation((prevEducation) => ({
							...prevEducation,
							degree: e.target.value,
						}))
					}
					placeholder='Degree'
				/>
				<FormLabel>
					Field of Study
					{education.fieldOfStudy === '' && (
						<MandatoryFieldMessage>
							{' '}
							(Required)
						</MandatoryFieldMessage>
					)}
				</FormLabel>
				<InputField
					type='text'
					value={education.fieldOfStudy}
					onChange={(e) =>
						setEducation((prevEducation) => ({
							...prevEducation,
							fieldOfStudy: e.target.value,
						}))
					}
					placeholder='Field of Study'
				/>
				<DateLabel>
					Start Date
					{(education.startMonth === '' ||
						education.startYear === '') && (
						<MandatoryFieldMessage>
							{' '}
							(Required)
						</MandatoryFieldMessage>
					)}
				</DateLabel>
				<DatePickerContainer>
					<SelectField
						value={education.startMonth}
						onChange={(e) =>
							setEducation((prevEducation) => ({
								...prevEducation,
								startMonth: e.target.value,
							}))
						}
					>
						<option value=''>Select Month</option>
						<option value='January'>January</option>
						<option value='February'>February</option>
						<option value='March'>March</option>
						<option value='April'>April</option>
						<option value='May'>May</option>
						<option value='June'>June</option>
						<option value='July'>July</option>
						<option value='August'>August</option>
						<option value='September'>September</option>
						<option value='October'>October</option>
						<option value='November'>November</option>
						<option value='December'>December</option>
						{/* Add more months here */}
					</SelectField>
					<SelectField
						value={education.startYear}
						onChange={(e) =>
							setEducation((prevEducation) => ({
								...prevEducation,
								startYear: e.target.value,
							}))
						}
					>
						<option value=''>Select Year</option>
						{years.map((year) => (
							<option key={year} value={year}>
								{year}
							</option>
						))}
					</SelectField>
				</DatePickerContainer>
				<DateLabel>
					End Date (or expected){' '}
					{(education.endMonth === '' ||
						education.endYear === '') && (
						<MandatoryFieldMessage>
							{' '}
							(Required)
						</MandatoryFieldMessage>
					)}
				</DateLabel>
				<DatePickerContainer>
					<SelectField
						value={education.endMonth}
						onChange={(e) =>
							setEducation((prevEducation) => ({
								...prevEducation,
								endMonth: e.target.value,
							}))
						}
					>
						<option value=''>Select Month</option>
						<option value='January'>January</option>
						<option value='February'>February</option>
						<option value='March'>March</option>
						<option value='April'>April</option>
						<option value='May'>May</option>
						<option value='June'>June</option>
						<option value='July'>July</option>
						<option value='August'>August</option>
						<option value='September'>September</option>
						<option value='October'>October</option>
						<option value='November'>November</option>
						<option value='December'>December</option>
					</SelectField>
					<SelectField
						value={education.endYear}
						onChange={(e) =>
							setEducation((prevEducation) => ({
								...prevEducation,
								endYear: e.target.value,
							}))
						}
					>
						<option value=''>Select Year</option>
						{years.map((year) => (
							<option key={year} value={year}>
								{year}
							</option>
						))}
					</SelectField>
				</DatePickerContainer>
				<FormLabel>Description</FormLabel>
				<DescriptionField
					value={education.description}
					onChange={(e) =>
						setEducation((prevEducation) => ({
							...prevEducation,
							description: e.target.value,
						}))
					}
					placeholder='Description'
				/>
				<ButtonContainer>
					<Button onClick={handleSubmit}>
						{isEditing ? 'Update' : 'Save'}
					</Button>
					<Button
						onClick={handleCancel}
						style={{
							backgroundColor: 'transparent',
							color: '#292929',
							border: '1px solid #292929',
						}}
					>
						Cancel
					</Button>
				</ButtonContainer>
			</ModalContent>
		</Modal>
	);
};

export default EducationForm;

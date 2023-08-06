import React, { useState, ChangeEvent, useEffect } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import useSWR from 'swr';

interface EducationFormProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (education: EducationData) => void;
}

interface EducationData {
	school: string;
	degree: string;
	fieldOfStudy: string;
	startMonth: string;
	startYear: string;
	endMonth: string;
	endYear: string;
	description: string;
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
	// margin-bottom: 16px;
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

const EducationForm: React.FC<EducationFormProps> = ({
	isOpen,
	onClose,
	onSubmit,
}) => {
	const [school, setSchool] = useState<string>('');
	const [degree, setDegree] = useState<string>('');
	const [fieldOfStudy, setFieldOfStudy] = useState<string>('');
	const [startMonth, setStartMonth] = useState<string>('');
	const [startYear, setStartYear] = useState<string>('');
	const [endMonth, setEndMonth] = useState<string>('');
	const [endYear, setEndYear] = useState<string>('');
	const [description, setDescription] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

	const [debouncedSchool, setDebouncedSchool] = useState<string>('');

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
		debouncedSchool
			? `http://universities.hipolabs.com/search?name=${debouncedSchool}`
			: null,
		fetcher
	);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSchool(school);
		}, 600); 

		return () => {
			clearTimeout(timer);
		};
	}, [school]);

	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value;
		setSchool(inputValue);
		setDebouncedSchool(inputValue);
    setShowSuggestions(true);
	};
  const handleSuggestionSelect = (selectedSchool: string) => {
    setSchool(selectedSchool);
    setDebouncedSchool(selectedSchool);
    setShowSuggestions(false);
  };

	const handleSubmit = () => {
		// Validate the data if needed
		if (
			!school ||
			!degree ||
			!fieldOfStudy ||
			!startMonth ||
			!startYear ||
			!endMonth ||
			!endYear
		) {
			alert('Please fill in all mandatory fields.');
			return;
		}

		// Create an education object with the form data
		const newEducation: EducationData = {
			school,
			degree,
			fieldOfStudy,
			startMonth,
			startYear,
			endMonth,
			endYear,
			description,
		};

		onSubmit(newEducation);

		// Clear the form fields after submitting
		setSchool('');
		setDegree('');
		setFieldOfStudy('');
		setStartMonth('');
		setStartYear('');
		setEndMonth('');
		setEndYear('');
		setDescription('');

		onClose();
	};

	const handleCancel = () => {
		// Clear the form fields on cancel
		setSchool('');
		setDegree('');
		setFieldOfStudy('');
		setStartMonth('');
		setStartYear('');
		setEndMonth('');
		setEndYear('');
		setDescription('');

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
					<ModalTitle>Add new Education</ModalTitle>
					<CloseButton onClick={handleCancel}>X</CloseButton>
				</ModalHeader>
				<FormLabel>School Name</FormLabel>
				<InputField
					type='text'
					value={school}
					onChange={handleSearchChange}
					placeholder='Search for School Name'
				/>
				{/* Suggestions dropdown */}
        {showSuggestions && suggestions && suggestions.length > 0 && (
          <SuggestionsDropdown>
            {suggestions.map((suggestion, index) => (
              <Option
                key={index}
                onClick={() => handleSuggestionSelect(suggestion.name)}
              >
                {suggestion.name}
              </Option>
            ))}
          </SuggestionsDropdown>
        )}
				<FormLabel>Degree</FormLabel>
				<InputField
					type='text'
					value={degree}
					onChange={(e) => setDegree(e.target.value)}
					placeholder='Degree'
				/>
				<FormLabel>Field of Study</FormLabel>
				<InputField
					type='text'
					value={fieldOfStudy}
					onChange={(e) => setFieldOfStudy(e.target.value)}
					placeholder='Field of Study'
				/>
				<DateLabel>Start Date</DateLabel>
				<DatePickerContainer>
					<SelectField
						value={startMonth}
						onChange={(e) => setStartMonth(e.target.value)}
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
						value={startYear}
						onChange={(e) => setStartYear(e.target.value)}
					>
						<option value=''>Select Year</option>
						{years.map((year) => (
							<option key={year} value={year}>
								{year}
							</option>
						))}
					</SelectField>
				</DatePickerContainer>
				<DateLabel>End Date (or expected)</DateLabel>
				<DatePickerContainer>
					<SelectField
						value={endMonth}
						onChange={(e) => setEndMonth(e.target.value)}
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
						value={endYear}
						onChange={(e) => setEndYear(e.target.value)}
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
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder='Description'
				/>
				<ButtonContainer>
					<Button onClick={handleSubmit}>Save</Button>
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

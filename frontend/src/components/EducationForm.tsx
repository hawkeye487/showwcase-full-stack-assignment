// import React, { useState } from 'react';
// // import axios from 'axios';
// // import Autocomplete from '@material-ui/lab/Autocomplete';
// // import TextField from '@material-ui/core/TextField';

// interface EducationFormProps {
//   onSubmit: (education: string) => void;
//   onCancel: () => void;
// }

// const EducationForm: React.FC<EducationFormProps> = ({ onSubmit, onCancel }) => {
//   const [school, setSchool] = useState<string>('');

//   // API call to fetch school names for auto-completion
//   // const fetchSchoolNames = async (searchValue: string) => {
//   //   // const response = await axios.get(`API_URL?q=${searchValue}`);
//   //   return response.data; // Assuming the API returns an array of school names
//   // };

//   const handleSubmit = () => {
//     // Validate the data if needed

//     // Create an education string with the form data
//     const newEducation = `${school}`; // You can add other education fields here...

//     onSubmit(newEducation);
//   };

//   return (
//     <div>
//       <h3>Add Education</h3>
//       {/* <Autocomplete
//         freeSolo
//         options={fetchSchoolNames}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             label="School Name"
//             value={school}
//             onChange={(e) => setSchool(e.target.value)}
//           />
//         )}
//       /> */}
//       <input type="text" value={school} onChange={(e) => setSchool(e.target.value)} />
//       {/* Add other education fields here... */}
//       <button onClick={handleSubmit}>Save</button>
//       <button onClick={onCancel}>Cancel</button>
//     </div>
//   );
// };

// export default EducationForm;

// import React, { useState } from 'react';
// import styled from 'styled-components';

// interface EducationFormProps {
//   onSubmit: (education: EducationData) => void;
//   onCancel: () => void;
// }

// interface EducationData {
//   school: string;
//   degree: string;
//   fieldOfStudy: string;
//   startYear: string;
//   endYear: string;
//   grade: string;
//   description: string;
// }

// const ModalWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.5);
// `;

// const ModalContent = styled.div`
//   background-color: #fff;
//   padding: 20px;
//   border-radius: 8px;
// `;

// const InputField = styled.input`
//   width: 100%;
//   padding: 8px;
//   margin-bottom: 16px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
// `;

// const TextArea = styled.textarea`
//   width: 100%;
//   padding: 8px;
//   margin-bottom: 16px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   resize: vertical;
// `;

// const Button = styled.button`
//   padding: 8px 16px;
//   background-color: #007bff;
//   color: #fff;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
// `;

// const EducationForm: React.FC<EducationFormProps> = ({ onSubmit, onCancel }) => {
//   const [school, setSchool] = useState<string>('');
//   const [degree, setDegree] = useState<string>('');
//   const [fieldOfStudy, setFieldOfStudy] = useState<string>('');
//   const [startYear, setStartYear] = useState<string>('');
//   const [endYear, setEndYear] = useState<string>('');
//   const [grade, setGrade] = useState<string>('');
//   const [description, setDescription] = useState<string>('');

//   const handleSubmit = () => {
//     // Validate the data if needed

//     // Create an education object with the form data
//     const newEducation: EducationData = {
//       school,
//       degree,
//       fieldOfStudy,
//       startYear,
//       endYear,
//       grade,
//       description,
//     };

//     onSubmit(newEducation);
//   };

//   return (
//     <ModalWrapper>
//       <ModalContent>
//         <h3>Add Education</h3>
//         <InputField
//           type="text"
//           value={school}
//           onChange={(e) => setSchool(e.target.value)}
//           placeholder="School Name"
//         />
//         <InputField
//           type="text"
//           value={degree}
//           onChange={(e) => setDegree(e.target.value)}
//           placeholder="Degree"
//         />
//         <InputField
//           type="text"
//           value={fieldOfStudy}
//           onChange={(e) => setFieldOfStudy(e.target.value)}
//           placeholder="Field of Study"
//         />
//         <InputField
//           type="text"
//           value={startYear}
//           onChange={(e) => setStartYear(e.target.value)}
//           placeholder="Start Year"
//         />
//         <InputField
//           type="text"
//           value={endYear}
//           onChange={(e) => setEndYear(e.target.value)}
//           placeholder="End Year (or expected)"
//         />
//         <InputField
//           type="text"
//           value={grade}
//           onChange={(e) => setGrade(e.target.value)}
//           placeholder="Grade"
//         />
//         <TextArea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="Description"
//         ></TextArea>
//         <div>
//           <Button onClick={handleSubmit}>Save</Button>
//           <Button onClick={onCancel} style={{ marginLeft: 8, backgroundColor: '#dc3545' }}>
//             Cancel
//           </Button>
//         </div>
//       </ModalContent>
//     </ModalWrapper>
//   );
// };

// export default EducationForm;


import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface EducationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (education: EducationData) => void;
}

interface EducationData {
  school: string;
  degree: string;
  fieldOfStudy: string;
  startYear: string;
  endYear: string;
  description: string;
}

const ModalContent = styled.div`
  padding: 20px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const DatePickerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const DateLabel = styled.label`
  font-weight: bold;
`;

const DescriptionField = styled.textarea`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const EducationForm: React.FC<EducationFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [school, setSchool] = useState<string>('');
  const [degree, setDegree] = useState<string>('');
  const [fieldOfStudy, setFieldOfStudy] = useState<string>('');
  const [startYear, setStartYear] = useState<Date | null>(null);
  const [endYear, setEndYear] = useState<Date | null>(null);
  const [description, setDescription] = useState<string>('');

  const handleSubmit = () => {
    // Validate the data if needed
    if (!school || !degree || !fieldOfStudy || !startYear || !endYear) {
      alert('Please fill in all mandatory fields.');
      return;
    }

    // Create an education object with the form data
    const newEducation: EducationData = {
      school,
      degree,
      fieldOfStudy,
      startYear: startYear!.getFullYear().toString(),
      endYear: endYear!.getFullYear().toString(),
      description,
    };

    onSubmit(newEducation);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          width: '400px',
          margin: 'auto',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <ModalContent>
        <h3>Add Education</h3>
        <InputField
          type="text"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          placeholder="School Name"
        />
        <InputField
          type="text"
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
          placeholder="Degree"
        />
        <InputField
          type="text"
          value={fieldOfStudy}
          onChange={(e) => setFieldOfStudy(e.target.value)}
          placeholder="Field of Study"
        />
        <DatePickerContainer>
          <DateLabel>Start Year:</DateLabel>
          <DatePicker
            selected={startYear}
            onChange={(date) => setStartYear(date)}
            dateFormat="yyyy"
            showYearPicker
            scrollableYearDropdown
          />
        </DatePickerContainer>
        <DatePickerContainer>
          <DateLabel>End Year (or expected):</DateLabel>
          <DatePicker
            selected={endYear}
            onChange={(date) => setEndYear(date)}
            dateFormat="yyyy"
            showYearPicker
            scrollableYearDropdown
          />
        </DatePickerContainer>
        <DescriptionField
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <div>
          <Button onClick={handleSubmit}>Save</Button>
          <Button onClick={onClose} style={{ marginLeft: 8, backgroundColor: '#dc3545' }}>
            Cancel
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default EducationForm;



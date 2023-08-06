import React from 'react';
import styled from 'styled-components';

interface EducationListProps {
  educations: EducationData[];
}

interface EducationData {
  school: string;
  degree: string;
  fieldOfStudy: string;
  startYear: string;
  endYear: string;
  grade: string;
  description: string;
}

const EducationContainer = styled.div`
flex: 0.7;

`;

const EducationItem = styled.div`
  background-color: #f7f7f7;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px;
`;

const EducationHeader = styled.h3`
  margin-bottom: 8px;
`;

const EducationList: React.FC<EducationListProps> = ({ educations }) => {
  return (
    <EducationContainer>
      {educations.slice().reverse().map((education, index) => (
        <EducationItem key={index}>
          <EducationHeader>{education.school}</EducationHeader>
          <p>{education.degree}</p>
          <p>Field of Study: {education.fieldOfStudy}</p>
          <p>Start Year: {education.startYear}</p>
          <p>End Year (or expected): {education.endYear}</p>
          <p>Grade: {education.grade}</p>
          <p>Description: {education.description}</p>
        </EducationItem>
      ))}
    </EducationContainer>
  );
};

export default EducationList;

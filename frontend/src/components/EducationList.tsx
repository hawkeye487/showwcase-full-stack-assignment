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
          <EducationHeader>{education.degree} {education.fieldOfStudy} @ {education.school}</EducationHeader>
          <p>Start Year: {education.startYear}</p>
          <p>End Year (or expected): {education.endYear}</p>
          <p>{education.description}</p>
        </EducationItem>
      ))}
    </EducationContainer>
  );
};

export default EducationList;

import React from 'react';
import styled from 'styled-components';
import { FaUniversity, FaCalendarAlt, FaEdit, FaTrash } from 'react-icons/fa';

interface EducationListProps {
  educations: EducationData[];
  onEdit: (education: EducationData) => void;
  onDelete: (id: number) => void;
}

interface EducationData {
  id: number;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  description: string;
}

const EducationContainer = styled.div`
  flex: 0.7;
`;

const EducationCard = styled.div`
  background-color: #f7f7f7;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 60%;
  position: relative;
`;

const EducationHeader = styled.h3`
  margin-bottom: 8px;
`;

const SchoolIcon = styled(FaUniversity)`
  font-size: 24px;
  margin-right: 8px;
`;

const CalendarIcon = styled(FaCalendarAlt)`
  font-size: 20px;
  margin-right: 4px;
`;

const YearText = styled.p`
  margin: 4px 0;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: #666;
`;

const DescriptionText = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #333; /* Adjust the font color as desired */
`;

const PlaceholderText = styled.span`
  font-style: italic;
  color: #999;
`;

const EditButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #666;
  padding: 4px;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 40px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #666;
  padding: 4px;
`;

const EducationList: React.FC<EducationListProps> = ({
  educations,
  onEdit,
  onDelete,
}) => {
  return (
    <EducationContainer>
      {educations
        .slice()
        .reverse()
        .map((education) => (
          <EducationCard key={education.id}>
            <EditButton onClick={() => onEdit(education)}>
              <FaEdit />
            </EditButton>
            <DeleteButton onClick={() => onDelete(education.id)}>
              <FaTrash />
            </DeleteButton>
            <EducationHeader>
              <SchoolIcon />
              {education.degree} {education.fieldOfStudy} @ {education.school}
            </EducationHeader>
            <YearText>
              <CalendarIcon />
              {`${education.startMonth} ${education.startYear} - ${education.endMonth} ${education.endYear}`}
            </YearText>
            <DescriptionText>
              {education.description ? (
                education.description
              ) : (
                <PlaceholderText>No description present</PlaceholderText>
              )}
            </DescriptionText>
          </EducationCard>
        ))}
    </EducationContainer>
  );
};

export default EducationList;

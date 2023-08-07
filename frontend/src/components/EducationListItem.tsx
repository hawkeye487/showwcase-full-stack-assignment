import React from 'react';
import styled from 'styled-components';
import { FaUniversity, FaCalendarAlt } from 'react-icons/fa';

export interface EducationData {
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
  color: #333;
  text-wrap: wrap;
`;

const PlaceholderText = styled.span`
  font-style: italic;
  color: #999;
`;

const EducationListItem: React.FC<EducationData> = ({
  school,
  degree,
  fieldOfStudy,
  startMonth,
  startYear,
  endMonth,
  endYear,
  description,
}) => {
  return (
    <>
      <EducationHeader>
        <SchoolIcon />
        {degree} {fieldOfStudy} @ {school}
      </EducationHeader>
      <YearText>
        <CalendarIcon />
        {`${startMonth} ${startYear} - ${endMonth} ${endYear}`}
      </YearText>
      <DescriptionText>
        {description ? (
          description
        ) : (
          <PlaceholderText>No description present</PlaceholderText>
        )}
      </DescriptionText>
    </>
  );
};

export default EducationListItem;

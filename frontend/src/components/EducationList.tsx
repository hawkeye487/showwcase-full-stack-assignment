import React from 'react';
import styled from 'styled-components';
import EducationListItem, { EducationData } from './EducationListItem';
import EducationCard from './EducationCard';

interface EducationListProps {
  educations: EducationData[];
  onEdit: (education: EducationData) => void;
  onDelete: (id: number) => void;
  selectedEducationId: number | null;
  onHoverEducation: (id: number | null) => void;
}

const EducationContainer = styled.div`
  flex: 0.7;
`;

const EducationList: React.FC<EducationListProps> = ({
  educations,
  onEdit,
  onDelete,
  selectedEducationId,
  onHoverEducation,
}) => {
  return (
    <EducationContainer>
      {educations
        .slice()
        .reverse()
        .map((education) => (
          <EducationCard
            key={education.id}
            isSelected={education.id === selectedEducationId}
            onClick={() => onEdit(education)}
            onMouseEnter={() => onHoverEducation(education.id)}
            onMouseLeave={() => onHoverEducation(null)}
            onEdit={(e) => {
              e.stopPropagation(); // Prevent click propagation to EducationCard
              onEdit(education);
            }}
            onDelete={(e) => {
              e.stopPropagation(); // Prevent click propagation to EducationCard
              onDelete(education.id);
            }}
          >
            <EducationListItem {...education} />
          </EducationCard>
        ))}
    </EducationContainer>
  );
};

export default EducationList;

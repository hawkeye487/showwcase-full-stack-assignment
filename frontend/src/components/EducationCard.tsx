import React from 'react';
import styled from 'styled-components';
import {  FaEdit, FaTrash } from 'react-icons/fa';

interface EducationCardProps {
  isSelected: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
}

const StyledEducationCard = styled.div<{ isSelected: boolean }>`
  background-color: #f7f7f7;
  background-image: ${({ isSelected }) =>
    isSelected ? 'linear-gradient(90deg,#F4F4F4 0%,#EFEFEF 100%);' : ''};
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 80%;
  position: relative;
  cursor: pointer;
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

const EducationCard: React.FC<EducationCardProps> = ({
  isSelected,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onEdit,
  onDelete,
  children,
}) => {
  return (
    <StyledEducationCard
      isSelected={isSelected}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <EditButton onClick={onEdit}>
        <FaEdit />
      </EditButton>
      <DeleteButton onClick={onDelete}>
        <FaTrash />
      </DeleteButton>
      {children}
    </StyledEducationCard>
  );
};

export default EducationCard;

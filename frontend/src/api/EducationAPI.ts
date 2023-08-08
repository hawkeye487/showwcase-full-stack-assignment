import { useAuth } from '@clerk/clerk-react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { EducationData } from '../types/types';

const BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

export const useEducations = () => {
  const { getToken } = useAuth();

  const { isLoading, data: educations, refetch } = useQuery<EducationData[]>(
    'educations',
    async () => {
      const token = await getToken();
      const response = await fetch(`${BASE_URL}/education`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.json();
    },
    {
      refetchOnWindowFocus: true,
    }
  );

  return { isLoading, educations, refetch };
};

export const useAddEducation = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  const addEducationMutation = useMutation(
    async (newEducation: EducationData) => {
      const token = await getToken();
      const response = await fetch(`${BASE_URL}/education`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newEducation),
      });

      if (!response.ok) {
        throw new Error('Failed to add education');
      }

      queryClient.invalidateQueries('educations');
    }
  );

  return { addEducationMutation };
};

export const useUpdateEducation = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  const updateEducationMutation = useMutation(
    async (updatedEducation: EducationData) => {
      const token = await getToken();
      const response = await fetch(
        `${BASE_URL}/education/${updatedEducation.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedEducation),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update education');
      }

      queryClient.invalidateQueries('educations');
    }
  );

  return { updateEducationMutation };
};

export const useDeleteEducation = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  const deleteEducationMutation = useMutation(async (id: number) => {
    const token = await getToken();
    const response = await fetch(`${BASE_URL}/education/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete education');
    }

    queryClient.invalidateQueries('educations');
  });

  return { deleteEducationMutation };
};

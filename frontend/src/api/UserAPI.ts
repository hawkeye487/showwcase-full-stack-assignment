const BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

export const fetchUserData = async (getToken) => {
  try {
    const accessToken = await getToken();

    const response = await fetch(`${BASE_URL}/user`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data.');
    }

    const data = await response.json();

    return data.name;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

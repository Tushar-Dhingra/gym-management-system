// src/services/membershipService.jsx
const API_BASE_URL = process.env.REACT_APP_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

export const membershipService = {
  async getAllMemberships() {
    const response = await fetch(`${API_BASE_URL}/plans`, {
      method: "GET",
      headers: getAuthHeaders(),
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch memberships");
    }

    return data;
  },
};

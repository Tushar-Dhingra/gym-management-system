// src/services/memberService.jsx
const API_BASE_URL = process.env.REACT_APP_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const memberService = {
  async getAllMembers(page = 1, limit = 6, search = "", filter = "all") {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search }),
      ...(filter !== "all" && { filter }),
    });

    const response = await fetch(`${API_BASE_URL}/members?${params}`, {
      headers: getAuthHeaders(),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch members");
    }

    return response.json();
  },

  async getAnalytics() {
    const response = await fetch(`${API_BASE_URL}/members/analytics`, {
      headers: getAuthHeaders(),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch analytics");
    }

    return response.json();
  },

  async registerMember(memberData) {
    const response = await fetch(`${API_BASE_URL}/members/register`, {
      method: "POST",
      headers: getAuthHeaders(),
      credentials: "include",
      body: JSON.stringify(memberData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to register member");
    }

    return data;
  },

  async deleteMember(memberId) {
    const response = await fetch(`${API_BASE_URL}/members/${memberId}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete member");
    }

    return data;
  },

  async getMemberById(memberId) {
    const response = await fetch(`${API_BASE_URL}/members/member/${memberId}`, {
      headers: getAuthHeaders(),
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch member");
    }

    return data;
  },

  async updateMemberStatus(memberId, status) {
    const response = await fetch(`${API_BASE_URL}/members/${memberId}/status`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      credentials: "include",
      body: JSON.stringify({ status }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update member status");
    }

    return data;
  },

  async renewMembership(memberId, membershipId, currentBillDate) {
    const response = await fetch(`${API_BASE_URL}/members/${memberId}/renew`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      credentials: "include",
      body: JSON.stringify({ membershipId, currentBillDate }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to renew membership");
    }

    return data;
  },

  async editMemberDetails(memberId, memberData) {
    const response = await fetch(`${API_BASE_URL}/members/${memberId}/edit`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      credentials: "include",
      body: JSON.stringify(memberData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update member details");
    }

    return data;
  },
};

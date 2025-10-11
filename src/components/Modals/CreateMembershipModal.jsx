// src/components/Modal/CreateMembershipModal.jsx
import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { toast } from "react-toastify";
// import { data } from "react-router-dom";
// import { response } from "express";

const CreateMembershipModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    months: "",
    price: "",
  });
  const [editingMembership, setEditingMembership] = useState(null);
  const [errors, setErrors] = useState({});
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch memberships when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchMemberships();
    }
  }, [isOpen]);

  const fetchMemberships = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(`${apiUrl}/plans`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        setMemberships(data.memberships);
      }
    } catch (error) {
      console.error("Error fetching memberships:", error);
    } finally {
      setLoading(false);
    }
  };

  const editMembership = (membership) => {
    setEditingMembership(membership);
    setFormData({
      name: membership.name,
      months: membership.months.toString(),
      price: membership.price.toString(),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Delete Membership
  const deleteMembership = async (membershipId) => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(`${apiUrl}/plans/${membershipId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        fetchMemberships();
        toast.success("Membership deleted successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred while deleting the membership");
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      }
      console.error("Error deleting membership:", error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.months || formData.months <= 0)
      newErrors.months = "Valid months required";
    if (!formData.price || formData.price <= 0)
      newErrors.price = "Valid price required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Check if membership already exists
    const existingMembership = memberships.find(
      (m) =>
        m.name.toLowerCase() === formData.name.toLowerCase() &&
        m.months === parseInt(formData.months)
    );

    if (existingMembership) {
      // Show confirmation toast for update
      toast.warn(
        <div>
          <p>
            Membership "{formData.name}" ({formData.months} months) already
            exists with price ${existingMembership.price}.
          </p>
          <p>Do you want to update the price to ${formData.price}?</p>
          <div style={{ marginTop: "10px" }}>
            <button
              onClick={() => {
                submitMembership();
                toast.dismiss();
              }}
              style={{
                marginRight: "10px",
                padding: "5px 10px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Yes, Update
            </button>
            <button
              onClick={() => toast.dismiss()}
              style={{
                padding: "5px 10px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>,
        {
          position: "top-center",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
        }
      );
      return;
    }

    // If no existing membership, proceed directly
    submitMembership();
  };

  // cancel edit function
  const cancelEdit = () => {
    setEditingMembership(null);
    setFormData({ name: "", months: "", price: "" });
    setErrors({});
  };

  const submitMembership = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const url = editingMembership
        ? `${apiUrl}/plans/${editingMembership._id}`
        : `${apiUrl}/plans/add`;

      const method = editingMembership ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
        body: JSON.stringify({
          name: formData.name,
          months: parseInt(formData.months),
          price: parseFloat(formData.price),
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        setFormData({ name: "", months: "", price: "" });
        setEditingMembership(null);
        setErrors({});
        fetchMemberships();
        onSubmit(data.membership);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        editingMembership
          ? "Error updating membership"
          : "Error creating membership"
      );
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      }
      console.error("Error with membership:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Manage Membership">
      <div className="space-y-6">
        {/* Existing Memberships Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            Existing Memberships
          </h3>
          {loading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : memberships.length > 0 ? (
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {memberships.map((membership) => (
                <div
                  key={membership._id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <span className="font-medium text-gray-900">
                      {membership.name}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">
                      ({membership.months} month
                      {membership.months > 1 ? "s" : ""})
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-green-600">
                      ${membership.price}
                    </span>
                    <button
                      onClick={() => editMembership(membership)}
                      className="text-blue-500 hover:text-blue-700 p-1"
                      title="Edit membership"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => deleteMembership(membership._id)}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Delete membership"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              No memberships found
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* Create New Membership Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">
            {editingMembership ? "Update Membership" : "Create New Membership"}
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Membership Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g., Premium, Basic, VIP"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (Months) *
            </label>
            <input
              type="number"
              name="months"
              value={formData.months}
              onChange={handleChange}
              min="1"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.months ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter number of months"
            />
            {errors.months && (
              <p className="text-red-500 text-sm mt-1">{errors.months}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price ($) *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.price ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter price"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price}</p>
            )}
          </div>

          {/* At the bottom of the form */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={editingMembership ? cancelEdit : onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              {editingMembership ? "Cancel Edit" : "Cancel"}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {editingMembership ? "Update Membership" : "Create Membership"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateMembershipModal;

// src/pages/Members/Members.jsx
import React, { useState, useMemo } from "react";
import MemberCard from "../../components/Members/MemberCard";
import MemberStats from "../../components/Members/MemberStats";
import SearchBar from "../../components/Members/SearchBar";
import FilterTabs from "../../components/Members/FilterTabs";
import CreateMemberModal from "../../components/Modals/CreateMemberModal";
import CreateMembershipModal from "../../components/Modals/CreateMembershipModal";
import ViewMemberModal from "../../components/Modals/ViewMemberModal";
import EditMemberModal from "../../components/Modals/EditMemberModal";

const Members = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [modals, setModals] = useState({
    createMember: false,
    createMembership: false,
    viewMember: false,
    editMember: false
  });
  const [selectedMember, setSelectedMember] = useState(null);

  const MEMBERS_PER_PAGE = 6;

  const [members, setMembers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@email.com",
      phone: "+1234567890",
      plan: "Premium",
      status: "active",
      joinDate: "2024-01-15",
      expiryDate: "2024-07-15",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
    // Add more sample members for pagination demo
    ...Array.from({ length: 15 }, (_, i) => ({
      id: i + 2,
      name: `Member ${i + 2}`,
      email: `member${i + 2}@email.com`,
      phone: `+123456789${i}`,
      plan: ["Basic", "Standard", "Premium"][i % 3],
      status: ["active", "expired", "expiring"][i % 3],
      joinDate: "2024-01-15",
      expiryDate: "2024-07-15",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    }))
  ]);


  const openModal = (modalName, member = null) => {
    setSelectedMember(member);
    setModals(prev => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName) => {
    setModals(prev => ({ ...prev, [modalName]: false }));
    setSelectedMember(null);
  };

  // Filter and search logic with pagination
  const { paginatedMembers, totalPages } = useMemo(() => {
    let filtered = members;
    if (activeFilter !== "all") {
      filtered = filtered.filter((member) => member.status === activeFilter);
    }
    if (searchTerm) {
      filtered = filtered.filter(
        (member) =>
          member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.phone.includes(searchTerm)
      );
    }
    
    const totalPages = Math.ceil(filtered.length / MEMBERS_PER_PAGE);
    const startIndex = (currentPage - 1) * MEMBERS_PER_PAGE;
    const paginatedMembers = filtered.slice(startIndex, startIndex + MEMBERS_PER_PAGE);
    
    return { paginatedMembers, totalPages };
  }, [members, activeFilter, searchTerm, currentPage]);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchTerm]);

  const stats = {
    total: members.length,
    active: members.filter((m) => m.status === "active").length,
    expired: members.filter((m) => m.status === "expired").length,
    expiring: members.filter((m) => m.status === "expiring").length,
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Members</h1>
            <p className="text-gray-600 mt-1">Manage your gym members and memberships</p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <button 
              onClick={() => openModal('createMembership')}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create Membership
            </button>
            <button 
              onClick={() => openModal('createMember')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Add New Member
            </button>
          </div>
        </div>

        <MemberStats stats={stats} />

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <FilterTabs activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedMembers.map((member) => (
            <MemberCard 
              key={member.id} 
              member={member} 
              onView={() => openModal('viewMember', member)}
              onEdit={() => openModal('editMember', member)}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}

        {paginatedMembers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No members found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Modals */}
      <CreateMemberModal 
        isOpen={modals.createMember} 
        onClose={() => closeModal('createMember')}
        onSubmit={(memberData) => {
          console.log(memberData);
          setMembers(prev => [...prev, { ...memberData, id: Date.now() }]);
          closeModal('createMember');
        }}
      />
      
      <CreateMembershipModal 
        isOpen={modals.createMembership} 
        onClose={() => closeModal('createMembership')}
        onSubmit={(membershipData) => {
          console.log(membershipData);
          closeModal('createMembership');
        }}
      />

      
      <ViewMemberModal 
        isOpen={modals.viewMember} 
        onClose={() => closeModal('viewMember')}
        member={selectedMember}
      />
      
      <EditMemberModal 
        isOpen={modals.editMember} 
        onClose={() => closeModal('editMember')}
        member={selectedMember}
        onSubmit={(updatedMember) => {
          setMembers(prev => prev.map(m => m.id === updatedMember.id ? updatedMember : m));
          closeModal('editMember');
        }}
      />
    </div>
  );
};

export default Members;

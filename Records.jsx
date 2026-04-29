import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDelete, MdChevronLeft, MdChevronRight, MdRefresh } from 'react-icons/md';

const Records = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const plantsPerPage = 5;

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      setLoading(true);
      // Note: Ensure your axios baseURL is configured in a separate service or .env
      const response = await axios.get('/api/plants');
      setPlants(response.data);
      setError('');
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch plant records. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this plant record?')) return;

    try {
      await axios.delete(`/api/plants/${id}`);
      
      // Remove from local state
      const updatedPlants = plants.filter((plant) => plant.id !== id);
      setPlants(updatedPlants);

      // If the current page becomes empty after deletion, move back a page
      const newTotalPages = Math.ceil(updatedPlants.length / plantsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Error deleting the record. Please try again.');
    }
  };

  // Pagination Calculations
  const indexOfLastPlant = currentPage * plantsPerPage;
  const indexOfFirstPlant = indexOfLastPlant - plantsPerPage;
  const currentPlants = plants.slice(indexOfFirstPlant, indexOfLastPlant);
  const totalPages = Math.ceil(plants.length / plantsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-green-600">
        <div className="animate-spin mb-4"><MdRefresh size={40} /></div>
        <p className="font-medium">Loading records...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          🌿 Plant Inventory
        </h1>
        <button 
          onClick={fetchPlants}
          className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all shadow-sm"
        >
          <MdRefresh /> Refresh
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 text-red-700 rounded shadow-sm">
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {currentPlants.length > 0 ? (
              currentPlants.map((plant) => (
                <tr key={plant.id} className="hover:bg-green-50/30 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-400 font-mono">#{plant.id}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">{plant.name}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-medium uppercase">
                      {plant.category || 'General'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{plant.quantity}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(plant.id)}
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                      title="Delete Record"
                    >
                      <MdDelete size={22} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-gray-400 italic">
                  No plant records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Footer */}
        {plants.length > 0 && (
          <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-100">
            <span className="text-sm text-gray-500">
              Page <span className="font-semibold text-gray-700">{currentPage}</span> of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 disabled:opacity-40 transition-opacity shadow-sm"
              >
                <MdChevronLeft size={20} />
              </button>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 disabled:opacity-40 transition-opacity shadow-sm"
              >
                <MdChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Records;
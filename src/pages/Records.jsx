import { useState, useEffect, useRef, Fragment } from 'react';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ModalNewRecord from './records/ModalNewRecord';
import ModalEditRecord from './records/ModalEditRecord';
import PlantLoading from '../components/PlantLoading';
import { api } from '../api';
import { toast } from 'sonner';

function Records() {
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataToUpdate, setDataToUpdate] = useState(null);
  const [isEditRecord, setIsEditRecord] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  // search pagination states
  const [searchPage, setSearchPage] = useState(1);
  const [hasMoreSearch, setHasMoreSearch] = useState(true);
  const isInInitialMount = useRef(true);

  const handleSearchPlants = async (page = 1) => {
    try {
      setIsLoading(true);
      const response = await api.get(`plants/search?q=${searchTerm}&page=${page}`);
      const newRecords = response.data.data;
      
      // Replace records completely for proper pagination
      setRecords(newRecords);
      
      // Check if there are more results available (assuming page limit of 10)
      setHasMoreSearch(newRecords.length === 10);
    } catch (error) {
      console.error(error);
      toast.error("Error searching records.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleLoadRecords = async (page = 1) => {
    try {
      setIsLoading(true);
      
      const response = await api.get(`plants?page=${page}`);
      const newRecords = response.data.data;
      
      setRecords(newRecords);
      // Check if we got a full page of records (10 items = full page, so there might be more)
      // If we get less than 10, we're on the last page
      setHasMore(newRecords.length >= 10); 
    } catch (error) {
      toast.error("Error loading records.");
    } finally {
      setIsLoading(false);
    }
  }
  const handleAddRecord = async (formData) => {
    try {
      const response = await api.post('plants', formData);
      setRecords(prev => [response.data.data, ...prev]);
      toast.success("New record saved.");
    } catch (error) {
      console.error(error);
      toast.error("Error encountered while saving record.");
    }

    setIsModalOpen(false)
  }
  const handleUpdateRecord = async (data) => {
    try {
      const response = await api.put(`plants/${data.id}`, data);
      setRecords(prev => prev.map(record => 
        record.id === data.id ? response.data.data : record
      ));
      toast.success("Plant data updated.");
    } catch (error) {
      console.error(error);
      toast.error("Error encountered during update.");
    } finally {
      setIsEditRecord(false);
    }
  }
  const handleDeleteRecord = async (data) => {
    try {
      const isDelete = confirm("Are you sure you want to delete this record?");
      if (!isDelete) return;

      // Store the original records in case we need to restore them
      const originalRecords = records;
      const wasLastItemOnPage = records.length === 1;

      // Optimistically remove the record from the UI
      setRecords(prev => prev.filter(record => record.id !== data.id));

      // Make the API call
      await api.delete(`plants/${data.id}`);
      toast.success("Plant data deleted.");

      // Handle pagination after successful deletion
      if (wasLastItemOnPage && currentPage > 1) {
        // If this was the last item on this page and we're not on page 1, go back
        setCurrentPage(prev => prev - 1);
      }
    } catch (error) {
      console.error(error);
      // Restore the original records if deletion failed
      setRecords(originalRecords);
      toast.error("Error encountered while deleting record.");
    }
  }

  // Load records whenever the page changes, provided we aren't searching
  useEffect(() => {
    if (!searchTerm) {
      handleLoadRecords(currentPage);
    }
  }, [currentPage, searchTerm]);

  // reset pagination when searching
  useEffect(() => {
    if (isInInitialMount.current) {
      isInInitialMount.current = false;
      return;
    }
    if (searchTerm) {
      setSearchPage(1);
      setHasMoreSearch(true);
      handleSearchPlants(1);
    } else {
      setCurrentPage(1);
      setHasMore(true);
      handleLoadRecords(1);
    }
  }, [searchTerm]);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className='flex flex-grow'></div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 
          transition duration-200 flex items-center gap-2 cursor-pointer"
        >
          <FaPlus />
          Add New Record
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 mb-6">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
              focus:ring-green-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Records Table */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="relative w-full">
            <thead className="bg-green-50 sticky top-0 z-10">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Plant Name</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Variety</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Batch Name</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Seedling Source</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Seedling Count</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Starting Fund</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Date Planted</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700"></th>
              </tr>
            </thead>
            <tbody>

              {isLoading && records.length === 0 ?
                  (
                    <tr>
                      <td colSpan={8} className='py-10'>
                        <PlantLoading size='2xl' variant='pulse' text="Loading records" />
                      </td>
                    </tr>
                  ) : (
                    <Fragment>
                      {records.map((record) => (
                        <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-6 text-sm text-gray-800 font-medium">{record.name}</td>
                          <td className="py-4 px-6 text-sm text-gray-600">{record?.variety || "-"}</td>
                          <td className="py-4 px-6 text-sm text-gray-600">{record?.batch_name || "-"}</td>
                          <td className="py-4 px-6 text-sm text-gray-800 font-medium">{record?.seedling_source || "-"}</td>
                          <td className="py-4 px-6 text-sm text-gray-600">{record?.seedling_count || "-"}</td>
                          <td className="py-4 px-6 text-sm text-gray-600">{record?.starting_fund || "0"}</td>
                          <td className="py-4 px-6 text-sm text-gray-600">{record?.date_planted || "-"}</td>
                          <td className="py-4 px-6">
                            <div className="flex gap-2">
                              <button className="cursor-pointer text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-50 rounded"
                                title="Edit Record"
                                onClick={() => { setDataToUpdate(record); setIsEditRecord(true) }}>
                                <FaEdit />
                              </button>
                              <button className="cursor-pointer text-red-600 hover:text-red-700 p-2 
                                hover:bg-red-50 rounded"
                                onClick={() => { handleDeleteRecord(record) }}
                                title="Delete Record">
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </Fragment>
                  )
              }
            </tbody>
          </table>
        </div>

        {!isLoading && records.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {searchTerm ? "No records found matching your search." : "No records available."}
          </div>
        )}

        {/* Pagination Controls */}
        {!searchTerm && (
          <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-100">
            <div className="text-sm text-gray-600">
              Page <span className="font-semibold text-green-700">{currentPage}</span> • 
              Showing {records.length} plant{records.length !== 1 ? 's' : ''}
            </div>
            <div className="flex gap-2">
              <button
                disabled={currentPage === 1 || isLoading}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="p-2 rounded border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
              >
                <FaChevronLeft className="text-gray-600" />
              </button>
              <button
                disabled={!hasMore || isLoading}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="p-2 rounded border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
              >
                <FaChevronRight className="text-gray-600" />
              </button>
            </div>
          </div>
        )}

        {/* Search Results Pagination Controls */}
        {searchTerm && (
          <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-100">
            <div className="text-sm text-gray-600">
              Page <span className="font-semibold text-green-700">{searchPage}</span> • 
              Found {records.length} result{records.length !== 1 ? 's' : ''}
            </div>
            <div className="flex gap-2">
              <button
                disabled={searchPage === 1 || isLoading}
                onClick={() => {
                  const prevPage = searchPage - 1;
                  setSearchPage(prevPage);
                  handleSearchPlants(prevPage);
                }}
                className="p-2 rounded border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
              >
                <FaChevronLeft className="text-gray-600" />
              </button>
              <button
                disabled={!hasMoreSearch || isLoading}
                onClick={() => {
                  const nextPage = searchPage + 1;
                  setSearchPage(nextPage);
                  handleSearchPlants(nextPage);
                }}
                className="p-2 rounded border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
              >
                <FaChevronRight className="text-gray-600" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <ModalNewRecord
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddRecord}
      />

      <ModalEditRecord
        isOpen={isEditRecord}
        onClose={() => setIsEditRecord(false)}
        data={dataToUpdate}
        onSubmit={handleUpdateRecord}
      />
    </div>
  )
}

export default Records

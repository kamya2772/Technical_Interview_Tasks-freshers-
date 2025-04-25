import React, { useEffect, useState, useMemo } from "react";
import Search from "./Search";
import Filter from "./Filter";
import ItemList from "./ItemList";
import Pagination from "./Pagination";

const API_URL = "https://jsonplaceholder.typicode.com/posts";
const ITEMS_PER_PAGE = 5;

function DataDisplay() {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectUSerId, setSelectUserId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setAllData(data);
      } catch (err) {
        setError(err.message);
        console.error("Fetching data failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- Filtering and Searching Logic ---
  const filteredData = useMemo(() => {
    let processedData = [...allData];
    if (selectUSerId) {
      processedData = processedData.filter(
        (item) => item.userId === parseInt(selectUSerId, 10)
      );
    }
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      processedData = processedData.filter(
        (item) =>
          item.title.toLowerCase().includes(lowerCaseSearchTerm) ||
          item.body.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
    return processedData;
  }, [allData, searchTerm, selectUSerId]);

  // --- Reset Page on Filter/Search Change ---
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectUSerId]);

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // --- Event Handlers ---
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setSelectUserId(event.target.value);
  };

  const handlePageChange = (newPage) => {
    // Boundary checks are implicitly handled by the Pagination component's disabled state,
    // but good to keep safeguard here too.
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // --- Dynamic Filter Options (User IDs) ---
  const userFilterOptions = useMemo(() => {
    const ids = new Set(allData.map((item) => item.userId));
    return Array.from(ids)
      .sort((a, b) => a - b)
      .map((id) => ({ value: id, label: `User ID: ${id}` })); // Format for FilterSelect
  }, [allData]);

  // --- Render Logic ---
  if (loading) {
    return <div className="loading">Loading data...</div>;
  }

  if (error) {
    return <div className="error">Error fetching data: {error}</div>;
  }

  return (
    // Tailwind classes for the main container
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        API Data Display
      </h1>

      {/* Controls container with Tailwind */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <Search searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        <Filter
          selectedValue={selectUSerId}
          onFilterChange={handleFilterChange}
          option={userFilterOptions}
          defaultOption="All Users"
          lable="Filter by User"
        />
      </div>

      {/* Data List */}
      <ItemList items={currentItems} />

      {/* Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        totalPage={totalPages}
        onPageChange={handlePageChange}
        filteredItemscount={filteredData.length}
      />
    </div>
  );
}

export default DataDisplay;

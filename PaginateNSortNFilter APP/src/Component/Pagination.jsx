import React from "react";

function Pagination({
  currentPage,
  totalPage,
  onPageChange,
  filteredItemscount,
}) {
  if (totalPage <= 1) {
    return null;
  }
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < totalPage) {
      onPageChange(currentPage + 1);
    }
  };
  const buttonBaseClasses =
    "px-4 py-2 border border-gray-300 bg-white rounded-md text-sm font-medium transition-colors duration-150";
  const buttonHoverClass = "hover:bg-gray-50";
  const buttonDisabledClass = "disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`${buttonBaseClasses} ${
          currentPage !== 1 ? buttonHoverClass : ""
        } ${buttonDisabledClass}`}
      >
        « Previous
      </button>
      <span className="text-sm text-gray-600">
        Page {currentPage} of {totalPage} ({filteredItemscount} items)
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPage}
        className={`${buttonBaseClasses} ${
          currentPage !== totalPage ? buttonHoverClass : ""
        } ${buttonDisabledClass}`}
      >
        Next »
      </button>
    </div>
  );
}

export default Pagination;

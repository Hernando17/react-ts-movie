export function Pagination({ currentPage, number, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`${
        currentPage == number ? "pagination-button active" : "pagination-button"
      }`}
    >
      {number}
    </button>
  );
}

export function Pagination({ number, onClick }) {
  return (
    <button onClick={onClick} className="pagination-button">
      {number}
    </button>
  );
}

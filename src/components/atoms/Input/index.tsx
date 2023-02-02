export function Input({ value, onChange, name }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      name={name}
      className="search"
      placeholder="Search movie here..."
    />
  );
}

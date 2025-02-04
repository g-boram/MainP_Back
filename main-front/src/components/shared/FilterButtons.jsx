const FilterButtons = ({ currentFilter, onFilterChange }) => {
  const filters = ["ALL", "활성화", "비활성화"]; // 필터 조건

  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      {filters.map((filter) => (
        <button
          key={filter}
          style={{
            backgroundColor: filter === currentFilter ? "black" : "white",
            color: filter === currentFilter ? "white" : "black",
            padding: "5px 10px",
            border: "1px solid black",
            cursor: "pointer",
          }}
          onClick={() => onFilterChange(filter)} // 클릭 시 필터 변경
        >
          {filter}
        </button>
      ))}
    </div>
  );
};
export default FilterButtons;

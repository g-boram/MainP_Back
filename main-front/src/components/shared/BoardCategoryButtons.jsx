const BoardCategoryButtons = ({ currentFilter, setCategory }) => {
  const category = ["ALL", "공지사항", "이벤트", "FAQ", "기타"]; // 필터 조건

  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      {category.map((cate) => (
        <button
          key={cate}
          style={{
            backgroundColor: cate === currentFilter ? "black" : "white",
            color: cate === currentFilter ? "white" : "black",
            padding: "5px 10px",
            border: "1px solid black",
            cursor: "pointer",
          }}
          onClick={() => setCategory(cate)} // 클릭 시 필터 변경
        >
          {cate}
        </button>
      ))}
    </div>
  );
};
export default BoardCategoryButtons;

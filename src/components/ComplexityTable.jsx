const ratingMap = {
  "O(1)": "excellent",
  "O(log n)": "good",
  "O(n)": "fair",
  "O(n log n)": "fair",
  "O(n^2)": "poor",
  "O(2^n)": "bad",
  "O(n!)": "bad",
};

function getRating(val) {
  return ratingMap[val] || "fair";
}

export default function ComplexityTable({ rows, headers = ["Operation", "Time", "Space"] }) {
  return (
    <table className="complexity-table">
      <thead>
        <tr>
          {headers.map((h) => (
            <th key={h}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j}>
                {j > 0 && typeof cell === "string" && cell.startsWith("O(") ? (
                  <span className={`big-o ${getRating(cell)}`}>{cell}</span>
                ) : (
                  cell
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

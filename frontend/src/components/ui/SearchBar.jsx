import { useState } from "react";

function SearchBar({ onSearch }) {

  const [city, setCity] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!city.trim()) {
      return;
    }

    onSearch(city);

    setCity("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: "15px",
        width: "100%",
      }}
    >

      <input
        type="text"
        placeholder="Search city..."
        value={city}
        onChange={(e) =>
          setCity(e.target.value)
        }
        style={{
          flex: 1,
          padding: "16px 20px",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.05)",
          color: "white",
          fontSize: "16px",
          outline: "none",
        }}
      />

      <button
        type="submit"
        style={{
          padding: "16px 24px",
          borderRadius: "16px",
          border: "none",
          background: "#6ea8ff",
          color: "white",
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        Search
      </button>

    </form>
  );
}

export default SearchBar;
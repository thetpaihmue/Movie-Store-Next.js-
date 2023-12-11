import { useState } from "react";
import { FormControl } from "react-bootstrap";

export default function SearchMovies({ getSearchResults }) {
  const [query, setQuery] = useState("");

  const handleSubmit = async (e) => {
    if (e.key === "Enter" && query !== "") {
      e.preventDefault();

      const response = await fetch(`/api/movies/search?query=${query}`);
      const movie = await response.json();

      getSearchResults(movie);
    }
  };

  return (
    <>
      <div className="text-center">
        <FormControl
          type="text"
          placeholder="Search movies..."
          className="mr-sm-2 mr-10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSubmit}
        />
      </div>
    </>
  );
}

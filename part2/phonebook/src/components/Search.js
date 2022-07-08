const Search = ({ searchTerm, handleSearchTermChange }) => (
  <>
    search: <input value={searchTerm} onChange={handleSearchTermChange} />
  </>
);

export default Search;

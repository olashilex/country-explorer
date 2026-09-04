
const SearchBar = ({searchTerm, setSearchTerm }) =>{

  return(
    <input type="text" placeholder="Search for a country...." value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="input input-success w-full md:w-96 shadow-sm"/>
    
  );


};

export default SearchBar;
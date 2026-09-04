
const FilterSelect = ({region, setRegion}) => {

  const regions = ["Africa", "America", "Asia", "Europe", "Oceania"];


  return(
    <select className="select select-success w-full md:w-60 shadow-sm"  value={region} onChange={(e) => setRegion(e.target.value)}>
     
      <option value="">Filter by Region</option>
      {regions.map((reg) => (

        <option key={reg} value={reg}>
          {reg}
        </option>


      ))}
    </select>
  );
};

export default FilterSelect;


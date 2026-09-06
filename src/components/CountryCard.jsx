import { Link } from "react-router-dom";

 const CountryCard = ({ country }) => {
  const flagUrl =
    country.flag.url_svg ||
    country.flag.url_png ||
    country.flag.url_jpg;

  const currency = Object.entries(country.currencies || {})[0];
  

  /*const handleClick = () => {
    sessionStorage.setItem("homeScroll", String(window.scrollY || 0));
    sessionStorage.setItem("homePath", location.pathname);
  }
    */
   const handleClick = () => {
  sessionStorage.setItem("homeScroll", String(window.scrollY));
};

  return (
    <div className="card w-86 bg-base-100 shadow-xl hover:shadow-2xl">

      <figure>
        {flagUrl ? (
          <img
            src={flagUrl}
            alt={country.names.common}
            className="h-44 w-full object-contain"
          />
        ) : (
          <div className="h-44 w-full flex items-center justify-center bg-base-200">
            <span>No flag available</span>
          </div>
        )}
      </figure>

      <div className="card-body">

        <h2 className="card-title">
          {country.names.common}
        </h2>

        <p>
          Population: {country.population.toLocaleString()}
        </p>

        <p>
          Region: {country.region}
        </p>

        <p>
          Capital: {country.capitals?.[0]?.name || "N/A"}
        </p>

        <p>
          Currency:{" "}
          {currency
            ? `${currency[1].name} (${currency[1].symbol || ""})`
            : "N/A"}
        </p>
        <div className="card-actions justify-end">
          <Link to={`/country/${country.names.common}`}>
           <button onClick={handleClick} className="btn btn-primary btn-sm">View Details</button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default CountryCard;  
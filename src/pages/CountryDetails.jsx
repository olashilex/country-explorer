import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function CountryDetails() {
  const { name } = useParams();

  const [country, setCountry] = useState(null);
   const currency = country?.currencies ? Object.entries(country.currencies)[0] : null;
   const language = country?.languages ? Object.entries(country.languages )[0] : null;




  console.log(country);
  

  useEffect(() => {
    const fetchCountry = async () => {
      try {
     const requests = [0, 100, 200].map((offset) =>
      axios.get(
  `https://api.restcountries.com/countries/v5?limit=100&offset=${offset}`,
  {
        headers: {
          Authorization: "Bearer rc_live_321b16461aaa4eaaad443c65aa2625b6",
        },
      })
);

const responses = await Promise.all(requests);

const allCountries = responses.flatMap(
  (res) => res.data.data.objects
);

const selectedCountry = allCountries.find(
  (country) =>
    country.names.common.toLowerCase() === name.toLowerCase()
);

setCountry(selectedCountry);
      } catch (err) {
        console.log("API ERROR:", err);
      }
    };

    fetchCountry();
  }, [name]);

  const flagUrl =
    country?.flag?.url_svg ||
    country?.flag?.url_png ||
    country?.flag?.url_jpg;

  if (!country) {
    return (
      <div className="flex justify-center my-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">

      <Link
        to="/"
        className="btn bg-purple-100 text-purple-800 hover:bg-purple-200 mb-6"
      >
        ← Back to Home
      </Link>
       <div className="flex flex-col md:flex-row gap-10 items-center">

      {flagUrl ? (
        <img
          src={flagUrl}
          alt={country.names.common}
          className="w-full md:w-1/2 rounded-lg shadow-lg"
        />
      ) : (
        <div className="h-64 w-full flex items-center justify-center bg-purple-100">
          <span>No flag available</span>
        </div>
      )}
      <div>

      <h1 className="text-4xl font-bold mb-4">
        {country.names.common}
      </h1>
      <div className="space-y-2">
           <p>
            <strong>Official Name:</strong> {country.names.official}
          </p>

          <p>
            <strong>Population:</strong> {country.population.toLocaleString()}
          </p>

          <p>
            <strong>Region:</strong> {country.region}
          </p>

          <p>
            <strong>Subregion:</strong> {country.subregion}
          </p>

          <p>
            <strong>Capital:</strong> {country.capitals?.map(capital => capital.name).join(", ")}
          </p>
          <p>
           <strong>Languages:</strong>{" "}
          {language
            ? `${language[1].name}`
            : "No data available"}
         
          </p>

          <p>
            
            <strong>Currency:</strong>{" "}
          {currency
            ? `${currency[1].name} (${currency[1].symbol || ""})`
            : "No data available"}

          </p>
              
      </div>
      
      </div>
      

    </div>
    </div>
  );
}

export default CountryDetails;
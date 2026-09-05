import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function CountryDetails() {
  const { name } = useParams();

  const [country, setCountry] = useState(null);

  console.log(country);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
     const requests = [0, 100, 200].map((offset) =>
      axios.get(`/api/countries/v5?limit=100&offset=${offset}`, {
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

      <h1 className="text-3xl font-bold mt-6">
        {country.names.common}
      </h1>
      

    </div>
  );
}

export default CountryDetails;
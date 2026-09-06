import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import FilterSelect from "../components/FilterSelectTemp";
import axios from "axios";
import CountryCard from "../components/CountryCard";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem("searchTerm") || "");
  const [region, setRegion] = useState(localStorage.getItem("region") || "");

  
   /*useEffect(() => {
    const saved = sessionStorage.getItem("homeScroll");
    if (saved !== null) {
      const scrollY = parseInt(saved, 10) || 0;
      const timeout = setTimeout(()=> {
        window.scrollTo({ top: scrollY, behavior: "smooth "});
        sessionStorage.removeItem("homeScroll");
        sessionStorage.removeItem("homePath");

      }, 50);
      return () => clearTimeout(timeout);
     
    }
    
  }, [countries.length]);
  */
 useEffect(() => {
  const saved = sessionStorage.getItem("homeScroll");

  if (saved !== null && countries.length > 0) {
    const scrollY = parseInt(saved, 10) || 0;

    setTimeout(() => {
      window.scrollTo({
        top: scrollY,
        behavior: "auto",
      });

      sessionStorage.removeItem("homeScroll");
    }, 100);
  }
}, [countries.length]);

  useEffect(() => {
    const fetchCountries = async () => {
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

        setCountries(allCountries);
      } catch (err) {
        console.log("API ERROR:", err);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    localStorage.setItem("region", region);
    localStorage.setItem("searchTerm", searchTerm);

  }, [searchTerm, region]);
  


  

      const filteredCountries = countries.filter((country) => {
      return (
        country.names.common
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) &&
        (region ? country.region === region : true)
      );
    });

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col justify-between gap-4 mb-6">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <FilterSelect
          region={region}
          setRegion={setRegion}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        { filteredCountries.map((country) => (
          <CountryCard
            key={country.codes?.alpha_2 || country.names.common}
            country={country}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
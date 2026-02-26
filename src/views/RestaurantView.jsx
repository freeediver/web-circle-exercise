import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import MenuItem from "../components/MenuItem/MenuItem.jsx";

import styles from "./RestaurantView.module.css";
import NavBar from "../components/NavBar/NavBar.jsx";
import SearchField from "../components/SearchField/SearchField.jsx";

const RestaurantView = () => {
  const [dishes, setDishes] = useState([]);
  const [allDishes, setAllDishes] = useState([]);
  const [searchDish, setSearchDish] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch dishes on component mount
  useEffect(() => {
    // Use a search term that will definitely return results
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then((res) => res.json())
      .then((data) => {
        const fetchedDishes = data.meals || [];
        setAllDishes(fetchedDishes);
        setDishes(fetchedDishes);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching dishes:", error);
        setLoading(false);
      });
  }, []);

  // Handle search
  const handleSearchChange = (term) => {
    setSearchDish(term);

    if (!term.trim()) {
      setDishes(allDishes);
      return;
    }

    const filtered = allDishes.filter((dish) =>
      dish.strMeal.toLowerCase().includes(term.toLowerCase()),
    );

    setDishes(filtered);
  };

   return (
    <>
      <NavBar>
        <h1>ReDI React Restaurant</h1>
        <SearchField 
          value={searchDish}
          onChange={handleSearchChange}
        />
      </NavBar>

      <div className={styles.restaurantWrapper}>
        {loading ? (
          <p>Loading dishes...</p>
        ) : dishes.length > 0 ? (
          <>
            {searchDish && <p>Found {dishes.length} matches for  &quot;`{searchDish}&quot;`</p>}
            <div className={styles.menu}>
              {dishes.map((dish) => (
                <MenuItem dish={dish} key={dish.idMeal} />
              ))}
            </div>
          </>
        ) : (
          <p>
            {searchDish 
              ? `No dishes found matching "${searchDish}"` 
              : "No dishes available"}
          </p>
        )}
      </div>
    </>
  );
};

export default RestaurantView;

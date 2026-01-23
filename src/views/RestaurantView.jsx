import { useEffect, useState } from "react";
import { useDebouncedCallback } from 'use-debounce';
import MenuItem from "../components/MenuItem/MenuItem.jsx";

import styles from "./RestaurantView.module.css";
import NavBar from "../components/NavBar/NavBar.jsx";
import SearchField from "../components/SearchField/SearchField.jsx";

const RestaurantView = () => {
  const [dishes, setDishes] = useState([]);
  const [searchDish, setSearchDish] = useState('');

  // Fetch dishes from API with search dish's name entred by user
  const fetchDishes = (searchQuery = "") => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(result => {
        setDishes(result.meals || []);
      })
      .catch(error => {
        console.error("Error fetching dishes:", error);
        setDishes([]);
      })
      .finally(() => {
      });
  };

  // Debounced API call
  const debouncedSearch = useDebouncedCallback((term) => {
    fetchDishes(term);
  }, 500);


  // update the introtuced term in the filter search field
  const handleSearchChange = (term) => {
    setSearchDish(term);
    debouncedSearch(term);
  }

  return (
    <>
      <NavBar>
        <h1>ReDI React Restaurant</h1>

        <SearchField value = {searchDish}  
                      onChange = { handleSearchChange }/>
      </NavBar>

      <div className={styles.restaurantWrapper}>
        <div className={styles.menu}>
          {dishes.length > 0 ? (
            dishes.map((dish) => (
              <MenuItem
                dish={dish}
                key={dish.idMeal}
              />
            ))
          ) : (
            <p>No dishes found :(</p>
          )}
        </div>
      </div>
    </>
  );
};

export default RestaurantView;

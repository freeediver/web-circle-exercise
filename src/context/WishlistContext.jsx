import { createContext, useState, useContext, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const savedWishlist = localStorage.getItem('restaurantWishlist');
    console.log('Loading wishlist from localStorage:', savedWishlist);
    
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist);
        setWishlist(parsedWishlist);
        console.log('Wishlist loaded:', parsedWishlist);
      } catch (error) {
        console.error('Error parsing wishlist from localStorage:', error);
        setWishlist([]);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    console.log('Saving wishlist to localStorage:', wishlist);
    localStorage.setItem('restaurantWishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (dish) => {
    console.log('addToWishlist called with:', dish.strMeal);
    setWishlist(prev => {
      // Check if dish already exists in wishlist
      const exists = prev.some(item => item.idMeal === dish.idMeal);
      if (exists) {
        console.log('Dish already in wishlist:', dish.strMeal);
        return prev;
      }
      console.log('Adding to wishlist:', dish.strMeal);
      const newWishlist = [...prev, dish];
      return newWishlist;
    });
  };

  const removeFromWishlist = (dishId) => {
    console.log('removeFromWishlist called with dishId:', dishId);
    setWishlist(prev => {
      const newWishlist = prev.filter(item => item.idMeal !== dishId);
      console.log('Removed from wishlist, new length:', newWishlist.length);
      return newWishlist;
    });
  };

  const isInWishlist = (dishId) => {
    return wishlist.some(item => item.idMeal === dishId);
  };

  const clearWishlist = () => {
    console.log('Clearing wishlist');
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider value={{
      wishlist,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist,
      wishlistCount: wishlist.length
    }}>
      {children}
    </WishlistContext.Provider>
  );
};
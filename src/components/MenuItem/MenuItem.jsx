import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import styles from "./MenuItem.module.css";
import { useWishlist } from "../../context/WishlistContext";

const  MenuItem = ({ dish }) => {
  const { strMeal: name, strMealThumb: image, idMeal } = dish;
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(idMeal);

  const navigate = useNavigate();

  const handleWishlistToggle = (e) => {
     // Check if e exists and has the preventDefault method
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }

    if (isWishlisted) {
      removeFromWishlist(idMeal);
    } else {
      addToWishlist(dish);
    }
  };

   // separate handler for the button to avoid event issues
    const handleButtonClick = () => {
    handleWishlistToggle(null);
  };

  return (
    <div className={styles.menuItem}>
      <h3>{name}</h3>
      <img src={image} alt={name} />

      <div
        className={styles.wishlistIcon}
        onClick={handleWishlistToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleWishlistToggle(e);
          }
        }}
      >
        {isWishlisted ? (
          <span title="Remove from wishlist">❤️</span>
        ) : (
          <span title="Add to wishlist">🤍</span>
        )}
      </div>

      <div className={styles.menuItemBtnContainer}>
        <Button onClick={() => navigate(`/meals/${dish.idMeal}`)}>
          Details
        </Button>
        <Button
          onClick={handleButtonClick}
          variant={isWishlisted ? "secondary" : "primary"}
        >
          {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        </Button>
      </div>
    </div>
  );

};

export default  MenuItem;

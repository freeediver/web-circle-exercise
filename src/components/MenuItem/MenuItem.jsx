import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import styles from "./MenuItem.module.css";

const MenuItem = ({ dish }) => {
  const { strMeal: name, strMealThumb: image } = dish;
  const isWishlisted =false;
  
  const navigate = useNavigate();
   return (
    <div className={styles.menuItem}>
      <h3>{name}</h3>
      <img src={image} alt={name} />
      
      <div className={styles.wishlistIcon} onClick="">
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
          onClick=""
          variant={isWishlisted ? "secondary" : "primary"}
        >
          {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        </Button>
      </div>
    </div>
  );
};

export default MenuItem;

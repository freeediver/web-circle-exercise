import { useWishlist } from "../context/WishlistContext";
import { Link } from 'react-router-dom';
import MenuItem from "../components/MenuItem/MenuItem.jsx";
import styles from "../views/WishlistView.module.css";
import Button from '../components/Button/Button';

const WishlistView = () => {
  const { wishlist, clearWishlist, wishlistCount } = useWishlist();

  return (
    <div className={styles.wishlistContainer}>
      <div className={styles.wishlistHeader}>
        <h1>My Wishlist ({wishlistCount})</h1>
        <div className={styles.headerActions}>
          <Link to="/">
            <Button variant="secondary">Back to Menu</Button>
          </Link>
          {wishlistCount > 0 && (
            <Button onClick={clearWishlist} variant="danger">
              Clear All
            </Button>
          )}
        </div>
      </div>

      {wishlistCount === 0 ? (
        <div className={styles.emptyWishlist}>
          <p>Your wishlist is empty</p>
          <p>Browse our menu and add some delicious dishes!</p>
          <Link to="/">
            <Button>Browse Menu</Button>
          </Link>
        </div>
      ) : (
        <div className={styles.wishlistItems}>
          {wishlist.map((dish) => (
            <MenuItem key={dish.idMeal} dish={dish} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistView;

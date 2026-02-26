import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import styles from "./NavBar.module.css";

const NavBar = ({ children }) => {
  const { wishlistCount } = useWishlist();
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContent}>{children}</div>
      <div className={styles.navbarActions}>
        <Link to="/wishlist" className={styles.wishlistLink}>
          <span>Wishlist</span>
          {wishlistCount > 0 && (
            <span className={styles.wishlistBadge}>{wishlistCount}</span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;

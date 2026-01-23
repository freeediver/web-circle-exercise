import styles from "./SearchField.module.css";

const SearchField = ({ value, onChange }) => {
  
  const handleChange = (e) => {
      
  }

  return (
    <div className={styles.wrapper}>
      <input
        placeholder="Filter dishes..."
        type="text"     
      />
    </div>
  );
};

export default SearchField;

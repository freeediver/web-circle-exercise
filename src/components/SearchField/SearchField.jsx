import styles from "./SearchField.module.css";

const SearchField = ({ value, onChange }) => {
  
  const handleChange = (e) => {
      onChange(e.target.value);
  }

  return (
    <div className={styles.wrapper}>
      <input
        placeholder="Filter dishes..."
        type="text"     
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchField;

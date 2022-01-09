import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.css";

const Button = ({ onLoadMore }) => (
  <button type="button" onClick={onLoadMore} className={styles.Button}>
    Load more
  </button>
);

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default Button;

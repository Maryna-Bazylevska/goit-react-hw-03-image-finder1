import React from "react";
import PropTypes from "prop-types";
import styles from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ id, webformatURL, onOpenModal, largeImageURL }) => (
  <li key={id} id={id} className={styles.ImageGalleryItem}>
    <img
      className={styles.ImageGalleryItemImage}
      src={webformatURL}
      alt=""
      onClick={() => onOpenModal(largeImageURL)}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  webformatURL: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;

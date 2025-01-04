import React from 'react';
import styles from './Feature.module.css';

const Feature = ({ image, title, text }) => {
  return (
    <div className={styles.featureItem}>
      <img src={image} alt={title} className={styles.featureIcon} />
      <h3 className={styles.featureItemTitle}>{title}</h3>
      <p>{text}</p>
    </div>
  );
};

export default Feature;
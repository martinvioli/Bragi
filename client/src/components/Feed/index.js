import React from "react";
import styles from "./Feed.module.css";

export default function Feed() {
  return (
    <div className={styles.container}>
      <div className={styles.premiumSector}>Sector Premium</div>
      <div className={styles.postSector}>
        Sector posts
        <div className={styles.newPost}>Nuevo post</div>
        <div className={styles.posts}>
          Lista de posts
          <div className={styles.post}>Cada post</div>
          <div className={styles.post}>Cada post</div>
          <div className={styles.post}>Cada post</div>
          <div className={styles.post}>Cada post</div>
        </div>
      </div>
    </div>
  );
}

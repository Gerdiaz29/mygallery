import React from "react";
import styles from "./ImageComponent.module.css";

class Image extends React.Component {
  render() {
    const { image } = this.props;
    const activeImage = this.props.StyleSelected ? styles["image-active"] : "";
    return (
      <div
        className={styles.card + " " + activeImage}
        onClick={this.props.actionClick}
      >
        <img className={styles.image} src={image.src} alt="Imagen"></img>
      </div>
    );
  }
}

export default Image;

import React from "react";

import img1 from "../assets/images/visuals/icons/Yield.png";
import img2 from "../assets/images/visuals/icons/Speed.png";
import img3 from "../assets/images/visuals/icons/Energy.png";

import styles from "./icon.module.css";

const Icon = ({type}) => {
  let img = {
    yield: img1,
    speed: img2,
    energy: img3
  }

  return (
    <img src={img[type]} className={styles.iconSmall} alt=""/>
  );
}
export default Icon;
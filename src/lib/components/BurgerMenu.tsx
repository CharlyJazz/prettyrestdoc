import { FC, useState } from "react";
import style from "../api.module.scss";

interface BurgerMenuProps {
    onClick(): void;
    open: boolean;
}

const BurgerMenu: FC<BurgerMenuProps> = ({ onClick, open }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <div 
      className={`${style.Burger} ${open ? style.open : ""}`}
      onClick={handleClick}
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default BurgerMenu;

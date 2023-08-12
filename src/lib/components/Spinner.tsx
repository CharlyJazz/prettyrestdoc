import style from "../api.module.scss";

const Spinner = () => {
  return (
    <div className={style.SpinnerContainer}>
      <div className={style.Spinner}></div>
    </div>
  );
};

export default Spinner;

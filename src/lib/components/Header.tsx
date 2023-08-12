import { ChangeEvent, FC } from "react";
import style from "../api.module.scss";

interface HeaderProps {
  openSearchModal(): void;
  fileInput: boolean;
  onFileUpload?(file: File): void;
}

const Header: FC<HeaderProps> = ({
  openSearchModal,
  fileInput,
  onFileUpload,
}) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (file) {
        if (onFileUpload) {
          onFileUpload(file);
        }
      }
    } catch (error) {
      alert(`Error handling file: ${error}`);
    }
  };

  return (
    <div className={style.Header}>
      <div className={style.HeaderFirstDiv}>
        <h1 className={style.Title}>
          <span>API</span>
        </h1>
      </div>
      {fileInput ? (
        <input
          type="file"
          name="file"
          id="file"
          accept="application/json"
          onChange={handleFileChange}
        />
      ) : null}
      <div className={style.HeaderSecondDiv}>
        <button onClick={openSearchModal} className={style.HeaderButtonSearch}>
          ...
          <svg
            height="16"
            viewBox="0 0 16 16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              width: 12,
              height: 12,
            }}
          >
            <path
              d="M12.6 11.2c.037.028.073.059.107.093l3 3a1 1 0 1 1-1.414 1.414l-3-3a1.009 1.009 0 0 1-.093-.107 7 7 0 1 1 1.4-1.4zM7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10z"
              fillRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Header;

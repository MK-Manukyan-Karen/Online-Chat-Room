import React, { useContext } from "react";
import style from "./LanguageSelector.module.css";

import { languageOptions } from "../../Common/Languages/language";
import { LanguageContext } from "../../Common/LanguageProvider/LanguageProvider";

export const LanguageSelector = React.memo((props) => {
  const { languageChange } = useContext(LanguageContext);

  const handleLanguageChange = (id: string) => {
    languageChange(id);
  };

  return (
    <div className={style.languageContainer}>
      <div className = {style.iconWrapper}>
        {Object.entries(languageOptions).map(([id, flag]) => (
          <img
            src={flag}
            className={style.flagIcon}
            alt="flag"
            key={id}
            onClick={() => handleLanguageChange(id)}
          />
        ))}
      </div>
    </div>
  );
});

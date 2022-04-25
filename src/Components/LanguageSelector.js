import React from "react";

import { useTranslation } from "react-i18next";

// LanguageSelector function

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div onChange={changeLanguage}>
      <input type="radio" value="en" name="language" defaultChecked /> English
      <input type="radio" value="hn" name="language" />
      Hindi
    </div>
  );
};

export default LanguageSelector;

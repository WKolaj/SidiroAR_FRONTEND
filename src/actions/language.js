import i18next from "i18next";

export const changeLanguageActionCreator = function (newLang) {
  return async function (dispatch, getState) {
    await i18next.changeLanguage(newLang);
  };
};

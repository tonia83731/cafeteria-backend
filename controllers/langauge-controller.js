const { Language } = require("../models");

const languageController = {
  getLangauges: async (req, res, next) => {
    try {
    } catch (error) {
      console.log(error);
    }
  },
  // 測試用，本專案client端不會進行更動
  // addLangauge: async (req, res, next) => {
  //   try {
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
  // updateLangauge: async (req, res, next) => {
  //   try {
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
  // deleteLanguage: async (req, res, next) => {
  //   try {
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
};

module.exports = languageController;

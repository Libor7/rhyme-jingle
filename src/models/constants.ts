export const INITIAL_PAGE = 1;
export const MINIMAL_STRING_LENGTH = 1; // TODO zvýšiť na 2 po pridaní prod lexikonu
export const DEFAULT_FILTERS_QUANTITY = 2;

const APP_CONTENT = {
  DIALOG: {
    TITLE: "Prejdite na stránku",
  },
  HEADINGS: {
    APPLICATION_TITLE: "Rýmovačka",
  },
  ICON: {
    ALT_TEXT: {
      HEADER: "Feather image",
      LINK: {
        ARCHIVED: "Folder image ",
        FAVORITE: "Heart image",
        SEARCHED: "Magnifying glass image",
        SETTINGS: "Cog wheel image",
      },
      LIST_ITEM: {
        TRASH_CAN: "Trash can image",
      },
    },
  },
  SEARCHFIELD: {
    PLACEHOLDER: {
      ARCHIVED: "Nájdi archivované...",
      FAVORITE: "Nájdi obľúbené...",
      SEARCHED: "Nájdi rým...",
    },
  },
};

Object.freeze(APP_CONTENT);

export default APP_CONTENT;

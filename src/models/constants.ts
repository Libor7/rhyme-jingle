/** MODELS */
import {
  cherryAndWhite,
  coffeeAndBeige,
  darkGreenAndWhite,
  islandGreenAndWhite,
  midnightblueAndWater,
} from "./color-palettes";

export const INITIAL_PAGE = 1;
export const MINIMAL_STRING_LENGTH = 1; // TODO zvýšiť na 2 po pridaní prod lexikonu
export const DEFAULT_FILTERS_QUANTITY = 2;

const APP_CONTENT = {
  DIALOG: {
    FAVORITE: {
      TITLE: "Odstrániť obľúbené",
      DESCRIPTION: "Prajete si zmazať všetky položky v časti Obľúbené?",
    },
    SEARCHED: {
      TITLE: "Prejdite na stránku",
    },
  },
  HEADINGS: {
    APPLICATION_TITLE: "Rýmovačka",
  },
  CHECKBOXFIELD: {
    LABEL: "Označ všetky",
  },
  SEARCHFIELD: {
    PLACEHOLDER: {
      ARCHIVED: "Nájdi archivované...",
      FAVORITE: "Nájdi obľúbené...",
      SEARCHED: "Nájdi rým...",
    },
  },
  SELECTFIELD: {
    LABEL: {
      SEARCHED: "Počet nájdených slov",
      FAVORITE: "Počet obľúbených slov",
    },
  },
  THEME_COLOR_PICKER: {
    TITLE: "Farby aplikácie",
    CONTROLS: {
      CHERRY: {
        LABEL: "Čerešňová",
        VALUE: "cherryWhite",
      },
      COFFEE: {
        LABEL: "Kávová",
        VALUE: "coffeeBeige",
      },
      DARKGREEN: {
        LABEL: "Tmavozelená",
        VALUE: "darkGreenWhite",
      },
      ISLANDGREEN: {
        LABEL: "Svetlozelená",
        VALUE: "islandGreenWhite",
      },
      MIDNIGHTBLUE: {
        LABEL: "Modré odtiene",
        VALUE: "midnightblueWater",
      },
    },
  },
};

Object.freeze(APP_CONTENT);

export const palettes = new Map([
  ["cherryWhite", cherryAndWhite],
  ["coffeeBeige", coffeeAndBeige],
  ["darkGreenWhite", darkGreenAndWhite],
  ["islandGreenWhite", islandGreenAndWhite],
  ["midnightblueWater", midnightblueAndWater],
]);

export default APP_CONTENT;

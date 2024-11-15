/** MODELS */
import {
  cherryAndWhite,
  coffeeAndBeige,
  darkGreenAndWhite,
  islandGreenAndWhite,
  midnightblueAndWater,
  orangeAndWhite,
} from "./color-palettes";

export const INITIAL_PAGE = 1;
export const MINIMAL_STRING_LENGTH = 1; // TODO zvýšiť na 2 po pridaní prod lexikonu
export const DEFAULT_FILTERS_QUANTITY = 2;

const APP_CONTENT = {
  DIALOG: {
    ARCHIVED: {
      TITLE: "Odstrániť archivované",
      DESCRIPTION: "Prajete si zmazať všetky položky v časti Archivované?",
    },
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
    ARCHIVED: {
      ID: "archived",
      LABEL: "Počet archivovaných slov",
    },
    FAVORITE: {
      ID: "favorite",
      LABEL: "Počet obľúbených slov",
    },
    SEARCHED: {
      ID: "searched",
      LABEL: "Počet nájdených slov",
    },
  },
  PICKER: {
    ARCHIVED_AMOUNT: {
      LABEL: "Počet archivovaných slov",
    },
    THEME_COLOR: {
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
        ORANGEWHITE: {
          LABEL: "Oranžová",
          VALUE: "orangeWhite",
        },
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
  ["orangeWhite", orangeAndWhite],
]);

export default APP_CONTENT;

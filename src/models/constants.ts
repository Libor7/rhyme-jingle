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
export const MINIMAL_STRING_LENGTH = 2;
export const DEFAULT_FILTERS_QUANTITY = 2;

const APP_CONTENT = {
  DIALOG: {
    INFO: {
      DELETE_ALL: {
        TITLE: (name: string) => `Odstrániť ${name}`,
        DESCRIPTION: (name: string) =>
          `Prajete si zmazať všetky položky v časti ${name}?`,
      },
      MOVE_TO_PAGE: "Prejdite na stránku",
      REDUCE_ARCHIVED: {
        TITLE: "Zníženie počtu archivovaných položiek",
        DESCRIPTION: (newVal: number, oldVal: number) =>
          `Zmenou počtu položiek z${
            oldVal === 100 ? "o" : ""
          } ${oldVal} na ${newVal} môže dôjsť k čiastočnému zmazaniu archivovaných dát. Prajete si zmenu uložiť?`,
      },
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

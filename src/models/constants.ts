export const INITIAL_PAGE = 1;
export const MINIMAL_STRING_LENGTH = 1;     // TODO zvýšiť na 2 po pridaní prod lexikonu 

const APP_CONTENT = {
    HEADINGS: {
        APPLICATION_TITLE: "Rýmovačka",
    },
    SEARCHFIELD: {
        PLACEHOLDER: {
            ARCHIVED: "Nájdi archivované...",
            FAVORITE: "Nájdi obľúbené...",
            SEARCHED: "Nájdi rým...",
        }
    },
}

Object.freeze(APP_CONTENT);

export default APP_CONTENT;

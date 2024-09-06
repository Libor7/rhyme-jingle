/** MODELS */
import { LinkIcons } from "./icon";

export enum LinkLabels {
  ARCHIVE = "Archív",
  FAVORITE = "Obľúbené",
  SEARCH = "Vyhľadávanie",
  SETTINGS = "Nastavenia",
}

export enum LinkPaths {
  ARCHIVE = "/archive",
  FAVORITE = "/favorite",
  SEARCH = "/search",
  SETTINGS = "/settings",
}

export interface Links {
  icon: LinkIcons;
  label: LinkLabels;
  path: LinkPaths;
}

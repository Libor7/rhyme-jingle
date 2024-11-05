/** LIBRARIES */
import { FC } from "react";

export enum Label {
  ARCHIVE = "Archív",
  FAVORITE = "Obľúbené",
  SEARCH = "Vyhľadávanie",
  SETTINGS = "Nastavenia",
}

export enum Path {
  ARCHIVE = "/archive",
  FAVORITE = "/favorite",
  SEARCH = "/search",
  SETTINGS = "/settings",
}

export interface Link extends IPath {
  icon: FC;
  label: Label;
}

export interface IPath {
  path: Path;
}

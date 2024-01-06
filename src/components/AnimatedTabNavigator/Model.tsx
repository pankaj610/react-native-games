import { ImageSourcePropType } from "react-native";

// @flow
export const PADDING = 8;
export const CURSOR_WIDTH = 50;
export const CURSOR_GAP = 5;
export const SMALL_HEADER_HEIGHT = 150;
export const MEDIUM_HEADER_HEIGHT = 300;

export type Section = {
    title: string,
    leftColor: string,
    rightColor: string,
    image: ImageSourcePropType,
};
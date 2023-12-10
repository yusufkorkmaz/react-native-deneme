import { Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const windowSize = {
  width: windowWidth,
  height: windowHeight
};
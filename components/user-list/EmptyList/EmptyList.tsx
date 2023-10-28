import { Image, View } from "react-native";
import { emptyResult } from "../../../constants";
import styles from "./EmptyList.styles";

export default function EmptyList() {
  return (
    <View style={styles.container}>
      <Image source={emptyResult} style={styles.image} resizeMode="cover" />
    </View>
  );
}

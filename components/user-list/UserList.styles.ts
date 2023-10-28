import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: 40,
    color: COLORS.lightWhite,
    maxHeight: "90%",
    paddingHorizontal: 10,
  },
  rank: {
    maxWidth: 45,
  },
  bananas: {
    maxWidth: 60,
  },
  searchedUser: {
    maxWidth: 100,
  },
});

export default styles;

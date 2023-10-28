import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const styles = StyleSheet.create({
  container: {
    color: COLORS.lightWhite,
    paddingHorizontal: 10,
    marginBottom: 120,
  },
  tableHeader: {
    alignItems: "center",
  },
  rank: {
    maxWidth: 50,
    paddingRight: 15,
  },
  bananas: {
    maxWidth: 60,
  },
  searchedUser: {
    maxWidth: 100,
  },
  listFooterComponent: {
    padding: 20,
  },
});

export default styles;

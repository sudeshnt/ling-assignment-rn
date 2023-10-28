import { useState } from "react";
import { View } from "react-native";
import { Button, Searchbar } from "react-native-paper";
import styles from "./SearchInput.styles";

export default function SearchInput() {
  const [userName, setUserName] = useState("");

  const handleChangeSearchText = (query: string) => {
    setUserName(query);
  };

  const handleClickSearchButton = () => {};

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Enter User Name"
        onChangeText={handleChangeSearchText}
        value={userName}
        style={styles.searchInput}
      />
      <Button
        mode="elevated"
        style={styles.searchButton}
        loading
        disabled
        accessibilityLabel="search button"
        onPress={handleClickSearchButton}
      >
        Search
      </Button>
    </View>
  );
}

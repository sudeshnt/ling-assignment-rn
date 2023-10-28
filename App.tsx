import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Appbar, PaperProvider } from "react-native-paper";
import { COLORS } from "./constants";
import usersJSON from "./data/leaderboard.json";
import Home from "./screens/home/Home";
import useUserStore from "./store/users";
import { getUsersListFromLeaderboard } from "./utils";

export default function App() {
  const populateUsers = useUserStore((state) => state.populateUsers);

  useEffect(() => {
    const users = getUsersListFromLeaderboard(usersJSON);
    populateUsers(users);
  }, []);

  return (
    <PaperProvider>
      <SafeAreaView style={styles.scrollArea}>
        <StatusBar style="auto" />
        <Appbar.Header statusBarHeight={0}>
          <Appbar.Content title="Title" />
        </Appbar.Header>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
        >
          <Home />
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  scrollArea: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

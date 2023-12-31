import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import { Appbar, PaperProvider } from 'react-native-paper';
import { RootSiblingParent } from 'react-native-root-siblings';

import { COLORS } from './constants';
import usersJSON from './data/leaderboard.json';
import Home from './screens/home/Home';
import useUserStore from './store/users';
import { getUsersListFromLeaderboardObject } from './utils';

export default function App() {
  const populateAllUsers = useUserStore((state) => state.populateAllUsers);

  useEffect(() => {
    const users = getUsersListFromLeaderboardObject(usersJSON);
    populateAllUsers(users);
  }, []);

  return (
    <RootSiblingParent>
      <PaperProvider>
        <SafeAreaView style={styles.scrollArea}>
          <StatusBar style="auto" />
          <Appbar.Header statusBarHeight={0} style={styles.appBar}>
            <Appbar.Content title="Banana Leaderboard" />
          </Appbar.Header>
          <View style={styles.container}>
            <Home />
          </View>
        </SafeAreaView>
      </PaperProvider>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  scrollArea: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  appBar: {
    backgroundColor: COLORS.lightWhite,
    marginTop: Platform.OS === 'android' ? 25 : 0,
    paddingLeft: Platform.OS === 'android' ? 10 : 0,
  },
  container: {
    flex: 1,
    paddingTop: 3,
  },
});

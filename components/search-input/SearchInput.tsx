import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Toast from 'react-native-root-toast';

import { COLORS, SHADOWS } from '../../constants';
import useUserStore from '../../store/users';
import styles from './SearchInput.styles';

export default function SearchInput() {
  const searchText = useUserStore((state) => state.searchText);
  const setSearchText = useUserStore((state) => state.setSearchText);
  const searchUser = useUserStore((state) => state.searchUser);
  const resetUserList = useUserStore((state) => state.resetUserList);

  const handleChangeSearchText = (query: string) => {
    if (!query) {
      resetUserList();
    }
    setSearchText(query);
  };

  const handleClickSearchButton = () => {
    try {
      searchUser(searchText.toLowerCase());
    } catch (err) {
      Toast.show((err as Error).message, {
        duration: Toast.durations.LONG,
        backgroundColor: COLORS.error,
        opacity: 0.9,
        shadowColor: SHADOWS.error,
        position: 255,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Enter User Name"
        value={searchText}
        style={styles.searchInput}
        onChangeText={handleChangeSearchText}
        onSubmitEditing={handleClickSearchButton}
      />
      {/* <Button
        mode="elevated"
        style={styles.searchButton}
        disabled={!searchText}
        accessibilityLabel="search button"
        onPress={handleClickSearchButton}
      >
        Search
      </Button> */}
    </View>
  );
}

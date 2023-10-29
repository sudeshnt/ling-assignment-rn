import { ActivityIndicator, FlatList, View } from 'react-native';
import { DataTable, Icon } from 'react-native-paper';

import { COLORS } from '../../constants';
import { banana, magnifyingGlass } from '../../constants/images';
import useUserStore from '../../store/users';
import { LeaderBoardUser } from '../../types';
import EmptyList from './EmptyList/EmptyList';
import styles from './UserList.styles';

export default function UserList() {
  const {
    searchText,
    userList = [],
    isSearchData,
    currentPage,
    totalPages,
    fetchNextUserPage,
  } = useUserStore((state) => state);

  const allDataLoaded = currentPage >= totalPages;

  const handleScrollEndReached = () => {
    if (isSearchData || allDataLoaded) {
      return;
    }
    fetchNextUserPage();
  };

  return (
    <>
      <DataTable style={styles.container}>
        {userList.length > 0 ? (
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title numeric style={styles.rank}>
              Rank
            </DataTable.Title>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title numeric style={styles.bananas}>
              <View>
                <Icon source={banana} size={25} />
              </View>
            </DataTable.Title>
            {isSearchData && (
              <DataTable.Title numeric style={styles.searchedUser}>
                <View>
                  <Icon size={28} source={magnifyingGlass} />
                </View>
              </DataTable.Title>
            )}
          </DataTable.Header>
        ) : null}
        <FlatList
          data={userList}
          keyExtractor={(user: LeaderBoardUser) => user.uid}
          ListEmptyComponent={<EmptyList />}
          onEndReached={handleScrollEndReached}
          renderItem={({ item: user }) => {
            return (
              <DataTable.Row
                key={user.uid}
                style={{
                  backgroundColor:
                    isSearchData && searchText && user.isSearchedUser ? COLORS.success : 'none',
                }}>
                <DataTable.Cell numeric style={styles.rank}>
                  #{user.rank}
                </DataTable.Cell>
                <DataTable.Cell>{user.name || 'Anonymous'}</DataTable.Cell>
                <DataTable.Cell numeric style={styles.bananas}>
                  {user.bananas.toLocaleString('en-EN')}
                </DataTable.Cell>
                {isSearchData && (
                  <DataTable.Cell numeric style={styles.searchedUser}>
                    {user.isSearchedUser ? 'Yes' : 'No'}
                  </DataTable.Cell>
                )}
              </DataTable.Row>
            );
          }}
          ListFooterComponent={!isSearchData && !allDataLoaded ? <ActivityIndicator /> : null}
          ListFooterComponentStyle={styles.listFooterComponent}
        />
      </DataTable>
    </>
  );
}

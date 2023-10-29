import { ActivityIndicator, FlatList } from "react-native";
import { DataTable, Icon } from "react-native-paper";
import { COLORS } from "../../constants";
import useUserStore from "../../store/users";
import { LeaderBoardUser } from "../../types";
import EmptyList from "./EmptyList/EmptyList";
import styles from "./UserList.styles";

export default function UserList() {
  const {
    searchText,
    userList = [],
    isSearchData,
    currentPage,
    totalPages,
    isLoading,
    fetchNextUserPage,
  } = useUserStore((state) => state);

  const allDataLoaded = currentPage >= totalPages;

  const handleScrollEndReached = () => {
    if (isSearchData || isLoading || allDataLoaded) {
      return;
    }
    fetchNextUserPage();
  };

  return (
    <>
      {isLoading && (
        <ActivityIndicator
          size="large"
          color="#00ff00"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: -200,
            bottom: 0,
          }}
        />
      )}
      <DataTable style={styles.container}>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title numeric style={styles.rank}>
            Rank
          </DataTable.Title>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title numeric style={styles.bananas}>
            Bananas
          </DataTable.Title>
          {isSearchData && (
            <DataTable.Title numeric style={styles.searchedUser}>
              <Icon size={20} source="magnify" />
            </DataTable.Title>
          )}
        </DataTable.Header>
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
                    isSearchData && searchText && user.isSearchedUser
                      ? COLORS.success
                      : "none",
                }}
              >
                <DataTable.Cell numeric style={styles.rank}>
                  #{user.rank}
                </DataTable.Cell>
                <DataTable.Cell>{user.name}</DataTable.Cell>
                <DataTable.Cell numeric style={styles.bananas}>
                  {user.bananas}
                </DataTable.Cell>
                {isSearchData && (
                  <DataTable.Cell numeric style={styles.searchedUser}>
                    {user.isSearchedUser ? "yes" : "no"}
                  </DataTable.Cell>
                )}
              </DataTable.Row>
            );
          }}
          ListFooterComponent={
            !isSearchData && !allDataLoaded ? <ActivityIndicator /> : null
          }
          ListFooterComponentStyle={styles.listFooterComponent}
        />
      </DataTable>
    </>
  );
}

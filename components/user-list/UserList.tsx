import { FlatList } from "react-native";
import { DataTable } from "react-native-paper";
import { COLORS } from "../../constants";
import useUserStore from "../../store/users";
import { LeaderBoardUser } from "../../types";
import EmptyList from "./EmptyList/EmptyList";
import styles from "./UserList.styles";

export default function UserList() {
  const searchText = useUserStore((state) => state.searchText);
  const userList = useUserStore((state) => state.userList ?? []);

  return (
    <DataTable style={styles.container}>
      <DataTable.Header>
        <DataTable.Title style={styles.rank}>Rank</DataTable.Title>
        <DataTable.Title>Name</DataTable.Title>
        <DataTable.Title numeric style={styles.bananas}>
          Bananas
        </DataTable.Title>
        {searchText && (
          <DataTable.Title numeric style={styles.searchedUser}>
            Searched User?
          </DataTable.Title>
        )}
      </DataTable.Header>
      <FlatList
        data={userList}
        keyExtractor={(user: LeaderBoardUser) => user.uid}
        ListEmptyComponent={<EmptyList />}
        renderItem={({ item: user }) => (
          <DataTable.Row
            key={user.uid}
            style={{
              backgroundColor: user.isSearchedUser ? COLORS.success : "",
            }}
          >
            <DataTable.Cell style={styles.rank}>#{user.rank}</DataTable.Cell>
            <DataTable.Cell>{user.name}</DataTable.Cell>
            <DataTable.Cell numeric style={styles.bananas}>
              {user.bananas}
            </DataTable.Cell>
            {searchText && (
              <DataTable.Cell numeric style={styles.searchedUser}>
                {user.isSearchedUser ? "yes" : "no"}
              </DataTable.Cell>
            )}
          </DataTable.Row>
        )}
      />
    </DataTable>
  );
}

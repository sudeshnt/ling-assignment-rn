import { DataTable } from "react-native-paper";
import useUserStore from "../../store/users";

export default function UserList() {
  const users = useUserStore((state) => state.users ?? []);

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Name</DataTable.Title>
        <DataTable.Title numeric>Bananas</DataTable.Title>
        <DataTable.Title numeric>Fat</DataTable.Title>
      </DataTable.Header>
      {users.map((item) => (
        <DataTable.Row key={item.uid}>
          <DataTable.Cell>{item.name}</DataTable.Cell>
          <DataTable.Cell numeric>{item.bananas}</DataTable.Cell>
          <DataTable.Cell numeric>{String(item.subscribed)}</DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );
}

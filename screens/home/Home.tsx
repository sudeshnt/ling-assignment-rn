import { View } from 'react-native';

import SearchInput from '../../components/search-input/SearchInput';
import UserList from '../../components/user-list/UserList';

export default function Home() {
  return (
    <View style={{ flex: 1 }}>
      <SearchInput />
      <UserList />
    </View>
  );
}

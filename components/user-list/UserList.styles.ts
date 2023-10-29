import { StyleSheet } from 'react-native';

import { COLORS } from '../../constants';

const styles = StyleSheet.create({
  container: {
    color: COLORS.lightWhite,
    paddingHorizontal: 10,
    marginBottom: 120,
  },
  tableHeader: {
    minHeight: 50,
  },
  rank: {
    maxWidth: 50,
    paddingRight: 20,
  },
  bananas: {
    maxWidth: 60,
    padding: 0,
    alignContent: 'flex-end',
  },
  searchedUser: {
    maxWidth: 80,
  },
  listFooterComponent: {
    padding: 20,
  },
});

export default styles;

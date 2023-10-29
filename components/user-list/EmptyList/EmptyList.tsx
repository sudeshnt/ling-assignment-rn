import { Image, View } from 'react-native';

import styles from './EmptyList.styles';
import { emptyResult } from '../../../constants';

export default function EmptyList() {
  return (
    <View style={styles.container}>
      <Image source={emptyResult} style={styles.image} resizeMode="cover" />
    </View>
  );
}

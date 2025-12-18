import { View, Text, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export default function DetailsScreen({ route, navigation }: Props) {
  const { id } = route.params;

  return (
    <View>
      <Text>Details Screen</Text>
      <Text>ID: {id}</Text>
      <Button
        title="Go to Profile"
        onPress={() =>
          navigation.navigate('Profile', { username: 'john_doe' })
        }
      />
    </View>
  );
}

import { View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function ProfileScreen({ route }: Props) {
  const { username } = route.params;

  return (
    <View>
      <Text>Profile Screen</Text>
      <Text>Username: {username}</Text>
    </View>
  );
}

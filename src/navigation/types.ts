import { Item } from '../services/api';

export type RootStackParamList = {
  Home: undefined;
  Details: { id: string };
  Profile: { username: string };
  Create: undefined;
  Edit: { item: Item };
  Detail: { item: Item };
};

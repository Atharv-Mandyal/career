
import data from './placeholder-users.json';

export type PlaceholderUser = {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  interests: string[];
};

export const placeholderUsers: PlaceholderUser[] = data.placeholderUsers;

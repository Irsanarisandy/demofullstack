import { Photo } from './photo';

export interface Member {
  id: number;
  username: string;
  age: number;
  gender: string;
  knownAs: string;
  created: Date;
  lastActive: Date;
  introduction: string;
  lookingFor: string;
  interests: string;
  city: string;
  country: string;
  photos: Photo[];
  photoUrl: string;
}

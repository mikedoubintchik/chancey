import { UserCredential } from 'firebase/auth';

export type UserType = {
  uid: UserCredential['user']['uid'];
  displayName: UserCredential['user']['displayName'];
  email: UserCredential['user']['email'];
  providerId: UserCredential['providerId'];
  photoUrl?: UserCredential['user']['photoURL'];
  phoneNumber?: UserCredential['user']['phoneNumber'];
  firstName?: string;
  lastName?: string;
  password?: string;
};

export interface IUser {
  loggedIn: boolean;
  uid: UserCredential['user']['uid'] | null;
}

export enum UserRegisterMethodType {
  google = 'google',
  facebook = 'facebook',
  email = 'email',
}

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}

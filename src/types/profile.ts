import { UserCredential } from 'firebase/auth';
import { LotteryDrawModel } from './lottery-draw';

export type SignupUserType = {
  displayName?: UserCredential['user']['displayName'];
  token?: string;
};

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

export enum UserRegisterMethodType {
  google = 'google',
  facebook = 'facebook',
  email = 'email',
}

export interface TicketPhotoType {
  fileName: string;
  filePath: string;
  webviewPath?: string;
  // TODO: fix below type
  ticketText?: Record<string, unknown>;
  values?: LotteryDrawModel;
  ticketDate?: Date;
}

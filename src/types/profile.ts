export type User = {
  loggedIn: boolean;
  uid: number | null;
};

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}

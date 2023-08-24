export interface Users {
  user_ID: string;
  avatar: string;
  phone: string;
  displayname: string;
  email: string;
  create_at: string;
  update_at: string;
  lastsignin_at: string;
}

export interface Usercreate {
  email: string;
  password: string;
}

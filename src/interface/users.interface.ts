export interface Users {
  id: string;
  avatar: string;
  phone: string;
  displayname: string;
  email: string;
  password: string;
  create_at: string;
  update_at: string;
  lastsignin_at: string;
}

export interface Usercreate {
  email: string;
  password: string;
}

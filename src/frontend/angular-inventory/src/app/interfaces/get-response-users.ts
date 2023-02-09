import {User} from "../common/user";

export interface GetResponseUsers {
  _embedded: {
    users: User[];
  }
}

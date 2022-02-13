import { UserRolesModel } from "./userRolesModel";

export interface UserModel {
  id: string;
  name: string;
  password: string;
  surname: string;
  post: string;
  roles: UserRolesModel;
}

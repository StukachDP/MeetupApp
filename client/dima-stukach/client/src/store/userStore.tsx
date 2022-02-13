import { makeAutoObservable } from "mobx";
import { $host } from "../http";
import { UserModel } from "../Models/Users/userModel";

export default class UserStore {
  isAuth: boolean = false;
  user: UserModel | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async loginUser(username: string, password: string) {
    try {
      const userData = await $host.post("/api/login", { username, password });
      if (userData.status === 200) {
        this.setUser(userData.data.user);
        this.setIsAuth(true);
        return true;
      }
    } catch (error) {
      this.setUser(null);
      this.setIsAuth(false);
      return false;
    }
  }

  async logoutUser() {
    try {
      const userData = await $host.get("/api/logout");
      if (userData.status === 200) {
        this.setUser(null);
        this.setIsAuth(false);
        return true;
      }
    } catch (error) {
      return false;
    }
  }

  async checkLogin() {
    try {
      const userData = await $host.get("/api/login");
      if (userData.status === 200) {
        this.setUser(userData.data.user);
        this.setIsAuth(true);
        return userData.data.user;
      }
    } catch (error) {
      this.setUser(null);
      this.setIsAuth(false);
    }
  }

  setIsAuth(flag: boolean) {
    this.isAuth = flag;
  }

  setUser(authenticatedUser: UserModel | null) {
    this.user = authenticatedUser;
  }
}

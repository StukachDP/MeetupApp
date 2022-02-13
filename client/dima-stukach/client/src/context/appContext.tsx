import { createContext } from "react";
import MeetupStore from "../store/meetupStore";
import NewsStore from "../store/newsStore";
import UserStore from "../store/userStore";

let userStore = new UserStore();
let meetupsStore = new MeetupStore();
let newsStore = new NewsStore();
export const Context = createContext<{
  userStore: UserStore;
  meetupsStore: MeetupStore;
  newsStore: NewsStore;
}>({ userStore, meetupsStore, newsStore });

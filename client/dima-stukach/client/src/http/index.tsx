import axios from "axios";

const $host = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_MEETUP_APP_URL,
});

export { $host };

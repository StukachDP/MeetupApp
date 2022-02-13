import { generateUsers } from './data/users.mjs';
import { generateMeetups, generateShortUsers } from './data/meetups.mjs';
import { generateNews } from './data/news.mjs';

export const generateInitialData = () => {
  const users = generateUsers(100);
  const meetups = generateMeetups(20, users);
  const participants = generateShortUsers(meetups, users);
  const votedUsers = generateShortUsers(meetups, users);
  const news = generateNews(10);
  return { users, meetups, participants, votedUsers, news };
};

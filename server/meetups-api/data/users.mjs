import faker from "faker";

const fixedUsers = [
  {
    id: "b4ba2b84-521f-4645-9cc3-518b8a35cda3",
    name: "employee",
    password: "private",
    surname: "Gerlach",
    post: "Developer",
    roles: "EMPLOYEE",
  },
  {
    id: "63e5aa79-6925-4761-9626-a6d3092ef55e",
    name: "chief",
    password: "private",
    surname: "Blick",
    post: "Chief developer",
    roles: "CHIEF",
  },
];
const generateUser = () => {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.firstName(),
    password: "private",
    surname: faker.name.lastName(),
    post: faker.name.jobTitle(),
    roles: faker.random.arrayElement(["EMPLOYEE", "CHIEF"]),
  };
};

export const generateUsers = (count) => {
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push(generateUser());
  }
  return users;
};

export const getRandomUser = (users) =>
  users[faker.datatype.number(0, users.length)];

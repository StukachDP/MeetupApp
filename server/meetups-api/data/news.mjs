import faker from 'faker';

const fixedNews = [
  {
    id: '2de0306f-a712-4078-b1f0-b223c2f4246b',
    publicationDate: '2021-08-27T04:38:33.816Z',
    title: 'Reverse-engineered even-keeled standardization',
    text: 'Nemo pariatur dolores ut vero velit non.',
    image: 'future image id/url'
  },
];

const createNews = () => ({
  id: faker.datatype.uuid(),
  publicationDate: faker.date.between('2020-01-01', '2021-12-12'),
  title: faker.company.catchPhrase(),
  text: faker.lorem.paragraphs(3),
  image: null
});

export const generateNews = (count) => {
  return Array.from({ length: count }, createNews);
};

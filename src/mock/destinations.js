import { getRandomPositiveInteger } from '../utils/common.js';

const mockDestinations = [
  {
    id: 'cdfc6dee-3b1d-43f7-9f70-f60ca05b5b06',
    name: 'Madrid',
    description: 'The capital of Spain, recognized as one of the most beautiful cities in the world. And it\'s no wonder, because here modern and medieval architecture blend harmoniously, and the park complexes are worthy for royal figures to stroll along their alleys. Madrid is located in the central part of the Iberian Peninsula. The "heart of Spain" also serves as the administrative center of the province and autonomous community of the same name.',
    photos: Array.from({length: getRandomPositiveInteger(0, 5)}, () => `http://picsum.photos/300/200?r=${Math.random()}`)
  },
  {
    id: '185f6061-5967-4a65-8a41-dd923c470eb3',
    name: 'London',
    description: '',
    photos: []
  },
  {
    id: '9adb05f5-5a7e-4df1-a47b-079853d44bb3',
    name: 'Lissabon',
    description: 'The capital of Portugal, the starting point for legendary sailors\' routes, and one of the oldest cities on the planet, situated at the mouth of the Tagus River, just 15 km from the Atlantic Ocean. Lisbon’s main distinguishing feature is its stunning harmony, which is rarely found in places with such outstanding and truly glorious pasts. The orange roofs of residential houses, Berber ornaments on walls, and modern business centers not only do not contrast with Gothic, Baroque, and Manueline architectural objects but also add pleasant variety to the overall picture.',
    photos: Array.from({length: getRandomPositiveInteger(0, 5)}, () => `https://22.objects.htmlacademy.pro/static/destinations/${getRandomPositiveInteger(1, 20)}.jpg`)
  },
  {
    id: '9428ea55-9370-48c4-9ff8-8b13b593cd00',
    name: 'Reykjavik',
    description: 'The capital and one of the municipalities of Iceland, also known as the "tourist gateway" of the country. Despite being the largest city on the island, it can be walked through in less than a day. Its compact size—just 274.5 square kilometers—doesn’t prevent Reykjavik from being an important scientific and economic hub. Only here will you have the opportunity to learn one of the world\'s oldest languages, visit an ice café, and taste ice cream with fish.',
    photos: Array.from({length: getRandomPositiveInteger(0, 5)}, () => `https://22.objects.htmlacademy.pro/static/destinations/${getRandomPositiveInteger(1, 20)}.jpg`)
  },
  {
    id: '468d5bf7-33ee-45f1-b2ac-e5d374b63df1',
    name: 'Helsinki',
    description: 'The capital of Finland, political, scientific, and cultural center of the country. This unique, diverse, intriguing city is capable of surprising even those who know it well. There may be countless reasons to come to Helsinki: to enjoy the silence and fresh air in the epicenter of city life, admire Art Nouveau architecture, see the Northern Lights, relax in a famous Finnish sauna—the result is always the same: the local atmosphere settles forever in your heart.',
    photos: Array.from({length: getRandomPositiveInteger(0, 5)}, () => `https://22.objects.htmlacademy.pro/static/destinations/${getRandomPositiveInteger(1, 20)}.jpg`)
  },
  {
    id: '5255dda8-f44d-45b6-8cb9-c8d7a73aeac4',
    name: 'Tenerife',
    description: 'The largest of the Canary Islands, covering an area of 2,045 square kilometers, with a population of 700 thousand people. Tourists can find numerous attractions, entertainment, and interesting cities here. The island is divided between the southern coast with a dry climate and golden beaches, and the more humid and windy northern coast, whose black sands under steep cliffs remind us of Tenerife\'s volcanic origin. Between them rises the highest peak in Spain, Mount Teide, reaching a height of 3,718 meters.',
    photos: Array.from({length: getRandomPositiveInteger(0, 5)}, () => `https://22.objects.htmlacademy.pro/static/destinations/${getRandomPositiveInteger(1, 20)}.jpg`)
  }
];

export {mockDestinations};

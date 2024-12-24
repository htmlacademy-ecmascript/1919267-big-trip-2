import { Price } from '../const.js';
import {getRandomArrayElement, getRandomPositiveInteger} from '../utils/common.js';

const mockPoints = [
  {
    'id': '9d633166-6a3b-4e7d-9273-34b02554719a',
    'basePrice': getRandomPositiveInteger(Price.MIN, Price.MAX),
    'dateFrom': '2024-04-23T08:00:05.048Z',
    'dateTo': '2024-04-23T09:59:05.048Z',
    'destination': 'cdfc6dee-3b1d-43f7-9f70-f60ca05b5b06',
    'isFavorite': Boolean(getRandomPositiveInteger(0, 1)),
    'offers': [
      '95397f5c-3d7e-42b6-b62d-d39cf0b1419b',
      'f72e0be1-108c-4e6f-89dc-92ecd5f4ddac',
      'c436fa7b-bdc2-4f60-a221-2e694a519d28',
      'aca032e4-00ff-45be-a876-50a74ba4554f',
    ],
    'type': 'taxi',
  },
  {
    'id': '8d633166-6b3b-4e7d-9273-34b02554719b',
    'basePrice': getRandomPositiveInteger(Price.MIN, Price.MAX),
    'dateFrom': '2024-05-26T03:14:05.048Z',
    'dateTo': '2024-05-27T02:38:05.048Z',
    'destination': '185f6061-5967-4a65-8a41-dd923c470eb3',
    'isFavorite': Boolean(getRandomPositiveInteger(0, 1)),
    'offers': [
      'a8dc90a1-4685-446f-a0a7-2abc11186d8f',
      '9a514bd6-ede6-48e3-9e25-f521c490f426'
    ],
    'type': 'train',
  },
  {
    'id': '7d633166-6c3b-4e7d-9273-34b02554719c',
    'basePrice': getRandomPositiveInteger(Price.MIN, Price.MAX),
    'dateFrom': '2024-06-23T01:15:05.048Z',
    'dateTo': '2024-06-25T22:41:05.048Z',
    'destination': '9428ea55-9370-48c4-9ff8-8b13b593cd00',
    'isFavorite': Boolean(getRandomPositiveInteger(0, 1)),
    'offers': [
      '0bc0fe2a-bad1-4224-a4c8-2f1756aeba0f',
      'c07d29bf-61cd-45f3-8b63-5d0661f6af4d'
    ],
    'type': 'flight',
  },
  {
    'id': '6d633166-6d3b-4e7d-9273-34b02554719d',
    'basePrice': getRandomPositiveInteger(Price.MIN, Price.MAX),
    'dateFrom': '2024-07-08T05:55:05.048Z',
    'dateTo': '2024-07-20T15:38:05.048Z',
    'destination': '5255dda8-f44d-45b6-8cb9-c8d7a73aeac4',
    'isFavorite': Boolean(getRandomPositiveInteger(0, 1)),
    'offers': [],
    'type': 'sightseeing',
  }
];

function getRandomMockPoint () {
  return getRandomArrayElement(mockPoints);
}

export {getRandomMockPoint};

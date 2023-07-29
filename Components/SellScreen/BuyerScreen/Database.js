export const COLOURS = {
  white: '#ffffff',
  black: '#000000',
  green: '#00AC76',
  red: '#C04345',
  blue: '#0043F9',
  backgroundLight: '#F0F0F3',
  backgroundMedium: '#B9B9B9',
  backgroundDark: '#777777',
};

export const Items = [
  {
    id: 1,
    category: 'Fruit',
    productName: 'Expire Amrood',
    productPrice: 80,
    description:
      'We have 2 carton of amrood having such stuff buy it at very low price',
    offPercentage: 10,
    productImage: require('../../../assets/products/fruit1.png'),
    isAvailable: true,
    productImageList: [
      require('../../../assets/products/fruit1.png'),
      require('../../../assets/products/Mi2.png'),
      require('../../../assets/products/Mi3.png'),
    ],
  },
  {
    id: 2,
    category: 'Food',
    productName: 'boAt Rockerz 450 Bluetooth Headphone',
    productPrice: 1499,
    description:
      'boAt Rockerz 450 M is an on-ear wireless headset that has been ergonomically designed to meet the needs of music lovers.',
    isOff: false,
    productImage: require('../../../assets/products/food1.png'),
    isAvailable: true,
    productImageList: [
      require('../../../assets/products/food1.png'),
      require('../../../assets/products/boat2.png'),
      require('../../../assets/products/boat3.png'),
    ],
  },
  {
    id: 3,
    category: 'fruit',
    productName: 'boAt Airdopes 441',
    productPrice: 1999,
    description:
      'Bluetooth: It has Bluetooth v5.0 with a range of 10m and is compatible with Android & iOS',
    isOff: true,
    offPercentage: 18,
    productImage: require('../../../assets/products/fruit1.png'),
    isAvailable: true,
    productImageList: [
      require('../../../assets/products/fruit1.png'),
      require('../../../assets/accessories/boatairpods2.png'),
      require('../../../assets/accessories/boatairpods3.png'),
    ],
  },
  {
    id: 4,
    category: 'accessory',
    productName: 'boAt Bassheads 242',
    productPrice: 399,
    description:
      'Fly into your workouts with precise tones that inspire and energize your system with its HD sound, all the time.',
    isOff: false,
    productImage: require('../../../assets/accessories/boatbassheads1.png'),
    isAvailable: true,
    productImageList: [
      require('../../../assets/accessories/boatbassheads1.png'),
      require('../../../assets/accessories/boatbassheads2.png'),
      require('../../../assets/accessories/boatbassheads3.png'),
    ],
  },
  {
    id: 5,
    category: 'accessory',
    productName: 'boAt Rockerz 255 Pro+',
    productPrice: 1499,
    description:
      'The unbeatable boAt signature sound shines through no matter what are you playing courtesy its 10mm drivers.',
    isOff: false,
    productImage: require('../../../assets/accessories/boatrockerz1.png'),
    isAvailable: false,
    productImageList: [
      require('../../../assets/accessories/boatrockerz1.png'),
      require('../../../assets/accessories/boatrockerz2.png'),
      require('../../../assets/accessories/boatrockerz3.png'),
    ],
  },
  {
    id: 6,
    category: 'accessory',
    productName: 'Boult Audio AirBass Propods TWS',
    productPrice: 1299,
    description:
      'One Touch Control & Voice Assistant: With one multifunction button, you can play/pause, previous/next track and answer/hang-up calls.Voice assistant function lets you access siri/Google Assistant',
    isOff: false,
    productImage: require('../../../assets/accessories/boultairbass1.png'),
    isAvailable: true,
    productImageList: [
      require('../../../assets/accessories/boultairbass1.png'),
      require('../../../assets/accessories/boultairbass2.png'),
      require('../../../assets/accessories/boultairbass3.png'),
    ],
  },
];

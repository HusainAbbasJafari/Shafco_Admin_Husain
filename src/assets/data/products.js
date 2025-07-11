import product1 from '@/assets/images/product/p-1.png';
import product2 from '@/assets/images/product/p-2.png';
import product3 from '@/assets/images/product/p-3.png';
import product4 from '@/assets/images/product/p-4.png';
import product5 from '@/assets/images/product/p-5.png';
import product6 from '@/assets/images/product/p-6.png';
import product7 from '@/assets/images/product/p-7.png';
import product8 from '@/assets/images/product/p-8.png';
import product9 from '@/assets/images/product/p-9.png';
import product10 from '@/assets/images/product/p-10.png';
import product11 from '@/assets/images/product/p-11.png';
import product12 from '@/assets/images/product/p-12.png';
import { addOrSubtractDaysFromDate, addOrSubtractMinutesFromDate } from '@/utils/date';
import avatar1 from '@/assets/images/users/avatar-1.jpg';
import avatar2 from '@/assets/images/users/avatar-2.jpg';
import avatar3 from '@/assets/images/users/avatar-3.jpg';
import avatar4 from '@/assets/images/users/avatar-4.jpg';
import avatar5 from '@/assets/images/users/avatar-5.jpg';
import avatar6 from '@/assets/images/users/avatar-6.jpg';
import avatar7 from '@/assets/images/users/avatar-7.jpg';
import avatar8 from '@/assets/images/users/avatar-8.jpg';
import avatar9 from '@/assets/images/users/avatar-9.jpg';
import avatar10 from '@/assets/images/users/avatar-10.jpg';
import avatar11 from '@/assets/images/users/avatar-11.jpg';
import avatar12 from '@/assets/images/users/avatar-12.jpg';
import zara from '@/assets/images/seller/zara.svg';
import rolex from '@/assets/images/seller/rolex.svg';
import dyson from '@/assets/images/seller/dyson.svg';
import gopro from '@/assets/images/seller/gopro.svg';
import sellerHm from '@/assets/images/seller/h&m.svg';
import huawei from '@/assets/images/seller/huawei.svg';
import nike from '@/assets/images/seller/nike.svg';
import thenorthface from '@/assets/images/seller/thenorthface.svg';
import facebook from '@/assets/images/app-calendar/facebook.png';
import slack from '@/assets/images/app-calendar/slack.png';
import zoom from '@/assets/images/app-calendar/zoom.png';
import analytics from '@/assets/images/app-calendar/google-analytics.png';
import meet from '@/assets/images/app-calendar/google-meet.png';
import mail from '@/assets/images/app-calendar/google-mail.png';
import stripe from '@/assets/images/app-calendar/stripe.png';
import small1 from '@/assets/images/small/img-1.jpg';
import small2 from '@/assets/images/small/img-2.jpg';
import small3 from '@/assets/images/small/img-3.jpg';
export const productData = [{
  id: '1',
  image: product1,
  title: 'Men Black Slim Fit T-shirt',
  price: 80,
  rating: {
    star: 4.5,
    review: 55
  },
  category: 'Fashion',
  gender: 'men',
  date: addOrSubtractDaysFromDate(1),
  size: 'm',
  stockLeft: 486,
  stockSold: 155,
  quantity: 1,
  tex: 3,
  color: 'Dark',
  total: 83,
  itemStatus: 'Published',
  discount: '20',
  code: 'FASHION123',
  endDate: addOrSubtractDaysFromDate(20),
  productStatus: 'Active',
  sellPrice: 100
}, {
  id: '2',
  image: product2,
  title: 'Olive Green Leather Bag',
  price: 136,
  rating: {
    star: 4.1,
    review: 143
  },
  category: 'Fashion',
  gender: 'women',
  date: addOrSubtractDaysFromDate(5),
  size: 'm',
  stockLeft: 784,
  stockSold: 674,
  quantity: 3,
  tex: 4,
  color: 'Dark Green',
  total: 330,
  itemStatus: 'Pending',
  discount: '37',
  code: 'SUMMER24',
  endDate: addOrSubtractDaysFromDate(200),
  productStatus: 'Expired',
  sellPrice: 150
}, {
  id: '3',
  image: product3,
  title: 'Women Golden Dress',
  price: 219,
  rating: {
    star: 4.4,
    review: 174
  },
  category: 'Fashion',
  gender: 'kids',
  date: addOrSubtractDaysFromDate(10),
  size: 's',
  stockLeft: 769,
  stockSold: 180,
  quantity: 1,
  tex: 5,
  color: 'Brown',
  total: 137,
  itemStatus: 'Published',
  discount: '20',
  code: 'FASHION123',
  endDate: addOrSubtractDaysFromDate(150),
  productStatus: 'Active',
  sellPrice: 250
}, {
  id: '4',
  image: product4,
  title: 'Gray Cap For Men',
  price: 76,
  rating: {
    star: 4.2,
    review: 23
  },
  category: 'Cap',
  gender: 'kids',
  date: addOrSubtractDaysFromDate(15),
  size: 'm',
  stockLeft: 571,
  stockSold: 87,
  quantity: 2,
  tex: 3,
  color: 'Yellow',
  total: 223,
  itemStatus: 'Published',
  discount: '12',
  code: 'CODE000',
  endDate: addOrSubtractDaysFromDate(250),
  productStatus: 'Active',
  sellPrice: 100
}, {
  id: '5',
  image: product5,
  title: 'Dark Green Cargo Pent',
  price: 110,
  rating: {
    star: 4.4,
    review: 109
  },
  category: 'Fashion',
  gender: 'men',
  date: addOrSubtractDaysFromDate(17),
  size: 'm',
  stockLeft: 241,
  stockSold: 342,
  quantity: 1,
  tex: 4,
  color: 'dark',
  itemStatus: 'Draft',
  discount: '20',
  code: 'FASHION123',
  endDate: addOrSubtractDaysFromDate(70),
  productStatus: 'Expired',
  sellPrice: 130
}, {
  id: '6',
  image: product6,
  title: 'Orange Headphone',
  price: 231,
  rating: {
    star: 4.2,
    review: 200
  },
  category: 'Electronics',
  gender: 'men',
  date: addOrSubtractDaysFromDate(8),
  size: 's',
  stockLeft: 821,
  stockSold: 231,
  quantity: 5,
  tex: 5,
  color: 'dark',
  itemStatus: 'Published',
  discount: '35%',
  code: 'HEADPHONE24',
  endDate: addOrSubtractDaysFromDate(80),
  productStatus: 'Expired',
  sellPrice: 231
}, {
  id: '7',
  image: product7,
  title: "Kid's Yellow Shoes",
  price: 89,
  rating: {
    star: 4.5,
    review: 321
  },
  category: 'Shoes',
  gender: 'kids',
  date: addOrSubtractDaysFromDate(9),
  size: 's',
  stockLeft: 321,
  stockSold: 681,
  quantity: 4,
  tex: 2,
  color: 'dark',
  itemStatus: 'Published',
  discount: '19',
  code: "KID'S24",
  endDate: addOrSubtractDaysFromDate(120),
  productStatus: 'Active',
  sellPrice: 100
}, {
  id: '8',
  image: product8,
  title: 'Men Dark Brown Wallet',
  price: 132,
  rating: {
    star: 4.1,
    review: 190
  },
  category: 'Wallet',
  gender: 'men',
  date: addOrSubtractDaysFromDate(7),
  size: 'm',
  stockLeft: 190,
  stockSold: 212,
  quantity: 1,
  tex: 4,
  color: 'dark',
  itemStatus: 'Draft',
  discount: '50%',
  code: 'BRAND24',
  endDate: addOrSubtractDaysFromDate(220),
  productStatus: 'Expired',
  sellPrice: 150
}, {
  id: '9',
  image: product9,
  title: 'Sky Blue Mat Sunglass',
  price: 77,
  rating: {
    star: 3.5,
    review: 298
  },
  category: 'Sunglass',
  gender: 'men',
  date: addOrSubtractDaysFromDate(2),
  size: 'm',
  stockLeft: 784,
  stockSold: 443,
  quantity: 6,
  tex: 3,
  color: 'dark',
  itemStatus: 'Published',
  discount: '23',
  code: 'EYEWARE24',
  endDate: addOrSubtractDaysFromDate(150),
  productStatus: 'Active',
  sellPrice: 100
}, {
  id: '10',
  image: product10,
  title: "Kid's Yellow T-shirt",
  price: 110,
  rating: {
    star: 4.1,
    review: 156
  },
  category: 'Fashion',
  gender: 'kids',
  date: addOrSubtractDaysFromDate(20),
  size: 's',
  stockLeft: 650,
  stockSold: 365,
  quantity: 3,
  tex: 5,
  color: 'dark',
  itemStatus: 'Draft',
  discount: '35',
  code: "KID'S24",
  endDate: addOrSubtractDaysFromDate(170),
  productStatus: 'Active',
  sellPrice: 140
}, {
  id: '11',
  image: product11,
  title: 'White Rubber Smart Watch',
  price: 77,
  rating: {
    star: 3.4,
    review: 201
  },
  category: 'Electronics',
  gender: 'men',
  date: addOrSubtractDaysFromDate(21),
  size: 'm',
  stockLeft: 98,
  stockSold: 241,
  quantity: 1,
  tex: 3,
  color: 'dark',
  itemStatus: 'Pending',
  discount: '14',
  code: 'WATCH2W1',
  endDate: addOrSubtractDaysFromDate(10),
  productStatus: 'Expired',
  sellPrice: 110
}, {
  id: '12',
  image: product12,
  title: 'Men Brown Leather Shoes',
  price: 222,
  rating: {
    star: 4.1,
    review: 370
  },
  category: 'Shoes',
  gender: 'men',
  date: addOrSubtractDaysFromDate(18),
  size: 'm',
  stockLeft: 176,
  stockSold: 658,
  quantity: 2,
  tex: 4,
  color: 'dark',
  itemStatus: 'Pending',
  discount: '40%',
  code: 'FOOTWARE23',
  endDate: addOrSubtractDaysFromDate(320),
  productStatus: 'Active',
  sellPrice: 250
}];
export const userData = [{
  id: '101',
  name: 'Anna M. Hines',
  email: 'anna.hines@mail.com',
  phone: '(+1)-555-1564-261',
  address: 'Burr Ridge/ Illinois',
  image: avatar1,
  compony: 'Kaika Hill, CEO',
  position: 'Hill & CO',
  message: 'How are you today?',
  time: addOrSubtractMinutesFromDate(10),
  location: 'California, USA',
  languages: ['English', 'German', 'Spanish'],
  activityStatus: 'online',
  mutualCount: 0
}, {
  id: '102',
  name: 'Judith H. Fritsche',
  email: 'judith.fritsche.com',
  phone: '(+57)-305-5579-759',
  address: 'SULLIVAN/Kentucky',
  image: avatar2,
  compony: 'Millenia Life,',
  position: 'General internist',
  message: "Hey! a reminder for tommorow's meeting...",
  time: addOrSubtractMinutesFromDate(20),
  status: '** no status **',
  location: 'New Jersey, USA',
  languages: ['English', 'German', 'Spanish'],
  activityStatus: 'offline',
  mutualCount: 856
}, {
  id: '103',
  name: 'Peter T. Smith',
  email: 'peter.smith@mail.com',
  phone: '(+33)-655-5187-93',
  address: 'Yreka/California',
  image: avatar3,
  compony: 'Omni Tech Solutions ',
  position: 'Founder',
  message: "Hello! I just got your assignment, everything's alright, exce",
  time: addOrSubtractMinutesFromDate(50),
  activityStatus: 'typing',
  status: '|| Karma ||',
  location: 'California, USA',
  languages: ['English', 'German', 'Spanish'],
  mutualCount: 52
}, {
  id: '104',
  name: 'Emmanuel J. Delcid',
  email: 'emmanuel.delicid@mail.com',
  phone: '(+30)-693-5553-637',
  address: 'Atlanta/Georgia',
  image: avatar4,
  compony: 'Grade A Investment',
  position: 'Manager',
  message: "Are we going to have this week's planning meeting today?",
  time: addOrSubtractMinutesFromDate(100),
  status: 'Hey there! I am using Chat.',
  location: 'New York, USA',
  languages: ['English', 'German', 'Spanish'],
  activityStatus: 'offline',
  mutualCount: 12
}, {
  id: '105',
  name: '	William J. Cook',
  email: 'william.cook@mail.com',
  phone: '(+91)-855-5446-150',
  address: 'Rosenberg/Texas',
  image: avatar5,
  compony: 'Metro',
  position: 'Counseling',
  message: 'Please check this template...',
  time: addOrSubtractMinutesFromDate(150),
  status: 'TM',
  location: 'California, USA',
  languages: ['English', 'German', 'Spanish'],
  activityStatus: 'offline',
  mutualCount: 0
}, {
  id: '106',
  name: '	Emily Davis',
  email: 'anna.hines@mail.com',
  phone: '(+1)-555-1564-261',
  address: 'Burr Ridge/ Illinois',
  image: avatar6,
  compony: 'Atlas Realty',
  position: 'Media specialist',
  message: 'Are free for 10 minutes? would like to discuss something...',
  time: addOrSubtractMinutesFromDate(200),
  status: 'Available',
  location: 'California, USA',
  languages: ['English', 'German', 'Spanish'],
  activityStatus: 'online',
  mutualCount: 0
}, {
  id: '107',
  name: 'Michael Brown',
  email: 'judith.fritsche.com',
  phone: '+1 (555) 567-8901',
  address: 'SULLIVAN/Kentucky',
  image: avatar7,
  compony: 'Red Bears Tavern',
  position: 'Director',
  message: 'How are you?',
  time: addOrSubtractMinutesFromDate(250),
  status: 'Hey there! I am using Chat.',
  location: 'California, USA',
  languages: ['English', 'German', 'Spanish'],
  activityStatus: 'online',
  mutualCount: 856
}, {
  id: '108',
  name: 'Jessica White',
  email: 'Jessica.White@mail.com',
  phone: '+1 (555) 890-1234',
  address: 'Yreka/California',
  image: avatar8,
  compony: 'Platinum Interior',
  position: 'Manager',
  message: 'Whats going on?',
  time: addOrSubtractMinutesFromDate(350),
  location: 'California, USA',
  languages: ['English', 'German', 'Spanish'],
  activityStatus: 'offline',
  mutualCount: 52
}, {
  id: '109',
  name: 'Christopher Black',
  email: 'emmanuel.delicid@mail.com',
  phone: '+1 (555) 901-2345',
  address: 'Atlanta/Georgia',
  image: avatar9,
  compony: 'Kaika Hill, CEO',
  position: ' Hill & CO',
  message: 'Would you like to join us?',
  time: addOrSubtractMinutesFromDate(450),
  location: 'California, USA',
  languages: ['English', 'German', 'Spanish'],
  activityStatus: 'offline',
  mutualCount: 12
}, {
  id: '110',
  name: 'Patricia Clark',
  email: 'william.cook@mail.com',
  phone: '+1 (555) 012-3456',
  address: 'Rosenberg/Texas',
  image: avatar10,
  compony: 'Kaika Hill, CEO',
  position: ' Hill & CO',
  message: 'Hello! You asked me for some extra excercises to train CO. Here you are, like I promissed.',
  time: addOrSubtractMinutesFromDate(500),
  location: 'California, USA',
  languages: ['English', 'German', 'Spanish'],
  activityStatus: 'typing',
  mutualCount: 0
}, {
  id: '111',
  name: 'Emmanuel J. Delcid',
  email: 'emmanuel.delicid@mail.com',
  phone: '(+30)-693-5553-637',
  address: 'Atlanta/Georgia',
  image: avatar4,
  compony: 'Grade A Investment',
  position: 'Manager',
  message: "Are we going to have this week's planning meeting today?",
  time: addOrSubtractMinutesFromDate(100),
  status: 'Hey there! I am using Chat.',
  location: 'New York, USA',
  languages: ['English', 'German', 'Spanish'],
  activityStatus: 'offline',
  mutualCount: 12
}, {
  id: '112',
  name: '	Emily Davis',
  email: 'anna.hines@mail.com',
  phone: '(+1)-555-1564-261',
  address: 'Burr Ridge/ Illinois',
  image: avatar6,
  compony: 'Atlas Realty',
  position: 'Media specialist',
  message: 'Are free for 10 minutes? would like to discuss something...',
  time: addOrSubtractMinutesFromDate(200),
  status: 'Available',
  location: 'California, USA',
  languages: ['English', 'German', 'Spanish'],
  activityStatus: 'online',
  mutualCount: 0
}];
export const ordersData = [{
  id: '1001',
  productId: '1',
  customerId: '101',
  paymentMethod: 'Credit Card',
  status: 'Completed',
  priority: 'Normal',
  paymentStatus: 'Unpaid',
  orders: 4,
  createBy: 'Seller',
  orderId: 'FS16276',
  productStock: 46233,
  maxPrice: 400,
  orderStatus: 'Draft',
  total: 1230,
  amountDue: 8901
}, {
  id: '1002',
  productId: '2',
  customerId: '102',
  paymentMethod: 'Google Pay',
  status: 'Delivered',
  priority: 'Normal',
  paymentStatus: 'Paid',
  orders: 2,
  createBy: 'Admin',
  orderId: 'HB73029',
  productStock: 2739,
  maxPrice: 500,
  orderStatus: 'Packaging',
  total: 987,
  amountDue: 9902
}, {
  id: '1003',
  productId: '3',
  customerId: '103',
  paymentMethod: 'Pay Pal',
  status: 'Completed',
  priority: 'High',
  paymentStatus: 'Paid',
  orders: 5,
  deliveryNumber: '#D-57837678',
  createBy: 'Admin',
  orderId: 'CH492-9',
  productStock: 1829,
  maxPrice: 200,
  orderStatus: 'Completed',
  total: 1478,
  amountDue: 6718
}, {
  id: '1004',
  productId: '4',
  customerId: '104',
  paymentMethod: 'Pay Pal',
  status: 'Processing',
  priority: 'Normal',
  paymentStatus: 'Refund',
  orders: 4,
  createBy: 'Seller',
  orderId: 'EC23818',
  productStock: 1902,
  maxPrice: 700,
  orderStatus: 'Canceled',
  total: 720,
  amountDue: 3928
}, {
  id: '1005',
  productId: '5',
  customerId: '105',
  paymentMethod: 'Credit Card',
  status: 'Processing',
  priority: 'Normal',
  paymentStatus: 'Paid',
  orders: 6,
  deliveryNumber: '#D-89734235',
  createBy: 'Seller',
  orderId: 'FW11009',
  productStock: 2733,
  maxPrice: 400,
  orderStatus: 'Completed',
  total: 1909,
  amountDue: 9814
}, {
  id: '1006',
  productId: '6',
  customerId: '106',
  paymentMethod: 'Pay Pal',
  status: 'Completed',
  priority: 'High',
  paymentStatus: 'Paid',
  orders: 5,
  deliveryNumber: '#D-57837678',
  createBy: 'Admin',
  orderId: 'CH492-9',
  productStock: 1829,
  maxPrice: 300,
  orderStatus: 'Completed',
  total: 879,
  amountDue: 5891
}, {
  id: '1007',
  productId: '7',
  customerId: '107',
  paymentMethod: 'Credit Card',
  status: 'Delivered',
  priority: 'Normal',
  paymentStatus: 'Paid',
  orders: 6,
  deliveryNumber: '#D-89734235',
  createBy: 'Seller',
  orderId: 'FW11009',
  productStock: 2733,
  maxPrice: 400,
  orderStatus: 'Canceled',
  total: 1230,
  amountDue: 8415
}, {
  id: '1008',
  productId: '8',
  customerId: '108',
  paymentMethod: 'Pay Pal',
  status: 'Completed',
  priority: 'Normal',
  paymentStatus: 'Unpaid',
  orders: 4,
  createBy: 'Seller',
  orderId: 'FS16276',
  productStock: 46233,
  maxPrice: 500,
  orderStatus: 'Completed',
  total: 1264,
  amountDue: 7715
}, {
  id: '1009',
  productId: '9',
  customerId: '109',
  paymentMethod: 'Pay Pal',
  status: 'Processing',
  priority: 'Normal',
  paymentStatus: 'Paid',
  orders: 6,
  deliveryNumber: '#D-89734235',
  createBy: 'Seller',
  orderId: 'FW11009',
  productStock: 2833,
  maxPrice: 400,
  orderStatus: 'Packaging',
  total: 1787,
  amountDue: 3651
}, {
  id: '1010',
  productId: '10',
  customerId: '110',
  paymentMethod: 'Credit Card',
  status: 'Delivered',
  priority: 'Normal',
  paymentStatus: 'Paid',
  orders: 5,
  createBy: 'Admin',
  orderId: 'HB73029',
  productStock: 1739,
  maxPrice: 600,
  orderStatus: 'Completed',
  total: 2136,
  amountDue: 4520
}];
export const warehouseData = [{
  id: '201',
  userId: '101',
  warehouseName: 'Central Fulfillment',
  location: '123 Commerce St, NY',
  stock: 6490,
  stockShipping: 3022,
  warehouseRevenue: 25737
}, {
  id: '202',
  userId: '102',
  warehouseName: 'Central Fulfillment',
  location: '123 Commerce St, NY',
  stock: 6490,
  stockShipping: 3022,
  warehouseRevenue: 25737
}, {
  id: '203',
  userId: '103',
  warehouseName: 'Central Fulfillment',
  location: '123 Commerce St, NY',
  stock: 6490,
  stockShipping: 3022,
  warehouseRevenue: 25737
}, {
  id: '204',
  userId: '104',
  warehouseName: 'Central Fulfillment',
  location: '123 Commerce St, NY',
  stock: 6490,
  stockShipping: 3022,
  warehouseRevenue: 25737
}, {
  id: '205',
  userId: '105',
  warehouseName: 'Central Fulfillment',
  location: '123 Commerce St, NY',
  stock: 6490,
  stockShipping: 3022,
  warehouseRevenue: 25737
}, {
  id: '206',
  userId: '106',
  warehouseName: 'Central Fulfillment',
  location: '123 Commerce St, NY',
  stock: 6490,
  stockShipping: 3022,
  warehouseRevenue: 25737
}, {
  id: '207',
  userId: '107',
  warehouseName: 'Central Fulfillment',
  location: '123 Commerce St, NY',
  stock: 6490,
  stockShipping: 3022,
  warehouseRevenue: 25737
}, {
  id: '208',
  userId: '108',
  warehouseName: 'Central Fulfillment',
  location: '123 Commerce St, NY',
  stock: 6490,
  stockShipping: 3022,
  warehouseRevenue: 25737
}, {
  id: '209',
  userId: '109',
  warehouseName: 'Central Fulfillment',
  location: '123 Commerce St, NY',
  stock: 6490,
  stockShipping: 3022,
  warehouseRevenue: 25737
}, {
  id: '210',
  userId: '110',
  warehouseName: 'Central Fulfillment',
  location: '123 Commerce St, NY',
  stock: 6490,
  stockShipping: 3022,
  warehouseRevenue: 25737
}];
export const attributeListData = [{
  id: '301',
  variant: 'Brand',
  Value: 'Dyson , H&M, Nike , GoPro , Huawei , Rolex , Zara , Thenorthface',
  option: 'Dropdown',
  date: addOrSubtractDaysFromDate(1)
}, {
  id: '302',
  variant: 'Color',
  Value: 'Black , Blue , Green , Yellow , White',
  option: 'Dropdown',
  date: addOrSubtractDaysFromDate(20)
}, {
  id: '303',
  variant: 'Size',
  Value: 'XS , S , M , XL , XXL , 3XL',
  option: 'Radio',
  date: addOrSubtractDaysFromDate(100)
}, {
  id: '304',
  variant: 'Weight',
  Value: '500gm , 1kg , 2kg , 3kg , up to 4kg',
  option: 'Radio',
  date: addOrSubtractDaysFromDate(150)
}, {
  id: '305',
  variant: 'Packaging',
  Value: 'Paper Box , Plastic Box , Heard Box , Tin',
  option: 'Dropdown',
  date: addOrSubtractDaysFromDate(200)
}, {
  id: '306',
  variant: 'Material',
  Value: 'Cotton , Polyester , Leather , Chiffon , Denim , Linen , Satin',
  option: 'Dropdown',
  date: addOrSubtractDaysFromDate(300),
  defaultCheck: true
}, {
  id: '307',
  variant: 'Memory',
  Value: '64 , 128 , 250 , 512 , 1TB',
  option: 'Radio',
  date: addOrSubtractDaysFromDate(145),
  defaultCheck: true
}, {
  id: '308',
  variant: 'Shoes Size',
  Value: '18 to 22 , 38 to 44',
  option: 'Radio',
  date: addOrSubtractDaysFromDate(145)
}, {
  id: '309',
  variant: 'Style',
  Value: '18 to 22 , 38 to 44',
  option: 'Dropdown',
  date: addOrSubtractDaysFromDate(545),
  defaultCheck: true
}];
export const roleListData = [{
  role: 'Workspace Manager',
  icon: facebook,
  status: true,
  tags: ['Manager', 'Product'],
  users: [{
    image: [avatar4, avatar3, avatar6],
    TextAvatar: [{
      text: 'p',
      variant: 'danger'
    }]
  }],
  workspace: 'Facebook'
}, {
  role: 'Product Owner',
  icon: slack,
  tags: ['Manager', 'Product', 'Data'],
  users: [{
    image: [avatar6, avatar7],
    TextAvatar: [{
      text: '+12',
      variant: 'info'
    }]
  }],
  workspace: 'Slack'
}, {
  role: 'Product Designer',
  icon: zoom,
  status: true,
  tags: ['Designer', 'Data'],
  users: [{
    image: [avatar10]
  }],
  workspace: 'Zoom'
}, {
  role: 'Data Analyst',
  icon: analytics,
  tags: ['Data'],
  users: [{
    image: [avatar10, avatar11, avatar12]
  }],
  workspace: 'Analytics'
}, {
  role: 'Tech Lead',
  tags: ['Product', 'Data', 'Supporter'],
  workspace: 'Add Workspace'
}, {
  role: 'Product Manager',
  icon: meet,
  status: true,
  tags: ['System Design'],
  users: [{
    TextAvatar: [{
      text: 'A',
      variant: 'primary'
    }, {
      text: 'J',
      variant: 'info'
    }, {
      text: 'K',
      variant: 'warning'
    }, {
      text: '+17',
      variant: 'dark'
    }]
  }],
  workspace: 'Meet'
}, {
  role: 'Chief Product Owner',
  icon: mail,
  status: true,
  tags: ['Manager', 'Product'],
  users: [{
    image: [avatar2, avatar12]
  }],
  workspace: 'Mail'
}, {
  role: 'Support Team Head',
  icon: stripe,
  tags: ['QA'],
  users: [{
    TextAvatar: [{
      text: 'K',
      variant: 'warning'
    }]
  }],
  workspace: 'Strip'
}];
export const permissionsList = [{
  name: 'User Management',
  assignedTo: ['Manager'],
  date: addOrSubtractDaysFromDate(1),
  lastUpdate: 'Today'
}, {
  name: 'Financial Management',
  assignedTo: ['Administrator', 'Developer'],
  date: addOrSubtractDaysFromDate(10),
  lastUpdate: 'Yesterday'
}, {
  name: 'Content Management',
  assignedTo: ['Manager', 'Administrator'],
  date: addOrSubtractDaysFromDate(100),
  lastUpdate: '06 Dec 2023'
}, {
  name: 'Payroll',
  assignedTo: ['Manager', 'Administrator', 'Analyst', 'Trial'],
  date: addOrSubtractDaysFromDate(250),
  lastUpdate: '14 May 2024'
}, {
  name: 'Reporting',
  assignedTo: ['Manager', 'Trial', 'Developer'],
  date: addOrSubtractDaysFromDate(150),
  lastUpdate: 'Today'
}, {
  name: 'API Controls',
  assignedTo: ['Manager', 'Analyst'],
  date: addOrSubtractDaysFromDate(70),
  lastUpdate: '10 Oct 2023'
}, {
  name: 'Disputes Management',
  assignedTo: ['Manager', 'Developer'],
  date: addOrSubtractDaysFromDate(120),
  lastUpdate: 'Yesterday'
}, {
  name: 'Database Management',
  assignedTo: ['Manager', 'Administrator', 'Developer'],
  date: addOrSubtractDaysFromDate(60),
  lastUpdate: 'Yesterday'
}, {
  name: 'Repository Management',
  assignedTo: ['Administrator', 'Developer'],
  date: addOrSubtractDaysFromDate(78),
  lastUpdate: '03 Dec 2023'
}];
export const sellersData = [{
  image: zara,
  title: 'ZARA International',
  category: 'Fashion',
  rating: {
    star: 4.5,
    review: 3.5
  },
  url: 'www.zarafashion.co',
  address: '4604 , Philli Lane Kiowa IN 47404',
  email: 'zarafashionworld@dayrep.com',
  phone: '+243 812-801-9335',
  amount: 200,
  progress: 80,
  itemStock: 865,
  sells: 4.5,
  clients: 2
}, {
  image: rolex,
  title: 'Rolex Watches',
  category: 'Watch',
  rating: {
    star: 4.5,
    review: 1.2
  },
  url: 'www.rolexwatch.co',
  address: '1678 Avenue Milwaukee, WI 53202',
  email: 'rolexwatches@dayrep.com',
  phone: '+243 262-223-1464',
  amount: 349,
  progress: 60,
  itemStock: 261,
  sells: 2.9,
  clients: 1.4
}, {
  image: dyson,
  title: 'Dyson Machinery',
  category: 'phone',
  rating: {
    star: 4.1,
    review: 3.7
  },
  url: 'www.dysonmachine.co',
  address: '23 Cubbine Road GHOOLI WA 6426',
  email: 'dysonmachine@dayrep.com',
  phone: '+81(08) 9059 8047',
  amount: 545,
  progress: 90,
  itemStock: 781,
  sells: 5.3,
  clients: 3.1
}, {
  image: gopro,
  title: 'GoPro Camera',
  category: 'Camera',
  rating: {
    star: 4.3,
    review: 7.2
  },
  url: 'www.goprocamera.co',
  address: '5 Gaffney Street MIDDLE PARK VIC 3206',
  email: 'goprocamera@dayrep.com',
  phone: '+81(08) 6727 4227',
  amount: 465,
  progress: 40,
  itemStock: 890,
  sells: 10.6,
  clients: 6.3
}, {
  image: sellerHm,
  title: 'H&M',
  category: 'Fashion',
  rating: {
    star: 4.3,
    review: 15.3
  },
  url: 'www.h&mfashion.co',
  address: '1697 Bay Street Toronto, ON M5J 2R8',
  email: 'h&mfashion@dayrep.com',
  phone: '+81(07) 4049 2261',
  amount: 800,
  progress: 90,
  itemStock: 1309,
  sells: 21.6,
  clients: 8.1
}, {
  image: huawei,
  title: 'Huawei Phone',
  category: 'Phone',
  rating: {
    star: 4.1,
    review: 8.2
  },
  url: 'www.huaweiphone.co',
  address: '2182 Blanshard Victoria, BC V8W 2H9',
  email: 'huaweiphone@dayrep.com',
  phone: '+81(07) 250-356-8142',
  amount: 379,
  progress: 40,
  itemStock: 356,
  sells: 4.0,
  clients: 6.3
}, {
  image: nike,
  title: 'Nike Clothings',
  category: 'Clothings',
  rating: {
    star: 4.5,
    review: 18.9
  },
  url: 'www.nikebrand.co',
  address: '2113 Eglinton Avenue Toronto 1A6',
  email: 'nikefashion@dayrep.com',
  phone: '+81(07) 647-405-3676',
  amount: 890,
  progress: 70,
  itemStock: 12000,
  sells: 19.0,
  clients: 16.0
}, {
  image: thenorthface,
  title: 'The North Fac',
  category: 'Clothings',
  rating: {
    star: 4.4,
    review: 12.7
  },
  url: 'www.northface.co',
  address: '1377 49th Avenue Clyde River,0E0',
  email: 'thenorthface@dayrep.com',
  phone: '+81(07) 867-924-6639',
  amount: 457,
  progress: 30,
  itemStock: 1600,
  sells: 13.9,
  clients: 2.1
}];
export const reviewListData = [{
  id: '401',
  userId: '101',
  title: 'Reviewed in U.S.A on 21 December 2023',
  description: '"I recently purchased a t-shirt that I was quite excited about, and I must say, there are several aspects that I really appreciate about it. Firstly, the material is absolutely wonderful."',
  rating: 4.5
}, {
  id: '402',
  userId: '102',
  title: 'Reviewed in Canada on 16 March 2023',
  description: '"I purchased a pair of jeans Firstly, the fabric is fantastic—its both durable and comfortable. The denim is soft yet sturdy, making it perfect for everyday wear."',
  rating: 4.5
}, {
  id: '403',
  userId: '103',
  title: 'Reviewed in Germany on 23 October 2023',
  description: '"The fit is perfect, hugging in all the right places while allowing for ease of movement. Overall, this dress exceeded my expectations and has quickly become a favorite in my wardrobe."',
  rating: 4
}, {
  id: '404',
  userId: '104',
  title: 'Reviewed in Germany on 23 October 2023',
  description: '"The fit is perfect, hugging in all the right places while allowing for ease of movement. Overall, this dress exceeded my expectations and has quickly become a favorite in my wardrobe."',
  rating: 4.5
}, {
  id: '405',
  userId: '105',
  title: 'Reviewed in Canada on 29 May 2023',
  description: '"Additionally, the fit is perfect, providing great support and comfort for all-day wear. These boots have quickly become a staple in my wardrobe, and I couldnt be happier with my purchase."',
  rating: 4
}, {
  id: '406',
  userId: '106',
  title: 'Reviewed in U.S.A on 18 August 2023',
  description: '"The color is rich and vibrant, making it a standout piece in my wardrobe. Overall, this sweater has exceeded my expectations and has quickly become one of my favorite pieces to wear."',
  rating: 4.5
}, {
  id: '407',
  userId: '107',
  title: 'Reviewed in Iceland on 12 May 2023',
  description: '"I ordered my usual size, but the shoes are either too small or too big, making them uncomfortable to wear. I would not recommend them to others not buy product, I couldnt be happier with my purchase"',
  rating: 2
}, {
  id: '408',
  userId: '108',
  title: 'Reviewed in Arabic on 18 September 2023',
  description: '"irstly, the quality of the fabric is exceptional. Its soft, luxurious, and drapes beautifully, giving the dress an elegant and sophisticated look. The design is simply stunning I couldnt be happier with my purchase."',
  rating: 3
}];
export const socialGroupsData = [{
  id: '501',
  image: avatar1,
  name: 'Interior Design & Architech',
  description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
  membersCount: 23345,
  friends: true
}, {
  id: '502',
  image: avatar2,
  name: 'Event Management',
  description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
  membersCount: 26312,
  joined: true
}, {
  id: '503',
  image: avatar3,
  name: 'Commercial University, Delhi.',
  description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
  membersCount: 39678,
  friends: true
}, {
  id: '504',
  image: avatar4,
  name: 'Tourist Place of Potland',
  description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
  membersCount: 2345,
  friends: true
}, {
  id: '505',
  image: avatar5,
  name: 'Promote Your Business',
  description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
  membersCount: 7980,
  suggested: true
}, {
  id: '506',
  image: avatar6,
  name: 'The Greasy Mullets',
  description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
  membersCount: 98231,
  suggested: true
}, {
  id: '507',
  image: avatar7,
  name: 'Tourist Place of Portland',
  description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
  membersCount: 2015,
  joined: true
}, {
  id: '508',
  image: avatar8,
  name: 'UI / UX Design',
  description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
  membersCount: 1450,
  joined: true
}, {
  id: '509',
  image: avatar9,
  name: 'Music Circle',
  description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
  membersCount: 9387,
  friends: true
}, {
  id: '510',
  image: avatar1,
  name: 'Travelling The World',
  description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
  membersCount: 25800020,
  joined: true
}];
export const messages = [];
const defaultTo = {
  id: '112',
  mutualCount: 56,
  name: 'Gilbert Chicoine',
  image: avatar10,
  email: 'jamesbridge@teleworm.us',
  message: 'Hey! Okay, thank you for letting me know. See you!',
  time: addOrSubtractMinutesFromDate(650),
  phone: '456 9595 9594',
  location: 'California, USA',
  languages: ['English', 'German', 'Spanish'],
  activityStatus: 'online',
  compony: 'Kaika Hill, CEO',
  position: 'Hill & CO',
  address: 'Burr Ridge/ Illinois'
};
for (const user of userData) {
  messages.push({
    id: '101',
    to: defaultTo,
    from: user,
    message: {
      type: 'text',
      value: 'Hey 😊'
    },
    sentOn: addOrSubtractMinutesFromDate(110)
  }, {
    id: '102',
    to: user,
    from: defaultTo,
    message: {
      type: 'text',
      value: 'Hii'
    },
    sentOn: addOrSubtractMinutesFromDate(110)
  }, {
    id: '103',
    to: defaultTo,
    from: user,
    message: {
      type: 'text',
      value: "Hi Gaston, thanks for joining the meeting. Let's dive into our quarterly performance review."
    },
    sentOn: addOrSubtractMinutesFromDate(110)
  }, {
    id: '104',
    to: user,
    from: defaultTo,
    message: {
      type: 'text',
      value: "Hi Gilbert, thanks for having me. I'm ready to discuss how things have been going."
    },
    sentOn: addOrSubtractMinutesFromDate(110)
  }, {
    id: '105',
    to: defaultTo,
    from: user,
    message: {
      type: 'file',
      value: [{
        preview: small1
      }, {
        preview: small2
      }, {
        preview: small3
      }]
    },
    sentOn: addOrSubtractMinutesFromDate(110)
  }, {
    id: '106',
    to: user,
    from: defaultTo,
    message: {
      type: 'file',
      value: [{
        name: 'financial-report-2024.zip',
        size: 2.3
      }]
    },
    sentOn: addOrSubtractMinutesFromDate(20)
  }, {
    id: '107',
    to: defaultTo,
    from: user,
    message: {
      type: 'text',
      value: "Thanks, Emily. I appreciate your support. Overall, I'm optimistic about our team's performance and looking forward to tackling new challenges in the next quarter."
    },
    sentOn: addOrSubtractMinutesFromDate(10)
  });
}

export const priceType = [
  {
    label: "Percentage Discount",
    value: "percentage discount",
  },
  {
    label: "Fixed Amount",
    value: "fixed amount",
  },
  {
    label: "Fixed Price",
    value: "fixed price",
  }
]
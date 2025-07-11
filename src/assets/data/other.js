import avatar1 from '@/assets/images/users/avatar-1.jpg';
import avatar2 from '@/assets/images/users/avatar-2.jpg';
import avatar3 from '@/assets/images/users/avatar-3.jpg';
import avatar4 from '@/assets/images/users/avatar-4.jpg';
import avatar5 from '@/assets/images/users/avatar-5.jpg';
import avatar6 from '@/assets/images/users/avatar-6.jpg';
import avatar7 from '@/assets/images/users/avatar-7.jpg';
import { addOrSubtractDaysFromDate } from '@/utils/date';
export const projectsData = [{
  id: '1',
  projectName: 'Zelogy',
  client: 'Daniel Olsen',
  teamMembers: [avatar2, avatar3, avatar4],
  deadlineDate: addOrSubtractDaysFromDate(1),
  progressValue: 33,
  variant: 'primary'
}, {
  id: '2',
  projectName: 'Shiaz',
  client: 'Jack Roldan',
  teamMembers: [avatar1, avatar5],
  deadlineDate: addOrSubtractDaysFromDate(120),
  progressValue: 74,
  variant: 'success'
}, {
  id: '3',
  projectName: 'Holderick',
  client: 'Betty Cox',
  teamMembers: [avatar5, avatar2, avatar3],
  deadlineDate: addOrSubtractDaysFromDate(220),
  progressValue: 50,
  variant: 'warning'
}, {
  id: '4',
  projectName: 'Feyvux',
  client: 'Carlos Johnson',
  teamMembers: [avatar3, avatar7, avatar6],
  deadlineDate: addOrSubtractDaysFromDate(150),
  progressValue: 92,
  variant: 'primary'
}, {
  id: '5',
  projectName: 'Xavlox',
  client: 'Lorraine Cox',
  teamMembers: [avatar7],
  deadlineDate: addOrSubtractDaysFromDate(75),
  progressValue: 48,
  variant: 'danger'
}, {
  id: '6',
  projectName: 'Mozacav',
  client: 'Delores Young',
  teamMembers: [avatar3, avatar4, avatar2],
  deadlineDate: addOrSubtractDaysFromDate(50),
  progressValue: 21,
  variant: 'primary'
}];
export const transactionsData = [{
  id: '10101',
  date: addOrSubtractDaysFromDate(1),
  amount: 120.55,
  description: 'Commissions',
  status: 'Cr.'
}, {
  id: '10102',
  date: addOrSubtractDaysFromDate(70),
  amount: 9.68,
  description: 'Affiliates',
  status: 'Cr.'
}, {
  id: '10103',
  date: addOrSubtractDaysFromDate(150),
  amount: 105.22,
  description: 'Grocery',
  status: 'Dr.'
}, {
  id: '10104',
  date: addOrSubtractDaysFromDate(5),
  amount: 80.59,
  description: 'Refunds',
  status: 'Cr.'
}, {
  id: '10105',
  date: addOrSubtractDaysFromDate(200),
  amount: 750.95,
  description: 'Bill Payments',
  status: 'Dr.'
}, {
  id: '10106',
  date: addOrSubtractDaysFromDate(250),
  amount: 455.62,
  description: 'Electricity',
  status: 'Dr.'
}, {
  id: '10107',
  date: addOrSubtractDaysFromDate(100),
  amount: 102.77,
  description: 'Interest',
  status: 'Cr.'
}, {
  id: '10108',
  date: addOrSubtractDaysFromDate(450),
  amount: 79.49,
  description: 'Refunds',
  status: 'Cr.'
}, {
  id: '10109',
  date: addOrSubtractDaysFromDate(55),
  amount: 980.0,
  description: 'Shopping',
  status: 'Dr.'
}];
export const dataTableRecords = [{
  id: '11',
  name: 'Jonathan',
  email: 'jonathan@example.com',
  position: 'Senior Implementation Architect',
  company: 'Hauck Inc',
  country: 'Holy See'
}, {
  id: '12',
  name: 'Harold',
  email: 'harold@example.com',
  position: 'Forward Creative Coordinator',
  company: 'Metz Inc',
  country: 'Iran'
}, {
  id: '13',
  name: 'Shannon',
  email: 'shannon@example.com',
  position: 'Legacy Functionality Associate',
  company: 'Zemlak Group',
  country: 'South Georgia'
}, {
  id: '14',
  name: 'Robert',
  email: 'robert@example.com',
  position: 'Product Accounts Technician',
  company: 'Hoeger',
  country: 'San Marino'
}, {
  id: '15',
  name: 'Noel',
  email: 'noel@example.com',
  position: 'Customer Data Director',
  company: 'Howell - Rippin',
  country: 'Germany'
}, {
  id: '16',
  name: 'Traci',
  email: 'traci@example.com',
  position: 'Corporate Identity Director',
  company: 'Koelpin - Goldner',
  country: 'Vanuatu'
}, {
  id: '17',
  name: 'Kerry',
  email: 'kerry@example.com',
  position: 'Lead Applications Associate',
  company: 'Feeney, Langworth and Tremblay',
  country: 'Niger'
}, {
  id: '18',
  name: 'Patsy',
  email: 'patsy@example.com',
  position: 'Dynamic Assurance Director',
  company: 'Streich Group',
  country: 'Niue'
}, {
  id: '19',
  name: 'Cathy',
  email: 'cathy@example.com',
  position: 'Customer Data Director',
  company: 'Ebert, Schamberger and Johnston',
  country: 'Mexico'
}, {
  id: '20',
  name: 'Tyrone',
  email: 'tyrone@example.com',
  position: 'Senior Response Liaison',
  company: 'Raynor, Rolfson and Daugherty',
  country: 'Qatar'
}];
export const emailsData = [{
  id: '2001',
  fromId: '102',
  toId: '101',
  subject: 'Lucas Kriebel (@Daniel J. Olsen) has sent you a direct message on Twitter!',
  content: '@Daniel J. Olsen - Very cool :) Nicklas, You have a new direct message.',
  label: 'Primary',
  createdAt: new Date('11:49 am'),
  read: false,
  starred: false,
  important: true,
  deleted: false
}, {
  id: '2002',
  fromId: '103',
  toId: '101',
  subject: 'Images',
  label: 'Primary',
  attachments: [
    // { preview: postImg1, name: 'Img_201.jpg' },
    // { preview: postImg2, name: 'Img_202.jpg' },
    // { preview: postImg3, name: 'Img_203.jpg' },
    // { preview: postImg4, name: 'Img_204.jpg' },
    // { preview: postImg6, name: 'Img_206.jpg' },
    // { preview: postImg7, name: 'Img_207.jpg' },
  ],
  createdAt: new Date('Feb 21'),
  read: true,
  starred: true,
  important: true,
  deleted: false
}, {
  id: '2003',
  fromId: '104',
  toId: '101',
  subject: 'Train/Bus',
  content: "Yes ok, great! I'm not stuck in Stockholm anymore, we're making progress.",
  label: 'Primary',
  createdAt: new Date('Feb 19'),
  read: true,
  starred: false,
  important: false,
  deleted: false
}, {
  id: '2004',
  fromId: '105',
  toId: '101',
  subject: "This Week's Top Stories",
  content: "Our top pick for you on Medium this week The Man Who Destroyed America's Ego",
  label: 'Primary',
  createdAt: new Date('Feb 28'),
  read: false,
  starred: false,
  important: false,
  deleted: false
}, {
  id: '2005',
  fromId: '106',
  toId: '101',
  label: 'Primary',
  attachments: [{
    name: 'Dashboard.pdf'
  }, {
    name: 'pages-data.pdf'
  }],
  createdAt: new Date('Feb 28'),
  read: true,
  starred: true,
  important: false,
  deleted: false
}, {
  id: '2006',
  fromId: '107',
  toId: '101',
  label: 'Primary',
  attachments: [{
    name: 'doc1.doc'
  }, {
    name: 'doc2.doc'
  }, {
    name: 'doc3.doc'
  }, {
    name: 'doc4.doc'
  }],
  createdAt: new Date('Feb 27'),
  read: true,
  starred: false,
  important: true,
  deleted: false
}, {
  id: '2007',
  fromId: '108',
  toId: '101',
  subject: 'Regarding our meeting',
  content: "That's great, see you on Thursday!",
  label: 'Primary',
  createdAt: new Date('Feb 24'),
  read: false,
  starred: true,
  important: false,
  deleted: false
}, {
  id: '2008',
  fromId: '109',
  toId: '101',
  subject: "Task assigned: Clone ARP's website",
  content: 'You have been assigned a task by Alex@Work on the board Web.',
  label: 'Primary',
  createdAt: new Date('Feb 24'),
  read: false,
  starred: true,
  important: false,
  deleted: false
}, {
  id: '2009',
  fromId: '110',
  toId: '101',
  subject: "Let's go fishing!",
  content: "Hey, You wanna join me and Fred at the lake tomorrow? It'll be awesome.",
  label: 'Primary',
  createdAt: new Date('Feb 23'),
  read: true,
  starred: false,
  important: true,
  deleted: false
}, {
  id: '2010',
  fromId: '111',
  toId: '101',
  subject: 'Hey man',
  content: "Nah man sorry i don't. Should i get it?",
  label: 'Primary',
  createdAt: new Date('Feb 23'),
  read: true,
  starred: true,
  important: true,
  deleted: false
}, {
  id: '2011',
  fromId: '112',
  toId: '101',
  subject: '1 new items in your Stackexchange inbox',
  content: 'The following items were added to your Stack Exchange global inbox since you last checked it.',
  label: 'Primary',
  createdAt: new Date('Feb 21'),
  read: true,
  starred: true,
  important: false,
  deleted: false
}, {
  id: '2012',
  fromId: '102',
  toId: '101',
  subject: 'You can now use your storage in Google Drive',
  content: 'Hey Nicklas Sandell! Thank you for purchasing extra storage space in Google Drive.',
  label: 'Primary',
  createdAt: new Date('Feb 20'),
  read: true,
  starred: true,
  important: false,
  deleted: false
}, {
  id: '2013',
  fromId: '102',
  toId: '101',
  subject: 'Lucas Kriebel (@Daniel J. Olsen) has sent you a direct message on Twitter!',
  content: '@Daniel J. Olsen - Very cool :) Nicklas, You have a new direct message.',
  label: 'Social',
  createdAt: new Date('11:49 am'),
  read: false,
  starred: false,
  important: true,
  deleted: false
}, {
  id: '2014',
  fromId: '103',
  toId: '101',
  subject: 'Images',
  label: 'Promotions',
  attachments: [
    // { preview: postImg1, name: 'Img_201.jpg' },
    // { preview: postImg2, name: 'Img_202.jpg' },
    // { preview: postImg3, name: 'Img_203.jpg' },
    // { preview: postImg4, name: 'Img_204.jpg' },
    // { preview: postImg6, name: 'Img_206.jpg' },
    // { preview: postImg7, name: 'Img_207.jpg' },
  ],
  createdAt: new Date('Feb 21'),
  read: false,
  starred: true,
  important: true,
  deleted: false
}, {
  id: '2015',
  fromId: '104',
  toId: '101',
  subject: 'Train/Bus',
  content: "Yes ok, great! I'm not stuck in Stockholm anymore, we're making progress.",
  label: 'Updates',
  createdAt: new Date('Feb 19'),
  read: false,
  starred: false,
  important: false,
  deleted: false
}, {
  id: '2016',
  fromId: '105',
  toId: '101',
  subject: "This Week's Top Stories",
  content: "Our top pick for you on Medium this week The Man Who Destroyed America's Ego",
  label: 'Forums',
  createdAt: new Date('Feb 28'),
  read: false,
  starred: false,
  important: false,
  deleted: false
}, {
  id: '2017',
  fromId: '106',
  toId: '101',
  label: 'Social',
  attachments: [{
    name: 'Dashboard.pdf'
  }, {
    name: 'pages-data.pdf'
  }],
  createdAt: new Date('Feb 28'),
  read: true,
  starred: true,
  important: false,
  deleted: false
}, {
  id: '2018',
  fromId: '107',
  toId: '101',
  label: 'Promotions',
  attachments: [{
    name: 'doc1.doc'
  }, {
    name: 'doc2.doc'
  }, {
    name: 'doc3.doc'
  }, {
    name: 'doc4.doc'
  }],
  createdAt: new Date('Feb 27'),
  read: false,
  starred: false,
  important: true,
  deleted: false
}, {
  id: '2019',
  fromId: '108',
  toId: '101',
  subject: 'Regarding our meeting',
  content: "That's great, see you on Thursday!",
  label: 'Social',
  createdAt: new Date('Feb 24'),
  read: true,
  starred: true,
  important: false,
  deleted: false
}, {
  id: '2020',
  fromId: '109',
  toId: '101',
  subject: "Task assigned: Clone ARP's website",
  content: 'You have been assigned a task by Alex@Work on the board Web.',
  label: 'Updates',
  createdAt: new Date('Feb 24'),
  read: true,
  starred: true,
  important: false,
  deleted: false
}, {
  id: '2021',
  fromId: '110',
  toId: '101',
  subject: "Let's go fishing!",
  content: "Hey, You wanna join me and Fred at the lake tomorrow? It'll be awesome.",
  label: 'Updates',
  createdAt: new Date('Feb 23'),
  read: true,
  starred: false,
  important: true,
  deleted: false
}, {
  id: '2022',
  fromId: '111',
  toId: '101',
  subject: 'Hey man',
  content: "Nah man sorry i don't. Should i get it?",
  label: 'Forums',
  createdAt: new Date('Feb 23'),
  read: false,
  starred: true,
  important: true,
  deleted: false
}, {
  id: '2023',
  fromId: '112',
  toId: '101',
  subject: '1 new items in your Stackexchange inbox',
  content: 'The following items were added to your Stack Exchange global inbox since you last checked it.',
  label: 'Social',
  createdAt: new Date('Feb 21'),
  read: true,
  starred: true,
  important: false,
  deleted: false
}, {
  id: '2024',
  fromId: '102',
  toId: '101',
  subject: 'You can now use your storage in Google Drive',
  content: 'Hey Nicklas Sandell! Thank you for purchasing extra storage space in Google Drive.',
  label: 'Promotions',
  createdAt: new Date('Feb 20'),
  read: true,
  starred: true,
  important: false,
  deleted: false
}, {
  id: '2025',
  fromId: '103',
  toId: '101',
  subject: 'Hello',
  content: 'Trip home from Colombo has been arranged, then Jenna will come get me from Stockholm. :)',
  label: 'Updates',
  createdAt: new Date('Mar 6'),
  read: true,
  starred: false,
  important: true,
  deleted: false
}, {
  id: '2026',
  fromId: '104',
  toId: '101',
  subject: "Since you asked... and i'm inconceivably bored at the train station",
  content: "Alright thanks. I'll have to re-book that somehow, i'll get back to you.",
  label: 'Forums',
  createdAt: new Date('Mar 6'),
  read: true,
  starred: false,
  important: false,
  deleted: false
}, {
  id: '2027',
  fromId: '101',
  toId: '102',
  subject: 'Lucas Kriebel (@Daniel J. Olsen) has sent you a direct message on Twitter!',
  content: '@Daniel J. Olsen - Very cool :) Nicklas, You have a new direct message.',
  label: 'Social',
  createdAt: new Date('11:49 am'),
  read: true,
  starred: false,
  important: true,
  deleted: false
}, {
  id: '2028',
  fromId: '101',
  toId: '103',
  subject: 'Images',
  label: 'Promotions',
  attachments: [
    // { preview: postImg1, name: 'Img_201.jpg' },
    // { preview: postImg2, name: 'Img_202.jpg' },
    // { preview: postImg3, name: 'Img_203.jpg' },
    // { preview: postImg4, name: 'Img_204.jpg' },
    // { preview: postImg6, name: 'Img_206.jpg' },
    // { preview: postImg7, name: 'Img_207.jpg' },
  ],
  createdAt: new Date('Feb 21'),
  read: true,
  starred: true,
  important: true,
  deleted: false
}, {
  id: '2029',
  fromId: '101',
  toId: '104',
  subject: 'Train/Bus',
  content: "Yes ok, great! I'm not stuck in Stockholm anymore, we're making progress.",
  label: 'Updates',
  createdAt: new Date('Feb 19'),
  read: true,
  starred: false,
  important: false,
  deleted: false
}, {
  id: '2030',
  fromId: '101',
  toId: '105',
  subject: "This Week's Top Stories",
  content: "Our top pick for you on Medium this week The Man Who Destroyed America's Ego",
  label: 'Forums',
  createdAt: new Date('Feb 28'),
  read: true,
  starred: false,
  important: false,
  deleted: false
}, {
  id: '2031',
  fromId: '101',
  toId: '106',
  label: 'Social',
  attachments: [{
    name: 'Dashboard.pdf'
  }, {
    name: 'pages-data.pdf'
  }],
  createdAt: new Date('Feb 28'),
  read: true,
  starred: true,
  important: false,
  deleted: false
}, {
  id: '2032',
  fromId: '109',
  toId: '101',
  subject: "Task assigned: Clone ARP's website",
  content: 'You have been assigned a task by Alex@Work on the board Web.',
  label: 'Updates',
  createdAt: new Date('Feb 24'),
  read: true,
  starred: true,
  important: false,
  deleted: true
}, {
  id: '2033',
  fromId: '110',
  toId: '101',
  subject: "Let's go fishing!",
  content: "Hey, You wanna join me and Fred at the lake tomorrow? It'll be awesome.",
  label: 'Updates',
  createdAt: new Date('Feb 23'),
  read: true,
  starred: false,
  important: true,
  deleted: true
}];
export const timelineData = {
  Today: [{
    title: 'Completed UX design project for our client',
    description: 'Dolorum provident rerum aut hic quasi placeat iure tempora laudantium ipsa ad debitis unde?',
    important: true
  }, {
    title: 'Yes! We are celebrating our first admin release.',
    description: 'Consectetur adipisicing elit. Iusto, optio, dolorum John deon provident.'
  }, {
    title: 'We released new version of our theme Rasket.',
    description: '3 new photo Uploaded on facebook fan page'
  }],
  Yesterday: [{
    title: 'We have archieved 25k sales in our themes',
    description: 'Dolorum provident rerum aut hic quasi placeat iure tempora laudantium ipsa ad debitis unde?'
  }, {
    title: 'Yes! We are celebrating our first admin release.',
    description: 'Outdoor visit at California State Route 85 with John Boltana & Harry Piterson.'
  }],
  '5 days ago': [{
    title: 'Join new team member Alex Smith',
    description: 'Alex Smith is a Senior Software (Full Stack) engineer with a deep passion for building usable, functional & pretty web applications.'
  }, {
    title: 'First release of Reback admin dashboard template',
    description: 'Outdoor visit at California State Route 85 with John Boltana & Harry Piterson regarding to setup a new show room.'
  }]
};
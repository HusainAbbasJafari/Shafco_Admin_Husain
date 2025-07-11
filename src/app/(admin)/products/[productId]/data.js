import avatar4 from '@/assets/images/users/avatar-4.jpg';
import avatar6 from '@/assets/images/users/avatar-6.jpg';
import { addOrSubtractDaysFromDate } from '@/utils/date';
export const reviewData = [{
  image: avatar6,
  name: 'Henny K. Mark',
  rating: '4.5',
  description: 'Medium thickness. Did not shrink after wash. Good elasticity . XL size Perfectly fit for 5.10 height and heavy body. Did not fade after wash. Only for maroon colour t-shirt colour lightly gone in first wash but not faded. I bought 5 tshirt of different colours. Highly recommended in so low price.',
  country: 'Canada',
  date: addOrSubtractDaysFromDate(1)
}, {
  image: avatar4,
  name: 'Henny K. Mark',
  rating: '4.5',
  description: 'Medium thickness. Did not shrink after wash. Good elasticity . XL size Perfectly fit for 5.10 height and heavy body. Did not fade after wash. Only for maroon colour t-shirt colour lightly gone in first wash but not faded. I bought 5 tshirt of different colours. Highly recommended in so low price.',
  country: 'Canada',
  date: addOrSubtractDaysFromDate(5)
}];
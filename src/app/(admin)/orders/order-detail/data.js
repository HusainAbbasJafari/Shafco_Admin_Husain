import { addOrSubtractDaysFromDate } from '@/utils/date';
export const timelineData = [{
  title: 'The packing has been started',
  description: 'Confirmed by Gaston Lapierre',
  date: addOrSubtractDaysFromDate(5)
}, {
  title: 'The Invoice has been sent to the customer',
  description: 'Invoice email was sent to hello@dundermuffilin.com',
  date: addOrSubtractDaysFromDate(200),
  isInvoice: true
}, {
  title: 'The Invoice has been created',
  description: 'Invoice created by Gaston Lapierre',
  date: addOrSubtractDaysFromDate(100),
  downloadInvoice: true
}, {
  title: 'Order Payment',
  description: 'Using Master Card',
  date: addOrSubtractDaysFromDate(150),
  statusInvoice: true
}, {
  title: '4 Order conform by Gaston Lapierre',
  date: addOrSubtractDaysFromDate(45),
  orderButton: ['order 1', 'order 2', 'order 3', 'order 4']
}];
export const orderData = [{
  title: 'Vender',
  description: 'Catpiller',
  icon: 'solar:shop-2-bold-duotone'
}, {
  title: 'Date',
  description: 'April 23 , 2024',
  icon: 'solar:calendar-date-bold-duotone'
}, {
  title: 'Paid By',
  description: 'Gaston Lapierre',
  icon: 'solar:user-circle-bold-duotone'
}, {
  title: 'Reference #IMEMO',
  description: '#0758267/90',
  icon: 'solar:clipboard-text-bold-duotone'
}];
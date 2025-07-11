import { addOrSubtractDaysFromDate } from '@/utils/date';
export const popularProfileData = [{
  name: 'Gaston Lapierre',
  date: addOrSubtractDaysFromDate(1),
  description: 'We are a Series A B2B startup offering a custom solution. Currently, we are utilizing @MixPanel and collaborating with @Division of Labor to rebuild our pages. Shoutout to @Jennifer Smith for her support...',
  questionTag: '#inbound #SaaS',
  title: 'Do you have any experience with deploying @Hubspot for a SaaS business with both a direct and self-serve model?'
}, {
  name: 'Gaston Lapierre',
  date: addOrSubtractDaysFromDate(10),
  description: 'We are currently using @Optimizely, but find that they are missing a number with a custom solution that no... ',
  questionTag: '#LatAm #Europe',
  title: 'Looking for a new landing page optimization vendor'
}, {
  name: 'Gaston Lapierre',
  date: addOrSubtractDaysFromDate(1),
  description: 'CRMs are powerful tools that help you expedite business growth while number with a custom eliminating friction, improving cross-team collaboration, managing your contact records, syncing... ',
  questionTag: '#Performance-marketing #CRM',
  title: 'Why Your Company Needs a CRM to Grow Better?'
}];
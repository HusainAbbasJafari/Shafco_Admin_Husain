import AllGoogleMaps from './components/AllGoogleMaps';
import { Container } from 'react-bootstrap';
import PageTItle from '@/components/PageTItle';
export const metadata = {
  title: 'Google Maps'
};
const GoogleMaps = () => {
  return <>
      <PageTItle title="GOOGLE MAPS" />
      <Container>
        <AllGoogleMaps />
      </Container>
    </>;
};
export default GoogleMaps;
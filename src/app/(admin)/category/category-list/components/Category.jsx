//categoryData : CategoryType[]

import Image from 'next/image';
import { categoryData } from '../data';
import { Card, CardBody, Col, Row } from 'react-bootstrap';
const CategoryCard = ({
  categoryTitle,
  image
}) => {
  return <Card>
      <CardBody className="text-center">
        <div className="rounded bg-secondary-subtle d-flex align-items-center justify-content-center mx-auto">
          <Image src={image} alt="ProductImg" className="avatar-xl" />
        </div>
        <h4 className="mt-3 mb-0">{categoryTitle}</h4>
      </CardBody>
    </Card>;
};
const Category = () => {
  return <Row>
      {categoryData.map((item, idx) => <Col md={6} xl={3} key={idx}>
          <CategoryCard {...item} />
        </Col>)}
    </Row>;
};
export default Category;
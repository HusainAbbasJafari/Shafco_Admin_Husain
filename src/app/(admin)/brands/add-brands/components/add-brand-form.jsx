"use client"
import { useNotificationContext } from "@/context/useNotificationContext";
import api from "@/services/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from 'next/navigation';
import { Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Row } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { clearImages } from '@/redux/slices/fileSlice';
import { useEffect } from "react";


const schema = Yup.object().shape({
  brandname: Yup.string()
    .trim()
    .min(1, 'Brand Name is required')
    .max(100, "Brand Name must be at most 100 characters")
    .matches(/^[a-zA-Z0-9\s_-]+$/, 'Brand Name cannot contain special characters')
    .required('Brand Name is required'),
  description: Yup.string()
    .trim()
    .max(200, "Description must be at most 200 characters")
});

const AddBrandForm = () => {

  const { showNotification } = useNotificationContext();
  const uploadedImages = useSelector((state) => state.files.image);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearImages())
  }, [])


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const addBrands = handleSubmit(async (data) => {
    try {
      const formData = new FormData();
      formData.append("Name", data.brandname);
      formData.append("Image", uploadedImages[0]);
      formData.append("Description", data.description);

      const response = await api.post("/api/Brand/CreateUpdateBrand", formData);

      if (response.data.statusCode === 200 && response.data.isSuccess === true) {
        showNotification({
          message: response.data.message || "Created successfully!",
          variant: "success",
        });
        router.push("/brands/brands-list");
      } else {
        showNotification({
          message: response.data.message || "Creation Failed!",
          variant: "danger",
        });
      }
    } catch (error) {
      showNotification({
        message: error?.response?.data?.message || "An error occurred.",
        variant: "danger",
      });
    }
  });




  return <>
    <Row>
      <Col lg={12}>
        <Card>
          <form onSubmit={addBrands}>
            <CardHeader>
              <CardTitle as={'h4'}>Brands Information</CardTitle>
            </CardHeader>
            <CardBody>
              <Row>
                <Col lg={6}>
                  <div className="mb-3">
                    <label htmlFor="roles-name" className="form-label">
                      Brand Name <span className='text-primary'>*</span>
                    </label>
                    <input type="text" id="roles-name" className="form-control" placeholder="Brand name" {...register("brandname")} />
                    {errors.brandname && <p className="text-danger">{errors.brandname.message}</p>}
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <textarea id="description" rows={4} className="form-control" placeholder="Type description" {...register('description')} />
                    {errors.description && <p className="text-danger">{errors.description.message}</p>}
                  </div>
                </Col>
              </Row>
            </CardBody>
            <CardFooter className="border-top d-flex justify-content-end">
              <button type='submit' className="btn btn-primary">
                Create Brand
              </button>
            </CardFooter>
          </form>
        </Card>
      </Col>
    </Row>
  </>;
};
export default AddBrandForm;

"use client"
import { useNotificationContext } from "@/context/useNotificationContext";
import { storeImage } from "@/redux/slices/fileSlice";
import api from "@/services/api";
import { useBrand } from "@/services/brandServices";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Row } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";


const schema = Yup.object().shape({
  brandname: Yup.string()
    .trim()
    .min(1, 'Brand Name is required')
    .max(100, "Brand Name must be at most 100 characters")
    .matches(/^[a-zA-Z0-9\s_-]+$/, 'Brand Name cannot contain special characters')
    .required('Brand Name is required'),
});

const EditBrandForm = () => {

  const router = useRouter();

  const { showNotification } = useNotificationContext();
  const uploadedImages = useSelector((state) => state.files.image);
  const params = useParams();
  const [brandId, setBrandId] = useState(null)
  const [isDeleted, setIsDeleted] = useState(false)
  const { data: brand } = useBrand(brandId)
  const dispatch = useDispatch();


  useEffect(() => {
    if (params?.encodedId) {
      const decodedId = atob(params.encodedId);
      setBrandId(decodedId);
    }
  }, [params])

  useEffect(() => {
    if (Array.isArray(uploadedImages) && uploadedImages?.length === 0) {
      setIsDeleted(true)
    }else{
      setIsDeleted(false)
    }
  }, [uploadedImages])


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });


  useEffect(() => {
    if (brand) {
      const image = `${brand.brandImages}`;
      setValue("brandname", brand.brandName);
      setValue("description", brand.description);
      dispatch(storeImage([{ name: image, preview: image, path: image }]))
    }
  }, [brand]);


  const updateBrand = handleSubmit(async (data) => {
    try {
      const formData = new FormData();
      formData.append("ID", brandId);
      formData.append("Name", data.brandname);

      if (Array.isArray(uploadedImages) && uploadedImages.length > 0) {
        if (uploadedImages[0] instanceof File) {
          formData.append("Image", uploadedImages[0]);
        } else if (uploadedImages[0]) {
          formData.append("Image", null);
        }
      }

      formData.append("isImageDeleted", isDeleted);
      formData.append("Description", data.description);
      // formData.append("isImageDeleted", data.description);

      const response = await api.post("/api/Brand/CreateUpdateBrand", formData);

      if (response.data.statusCode === 200 && response.data.isSuccess === true) {
        showNotification({
          message: response.data.message || "Created successfully!",
          variant: "success",
        });
        setIsDeleted(false)
        router.push("/brands/brands-list");
      } else {
        showNotification({
          message: response.data.message || "Creation Failed!",
          variant: "danger",
        });
        setIsDeleted(false)
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
          <form onSubmit={updateBrand}>
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
                  </div>
                </Col>
              </Row>
            </CardBody>
            <CardFooter className="border-top d-flex justify-content-end">
              <button type='submit' className="btn btn-primary">
                Update Brand
              </button>
            </CardFooter>
          </form>
        </Card>
      </Col>
    </Row>
  </>;
};
export default EditBrandForm;

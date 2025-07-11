"use client"
import FileUpload from '@/components/FileUpload';
import { clearImages } from '@/redux/slices/fileSlice';
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as Yup from "yup";
import BundleOptions from './BundleOptions';
import api from '@/services/api';
import { useNotificationContext } from '@/context/useNotificationContext';
import { formatIDRCurrency, unformatIDR } from '@/utils/other';



const schema = Yup.object().shape({
  bundlename: Yup.string().trim().min(1, "Bundle Name is required").max(100, "Bundle Name cannot exceed 100 characters").required("Bundle Name is required"),
  sku: Yup.string().trim().min(1, "SKU is required").required("SKU is required"),
  price: Yup.string().required("Price is required"),
});

const AddBundle = () => {
  const { showNotification } = useNotificationContext();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm({
    resolver: yupResolver(schema)
  });

  const [quillEditorContent, setQuillEditorContent] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [bundles, setBundles] = useState([{ name: '', products: [] }]);
  const [price, setPrice] = useState(0)


  const router = useRouter()
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(clearImages())
  }, [])





  const handleCreateBundle = handleSubmit(async (data) => {
    try {
      const formData = new FormData();
      formData.append('Id', "");
      formData.append('BundleName', data.bundlename);
      formData.append('Description', quillEditorContent);
      formData.append('SKU', data.sku);
      formData.append('ImageUrl', uploadedImage);
      formData.append('TotalPrice', unformatIDR(price) || 0);

      const res = await api.post('api/ProductBundle/CreateOrUpdateBundle', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.request.status === 200 && res.data.isSuccess === true, res.data.statusCode === 200) {
        showNotification({
          message: res.data.message || "Created successfully!",
          variant: "success",
        });
        const bundleId = res.data.data.id
        ManageBundleOptions(bundleId)

      } else {
        showNotification({
          message: res.data.message || "Creation Failed!",
          variant: "danger",
        });
      }

    } catch (error) {
      showNotification({
        message: error?.response?.data?.message || "Error occurred while creating the bundle.",
        variant: "danger",
      });
    }
  });

  const ManageBundleOptions = async (bundleId) => {

    const bundleData = {
      productBundleId: bundleId,
      actionType: "add",
      bundleItemProducts: bundles.map(bundle => ({
        itemTitle: bundle.name || "Untitled",
        isDeletedItem: false,
        bundleItemProductsWithStatus: bundle.products.map(product => ({
          productId: product?.id || null,
          variantId: product?.variantId || null,
          quantity: Number(product.quantity) || 1,
          activeStatus: product.isActive,
          isDeletedProduct: false
        }))
      }))
    };


    try {
      const response = await api.post("api/ProductBundle/manage-item", bundleData, {
        headers: {
          "Content-Type": "application/json",
        },
      });


      if (response.request.status === 200) {
        showNotification({
          message: response.data.message || "Bundle created successfully!",
          variant: "success",
        });
        router.push("/product-bundle/bundle-list");
      } else {
        showNotification({
          message: response.data.message || "Error occurred while creating the bundle.",
          variant: "danger",
        });
      }
    } catch (error) {

      showNotification({
        message: error?.response?.data?.message || "Error occurred while creating the bundle.",
        variant: "danger",
      });
    }
  }


  return (
    <>
      <Col xl={12} lg={12}>
        <FileUpload title="Add Product Bundle Photo" onFileUpload={(files) => { setUploadedImage(files[0]) }} />
        <div className="flex">
          <form onSubmit={handleCreateBundle} >
            <Card>
              <CardHeader>
                <CardTitle as={'h4'}>Bundle Information</CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col lg={4}>
                    <div className="mb-3">
                      <label htmlFor="bundle-name" className="form-label">
                        Bundle Name <span className='text-primary'>*</span>
                      </label>
                      <input type="text" id="bundle-name" className="form-control" placeholder="Bundle Name" {...register("bundlename")} />
                      {errors.bundlename && <p className="text-danger">{errors.bundlename.message}</p>}
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="mb-3">
                      <label htmlFor="sku" className="form-label">
                        SKU <span className='text-primary'>*</span>
                      </label>
                      <input type="text" id="sku" className="form-control" placeholder="SKU" {...register("sku")} />
                      {errors.sku && <p className="text-danger">{errors.sku.message}</p>}
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="mb-3">
                      <label htmlFor="price" className="form-label">
                        Price <span className='text-primary'>*</span>
                      </label>
                      <input
                        type="text"
                        id="price"
                        className="form-control"
                        placeholder="Price"
                        value={price}
                        {...register("price")}
                        onChange={(e) => {
                          const formatted = formatIDRCurrency(e.target.value)
                          setPrice(formatted)
                          setValue('sellingprice', formatted)
                        }}

                      />
                      {errors.price && <p className="text-danger">{errors.price.message}</p>}
                    </div>
                  </Col>
                  <Col lg={8}>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">
                        Description
                      </label>
                      <ReactQuill value={quillEditorContent} onChange={setQuillEditorContent} />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>

            <BundleOptions bundles={bundles} setBundles={setBundles} />

          </form>

        </div>
      </Col>
    </>
  )
}

export default AddBundle
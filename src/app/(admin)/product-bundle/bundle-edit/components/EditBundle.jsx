"use client";
import FileUpload from '@/components/FileUpload';
import { clearImages, storeImage } from '@/redux/slices/fileSlice';
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as Yup from "yup";

import api from '@/services/api';
import { useNotificationContext } from '@/context/useNotificationContext';
import { useBundle } from '@/services/bundleServices';
import BundleOptions from '../../add-bundle/components/BundleOptions';
import { formatIDRCurrency, formatIDRCustom, unformatIDR } from '@/utils/other';

const schema = Yup.object().shape({
  bundlename: Yup.string().trim().min(1, "Bundle Name is required").max(100, "Bundle Name cannot exceed 100 characters").required("Bundle Name is required"),
  sku: Yup.string().trim().min(1, "SKU is required").required("SKU is required"),
  price: Yup.string().required("Price is required"),
});

const EditBundle = () => {
  const { showNotification } = useNotificationContext();
  const { register, setValue, formState: { errors }, handleSubmit } = useForm({
    resolver: yupResolver(schema)
  });

  const params = useParams();
  const [quillEditorContent, setQuillEditorContent] = useState('');
  const [bundleId, setBundleId] = useState(null);
  const [price, setPrice] = useState(0)

  const uploadedImages = useSelector((state) => state.files.image);
  const [bundles, setBundles] = useState([{ name: '', products: [] }]);


  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearImages());
  }, []);

  useEffect(() => {
    if (params?.encodedId) {
      try {
        const decodedId = atob(params.encodedId);
        setBundleId(decodedId);
      } catch (error) {
        console.error("Invalid base64 string:", error);
      }
    }
  }, [params]);

  const { data: bundle } = useBundle(bundleId);


  useEffect(() => {
    if (bundle) {
      const image = bundle.imageUrl;
      setValue("bundlename", bundle?.bundleName);
      setValue("sku", bundle?.sku);
      setPrice(formatIDRCustom(bundle?.totalPrice));
      setQuillEditorContent(bundle?.description);
      dispatch(storeImage(image ? [{ name: image, preview: image, path: image }] : []))


      // Transform the productBundleItems to the shape expected by BundleOptions
      const transformedBundles = (bundle.productBundleItems || []).map(item => ({
        name: item.itemTitle || '',
        products: (item.bundleItemProductsWithStatus || []).map(product => ({
          id: product?.id,
          productId: product?.productId,
          variantId: product?.variantId,
          productName: product?.productName,
          productImage: product?.defaultImageUrl[0],
          price: product.price,
          productDescription: product.productDescription,
          quantity: product.quantity,
          isActive: product.activeStatus,
          isDeletedProduct: false
        }))
      }));

      setBundles(transformedBundles.length ? transformedBundles : [{ name: '', products: [] }]);
    }
  }, [bundle]);



  const handleCreateBundle = handleSubmit(async (data) => {

    try {
      const formData = new FormData();
      formData.append('Id', bundleId);
      formData.append('BundleName', data.bundlename);
      formData.append('Description', quillEditorContent);
      formData.append('SKU', data.sku);
      formData.append('ImageUrl', uploadedImages[0]);
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


        const bundleData = {
          productBundleId: bundleId,
          actionType: "update",
          bundleItemProducts: bundles.map(bundle => ({
            itemTitle: bundle.name || "Untitled",
            isDeletedItem: false,
            bundleItemProductsWithStatus: bundle.products.map(product => ({
              id: product.id,
              productId: product.productId || null,
              variantId: product.variantId || null,
              quantity: Number(product.quantity) || 1,
              activeStatus: product.isActive,
              isDeletedProduct: product.isDeletedProduct || false
            }))
          }))
        };


        manageBundleOptions(bundleData)
        router.push("/product-bundle/bundle-list");

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


  const manageBundleOptions = async (bundleData) => {
    try {
      const response = await api.post("api/ProductBundle/manage-item", bundleData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.request.status === 200) {
        showNotification({
          message: response.data.message || "Bundle updated successfully!",
          variant: "success",
        });

      } else {
        showNotification({
          message: response.data.message || "Error updating bundle items.",
          variant: "danger",
        });
      }
    } catch (error) {

      showNotification({
        message: error?.response?.data?.message || "Error occurred while updating the bundle.",
        variant: "danger",
      });
    }
  };

  return (
    <Col xl={12} lg={12}>
      <FileUpload
        title="Add Product Bundle Photo"
      />

      <form onSubmit={handleCreateBundle}>
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
                  <input type="text" id="price" className="form-control" placeholder="Price" value={price} {...register("price")}
                    onChange={(e) => {
                      const formatted = formatIDRCurrency(e.target.value)
                      setPrice(formatted)
                      setValue('sellingprice', formatted)
                    }} />
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

        <BundleOptions bundles={bundles} setBundles={setBundles} onSubmit={handleCreateBundle} manageBundleOptions={manageBundleOptions} bundleId={bundleId} useApi={true} />
      </form>
    </Col>
  );
};

export default EditBundle;

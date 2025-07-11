'use client';

import TextAreaFormInput from '@/components/form/TextAreaFormInput';
import TextFormInput from '@/components/form/TextFormInput';
import { useNotificationContext } from '@/context/useNotificationContext';
import { storeImage } from '@/redux/slices/fileSlice';
import api from '@/services/api';
import { useParentCategory } from '@/services/categoryServices';
import { customSelectStyles } from '@/utils/other';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap';
import { Controller, useForm, useWatch } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import * as yup from 'yup';


const GeneralInformationCard = ({
  control,
  register,
  setQuillEditorContent,
  quillEditorContent,
  categoryType,
  setCategoryType,
  errors
}) => {




  const { data: parentCategories } = useParentCategory();

  const parentCategoryOptions = parentCategories?.map((category) => ({
    value: category.id,
    label: category.categoryName
  }))


  return <Card>
    <CardHeader>
      <CardTitle as={'h4'}>General Information</CardTitle>
    </CardHeader>
    <CardBody>
      <Row>
        <Col lg={4}>
          <div className="mb-3">
            <TextFormInput requiredIcon={true} control={control} name="categoryname" label="Category Name" placeholder="Enter Name" />
          </div>
        </Col>
        <Col lg={4}>
          <p>Category Type <span className='text-primary'>*</span></p>
          <div className="d-flex gap-2 align-items-center mb-3">
            <div className="form-check">
              <input className="form-check-input" value={0} type="radio" id="categoryRadioDefault1" defaultChecked onClick={(e) => setCategoryType(e.target.value)}   {...register("categoryType")} />
              <label className="form-check-label" htmlFor="categoryRadioDefault1">
                Parent
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" value={1} type="radio" id="categoryRadioDefault2" onClick={(e) => setCategoryType(e.target.value)}  {...register("categoryType")} />
              <label className="form-check-label" htmlFor="categoryRadioDefault1">
                Child
              </label>
            </div>
          </div>
        </Col>
        <Col lg={4}>
          <p>Status <span className='text-primary'>*</span></p>
          <div className="d-flex gap-2 align-items-center mb-3">
            <div className="form-check">
              <input className="form-check-input" value={0} type="radio" id="flexRadioDefault1"    {...register("status")} />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Draft
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" value={1} type="radio" id="flexRadioDefault2" defaultChecked   {...register("status")} />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Published
              </label>
            </div>
            {/* {errors.status && <p className="text-danger">{errors.status.message}</p>} */}
          </div>
        </Col>
        {categoryType == 1 &&
          <Col lg={4}>
            <div className='mb-3'>
              <label htmlFor="parentCategory" className="form-label">
                Parent Category
              </label>
              <Controller
                name="parentCategory"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={parentCategoryOptions}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    styles={customSelectStyles}
                  />
                )}
              />
              {errors.parentCategory && (
                <p className="text-danger">{errors.parentCategory.message}</p>
              )}
            </div>
          </Col>
        }
        {/* <Col lg={6}>
            <div className="mb-3">
              <TextFormInput control={control} type="number" name="stock" label="Stock" placeholder="Enter Stock" />
            </div>
          </Col>
          <Col lg={6}>
            <div className="mb-3">
              <TextFormInput control={control} type="text" name="tag" label="Tag ID" placeholder="#******" />
            </div>
          </Col> */}
        <Col lg={4}>
          <div className="mb-3">
            <TextFormInput requiredIcon={false} control={control} name="categorycode" label="Category Code" placeholder="Enter Category Code" />
          </div>
        </Col>
        <Col lg={8}>
          <div className="mb-0">
            <label htmlFor="description" className="form-label">Description</label>
            {/* <TextAreaFormInput control={control} type="text" name="description" label="Description" placeholder="Type description" /> */}
            <ReactQuill value={quillEditorContent} onChange={setQuillEditorContent} />
          </div>
        </Col>
      </Row>
    </CardBody>
  </Card>;
};
const MetaOptionsCard = ({
  control
}) => {
  return <Card>
    <CardHeader>
      <CardTitle as={'h4'}>Meta Options</CardTitle>
    </CardHeader>
    <CardBody>
      <Row>
        <Col lg={6}>
          <div className="mb-3">
            <TextFormInput control={control} type="text" name="meta" label="Meta Title" placeholder="Enter Title" />
          </div>
        </Col>
        <Col lg={6}>
          <div className="mb-3">
            <TextFormInput control={control} type="text" name="metaTag" label="Meta Tag Keyword" placeholder="Enter word" />
          </div>
        </Col>
        <Col lg={6}>
          <div className="mb-3">
            <TextFormInput control={control} type="text" name="pageName" label="Seach Engine Friendly Page Name" placeholder="Enter Title" />
          </div>
        </Col>
        <Col lg={6}>
          <div className="mb-0">
            <TextAreaFormInput rows={4} control={control} type="text" name="description2" label="Meta Description" placeholder="Type meta description" />
          </div>
        </Col>
      </Row>
    </CardBody>
    {/* <CardFooter className='d-flex justify-content-end  border-top'>
      <button className='btn btn-primary' type="submit">
        Save Change
      </button>
    </CardFooter> */}
  </Card>;
};
const AddCategory = () => {


  const [categoryType, setCategoryType] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(storeImage([]))
  }, [])


  const messageSchema = yup.object({
    categoryname: yup.string()
      .trim()
      .min(1, "Category Name is required")
      .max(100, "Category Name must be at most 100 characters")
      .matches(/^[a-zA-Z0-9\s_-]+$/, 'Category Name cannot contain special characters')
      .required('Please enter Category Name'),
    categoryType: yup.mixed().required("Please select a category type"),

    parentCategory: yup.mixed().when("categoryType", {
      is: (val) => val == 1 || val === "1",
      then: () =>
        yup.object().nullable().test("parentcatory-required", "Parent Category is required", function (value) {
          return value && value.label && value.value;
        }),
    })
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(messageSchema)
  });


  const [quillEditorContent, setQuillEditorContent] = useState('');

  const { showNotification } = useNotificationContext()
  const uploadedImages = useSelector((state) => state.files.image);

  const router = useRouter()

  const handleCreateCategory = handleSubmit(async (data) => {
    try {
      const formData = new FormData();

      formData.append("CategoryName", data.categoryname);
      formData.append("ParentCategoryId", data?.parentCategory?.value || "");
      formData.append("Description", quillEditorContent);
      formData.append("CategoryImage", uploadedImages[0]);
      formData.append("SortOrder", "0");
      formData.append("TabIcon", "string");
      formData.append("SetTabIcon", "string");
      formData.append("MetaTitle", data.meta || "");
      formData.append("MetaKeyword", data.tag || "");
      formData.append("MetaPageName", data.pageName || "");
      formData.append("MetaDescription", data.description2 || "");
      formData.append("Status", data.status);
      formData.append("Code", data.categorycode);

      const response = await api.post(`/api/ProductCategory/CreateUpdateProductCategory`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.statusCode === 200 && response.data.isSuccess === true) {
        showNotification({
          message: response?.data?.message,
          variant: "success",
        });
        router.push("/category/category-list")
      } else {
        showNotification({
          message: response?.data?.message || "Update Failed!",
          variant: "danger",
        });
      }
    } catch (error) {
      showNotification({
        message:
          error?.response?.data?.message ||
          "An error occurred while creating category",
        variant: "danger",
      });
    }
  });






  return <form onSubmit={handleCreateCategory}>
    <GeneralInformationCard control={control} register={register} errors={errors} watch={watch} quillEditorContent={quillEditorContent} setQuillEditorContent={setQuillEditorContent} categoryType={categoryType} setCategoryType={setCategoryType} />
    <MetaOptionsCard control={control} />
    <div className="p-3 bg-light mb-3 rounded d-flex justify-content-end">
      <button type="submit" className="btn btn-primary">
        Save Change
      </button>
    </div>
  </form>;
};
export default AddCategory;
"use client"
import FileUpload from '@/components/FileUpload';
import TextAreaFormInput from '@/components/form/TextAreaFormInput';
import TextFormInput from '@/components/form/TextFormInput';
import { useNotificationContext } from '@/context/useNotificationContext';
import { clearImages } from '@/redux/slices/fileSlice';
import api from '@/services/api';
import { useBrandList } from '@/services/brandServices';
import { useCategoryList } from '@/services/categoryServices';
import { useAttributes, useAttributeSetsList } from '@/services/productServices';
import { customSelectStyles, formatIDRCurrency, mapToSelectOptions, parseIDRCurrency, toLocalDateString, unformatIDR } from '@/utils/other';
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Row, Tab, Tabs } from 'react-bootstrap';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import Select, { components } from 'react-select';
import * as Yup from "yup";
import AdvancedPricing from './AdvancedPricing'


const schema = Yup.object().shape({
  specialPrices: Yup.array().of(
    Yup.object().shape({
      pricetype: Yup.object().nullable().test("Price-type", "Price Type is required", function (value) {
        return value && value.label && value.value;
      }),
      value: Yup.string().trim().min(1, "Value is required").required("Value is required"),
      fromDate: Yup.date()
        .typeError("From date is required")
        .required("From date is required"),
      toDate: Yup.date()
        .typeError("To date is required")
        .required("To date is required"),
      customergroups: Yup.array().min(1, 'At least one customer group must be selected').of(
        Yup.object().shape({
          label: Yup.string().required(),
          value: Yup.string().required(),
        }),
      ).required('Customer Groups are required'),

      locations: Yup.array().min(1, 'At least one location must be selected').of(
        Yup.object().shape({
          label: Yup.string().required(),
          value: Yup.string().required(),
        }),
      ).required('Location are required'),
      applyToWebsite: Yup.boolean(),
      applyToMobile: Yup.boolean(),

      atLeastOnePlatform: Yup.mixed().test(
        "at-least-one-platform",
        "At least one platform (Website or Mobile) must be selected",
        function () {
          const { applyToWebsite, applyToMobile } = this.parent;
          return applyToWebsite || applyToMobile;
        }
      ),
    }),
  ),
  defaultbaseprice: Yup.string().trim().min(1, "Default base price is required").required("Default base price is required"),
  // fallbackbehaviour: Yup.object().nullable().test("fallback-behaviour", "Fallback behaviour is required", function (value) {
  //   return value && value.label && value.value;
  // }),
});




const AddProduct = () => {

  const [quillEditorContent, setQuillEditorContent] = useState('');
  const [sellingPrice, setSellingPrice] = useState('')
  const [price, setPrice] = useState(0)
  const { showNotification } = useNotificationContext();
  const uploadedImages = useSelector((state) => state.files.image);
  const { data: categoryList } = useCategoryList({ state: 1, searchTerm: "", pageSize: 200, pageNumber: 1 })
  const { data: attributeSetList } = useAttributeSetsList({ pageSize: 200, pageNumber: 1, searchTerm: "" });
  const { data: brandList } = useBrandList({ pageSize: 500, pageNumber: 1, searchTerm: "", filterStatus: 1 })
  const [dynamicSchema, setDynamicSchema] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    watch,
    setValue,
    trigger,

  } = useForm({
    resolver: yupResolver(dynamicSchema),
    defaultValues: {
      specialPrices: []
    }
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "specialPrices",
  });

  const attributeSet = watch("attributeSet");
  const advancedPrice = watch('advancedPrice');

  const { data: attributes } = useAttributes(attributeSet?.value)
  const categoryOptions = mapToSelectOptions(categoryList?.data, "categoryName", "id");
  const brandOptions = mapToSelectOptions(brandList?.data, "brandName", "id");
  const router = useRouter()
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(clearImages())
  }, [])

  const attributeSetOptions = mapToSelectOptions(attributeSetList?.data || [], 'attributeSetName', 'id')

  useEffect(() => {
    let baseSchema = {
      productname: Yup.string().trim().min(1, "Product Name is required").max(100, "Product Name cannot exceed 100 characters").required("Product Name is required"),
      sku: Yup.string().trim().min(1, "SKU is required").required("SKU is required"),
      productstock: Yup.string().trim().min(1, "Product stock is required").required("Product stock is required"),
      price: Yup.string().trim().min(1, "Price is required").required("Price is required"),
      sellingprice: Yup.string().trim().min(1, "Selling Price is required").required("Selling Price is required"),
      productcategory: Yup.object().nullable().test("product-category", "Product category is required", function (value) {
        return value && value.label && value.value;
      }),
      brands: Yup.object().nullable().test("brand-required", "Brand is required", function (value) {
        return value && value.label && value.value;
      }),
      attributeSet: Yup.object().nullable().test("attributeset-required", "Attribute Set is required", function (value) {
        return value && value.label && value.value;
      }),
    };


    if (Array.isArray(attributes)) {
      attributes.forEach(attr => {
        const attributeName = attr.attributeName.toLowerCase();

        baseSchema[attributeName] = Yup.object()
          .test(
            'is-valid-select',
            `${attr.attributeName} is required`,
            value => value && value.label && value.value
          )
          .required(`${attr.attributeName} is required`);
      });
    }
    if (advancedPrice) {
      setDynamicSchema(Yup.object().shape(baseSchema).concat(schema));
    } else {
      setDynamicSchema(Yup.object().shape(baseSchema));
    }

  }, [attributes]);


  const geColorOptions = (colors) => {
    const colorOptions = colors?.map((color) => ({
      label: color?.attributeValue,
      value: color?.id,
      color: color?.hexCode
    }))
    return colorOptions;
  }



  const ColorCircles = (props) => (
    <components.Option {...props}>
      <span
        style={{
          width: 16,
          height: 16,
          borderRadius: '50%',
          backgroundColor: props.data.color,
          display: 'inline-block',
          marginRight: 7
        }}
      />
      <label>{props.label}</label>
    </components.Option>
  );


  const NoChipsValueContainer = ({ children, ...props }) => {
    const filteredChildren = children.filter((child) => child && child.type !== components.MultiValue)
    return <components.ValueContainer {...props}>{filteredChildren}</components.ValueContainer>
  }


  const handleImageUpload = async (data) => {
    try {
      const formData = new FormData();
      const imageData = [{
        productId: data?.data?.productId || "",
        productVariantId: "",
        productImage: uploadedImages[0] || "",
        productImageName: uploadedImages[0]?.name || "",
        imageId: ""
      }]

      imageData.forEach((item, index) => {
        formData.append(`ProductImages[${index}].ProductId`, item.productId);
        formData.append(`ProductImages[${index}].ProductVariantId`, '');
        formData.append(`ProductImages[${index}].ProductImage`, item?.productImage);
        formData.append(`ProductImages[${index}].ProductImageName`, item.productImageName);
        formData.append(`ProductImages[${index}].imageId`, '');
      })

      formData.append("ProductId", data?.data?.productId)

      const response = await api.post("/api/Product/UpsertProductImages", formData);

      if (response.data.statusCode === 200 && response.data.isSuccess === true) {

      } else {
      }
    } catch (error) {
    }
  };


  const handleCreateProduct = handleSubmit(async (data) => {

    const dynamicAttributes = attributes.map(attr => {
      const selected = data[attr.attributeName.toLowerCase()];
      let attributeValueIds = Array.isArray(selected) ? selected.map(item => item.value) : selected?.value ? [selected.value] : null;
      return {
        attributeMasterId: attr.attributeMasterId,
        attributeValueIds
      };
    });
  
    const specialPriceRules = data?.specialPrices?.map((rule) => {
      return {
        specialPriceId: null,
        priceType: rule.pricetype?.value || null,
        value: rule.pricetype?.value === "percentagediscount" ? Number(rule.value) : Number(unformatIDR(rule.value)) || 0,
        startDate: rule.fromDate ? toLocalDateString(rule.fromDate) : null,
        endDate: rule.toDate ? toLocalDateString(rule.toDate) : null,
        specialPriceRuleCustomerGroupsId: rule.customergroups?.map(group => group.value) || [],
        specialPriceRuleLocationsId: rule.locations?.filter(location => location.value !== 'ALL')?.map((loc) => loc.value) || [],
        appliesToWebsite: rule.applyToWebsite || false,
        appliesToMobileApp: rule.applyToMobile || false,
        appliesToAllCustomerGroups: false,
        appliesToAllStores: rule?.locations?.some(location => location.value === 'ALL'),
      }
    })
    try {
      const payload = {
        productName: data.productname,
        description: quillEditorContent,
        productTypeId: null,
        productCategoryId: data.productcategory?.value,
        brandId: data.brands?.value,
        price: unformatIDR(price) || 0,
        sellingPrice: unformatIDR(sellingPrice) || 0,
        isActive: true,
        productTags: data.tags,
        metaTitle: data.meta || "",
        metaKeyword: data.metaTag || "",
        metaPageName: data.pagename || "",
        metaDescription: data.description2 || "",
        quantity: data.productstock,
        sku: data.sku,
        appliesToAllCustomerGroups: false,
        appliesToAllStores: false,
        productType: "simple",
        attributeSetId: data.attributeSet?.value,
        productVariantId: null,
        productAttributes: dynamicAttributes,
        variants: null,
        isSpecialPriceEnabled: advancedPrice,
        specialPriceRules,
        fallbackPrice: {
          defaultBasePrice: unformatIDR(data.defaultbaseprice) || 0,
          fallbackBehavior: "",
        },

      };
      const response = await api.post("/api/Product/CreateUpdateProduct", payload);
      if (response.data.statusCode === 200 && response.data.isSuccess === true) {
        showNotification({
          message: response.data.message || "Created successfully!",
          variant: "success",
        });

        handleImageUpload(response.data);
        router.push("/products/product-list");
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



  return <Col xl={12} lg={12}>
    <FileUpload title="Add Product Photo" />
    <div className='custom-tab-wrapper'>
      <Tabs defaultActiveKey="productinfo" id="product-info-tabs"  >
        <Tab eventKey={"productinfo"} title="Product Information" >
          <form onSubmit={handleCreateProduct} >
            <Card>
              <CardHeader>
                <CardTitle as={'h4'}>Product Information</CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col lg={6}>
                    <div className="mb-3">
                      <label htmlFor="product-name" className="form-label">
                        Product Name <span className='text-primary'>*</span>
                      </label>
                      <input type="text" id="product-name" className="form-control" placeholder="Product Name" {...register("productname")} />
                      {errors.productname && <p className="text-danger">{errors.productname.message}</p>}
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className='mb-3'>
                      <label htmlFor="product-categories" className="form-label">
                        Product Categories <span className='text-primary'>*</span>
                      </label>
                      <Controller
                        name="productcategory"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={categoryOptions}
                            placeholder="Select Product Categories"
                            className="react-select-container"
                            classNamePrefix="react-select"
                            styles={customSelectStyles}
                            onChange={(selectedOption) => { field.onChange(selectedOption); }}
                          />
                        )}
                      />
                      {errors.productcategory && <p className="text-danger">{errors.productcategory.message}</p>}
                    </div>
                  </Col>


                  <Col lg={6}>
                    <div className='mb-3'>
                      <label htmlFor="brands" className="form-label">
                        Brands <span className='text-primary'>*</span>
                      </label>
                      <Controller
                        name="brands"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={brandOptions}
                            className="react-select-container"
                            classNamePrefix="react-select"
                            placeholder="Select Brands"
                            styles={customSelectStyles}
                            onChange={(selectedOption) => { field.onChange(selectedOption); }}
                          />
                        )}
                      />
                      {errors.brands && <p className="text-danger">{errors.brands.message}</p>}
                    </div>
                  </Col>


                  <Col lg={6}>
                    <div className='mb-3'>
                      <label htmlFor="brands" className="form-label">
                        Attribute Set <span className='text-primary'>*</span>
                      </label>
                      <Controller
                        name="attributeSet"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={attributeSetOptions || []}
                            className="react-select-container"
                            classNamePrefix="react-select"
                            placeholder="Select Attribute Set"
                            styles={customSelectStyles}
                            onChange={(selectedOption) => { field.onChange(selectedOption); }}
                          />
                        )}
                      />
                      {errors.attributeSet && <p className="text-danger">{errors.attributeSet.message}</p>}
                    </div>
                  </Col>
                  {Array.isArray(attributes) && attributes.length > 0 && (
                    <>
                      {attributes.map((attr, index) => (
                        <Col lg={6} key={index}>
                          <div className='mb-3'>
                            <label htmlFor={attr.attributeName} className="form-label">
                              {attr.attributeName} <span className='text-primary'>*</span>
                            </label>
                            <Controller
                              name={attr?.attributeName?.toLowerCase()}
                              control={control}
                              render={({ field }) => (
                                < Select
                                  {...field}
                                  options={attr.attributeName === 'Color' ? geColorOptions(attr?.productAttributeValues) : mapToSelectOptions(attr?.productAttributeValues, "attributeValue", "id")}
                                  className="react-select-container"
                                  classNamePrefix="react-select"
                                  placeholder={`Select ${attr.attributeName}`}
                                  styles={customSelectStyles}
                                  closeMenuOnSelect={false}

                                  components={
                                    attr.attributeName === 'Color'
                                    && {
                                      Option: ColorCircles,
                                      ValueContainer: NoChipsValueContainer
                                    }
                                  }
                                  onChange={(selectedOption) => field.onChange(selectedOption)}
                                />
                              )}
                            />
                            {errors[attr?.attributeName?.toLowerCase()] && (
                              <p className="text-danger">{errors[attr.attributeName?.toLowerCase()]?.message}</p>
                            )}
                          </div>
                        </Col>
                      ))}
                    </>
                  )}
                  <Col lg={6}>
                    <div className="mb-3">
                      <label htmlFor="sku" className="form-label">
                        SKU <span className='text-primary'>*</span>
                      </label>
                      <input type="text" id="sku" className="form-control" placeholder="SKU" {...register("sku")} />
                      {errors.sku && <p className="text-danger">{errors.sku.message}</p>}
                    </div>
                  </Col>
                  <Col lg={12}>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">
                        Description
                      </label>
                      <ReactQuill value={quillEditorContent} onChange={setQuillEditorContent} />
                    </div>
                  </Col>

                  {/* <Col lg={4}>
                    <div className="mb-3">
                      <label htmlFor="tag-number" className="form-label">
                        Tag Number <span className='text-primary'>*</span>
                      </label>
                      <input type="number" id="tag-number" className="form-control" placeholder="Tag Number"  {...register("tagnumber")} />
                      {errors.tagnumber && <p className="text-danger">{errors.tagnumber.message}</p>}
                    </div>
                  </Col> */}
                  <Col lg={4}>
                    <div className="mb-3">
                      <label htmlFor="price" className="form-label">
                        Cost Price <span className='text-primary'>*</span>
                      </label>
                      <input type="text"
                        id="price"
                        value={price}
                        className="form-control"
                        placeholder="Price"
                        onChange={(e) => {
                          const formatted = formatIDRCurrency(e.target.value)
                          setPrice(formatted)
                          setValue('price', formatted)
                        }}
                      />
                      {errors.price && <p className="text-danger">{errors.price.message}</p>}
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="mb-3">
                      <label htmlFor="selling-price" className="form-label">
                        Selling Price <span className='text-primary'>*</span>
                      </label>
                      <input type="text"
                        id="selling-price"
                        value={sellingPrice}
                        className="form-control"
                        placeholder="Selling Price"
                        onChange={(e) => {
                          const formatted = formatIDRCurrency(e.target.value)
                          setSellingPrice(formatted)
                          setValue('sellingprice', formatted)
                        }}
                      />
                      {errors.sellingprice && <p className="text-danger">{errors.sellingprice.message}</p>}
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="mb-3">
                      <label htmlFor="product-stock" className="form-label">
                        Stock <span className='text-primary'>*</span>
                      </label>
                      <input type="number" id="product-stock" className="form-control" placeholder="Quantity" {...register("productstock")} />
                      {errors.productstock && <p className="text-danger">{errors.productstock.message}</p>}
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="mb-3">
                      <label htmlFor="tag-id" className="form-label">
                        Tags
                      </label>
                      <input type="text" id="tag-id" className="form-control" placeholder="Tags" {...register("tags")} />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>


            <Card>
              <CardHeader className='d-flex justify-content-between align-items-center'>
                <CardTitle as={'h4'}>Advanced Pricing</CardTitle>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    title={'Advanced Pricing'}
                    {...register('advancedPrice')}
                  />
                </div>
              </CardHeader>
              {advancedPrice && (
                <CardBody>
                  <AdvancedPricing fields={fields} setValue={setValue} append={append} remove={remove} errors={errors} control={control} register={register} update={update} trigger={trigger} />
                </CardBody>
              )}
            </Card>
            <Card>
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
                      <TextFormInput control={control} type="text" name="pagename" label="Search engine friendly page name" placeholder="Enter Page Name" />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mb-0">
                      <TextAreaFormInput rows={4} control={control} type="text" name="description2" label="Meta Description" placeholder="Type meta description" />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter className="border-top d-flex justify-content-end">
                <button type='submit' className="btn btn-primary">
                  Create Product
                </button>
              </CardFooter>
            </Card>
          </form>
        </Tab>
        {/* <Tab eventKey={"configurableproduct"} title="Configurable Product" >
          <ConfigurableProduct
            geColorOptions={geColorOptions}
            attributeSetOptions={attributeSetOptions}
            brandOptions={brandOptions}
            categoryOptions={categoryOptions}
            attributeSet={attributeSet}
          />
        </Tab> */}
      </Tabs>
    </div>
  </Col>;
};
export default AddProduct;
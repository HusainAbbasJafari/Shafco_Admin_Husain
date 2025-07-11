"use client"
import FileUpload from '@/components/FileUpload';
import TextAreaFormInput from '@/components/form/TextAreaFormInput';
import TextFormInput from '@/components/form/TextFormInput';
import { useNotificationContext } from '@/context/useNotificationContext';
import { clearImages, storeImage } from '@/redux/slices/fileSlice';
import api from '@/services/api';
import { useBrandList } from '@/services/brandServices';
import { useCategoryList } from '@/services/categoryServices';
import { useAttributes, useAttributeSetsList, useProduct } from '@/services/productServices';
import { customSelectStyles, detectDarkMode, formatIDRCurrency, formatIDRCustom, mapToSelectOptions, selectDisabled, toLocalDateString, unformatIDR } from '@/utils/other';
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Row, Tab, Tabs } from 'react-bootstrap';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import Select, { components } from 'react-select';
import * as Yup from "yup";
import AdvancedPricing from '../../product-add/components/AdvancedPricing';
import { priceType } from '@/assets/data/products';
import { useStoreList } from '@/services/storeServices';


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

  const [dynamicSchema, setDynamicSchema] = useState(null);
  const [quillEditorContent, setQuillEditorContent] = useState('');
  const [productId, setProductId] = useState(null)
  const urlParams = useSearchParams();
  const variantId = urlParams.get('variantId') ? atob(urlParams.get('variantId')) : null;

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
    watch,
    resetField,
    trigger
  } = useForm({
    resolver: yupResolver(dynamicSchema),
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "specialPrices",
  });

  const attributeSet = watch("attributeSet");
  const advancedPrice = watch('advancedPrice');

  const params = useParams();
  const { showNotification } = useNotificationContext();
  const uploadedImages = useSelector((state) => state.files.image);
  const [sellingPrice, setSellingPrice] = useState(0)
  const [price, setPrice] = useState(0)


  const { data: categoryList } = useCategoryList({ state: 1, searchTerm: "", pageSize: 200, pageNumber: 1 })
  const { data: brandList } = useBrandList({ pageSize: 500, pageNumber: 1, searchTerm: "", filterStatus: 1 })
  const { data: attributeSetList } = useAttributeSetsList({ pageSize: 200, pageNumber: 1, searchTerm: "" });
  const { data: storeList } = useStoreList({
    pageSize: 500,
    pageNumber: 1,
    searchingTerm: null,
    filterStatus: 1,
  })
  const { data: attributes } = useAttributes(attributeSet?.value)
  const categoryOptions = mapToSelectOptions(categoryList?.data, "categoryName", "id");
  const brandOptions = mapToSelectOptions(brandList?.data, "brandName", "id");
  const dispatch = useDispatch()
  const attributeSetOptions = mapToSelectOptions(attributeSetList?.data || [], 'attributeSetName', 'id');
  const storeOptions = mapToSelectOptions(storeList?.storesResponses, "storeName", "id");

  useEffect(() => {
    dispatch(clearImages())
  }, [])

  useEffect(() => {
    if (params?.encodedId) {
      const decodedId = atob(params.encodedId);
      setProductId(decodedId);
    }
  }, [params])


  const { data: product } = useProduct({ id: productId, variantId });
  const router = useRouter();
  
  const isDisabled = product?.productTypeName?.toLowerCase() === 'simple' && product?.variantId;

  useEffect(() => {
    let baseSchema = {
      productname: Yup.string().trim().min(1, "Product Name is required").max(100, "Product Name cannot exceed 100 characters").required("Product Name is required"),
      sku: Yup.string().trim().min(1, "SKU is required").required("SKU is required"),
      productstock: Yup.string().trim().min(1, "Product stock is required").required("Product stock is required"),
      sellingprice: Yup.string().trim().min(1, "Selling Price is required").required("Selling Price is required"),
      price: Yup.string().trim().min(1, "Price is required").required("Price is required"),
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

  const NoChipsValueContainer = ({ children, ...props }) => {
    const filteredChildren = children.filter((child) => child && child.type !== components.MultiValue)
    return <components.ValueContainer {...props}>{filteredChildren}</components.ValueContainer>
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

  useEffect(() => {
    if (Array.isArray(attributes) && attributes.length > 0 && Array.isArray(product?.productAttributes)) {
      attributes.forEach((item) => {
        const matchedAttribute = product.productAttributes.find(
          (attr) => attr?.attributesId === item?.attributeMasterId
        );

        if (!matchedAttribute || !Array.isArray(item?.productAttributeValues)) return;

        const inputValue = item.productAttributeValues.find((value) =>
          matchedAttribute.values?.some((val) => val.attributeValuesId === value.id)
        );

        if (inputValue) {
          setValue(item?.attributeName?.toLowerCase(), {
            label: inputValue.attributeValue,
            value: inputValue.id,
            ...(item.attributeName.toLowerCase() === 'color' && {
              color: inputValue.hexCode,
            }),
          });
        }
      });
    }
  }, [product, attributes])


  useEffect(() => {
    if (product) {
      const image = Array.isArray(product?.defaultImagesWithId) && product?.defaultImagesWithId[0]?.defaultImageUrl;
      const specialPrices = product?.productSpecialPriceRules?.map((specialPrice) => ({
        specialPriceId: specialPrice?.specialPriceId || '',
        pricetype: specialPrice?.priceType ? priceType.find((type) => type.value === specialPrice.priceType) : null,
        value: specialPrice?.value,
        fromDate: specialPrice?.startDate ? toLocalDateString(specialPrice.startDate) : null,
        toDate: specialPrice?.endDate ? toLocalDateString(specialPrice.endDate) : null,
        customergroups: mapToSelectOptions(specialPrice?.specialPriceRuleCustomerGroups, "roleName", "roleId"),
        locations: specialPrice?.appliesToAllStores ? [{ label: "All Stores", value: "ALL" }, ...storeOptions] : mapToSelectOptions(specialPrice?.specialPriceRuleStores, "storeName", "storeId"),
        applyToWebsite: specialPrice?.appliesToWebsite || false,
        applyToMobile: specialPrice?.appliesToMobileApp || false,
      }))
      setValue('productname', product.productName)
      setValue('productcategory', { value: product?.categoryId, label: product?.categoryName })
      setValue("brands", { value: product?.brandId, label: product?.brandName })
      setValue("sku", product?.sku)
      setValue("productstock", product?.quantity)
      setValue("tags", product?.productTag)
      setValue("meta", product?.metaTitle)
      setValue("metaTag", product?.metaKeyword)
      setValue("pagename", product?.metaPageNumber)
      setValue("description2", product?.metaDescription)
      setValue("attributeSet", { value: product?.attributeSetId, label: product?.attributeSetName })
      setValue("sellingprice", formatIDRCustom(product?.sellingPrice.split(" ")[1]) || 0)
      setValue("price", formatIDRCustom(product?.price?.split(" ")[1]) || 0)
      setSellingPrice(formatIDRCustom(product?.sellingPrice.split(" ")[1]))
      setPrice(formatIDRCustom(product?.price?.split(" ")[1]) || 0)
      setQuillEditorContent(product?.productDescription)
      setValue("specialPrices", specialPrices || [])
      setValue("defaultbaseprice", formatIDRCurrency(product?.defaultBasePrice?.toString()) || "")
      setValue("advancedPrice", product?.isSpecialPriceEnabled || false)
      dispatch(storeImage(image ? [{ name: image, preview: image, path: image }] : []))
    }
  }, [product])


  const CustomOption = (props) => (
    <components.Option {...props}>
      <span
        style={{
          width: 16,
          height: 16,
          borderRadius: '50%',
          backgroundColor: props.data.color,
          display: 'inline-block',
          marginBottom: "-1px",
          marginRight: "7px",

        }}
      />
      {props.data.label}
    </components.Option>
  );

  // Custom single value with color circle
  const CustomSingleValue = (props) => (
    <components.SingleValue {...props}>
      <span
        style={{
          width: 16,
          height: 16,
          borderRadius: '50%',
          backgroundColor: props.data.color,
          display: 'inline-block',
          marginBottom: "-3px",
          marginRight: "7px"
        }}
      />
      {props.data.label}
    </components.SingleValue>
  );

  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      const productId = product?.id || "";
      const defaultImage = product?.defaultImagesWithId?.[0] || {};
      const uploadedImage = uploadedImages?.[0];

      const productImage = uploadedImage instanceof File ? uploadedImage : uploadedImages[0]?.name;
      const productImageName = uploadedImage instanceof File
        ? uploadedImage?.name
        : defaultImage?.defaultImageName;
      const imageId = defaultImage?.imageId || "";

      formData.append(`ProductImages[0].ProductId`, productId);
      formData.append(`ProductImages[0].ProductVariantId`, "");
      formData.append(`ProductImages[0].ProductImage`, productImage);
      formData.append(`ProductImages[0].ProductImageName`, productImageName);
      formData.append(`ProductImages[0].imageId`, imageId);
      formData.append("ProductId", product?.id)
      const response = await api.post("/api/Product/UpsertProductImages", formData);
      if (response.data.statusCode === 200 && response.data.isSuccess === true) {

      } else {
      }
    } catch (error) {
    }
  };

  const handleCreateProduct = handleSubmit(async (data) => {
    try {

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
          specialPriceId: rule.specialPriceId || null,
          priceType: rule.pricetype?.value || null,
          value: rule.pricetype?.value === "percentagediscount" ? Number(rule.value) : Number(unformatIDR(rule.value)) || 0,
          startDate: rule.fromDate ? toLocalDateString(rule.fromDate) : null,
          endDate: rule.toDate ? toLocalDateString(rule.toDate) : null,
          specialPriceRuleCustomerGroupsId: rule.customergroups?.map(group => group.value) || [],
          specialPriceRuleStoresId: rule.locations?.filter(location => location.value !== 'ALL')?.map((loc) => loc.value) || [],
          appliesToWebsite: rule.applyToWebsite || false,
          appliesToMobileApp: rule.applyToMobile || false,
          appliesToAllCustomerGroups: false,
          appliesToAllStores: rule?.locations?.some(location => location.value === 'ALL'),
        }
      })


      const payload = {
        id: product?.id || "",
        productName: data.productname,
        description: quillEditorContent,
        productTypeId: product?.productTypeId || "",
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
        productType: "simple",
        attributeSetId: data.attributeSet?.value,
        productVariantId: product?.productVariantId || "",
        productAttributes: dynamicAttributes,

        isSpecialPriceEnabled: data?.advancedPrice || false,
        fallbackPrice: {
          defaultBasePrice: unformatIDR(data.defaultbaseprice) || 0,
          fallbackBehavior: "",
        },
        specialPriceRules,
        variantId: product?.variantId || null,
        apiType: product?.variantId ? "variantproduct" : ""
      };
      const response = await api.post("/api/Product/CreateUpdateProduct", payload);

      if (response.data.statusCode === 200 && response.data.isSuccess === true) {
        showNotification({
          message: response.data.message || "Updated successfully!",
          variant: "success",
        });
        handleImageUpload()
        router.push("/products/product-list");
      } else {
        showNotification({
          message: response.data.message || "Update Failed!",
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
                            styles={{
                              ...customSelectStyles,
                              ...(isDisabled ? selectDisabled() : {})
                            }}
                            onChange={(selectedOption) => { field.onChange(selectedOption); }}
                            isDisabled={isDisabled}
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
                            styles={{
                              ...customSelectStyles,
                              ...(isDisabled ? selectDisabled() : {})
                            }}
                            onChange={(selectedOption) => { field.onChange(selectedOption); }}
                            isDisabled={isDisabled}

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
                            styles={{
                              ...customSelectStyles,
                              ...(isDisabled ? selectDisabled() : {})
                            }}
                            isDisabled={isDisabled}
                            onChange={(selectedOption) => {
                              field.onChange(selectedOption)
                              Array.isArray(attributes) && attributes?.forEach(attr => {
                                resetField(attr.attributeName); // clears the value for each dynamic input
                              })
                            }}
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
                                  styles={{
                                    ...customSelectStyles,
                                    ...(isDisabled ? selectDisabled(isDisabled) : {})
                                  }}
                                  closeMenuOnSelect={false}
                                  isDisabled={isDisabled}

                                  components={
                                    attr.attributeName === 'Color'
                                    && {
                                      Option: ColorCircles,
                                      ValueContainer: NoChipsValueContainer,
                                      SingleValue: CustomSingleValue
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

                  {/* <Col lg={6}>
                    <div className='mb-3'>
                      <label htmlFor="sizes" className="form-label">
                        Sizes <span className='text-primary'>*</span>
                      </label>
                      <Controller
                        name="sizes"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={sizeOptions}
                            className="react-select-container"
                            classNamePrefix="react-select"
                            placeholder="Select Sizes"
                            styles={customSelectStyles}
                            onChange={(selectedOption) => { field.onChange(selectedOption); }}
                          />
                        )}
                      />
                      {errors.sizes && <p className="text-danger">{errors.sizes.message}</p>}
                    </div>

                  </Col>
                  <Col lg={6}>
                    <div className='mb-3'>
                      <label htmlFor="colors" className="form-label">
                        Colors <span className='text-primary'>*</span>
                      </label>
                      <Controller
                        name="colors"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={colorOptions}
                            className="react-select-container"
                            classNamePrefix="react-select"
                            styles={customSelectStyles}
                            placeholder="Select Colors"
                            components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                            onChange={(selectedOption) => { field.onChange(selectedOption); }}
                          />
                        )}
                      />
                      {errors.colors && <p className="text-danger">{errors.colors.message}</p>}
                    </div>
                  </Col> */}
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

                      <ReactQuill value={quillEditorContent} onChange={setQuillEditorContent} isDisabled={isDisabled} />
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
                        disabled={isDisabled}
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
                      <input
                        type="text"
                        id="selling-price"
                        className="form-control"
                        placeholder="Selling Price"
                        value={sellingPrice}
                        {...register("sellingprice")}
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
                      <input type="text" id="tag-id" className="form-control" placeholder="Tags" {...register("tags")} disabled={isDisabled} />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              {/* <CardFooter className="border-top d-flex justify-content-end">
            <button type='submit' className="btn btn-primary">
              Create Product
            </button >
          </CardFooter> */}
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
              {(advancedPrice && !product.variantId) ? (
                <CardBody>
                  <AdvancedPricing
                    fields={fields}
                    setValue={setValue}
                    append={append}
                    remove={remove}
                    errors={errors}
                    control={control}
                    register={register}
                    update={update}
                    productId={product?.id}
                    isEdit={true}
                  />
                </CardBody>
              ) : <></>}
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
                  Update Product
                </button >
              </CardFooter>
            </Card>
          </form>
        </Tab>
        {/* <Tab eventKey={"pricing"} title="Pricing Details" >
          <Card>
            <CardHeader>
              <CardTitle as={'h4'}>Pricing Details</CardTitle>
            </CardHeader>
            <CardBody>
              <Row>
                <Col lg={4}>
                  <form>
                    <label htmlFor="product-price" className="form-label">
                      Price
                    </label>
                    <div className="input-group mb-3">
                      <span className="input-group-text fs-20">
                        <IconifyIcon icon="bx:dollar" />
                      </span>
                      <input type="number" id="product-price" className="form-control" defaultValue={'000'} />
                    </div>
                  </form>
                </Col>
                <Col lg={4}>
                  <form>
                    <label htmlFor="product-discount" className="form-label">
                      Discount
                    </label>
                    <div className="input-group mb-3">
                      <span className="input-group-text fs-20">
                        <IconifyIcon icon="bxs:discount" />
                      </span>
                      <input type="number" id="product-discount" className="form-control" defaultValue={'000'} />
                    </div>
                  </form>
                </Col>
                <Col lg={4}>
                  <form>
                    <label htmlFor="product-tex" className="form-label">
                      Tex
                    </label>
                    <div className="input-group mb-3">
                      <span className="input-group-text fs-20">
                        <IconifyIcon icon="bxs:file-txt" />
                      </span>
                      <input type="number" id="product-tex" className="form-control" placeholder="000" defaultValue={'000'} />
                    </div>
                  </form>
                </Col>
              </Row>
            </CardBody>
            <CardFooter className="border-top d-flex justify-content-end">
              <button type='submit' className="btn btn-primary">
                Create Pricing
              </button >
            </CardFooter>
          </Card>
        </Tab> */}
        {/* <Tab eventKey={'tierpricing'} title="Tier Pricing">
        </Tab> */}
      </Tabs>
    </div>
    {/* <div className="p-3 bg-light mb-3 rounded">
      <Row className="justify-content-end g-2">
        <Col lg={2}>
          <Link href="" className="btn btn-outline-secondary w-100">
            Create Product
          </Link>
        </Col>
        <Col lg={2}>
          <Link href="" className="btn btn-primary w-100">
            Cancel
          </Link>
        </Col>
      </Row>
    </div> */}
  </Col>;
};
export default AddProduct;




{/* <div className="mt-3">
              <h5 className="text-dark fw-medium">Size :</h5>
              <div className="d-flex flex-wrap gap-2" role="group" aria-label="Basic checkbox toggle button group">
                <input type="checkbox" className="btn-check" id="size-xs1" />
                <label className="btn btn-light avatar-sm rounded d-flex justify-content-center align-items-center" htmlFor="size-xs1">
                  XS
                </label>
                <input type="checkbox" className="btn-check" id="size-s1" />
                <label className="btn btn-light avatar-sm rounded d-flex justify-content-center align-items-center" htmlFor="size-s1">
                  S
                </label>
                <input type="checkbox" className="btn-check" id="size-m1" />
                <label className="btn btn-light avatar-sm rounded d-flex justify-content-center align-items-center" htmlFor="size-m1">
                  M
                </label>
                <input type="checkbox" className="btn-check" id="size-xl1" />
                <label className="btn btn-light avatar-sm rounded d-flex justify-content-center align-items-center" htmlFor="size-xl1">
                  Xl
                </label>
                <input type="checkbox" className="btn-check" id="size-xxl1" />
                <label className="btn btn-light avatar-sm rounded d-flex justify-content-center align-items-center" htmlFor="size-xxl1">
                  XXL
                </label>
                <input type="checkbox" className="btn-check" id="size-3xl1" />
                <label className="btn btn-light avatar-sm rounded d-flex justify-content-center align-items-center" htmlFor="size-3xl1">
                  3XL
                </label>
              </div>
            </div> */}


{/* <div className="mt-3">
              <h5 className="text-dark fw-medium">Colors :</h5>
              <div className="d-flex flex-wrap gap-2" role="group" aria-label="Basic checkbox toggle button group">
                <input type="checkbox" className="btn-check" id="color-dark1" defaultChecked />
                <label className="btn btn-light avatar-sm rounded d-flex justify-content-center align-items-center" htmlFor="color-dark1">
                  {' '}
                  <span>
                    {' '}
                    <IconifyIcon icon="bxs:circle" className="fs-18 text-dark" />
                  </span>
                </label>
                <input type="checkbox" className="btn-check" id="color-yellow1" />
                <label className="btn btn-light avatar-sm rounded d-flex justify-content-center align-items-center" htmlFor="color-yellow1">
                  {' '}
                  <span>
                    {' '}
                    <IconifyIcon icon="bxs:circle" className="fs-18 text-warning" />
                  </span>
                </label>
                <input type="checkbox" className="btn-check" id="color-white1" />
                <label className="btn btn-light avatar-sm rounded d-flex justify-content-center align-items-center" htmlFor="color-white1">
                  {' '}
                  <span>
                    {' '}
                    <IconifyIcon icon="bxs:circle" className="fs-18 text-white" />
                  </span>
                </label>
                <input type="checkbox" className="btn-check" id="color-red1" />
                <label className="btn btn-light avatar-sm rounded d-flex justify-content-center align-items-center" htmlFor="color-red1">
                  {' '}
                  <span>
                    {' '}
                    <IconifyIcon icon="bxs:circle" className="fs-18 text-primary" />
                  </span>
                </label>
                <input type="checkbox" className="btn-check" id="color-green1" />
                <label className="btn btn-light avatar-sm rounded d-flex justify-content-center align-items-center" htmlFor="color-green1">
                  {' '}
                  <span>
                    {' '}
                    <IconifyIcon icon="bxs:circle" className="fs-18 text-success" />
                  </span>
                </label>
                <input type="checkbox" className="btn-check" id="color-blue1" />
                <label className="btn btn-light avatar-sm rounded d-flex justify-content-center align-items-center" htmlFor="color-blue1">
                  {' '}
                  <span>
                    {' '}
                    <IconifyIcon icon="bxs:circle" className="fs-18 text-danger" />
                  </span>
                </label>
                <input type="checkbox" className="btn-check" id="color-sky1" />
                <label className="btn btn-light avatar-sm rounded d-flex justify-content-center align-items-center" htmlFor="color-sky1">
                  {' '}
                  <span>
                    {' '}
                    <IconifyIcon icon="bxs:circle" className="fs-18 text-info" />
                  </span>
                </label>
                <input type="checkbox" className="btn-check" id="color-gray1" />
                <label className="btn btn-light avatar-sm rounded d-flex justify-content-center align-items-center" htmlFor="color-gray1">
                  {' '}
                  <span>
                    {' '}
                    <IconifyIcon icon="bxs:circle" className="fs-18 text-secondary" />
                  </span>
                </label>
              </div>
            </div> */}

{/* <Col lg={4}>
            <form>
              <div className="mb-3">
                <label htmlFor="product-weight" className="form-label">
                  Weight
                </label>
                <input type="text" id="product-weight" className="form-control" placeholder="In gm & kg" />
              </div>
            </form>
          </Col> */}
'use client';
import api from '@/services/api';
import { customSelectStyles, formatIDRCurrency, mapToSelectOptions, unformatIDR } from '@/utils/other';
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from 'react';
import { Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Select, { components } from 'react-select';
import * as Yup from "yup";
import { useNotificationContext } from '@/context/useNotificationContext';
import { useAttributes, useAttributeSetsList } from '@/services/productServices';
import { useBrandList } from '@/services/brandServices';
import { useCategoryList } from '@/services/categoryServices';
import Variations from './variations';
import { useRouter } from 'next/navigation';


const ConfigurableProduct = () => {

    // const attributeSetOptions = mapToSelectOptions(attributeSetList?.data || [], 'attributeSetName', 'id')
    const { data: attributeSetList } = useAttributeSetsList({ pageSize: 200, pageNumber: 1, searchTerm: "" });
    const { data: brandList } = useBrandList({ pageSize: 500, pageNumber: 1, searchTerm: "" })
    const { data: categoryList } = useCategoryList({ state: 1, searchTerm: "", pageSize: 200, pageNumber: 1 })

    const { showNotification } = useNotificationContext();

    const [dynamicSchema, setDynamicSchema] = useState(null);
    const [quillEditorContent, setQuillEditorContent] = useState('');
    const [variations, setVariations] = useState([]);
    const [formData, setFormData] = useState({})
    const [sellingPrice, setSellingPrice] = useState(0)
    const [price, setPrice] = useState(0)

    const geColorOptions = (colors) => {
        const colorOptions = colors?.map((color) => ({
            label: color?.attributeValue,
            value: color?.id,
            color: color?.hexCode
        }))
        return colorOptions;
    }


    const attributeSetOptions = mapToSelectOptions(attributeSetList?.data || [], 'attributeSetName', 'id')
    const brandOptions = mapToSelectOptions(brandList?.data, "brandName", "id");
    const categoryOptions = mapToSelectOptions(categoryList?.data, "categoryName", "id");

    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
        setValue,
        watch
    } = useForm({
        resolver: yupResolver(dynamicSchema)
    });

    const attributeSet = watch("attributeSet");
    const router = useRouter();
    const { data: attributes } = useAttributes(attributeSet?.value)

    useEffect(() => {
        let baseSchema = {
            productname: Yup.string().trim().min(1, "Product Name is required").max(100, "Product Name cannot exceed 100 characters").required("Product Name is required"),
            sku: Yup.string().trim().min(1, "SKU is required").required("SKU is required"),
            // tagnumber: Yup.string().trim().min(1, "Tagnumber is required").max(100, "Tag number cannot exceed 100 characters").required("Tagnumber is required"),
            // tags: Yup.string().trim().min(1, "Tags is required").required("Tags is required"),
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
                baseSchema[attr.attributeName] = Yup.array()
                    .min(1, `${attr.attributeName} is required`)
                    .of(
                        Yup.object().shape({
                            label: Yup.string().required(),
                            value: Yup.mixed().required()
                        })
                    )
                    .required(`${attr.attributeName} is required`);
            });
        }

        setDynamicSchema(Yup.object().shape(baseSchema));
    }, [attributes]);


    const CheckboxOption = (props) => (
        <components.Option {...props}>
            <input
                type="checkbox"
                checked={props.isSelected}
                className="form-check-input"
                onChange={() => { }}
                style={{ marginRight: 8 }}
            />
            <label>{props.label}</label>
        </components.Option>
    );


    const ColorCheckboxOption = (props) => (
        <components.Option {...props}>
            <input
                type="checkbox"
                checked={props.isSelected}
                className="form-check-input"
                onChange={() => { }}
                style={{ marginRight: 8 }}
            />
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

            const imageData = variations?.map((item) => {
                const variant = data?.variantMappings?.find(variant => variant.sku === item.sku);
                return {
                    productId: data?.productId,
                    productVariantId: variant?.productVariantId || "",
                    image: item?.image?.file || "",
                    productImageName: item?.image?.file?.name,
                    imageId: ""
                }
            })

            const formData = new FormData();
            imageData.forEach((item, index) => {
                formData.append(`ProductImages[${index}].ProductId`, item.productId);
                formData.append(`ProductImages[${index}].ProductVariantId`, item?.productVariantId);
                formData.append(`ProductImages[${index}].ProductImage`, item?.image);
                formData.append(`ProductImages[${index}].ProductImageName`, item.productImageName);
                formData.append(`ProductImages[${index}].imageId`, '');
            })

            formData.append("ProductId", data?.productId)
            const response = await api.post("/api/Product/UpsertProductImages", formData);
            if (response.data.statusCode === 200 && response.data.isSuccess === true) {


            } else {
            }
        } catch (error) {

        }
    };


    const handleCreateProduct = async () => {
        try {
            const variants = Array.isArray(variations) ? variations?.map(item => {
                return {
                    variantAttributes: item.attributes?.map(attr => ({
                        attributeId: attr.attributeMasterId,
                        value: attr.value
                    })),
                    price: unformatIDR(item.price) || 0,
                    stock: item.stock,
                    sku: item.sku,
                    isActive: item.isActive,
                    variantId: null
                };
            }) : null;

            const reqBody = {
                ...formData,
                variants
            }

            const response = await api.post("/api/Product/CreateUpdateProduct", reqBody);

            if (response.status === 200) {
                showNotification({
                    message: response.data.message || "Created successfully!",
                    variant: "success",
                });
                handleImageUpload(response?.data?.data);
                router.push('/products/product-list');

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
    };


    const handleGenerateVariations = handleSubmit(async (data) => {

        const dynamicAttributes = attributes.map(attr => {
            const selected = data[attr.attributeName];

            let attributeValueIds = Array.isArray(selected) ? selected.map(item => item.value) : selected?.value ? [selected.value] : null;
            return {
                attributeMasterId: attr.attributeMasterId,
                attributeValueIds
            };
        });

        const dynamicAttributeNames = attributes.map(attr => {
            const selected = data[attr.attributeName];

            let attributeValueNames = Array.isArray(selected) ? selected.map(item => ({ attributeValueId: item.value, value: item.label })) : [];
            return {
                name: attr.attributeName,
                attributeMasterId: attr.attributeMasterId,
                values: attributeValueNames
            };
        });

        try {
            const payload = {
                productName: data.productname,
                description: quillEditorContent,
                // productTypeId: null,
                productType: "configurable",
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
                isSpecialPriceEnabled: false,
                specialPriceRules: null,
                fallbackPrice: null,
                // productTagNumber: data.tagnumber,
                attributeSetId: data.attributeSet?.value,
                productAttributes: dynamicAttributes,
            };

            const reqBody2 = {
                "sku" : data.sku,
                "attributeSetId" : data.attributeSet?.value,
                "sellingPrice" : unformatIDR(sellingPrice) || 0,
                "attributes": dynamicAttributeNames
            }


            const response = await api.post("/api/Product/generateVariantsCombinations", reqBody2,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

            if (response.status === 200) {
                showNotification({
                    message: response.data.message || "Created successfully!",
                    variant: "success",
                });
                setFormData(payload);

                const data = response.data.data;

                if (Array.isArray(data)) {
                    const dataWithTempId = data.map((item, index) => ({
                        ...item,
                        tempId: `temp-${index}`,
                        sku : item?.variantSKU,
                        price: formatIDRCurrency(item.sellingPrice?.toString() || '0'),
                    }));
                    setVariations(dataWithTempId || []);
                }

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

    
    return (
        <div>
            <form onSubmit={handleGenerateVariations} >
                <Card>
                    <CardHeader>
                        <CardTitle as={'h4'}>Configurable Product Information</CardTitle>
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
                                                    name={attr.attributeName}
                                                    control={control}
                                                    render={({ field }) => (
                                                        < Select
                                                            {...field}
                                                            isMulti
                                                            options={attr.attributeName === 'Color' ? geColorOptions(attr?.productAttributeValues) : mapToSelectOptions(attr?.productAttributeValues, "attributeValue", "id")}
                                                            className="react-select-container"
                                                            classNamePrefix="react-select"
                                                            placeholder={`Select ${attr.attributeName}`}
                                                            styles={customSelectStyles}
                                                            closeMenuOnSelect={false}
                                                            hideSelectedOptions={false}
                                                            components={
                                                                attr.attributeName === 'Color'
                                                                    ? {
                                                                        Option: ColorCheckboxOption,
                                                                        // MultiValue: CustomMultiValue,
                                                                        ValueContainer: NoChipsValueContainer
                                                                    }
                                                                    : {
                                                                        Option: CheckboxOption,
                                                                        ValueContainer: NoChipsValueContainer
                                                                    }
                                                            }
                                                            onChange={(selectedOption) => field.onChange(selectedOption)}
                                                        />
                                                    )}
                                                />
                                                {errors[attr.attributeName] && (
                                                    <p className="text-danger">{errors[attr.attributeName]?.message}</p>
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
                                    <label htmlFor="product-stock" className="form-label">
                                        Selling Price <span className='text-primary'>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="product-stock"
                                        className="form-control"
                                        placeholder="Selling Price"
                                        {...register("sellingprice")}
                                        value={sellingPrice}
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
                                    <label htmlFor="tag-id" className="form-label">
                                        Tags
                                    </label>
                                    <input type="text" id="tag-id" className="form-control" placeholder="Tags" {...register("tags")} />
                                </div>
                            </Col>
                        </Row>

                    </CardBody>
                    <CardFooter className="border-top d-flex justify-content-end">
                        <button type='submit' className="btn btn-primary">
                            Generate Variations
                        </button>
                    </CardFooter>
                </Card>

            </form>
            {Array.isArray(variations) && variations.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle as={'h4'}>Variations</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Variations register={register} errors={errors} variations={variations} setVariations={setVariations} />
                        </Row>
                    </CardBody>
                    <CardFooter className="border-top d-flex justify-content-end">
                        <button type='submit' className="btn btn-primary" onClick={handleCreateProduct}>
                            Create Product
                        </button>
                    </CardFooter>
                </Card>
            )}
        </div>
    )
}

export default ConfigurableProduct
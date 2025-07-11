
"use client"
import { useNotificationContext } from '@/context/useNotificationContext'
import api from '@/services/api'
import { useCategoryList } from '@/services/categoryServices'
import { useCategoryRule } from '@/services/priceRulesServices'
import { useRoleList } from '@/services/roleServices'
import { useStoreList } from '@/services/storeServices'
import { customSelectStyles, formatIDRCurrency, formatIDRCustom, mapToSelectOptions, toLocalDateString, unformatIDR } from '@/utils/other'
import { yupResolver } from '@hookform/resolvers/yup'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import Select, { components } from 'react-select'
import * as Yup from 'yup'

const schema = Yup.object().shape({
    ruleName: Yup.string().trim().min(1, 'Rule Name is required').max(100, 'Rule Name cannot exceed 100 characters').required('Rule Name is required'),
    discountType: Yup.object().nullable().test("Discount-type", "Discount Type is required", function (value) {
        return value && value.label && value.value;
    }),
    categories: Yup.array()
        .min(1, 'At least one category must be selected')
        .of(
            Yup.object().shape({
                label: Yup.string().required(),
                value: Yup.string().required(),
            }),
        )
        .required('Categories are required'),
    stores: Yup.array()
        .min(1, 'At least one stores must be selected')
        .of(
            Yup.object().shape({
                label: Yup.string().required(),
                value: Yup.string().required(),
            }),
        )
        .required('Stores are required'),
    customergroups: Yup.array()
        .min(1, 'At least one customer group must be selected')
        .of(
            Yup.object().shape({
                label: Yup.string().required(),
                value: Yup.string().required(),
            }),
        )
        .required('Customer Groups are required'),
})

const discountType = [
    {
        label: "Percentage",
        value: "percentage discount",
    },
    {
        label: "Fixed",
        value: "fixed amount",
    },
]

const EditPriceRuleForm = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
        setValue,
        watch,
    } = useForm({
        resolver: yupResolver(schema),
    })


    const router = useRouter()
    const params = useParams();
    const [ruleId, setRuleId] = useState(null);
    const { showNotification } = useNotificationContext();
    const { data: categoryList } = useCategoryList({ status: 1, searchTerm: '', pageSize: 200, pageNumber: 1 })
    const { data: storeList } = useStoreList({
        pageSize: 200,
        pageNumber: 1,
        searchingTerm: '',
        filterStatus: 1
    })

    const { data: roleList } = useRoleList({
        searchingTerm: null,
        filterStatus: 1,
        roleType: null,
        pageNumber: 1,
        pageSize: 200
    });

    const categoryOption = mapToSelectOptions(categoryList?.data, 'categoryName', 'id')
    const storeOptions = mapToSelectOptions(storeList?.storesResponses, "storeName", "id");
    const roleOptions = mapToSelectOptions(roleList?.data, "roleName", "id");
    const selectedDiscType = watch('discountType')
    const discountValue = watch('discountValue');


    useEffect(() => {
        if (params?.encodedId) {
            const decodedId = atob(params.encodedId);
            setRuleId(decodedId);
        }
    }, [params])

    const { data: priceRule } = useCategoryRule(ruleId);

    useEffect(() => {
        if (priceRule) {
            setValue('ruleName', priceRule.ruleName);
            setValue('status', priceRule.isActive ? 'active' : 'inactive');
            setValue('discountType', priceRule.discountType ? discountType.find(option => option.value === priceRule.discountType) : null);
            setValue('fromDate', priceRule.activeFrom ? toLocalDateString(priceRule.activeFrom) : '');
            setValue('toDate', priceRule.activeTo ? toLocalDateString(priceRule.activeTo) : '');
            setValue('categories', Array.isArray(priceRule.categoryRuleResponse) ? mapToSelectOptions(priceRule?.categoryRuleResponse, "categoryName", "categoryId") : []);
            setValue('stores', Array.isArray(priceRule.ruleStoreResponse) ? mapToSelectOptions(priceRule?.ruleStoreResponse, "storeName", "storeId") : []);
            setValue('customergroups', Array.isArray(priceRule.ruleCustomerGroupResponse) ? mapToSelectOptions(priceRule?.ruleCustomerGroupResponse, "customerGroupName", "customerGroupId") : []);
            setValue('discountValue', priceRule.discountValue ? (priceRule.discountType === 'percentage discount' ? priceRule.discountValue : formatIDRCustom(priceRule.discountValue)) : '');
        }
    }, [priceRule])


    const handleCreatePriceRule = handleSubmit(async (data) => {
        try {
            const payload = {
                id: ruleId || null,
                ruleName: data?.ruleName,
                isActive: data?.status === 'active' ? true : false,
                description: "",
                discountType: data?.discountType?.value,
                discountValue: selectedDiscType.value === "percentage discount" ? data?.discountValue : unformatIDR(data?.discountValue),
                activeFrom: toLocalDateString(data?.fromDate),
                activeTo: toLocalDateString(data?.toDate),
                categoryIds: data?.categories?.map((item) => item.value),
                storeIds: data?.stores?.map((item) => item.value),
                customerGroupIds: data?.customergroups?.map((item) => item.value),
                createdBy: null,
                createdDate: null,
                updatedBy: null,
                updatedDate: null,
                isDeleted: false
            }
            const response = await api.post("/api/Pricing/SaveCategoryRule", payload);
            if (response.data.statusCode === 200 && response.data.isSuccess === true) {
                showNotification({
                    message: response.data.message || "Created successfully!",
                    variant: "success",
                });
                router.push("/promotions/category-price-rules/price-rule-list");
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



    const CheckboxOption = (props) => {
        return (
            <components.Option {...props}>
                <input type="checkbox" checked={props.isSelected} className="form-check-input" onChange={() => { }} style={{ marginRight: 8 }} />
                <label>{props.label}</label>
            </components.Option>
        )
    }

    const NoChipsValueContainer = ({ children, ...props }) => {
        const filteredChildren = children.filter((child) => child && child.type !== components.MultiValue)
        return <components.ValueContainer {...props}>{filteredChildren}</components.ValueContainer>
    }



    return (
        <>
            <Row>
                <Col lg={12}>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Category Price Rule
                            </CardTitle>
                        </CardHeader>
                        <form onSubmit={handleCreatePriceRule}>
                            <CardBody>
                                <Row>
                                    <Col lg={6}>
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">
                                                Rule Name <span className="text-primary">*</span>
                                            </label>
                                            <input type="text" id="name" className="form-control" placeholder="Enter Rule Name" {...register('ruleName')} />
                                            {errors.ruleName && <p className="text-danger">{errors.ruleName.message}</p>}
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <p>Rule Status <span className='text-primary'>*</span></p>
                                        <div className="d-flex gap-2 align-items-center mb-3">
                                            <div className="form-check">
                                                <input className="form-check-input" value={"active"} type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked   {...register("status")} />
                                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                    Active
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" value={"inactive"} type="radio" name="flexRadioDefault" id="flexRadioDefault2"   {...register("status")} />
                                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                    In Active
                                                </label>
                                            </div>
                                        </div>
                                    </Col>

                                    <Col lg={6}>
                                        <div className="mb-3">
                                            <label htmlFor="categories" className="form-label">
                                                Categories <span className="text-primary">*</span>
                                            </label>
                                            <Controller
                                                name="categories"
                                                control={control}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        options={categoryOption}
                                                        className="react-select-container"
                                                        classNamePrefix="react-select"
                                                        closeMenuOnSelect={false}
                                                        hideSelectedOptions={false}
                                                        components={{ Option: CheckboxOption, ValueContainer: NoChipsValueContainer }}
                                                        isMulti
                                                        styles={customSelectStyles}
                                                    />
                                                )}
                                            />
                                            {errors.categories && <p className="text-danger">{errors.categories.message}</p>}
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className="mb-3">
                                            <label htmlFor="stores" className="form-label">
                                                Stores <span className="text-primary">*</span>
                                            </label>
                                            {/* here */}
                                            <Controller
                                                name="stores"
                                                control={control}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        options={storeOptions}
                                                        className="react-select-container"
                                                        classNamePrefix="react-select"
                                                        closeMenuOnSelect={false}
                                                        hideSelectedOptions={false}
                                                        components={{ Option: CheckboxOption, ValueContainer: NoChipsValueContainer }}
                                                        isMulti
                                                        styles={customSelectStyles}
                                                    />
                                                )}
                                            />
                                            {errors.stores && <p className="text-danger">{errors.stores.message}</p>}
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className="mb-3">
                                            <label htmlFor="customergroups" className="form-label">
                                                Customer Groups <span className="text-primary">*</span>
                                            </label>
                                            {/* here */}
                                            <Controller
                                                name="customergroups"
                                                control={control}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        options={roleOptions}
                                                        className="react-select-container"
                                                        classNamePrefix="react-select"
                                                        closeMenuOnSelect={false}
                                                        hideSelectedOptions={false}
                                                        components={{ Option: CheckboxOption, ValueContainer: NoChipsValueContainer }}
                                                        isMulti
                                                        styles={customSelectStyles}
                                                    />
                                                )}
                                            />
                                            {errors.customergroups && <p className="text-danger">{errors.customergroups.message}</p>}
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className='form-group mb-3'>
                                            <label htmlFor="discountType" className="form-label">
                                                Discount Type
                                            </label>
                                            <Controller
                                                name={`discountType`}
                                                control={control}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        options={discountType}
                                                        className="react-select-container"
                                                        classNamePrefix="react-select"
                                                        placeholder="Select Price Type"
                                                        styles={customSelectStyles}
                                                        onChange={(selectedOption) => {
                                                            field.onChange(selectedOption)
                                                        }}
                                                    />
                                                )}
                                            />
                                            {errors.discountType && <p className="text-danger">{errors.discountType.message}</p>}

                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className="mb-3">
                                            <label htmlFor="selling-price" className="form-label">
                                                {`Discount ${selectedDiscType?.value === 'percentage discount' ? "%" : "Value"}`} <span className='text-primary'>*</span>
                                            </label>
                                            <input type="text"
                                                id="value-id"
                                                className="form-control"
                                                placeholder="Discount Value"
                                                value={discountValue}
                                                onChange={(e) => {
                                                    if (selectedDiscType?.value === 'percentage discount') {
                                                        setValue('discountValue', e.target.value)
                                                    } else {
                                                        const formatted = formatIDRCurrency(e.target.value)
                                                        setValue('discountValue', formatted)
                                                    }
                                                }}
                                            />
                                            {errors.discountValue && <p className="text-danger">{errors.discountValue.message}</p>}
                                        </div>
                                    </Col>
                                    <Col lg={3}>
                                        <div className="form-group mb-3">
                                            <label className="form-label">Date Range (From)</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                {...register(`fromDate`)}
                                            // min={new Date().toISOString().split('T')[0]}
                                            />
                                        </div>
                                    </Col>

                                    <Col lg={3}>
                                        <div className="form-group">
                                            <label className="form-label">to</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                {...register(`toDate`)}
                                            // min={new Date().toISOString().split('T')[0]}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter className="border-top d-flex justify-content-end">
                                <button type="submit" className="btn btn-primary">
                                    Update Price Rule
                                </button>
                            </CardFooter>
                        </form>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default EditPriceRuleForm

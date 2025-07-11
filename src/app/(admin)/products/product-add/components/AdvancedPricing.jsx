"use client"
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { useRoleList } from '@/services/roleServices';
import { useStoreList } from '@/services/storeServices';
import { customSelectStyles, formatIDRCurrency, mapToSelectOptions } from '@/utils/other';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Controller } from 'react-hook-form';
import Select, { components } from 'react-select'
import { priceType } from '@/assets/data/products';
import { useQueryClient } from '@tanstack/react-query';
import { useNotificationContext } from '@/context/useNotificationContext';
import api from '@/services/api';

const AdvancedPricing = ({ errors, remove, append, fields, control, register, update, setValue, isEdit = false, productId = null }) => {

    const [limit, setLimit] = useState({ role: 10, store: 10 });
    const queryClient = useQueryClient();
    const { showNotification } = useNotificationContext();

    const handleDeletePriceRule = async (data) => {
        try {
            const query = new URLSearchParams({
                id: data.specialPriceId,
                productId: productId,
                count: fields.length === 1 ? 0 : fields.length - 1
            });

            const response = await api.post(`/api/Product/RemoveSpecialPricingRule?${query.toString()}`);

            if (response.data.statusCode === 200 && response.data.isSuccess === true) {
                showNotification({
                    message: response.data.message || "Deleted successfully!",
                    variant: "success",
                });
                queryClient.invalidateQueries(['product', productId]);
            } else {
                showNotification({
                    message: response.data.message || "Delete Failed!",
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



    const { data: roleList, isLoading } = useRoleList({
        searchingTerm: null,
        filterStatus: 1,
        roleType: null,
        pageNumber: 1,
        pageSize: limit.role
    });


    const { data: storeList, isLoading: storeLoading } = useStoreList({
        pageSize: 500,
        pageNumber: 1,
        searchingTerm: null,
        filterStatus: 1,
    })


    const roleOptions = mapToSelectOptions(roleList?.data, "roleName", "id");
    const storeOptions = mapToSelectOptions(storeList?.storesResponses, "storeName", "id");

    const ALL_STORES_OPTION = { label: "All Stores", value: "ALL" };
    const modifiedStoreOptions = [ALL_STORES_OPTION, ...storeOptions];

    // const columns = [
    //     {
    //         name: 'Type',
    //         selector: (row) => row.category,
    //         sortable: false,
    //     },
    //     {
    //         name: 'Rule Details',
    //         selector: (row) => row.productName,
    //         sortable: true,
    //     },
    //     {
    //         name: 'Price',
    //         selector: (row) => row.categoryName,
    //         sortable: true,
    //     },

    //     {
    //         name: 'Conditions',
    //         selector: (row) => row.brandName,
    //         sortable: true,
    //     },
    //     {
    //         name: 'Date Range',
    //         selector: (row) => row.brandName,
    //         sortable: true,
    //     },

    // ]



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
            <button type='button' className="btn btn-primary ms-auto d-flex align-items-center mb-3">
                <IconifyIcon icon="bx:bx-plus" className="fs-18" /> <span className='me-2' onClick={() =>
                    append({
                        pricetype: null,
                        value: "",
                        fromDate: "",
                        toDate: "",
                        customergroups: null,
                        locations: null,
                    })
                } >Add Special Price</span>
            </button>
            <div className='mb-4'>
                {fields?.map((item, index) => {
                    return (
                        <div className='border p-3 rounded-2 mb-3' key={item.id} >
                            <div className='border-bottom mb-3 py-1 d-flex justify-content-between align-items-center'>
                                <h5>
                                    Special Price
                                </h5>
                                <button
                                    className="btn btn-soft-danger btn-sm"
                                    title="Delete" type="button"
                                    onClick={() => isEdit ? handleDeletePriceRule(item) : remove(index)}
                                >
                                    <IconifyIcon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" />
                                </button>
                            </div>
                            <Row className='align-items-center mb-3'>
                                <Col lg={3}>
                                    <div className='form-group'>
                                        <label htmlFor="pricetype" className="form-label">
                                            Price Type <span className='text-primary'>*</span>
                                        </label>
                                        <Controller
                                            name={`specialPrices.${index}.pricetype`}
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    {...field}
                                                    options={priceType}
                                                    className="react-select-container"
                                                    classNamePrefix="react-select"
                                                    placeholder="Select Price Type"
                                                    styles={customSelectStyles}
                                                    onChange={(selectedOption) => {
                                                        field.onChange(selectedOption);
                                                        update(index, { ...item, pricetype: selectedOption })
                                                    }}
                                                />
                                            )}
                                        />
                                        <div style={{ minHeight: "24px" }}>
                                            {errors.specialPrices?.[index]?.pricetype && (
                                                <p className="text-danger">{errors.specialPrices[index].pricetype.message}</p>
                                            )}
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={3}>
                                    <div className="form-group" >
                                        <label className="form-label">
                                            {`Value ${item?.pricetype?.value === "percentage discount" ? "in %" : ""}`}
                                            <span className='text-primary'>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            {...register(`specialPrices.${index}.value`)}
                                            onChange={(e) => {
                                                if (item?.pricetype?.value !== "percentage discount") {
                                                    const formatted = formatIDRCurrency(e.target.value);
                                                    setValue(`specialPrices.${index}.value`, formatted, {
                                                        shouldValidate: true,
                                                    });
                                                } else {
                                                    setValue(`specialPrices.${index}.value`, e.target.value, {
                                                        shouldValidate: true,
                                                    });
                                                }
                                            }}
                                            min={1}
                                        />
                                        <div style={{ minHeight: "24px" }}>
                                            {errors.specialPrices?.[index]?.value && (
                                                <p className="text-danger">{errors.specialPrices[index].value.message}</p>
                                            )}
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={3}>
                                    <div className="form-group">
                                        <label className="form-label">
                                            Date Range (From)<span className='text-primary'>*</span>
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            {...register(`specialPrices.${index}.fromDate`)}
                                            onChange={(e) => {
                                                const updatedItem = { ...item, fromDate: e.target.value };
                                                update(index, updatedItem);
                                            }}
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                        <div style={{ minHeight: "24px" }}>
                                            {errors.specialPrices?.[index]?.fromDate && (
                                                <p className="text-danger">{errors.specialPrices[index].fromDate.message}</p>
                                            )}
                                        </div>

                                    </div>
                                </Col>
                                <Col lg={3}>
                                    <div className="form-group">
                                        <label className="form-label">
                                            to <span className='text-primary'>*</span>
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            {...register(`specialPrices.${index}.toDate`)}
                                            onChange={(e) => {
                                                const updatedItem = { ...item, toDate: e.target.value };
                                                update(index, updatedItem);
                                            }}
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                        <div style={{ minHeight: "24px" }}>
                                            {errors.specialPrices?.[index]?.toDate && (
                                                <p className="text-danger">{errors.specialPrices[index].toDate.message}</p>
                                            )}
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={4}>
                                    <div className='form-group mb-3'>
                                        <label htmlFor="" className="form-label">
                                            User Role <span className='text-primary'>*</span>
                                        </label>
                                        <Controller
                                            name={`specialPrices.${index}.customergroups`}
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    {...field}
                                                    options={roleOptions}
                                                    className="react-select-container"
                                                    classNamePrefix="react-select"
                                                    placeholder="Select Customer Group"
                                                    styles={customSelectStyles}
                                                    components={{ Option: CheckboxOption, ValueContainer: NoChipsValueContainer }}
                                                    isMulti
                                                    onChange={(selectedOption) => {
                                                        field.onChange(selectedOption);
                                                        update(index, { ...item, customergroups: selectedOption })
                                                    }}
                                                    onMenuScrollToBottom={() => {
                                                        if (roleList?.data?.length < roleList.totalRecords) {
                                                            setLimit((prev) => ({
                                                                ...prev,
                                                                role: prev.role + 10, // Increment only 'role'
                                                            }));
                                                        }
                                                    }}
                                                />
                                            )}
                                        />
                                        {errors.specialPrices?.[index]?.customergroups && (
                                            <p className="text-danger">
                                                {errors.specialPrices[index].customergroups.message}
                                            </p>
                                        )}
                                    </div>
                                </Col>

                                <Col lg={4}>
                                    <div className='form-group mb-3'>
                                        <label htmlFor="" className="form-label">
                                            Store <span className='text-primary'>*</span>
                                        </label>
                                        <Controller
                                            name={`specialPrices.${index}.locations`}
                                            control={control}
                                            render={({ field }) => {
                                                const allSelected = field.value?.length === storeOptions.length;
                                                const valueWithAll = allSelected
                                                    ? [ALL_STORES_OPTION, ...field.value]
                                                    : field.value;

                                                return (
                                                    <Select
                                                        {...field}
                                                        value={valueWithAll}
                                                        options={modifiedStoreOptions}
                                                        className="react-select-container"
                                                        classNamePrefix="react-select"
                                                        placeholder="Select Location"
                                                        styles={customSelectStyles}
                                                        components={{ Option: CheckboxOption, ValueContainer: NoChipsValueContainer }}
                                                        isMulti
                                                        closeMenuOnSelect={false}
                                                        hideSelectedOptions={false}
                                                        onChange={(selectedOption) => {
                                                            const isAllSelected = selectedOption?.some(opt => opt.value === "ALL");
                                                            const onlyStores = selectedOption?.filter((opt) => opt.value !== "ALL")
                                                            let finalSelection = [];
                                                            if (isAllSelected) {
                                                                finalSelection = modifiedStoreOptions;
                                                            } else if (onlyStores.length === storeOptions.length) {
                                                                finalSelection = storeOptions;
                                                            } else {
                                                                finalSelection = onlyStores;
                                                            }
                                                            field.onChange(finalSelection);
                                                            update(index, { ...item, locations: finalSelection });

                                                        }}
                                                    // onMenuScrollToBottom={() => {
                                                    //     if (storeList?.storesResponses?.length < storeList.totalCount) {
                                                    //         setLimit((prev) => ({
                                                    //             ...prev,
                                                    //             store: prev.store + 10,
                                                    //         }));
                                                    //     }
                                                    // }}
                                                    // isLoading={storeLoading} // Show loading state while fetching
                                                    />
                                                )
                                            }}
                                        />
                                        {errors.specialPrices?.[index]?.locations && (
                                            <p className="text-danger">{errors.specialPrices[index].locations.message}</p>
                                        )}
                                    </div>
                                </Col>

                                <Col lg={4}>
                                    <div className='form-group mb-3'>
                                        <label htmlFor="" className="form-label d-block mb-3">
                                            Apply To Platforms <span className='text-primary'>*</span>
                                        </label>
                                        <div className="form-check form-check-inline">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id={`website-${index}`}
                                                {...register(`specialPrices.${index}.applyToWebsite`)}
                                            />
                                            <label className="form-check-label" htmlFor={`website-${index}`}>
                                                Website
                                            </label>
                                        </div>

                                        <div className="form-check form-check-inline">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id={`mobile-${index}`}
                                                {...register(`specialPrices.${index}.applyToMobile`)}
                                            />
                                            <label className="form-check-label" htmlFor={`mobile-${index}`}>
                                                Mobile
                                            </label>
                                        </div>

                                        {errors.specialPrices?.[index]?.atLeastOnePlatform && (
                                            <p className="text-danger">{errors.specialPrices[index].atLeastOnePlatform.message}</p>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    )
                })}
            </div>

            {/* <div className="table-responsive">
                <DataTable
                    columns={columns}
                    data={[]}
                    pagination
                    paginationServer
                    responsive
                    persistTableHead
                    paginationTotalRows={productList?.totalRecords}
                    customStyles={customTableStyles(isDarkMode)}
                    onChangePage={(page) => setPage(page)}
                    onChangeRowsPerPage={(newPerPage, page) => {
                        setPerPage(newPerPage);
                        setPage(page);
                    }}
                />
            </div> */}

            <h4 className='mb-4'>Fallback Price Settings</h4>
            <Row>
                <Col lg="6" >
                    <div className="form-group mb-3" >
                        <label className="form-label">Default Base Price <span className='text-primary'>*</span></label>

                        <input
                            type="text"
                            className="form-control"
                            {...register(`defaultbaseprice`)}
                            onChange={(e) => {
                                const formatted = formatIDRCurrency(e.target.value)
                                setValue('defaultbaseprice', formatted, { shouldValidate: true })
                            }}
                            min={1}
                        />
                        {errors.defaultbaseprice && (
                            <p className="text-danger">{errors.defaultbaseprice.message}</p>
                        )}
                    </div>
                </Col>
                {/* <Col lg="6" >
                    <div className='form-group'>
                        <label htmlFor="defaultbaseprice" className="form-label">
                            Fallback Behavior <span className='text-primary'>*</span>
                        </label>
                        <Controller
                            name={`fallbackbehaviour`}
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={priceType}
                                    className="react-select-container"
                                    classNamePrefix="react-select"
                                    placeholder="Select Customer Group"
                                    styles={customSelectStyles}
                                    onChange={(selectedOption) => {
                                        field.onChange(selectedOption);
                                    }}
                                />
                            )}
                        />
                        {errors.fallbackbehaviour && (
                            <p className="text-danger">{errors.fallbackbehaviour.message}</p>
                        )}
                    </div>
                </Col> */}
            </Row>
        </>
    )
}

export default AdvancedPricing
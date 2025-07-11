"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
    Overlay,
    Popover,
} from "react-bootstrap";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import * as Yup from "yup";
import ConfirmationModal from "../../../../../components/ConfirmationModal";
import { ColorPicker } from 'antd';
import { useNotificationContext } from "@/context/useNotificationContext";
import api from "@/services/api";
import DataTable from "react-data-table-component";
import { customTableStyles, detectDarkMode } from "@/utils/other";
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { useAttributeValue, useAttributeValuesList } from '@/services/productServices';
import { useQueryClient } from "@tanstack/react-query";


// Schema
const schema = Yup.object().shape({
    attributename: Yup.string()
        .trim()
        .min(1, "Attribute Name is required")
        .max(100, "Attribute Name cannot exceed 100 characters")
        .required("Attribute Name is required"),
    values: Yup.array().of(
        Yup.object().shape({
            value: Yup.string()
                .min(1, "Value is required")
                .max(100, "Value cannot exceed 100 characters")
                .trim()
                .required("Value is required")
        })
    )
});

const Attribute = () => {
    const {
        register,
        control,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            values: [{ value: "" }],
        },
    });

    const { showNotification } = useNotificationContext()

    const { fields, append, update } = useFieldArray({
        control,
        name: "values",
        color: "",
        isDeleted: false
    });

    const showColor = watch("switchcolor");

    const [showModal, setShowModal] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState('')
    const [showFilters, setShowFilters] = useState(false)
    const [deleteProps, setDeleteProps] = useState({ modal: false, id: null })
    const [attributeId, setAttributeId] = useState(null)
    const [createLoading, setCreateLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const target = useRef(null);
    const queryClient = useQueryClient();

    const { data: attributeList } = useAttributeValuesList({ pageSize: perPage, pageNumber: page, searchTerm });
    const { data: attributeValue } = useAttributeValue(attributeId)

    const handleModalClose = () => {
        reset({ values: [{ value: "" }] })
        setShowModal(false)
        setAttributeId(null);
    };

    useEffect(() => {
        queryClient.invalidateQueries(['attributeValuesList']);
    }, []);



    useEffect(() => {
        if (attributeValue) {
            setValue("attributename", attributeValue?.attributeName || "");
            const mappedValues = attributeValue?.productAttributeValues?.map(val => ({
                serverId: val.id || "",
                value: val.attributeValue || "",
                color: val.hexCode || "",
                isDeleted: false,
                code: val?.code
            })) || []
            setValue('values', mappedValues);
            const hasColor = mappedValues.some(val => val.color);
            setValue("switchcolor", hasColor);
            setShowModal(true);
        }
    }, [attributeValue, setValue]);

    const handleModalShow = () => setShowModal(true);

    useEffect(() => {
        const mode = detectDarkMode(setIsDarkMode)
        setIsDarkMode(mode)
    }, [])

    const handleSearchTerm = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleDelete = (id) => {
        setDeleteProps({ modal: true, id });
    };



    const deleteAttributeName = async () => {
        try {
            const formData = new FormData();
            formData.append("AttributeMasterId", deleteProps?.id);
            const response = await api.post(`/api/ProductAttribute/DeleteAttributeAllValues`, formData);
            if (response.data.statusCode === 200 && response.data.isSuccess === true) {
                showNotification({
                    message: response.data.message || "Delete Success!",
                    variant: "success",
                });
                setDeleteProps({ modal: false, id: null });
                queryClient.invalidateQueries(['attributeValuesList']);
            } else {
                showNotification({
                    message: response.data.message || "Delete Failed!",
                    variant: "danger",
                });
                setDeleteProps({ modal: false, id: null })
            }
        } catch (error) {
            showNotification({
                message: error?.message || "An error occurred during category deletion.",
                variant: "danger",
            });
            setDeleteProps({ modal: false, id: null })
        }
    };

    const columns = [
        {
            name: 'Attribute Name',
            selector: (row) => row.attributeName,
            sortable: true,
        },
        {
            name: 'Attribute Value',
            selector: row => Array.isArray(row.productAttributeValues) ? row.productAttributeValues.map(val => val.attributeValue).join(', ') : '',
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div className="d-flex gap-1">
                    <button
                        className={`btn btn-soft-danger btn-sm`}
                        onClick={() => setAttributeId(row.attributeMasterId)}
                        title="Edit Attribute"
                    >
                        <IconifyIcon icon="solar:pen-2-broken" className="align-middle fs-18" />

                    </button>

                    <button
                        className={`btn btn-soft-danger btn-sm`}
                        onClick={() => handleDelete(row.attributeMasterId)}
                        title="Delete Store"
                    >
                        <IconifyIcon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" />
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: false,
            button: true,
            width: "200px"
        },
    ];

    const handleCreateAttribute = handleSubmit(async (data) => {
        try {
            setCreateLoading(true);
            const reqBody = {
                "attributeName": data.attributename,
                "productAttributeValues": data.values.map((item) => ({
                    id: item?.serverId || "",
                    attributeValue: item?.value,
                    hexCode: showColor ? (item?.color || "") : "",
                    isDeleted: item?.isDeleted,
                    code: item?.code
                }))
            }

            const response = await api.post("/api/ProductAttribute/CreateUpdateAttributeValues", reqBody);
            queryClient.invalidateQueries(['attributeValuesList']);
            if (response.data.statusCode === 200 && response.data.isSuccess === true) {
                showNotification({
                    message: response.data.message || "Created successfully!",
                    variant: "success",
                });
                handleModalClose();
                setCreateLoading(false);
            } else {
                showNotification({
                    message: response.data.message || "Creation Failed!",
                    variant: "danger",
                });
                handleModalClose();
                setCreateLoading(false);
            }

        } catch (error) {
            showNotification({
                message: error?.response?.data?.message || "An error occurred.",
                variant: "danger",
            });
            setCreateLoading(false);
        }
    });

    const deleteValues = (index) => {
        update(index, {
            ...fields[index],
            isDeleted: true
        });
    };


    return (
        <>
            <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                    <CardTitle as="h4">Attribute</CardTitle>
                    <div className="d-flex align-items-center gap-2">
                        <div className="position-relative">
                            <button
                                className="btn btn-outline-primary d-flex align-items-center gap-1"
                                ref={target}
                                onClick={() => setShowFilters(!showFilters)}
                                type='button'
                            >
                                <IconifyIcon icon="tabler:filter" className="fs-5" />
                            </button>

                            <Overlay target={target.current} show={showFilters} placement="bottom-end" rootClose onHide={() => setShowFilters(false)}>
                                <Popover id="filter-popover" className="shadow-sm border-0">
                                    <Popover.Body>
                                        <div className="d-flex flex-column gap-3" style={{ minWidth: "250px" }}>
                                            <div>
                                                <label className="form-label mb-1">Search</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search Attribute"
                                                    value={searchTerm}
                                                    onChange={(e) => handleSearchTerm(e)}
                                                />
                                            </div>
                                        </div>
                                    </Popover.Body>
                                </Popover>
                            </Overlay>
                        </div>


                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleModalShow}
                        >
                            Add Attribute
                        </button>
                    </div>
                </CardHeader>
                <CardBody>
                    <div className="table-responsive">
                        <DataTable
                            columns={columns}
                            data={attributeList?.data}
                            pagination
                            paginationServer
                            responsive
                            persistTableHead
                            paginationTotalRows={attributeList?.totalRecords || 0}
                            customStyles={customTableStyles(isDarkMode)}
                            onChangePage={(page) => setPage(page)}
                            onChangeRowsPerPage={(newPerPage, page) => {
                                setPerPage(newPerPage);
                                setPage(page);
                            }}
                        />
                    </div>
                </CardBody>
            </Card>

            <ConfirmationModal show={showModal} onHide={handleModalClose}>
                <form onSubmit={handleCreateAttribute}>
                    <ModalHeader closeButton>
                        <ModalTitle>{` ${attributeId ? "Edit" : "Add"} Attribute`}</ModalTitle>
                    </ModalHeader>

                    <ModalBody>
                        {/* Attribute Name */}
                        <div className="mb-3">
                            <label htmlFor="attribute-name" className="form-label">
                                Attribute Name <span className="text-primary">*</span>
                            </label>
                            <input
                                type="text"
                                id="attribute-name"
                                className="form-control"
                                placeholder="Attribute Name"
                                {...register("attributename")}
                            />
                            {errors.attributename && (
                                <p className="text-danger">{errors.attributename.message}</p>
                            )}
                        </div>

                        {/* Dynamic Values */}
                        <h4 className="mb-3">Add Values</h4>
                        <div className="mb-3 overflow-auto hide-scrollbar" style={{ maxHeight: "200px" }}>
                            {fields.map((field, index) => {
                                const deletedFieldsCount = fields.filter(f => f.isDeleted).length;
                                const totalFieldCount = fields?.length;
                                const isDeleteVisisble = !(totalFieldCount === 1 || deletedFieldsCount === totalFieldCount - 1);
                                return (
                                    !field?.isDeleted && (
                                        <div key={index}>
                                            <div
                                                className="d-flex align-items-center gap-2 "
                                            >
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder={`Value ${index + 1}`}
                                                    {...register(`values.${index}.value`)}
                                                />

                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder={`Code ${index + 1}`}
                                                    {...register(`values.${index}.code`)}
                                                />

                                                {showColor && (
                                                    <Controller
                                                        control={control}
                                                        name={`values.${index}.color`}
                                                        render={({ field: { value, onChange } }) => (
                                                            <ColorPicker
                                                                value={value}
                                                                onChange={(color) => {
                                                                    onChange(color.toHexString());
                                                                }}
                                                                style={{ zIndex: 1000 }}
                                                                mode="single"
                                                                size="large"
                                                                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                                                            />
                                                        )}
                                                    />
                                                )}
                                                {isDeleteVisisble && (
                                                    <Button variant="outline-danger" onClick={() => deleteValues(index)}>
                                                        Delete
                                                    </Button>
                                                )}

                                            </div>
                                            <div className="my-2">
                                                {errors.values &&
                                                    errors.values[index]?.value && (
                                                        <p className="text-danger">
                                                            Value {index + 1}: {errors.values[index].value.message}
                                                        </p>
                                                    )}
                                            </div>
                                        </div>
                                    )
                                )
                            })}

                        </div>
                        <div className="d-flex align-items-center gap-3">
                            <Button
                                variant="outline-primary"
                                type="button"
                                onClick={() => append({ value: "", isDelete: false })}
                            >
                                Add Values
                            </Button>
                            <div className="form-check form-switch">
                                <labe>Show color picker</labe>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id={`flexSwitch`}
                                    {...register("switchcolor")}
                                />
                            </div>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="secondary" onClick={handleModalClose}>
                            Cancel
                        </Button>
                        <Button variant="danger" type="submit" disabled={createLoading}>
                            Save
                        </Button>
                    </ModalFooter>
                </form>
            </ConfirmationModal>


            <ConfirmationModal show={deleteProps?.modal} onHide={() => setDeleteProps({ modal: false, id: null })}>
                <ModalHeader closeButton>
                    <ModalTitle>Confirm Delete</ModalTitle>
                </ModalHeader>

                <ModalBody>
                    Are you sure you want to delete?
                </ModalBody>

                <ModalFooter>
                    <Button variant="secondary" onClick={() => setDeleteProps({ modal: false, id: null })}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={deleteAttributeName}>
                        Delete
                    </Button>
                </ModalFooter>
            </ConfirmationModal>
        </>
    );
};

export default Attribute;

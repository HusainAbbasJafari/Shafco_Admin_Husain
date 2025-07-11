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
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import ConfirmationModal from "../../../../../components/ConfirmationModal";
import Select, { components } from 'react-select'
import { customSelectStyles, customTableStyles, detectDarkMode, mapToSelectOptions } from "@/utils/other";
import DataTable from "react-data-table-component";
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { useAttributeSet, useAttributeSetsList, useAttributeValuesList } from "@/services/productServices";
import { useNotificationContext } from "@/context/useNotificationContext";
import api from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";

// Schema
const schema = Yup.object().shape({
    setname: Yup.string()
        .trim()
        .min(1, "Product Name is required")
        .max(100, "Product Name cannot exceed 100 characters")
        .required("Product Name is required"),
    attributes: Yup.array()
        .min(1, 'At least one attribute must be selected')
        .of(
            Yup.object().shape({
                label: Yup.string().required(),
                value: Yup.string().required(),
            }),
        )
        .required('Attributes are required'),
});

const AttributeSet = () => {
    const {
        register,
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema)
    });

    const [showModal, setShowModal] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [searchTerm, setSearchTerm] = useState('')
    const [showFilters, setShowFilters] = useState(false)
    const [deleteProps, setDeleteProps] = useState({ modal: false, id: null })
    const [attributeSetId, setAttributeSetId] = useState(null);

    const { data: attributeList } = useAttributeValuesList({ pageSize: 100, pageNumber: 1, searchTerm: "" });
    const { data: attributeSetList } = useAttributeSetsList({ pageSize: perPage, pageNumber: page, searchTerm });
    const { data: attributeSet } = useAttributeSet(attributeSetId)

    const target = useRef(null);

    const { showNotification } = useNotificationContext();
    const queryClient = useQueryClient();

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


    const handleModalClose = () => {
        setShowModal(false)
        setAttributeSetId(null);
        reset();
    };
    const handleModalShow = () => setShowModal(true);

    useEffect(() => {
        if (attributeSet) {
            const attributeSelectedOptions = mapToSelectOptions(attributeSet?.attributeSetValues || [], 'attributeSetValueName', 'attributeSetValueId')
            setValue("setname", attributeSet.attributeSetName);
            setValue("attributes", attributeSelectedOptions);
            handleModalShow()
        }
    }, [attributeSet])

    const attributeOptions = mapToSelectOptions(attributeList?.data || [], 'attributeName', 'attributeMasterId')


    const deleteAttributeSet = async () => {
        try {
            const formData = new FormData();
            formData.append("id", deleteProps?.id);
            const response = await api.post(`/api/ProductAttribute/DeleteAttributeSet`, formData);
            if (response.data.statusCode === 200 && response.data.isSuccess === true) {
                showNotification({
                    message: response.data.message || "Delete Success!",
                    variant: "success",
                });
                setDeleteProps({ modal: false, id: null });
                queryClient.invalidateQueries(['attributeSetsList']);
            } else {
                showNotification({
                    message: response.data.message || "Delete Failed!",
                    variant: "danger",
                });
                setDeleteProps({ modal: false, id: null })
            }
        } catch (error) {
            showNotification({
                message: error?.response?.data?.message || "An error occurred during deletion.",
                variant: "danger",
            });
            setDeleteProps({ modal: false, id: null })
        }
    };


    const columns = [
        {
            name: 'Attribute Set Name',
            selector: (row) => row.attributeSetName,
            sortable: true,
        },
        {
            name: 'Attributes',
            selector: row => row.attributeSetValuesNames,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div className="d-flex gap-1">
                    <button
                        className={`btn btn-soft-danger btn-sm`}
                        onClick={() => setAttributeSetId(row.id)}
                        title="Edit Attribute"
                    >
                        <IconifyIcon icon="solar:pen-2-broken" className="align-middle fs-18" />

                    </button>
                    <button
                        className={`btn btn-soft-danger btn-sm`}
                        onClick={() => handleDelete(row.id)}
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
            const formData = new FormData();
            formData.append("Id", attributeSetId || '');
            formData.append("AttributeSetName", data.setname);
            formData.append("AttributeSetValue", Array.isArray(data.attributes) ? data.attributes?.map(attr => attr.value).join(', ') : '');
            const response = await api.post("/api/ProductAttribute/CreateUpdateAttributeSet", formData);
            if (response.data.statusCode === 200 && response.data.isSuccess === true) {
                showNotification({
                    message: response.data.message || "Created successfully!",
                    variant: "success",
                });
                queryClient.invalidateQueries(['attributeSetsList']);
                handleModalClose();
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


    const CheckboxOption = (props) => (
        <components.Option {...props}>
            <input
                type="checkbox"
                checked={props.isSelected}
                onChange={() => { }}
                className="form-check-input"
                style={{ marginRight: 8 }}
            />
            {props.label}
        </components.Option>
    )
    const NoChipsValueContainer = ({ children, ...props }) => {
        const filteredChildren = children.filter(
            (child) => child && child.type !== components.MultiValue
        )
        return <components.ValueContainer {...props}>{filteredChildren}</components.ValueContainer>
    }


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
                            Add Attribute Set
                        </button>
                    </div>
                </CardHeader>
                <CardBody>
                    <div className="table-responsive">
                        <DataTable
                            columns={columns}
                            data={attributeSetList?.data || []}
                            pagination
                            paginationServer
                            responsive
                            persistTableHead
                            paginationTotalRows={attributeSetList?.totalRecords}
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
                        <ModalTitle>Attribute Set</ModalTitle>
                    </ModalHeader>

                    <ModalBody>
                        {/* Attribute Name */}
                        <div className="mb-3">
                            <label htmlFor="attribute-name" className="form-label">
                                Attribute Set Name <span className="text-primary">*</span>
                            </label>
                            <input
                                type="text"
                                id="set-name"
                                className="form-control"
                                placeholder="Attribute Set Name"
                                {...register("setname")}
                            />
                            {errors.productname && (
                                <p className="text-danger">{errors.setname.message}</p>
                            )}
                        </div>

                        <div>
                            <Controller
                                name="attributes"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={attributeOptions}
                                        className="react-select-container"
                                        classNamePrefix="react-select"
                                        closeMenuOnSelect={false}
                                        placeholder="Select Attributes"
                                        hideSelectedOptions={false}
                                        components={{ Option: CheckboxOption, ValueContainer: NoChipsValueContainer }}
                                        isMulti
                                        styles={customSelectStyles}
                                    />
                                )}
                            />
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="secondary" onClick={handleModalClose}>
                            Cancel
                        </Button>
                        <Button variant="danger" type="submit">
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
                    <Button variant="danger" onClick={deleteAttributeSet}>
                        Delete
                    </Button>
                </ModalFooter>
            </ConfirmationModal>
        </>
    );
};

export default AttributeSet;

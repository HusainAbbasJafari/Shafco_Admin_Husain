"use client";

import { customSelectStyles, customTableStyles, debounce, detectDarkMode, encodeId, toLocalDateString } from "@/utils/other";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { useAllCategoryRules } from '@/services/priceRulesServices';
import { transformDate } from "@/utils/date";
import ConfirmationModal from "@/components/ConfirmationModal";
import { Button, Card, CardBody, CardHeader, CardTitle, Col, ModalBody, ModalFooter, ModalHeader, ModalTitle, Row } from "react-bootstrap";
import { useQueryClient } from "@tanstack/react-query";
import { useNotificationContext } from "@/context/useNotificationContext";
import api from "@/services/api";
import Select from 'react-select';


const columnFieldMap = {
    'Rule Name': 'ruleName',
    'Discount Type': 'discountType',
    'Active From' : 'activeFrom',
    'Active Till': 'to',
};



const PriceRuleList = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [deleteProps, setDeleteProps] = useState({ modal: false, id: null });
    const queryClient = useQueryClient();
    const { showNotification } = useNotificationContext()
    const [pagination, setPagination] = useState({ page: 1, perPage: 10 });
    const [filters, setFilters] = useState({ search: null, status: 0, dateRange: { from: null, to: null } })
    const [tempDateRange, setTempDateRange] = useState({ from: '', to: '' });
    const [sort, setSort] = useState({ sortBy: null, sortDirection: null });
    const { data: categoryRules } = useAllCategoryRules({
        "pageNumber": pagination.page,
        "pageSize": pagination.perPage,
        "searchingTerm": filters.search,
        "filterStatus": filters.status,
        "fromDate": filters.dateRange.from ? toLocalDateString(filters.dateRange.from) : null,
        "toDate": filters.dateRange.to ? toLocalDateString(filters.dateRange.to) : null,
        "sortBy": sort.sortBy,
        "sortDirection": sort.sortDirection
    });

    useEffect(() => {
        const mode = detectDarkMode(setIsDarkMode)
        setIsDarkMode(mode)
    }, [])

    const handleDeleteModal = (data) => {
        setDeleteProps({ modal: true, id: data?.id });
    }

    const handleDateRange = (e) => {
        const { name, value } = e.target;
        const updatedValue = toLocalDateString(value);

        const newRange = {
            ...tempDateRange,
            [name]: updatedValue
        };

        setTempDateRange(newRange);
        if (newRange.from && newRange.to) {
            if (new Date(newRange.from) > new Date(newRange.to)) {
                showNotification({
                    message: "Start date cannot be later than end date.",
                    variant: "danger",
                });
                return;
            }

            setFilters(prev => ({
                ...prev,
                dateRange: newRange
            }));
        }

    }


    const debouncedSearch = debounce((value) => {
        setFilters(prev => ({
            ...prev,
            search: value || null
        }))
    }, 600);

    const deleteCategoryPriceRule = async () => {
        try {
            const response = await api.post(`/api/Pricing/DeleteCategoryRule?id=${deleteProps.id}`);
            if (response.data.statusCode === 200 && response.data.isSuccess === true) {
                showNotification({
                    message: response.data.message || "Deleted successfully!",
                    variant: "success",
                });
                queryClient.invalidateQueries(['allCategoryRules']);
                setDeleteProps({ modal: false, id: null })
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


    const updateRuleStatus = async (data) => {
        try {
            const formData = new FormData();
            formData.append('id', data.id);
            formData.append('ActiveStatus', data.isActive);

            const response = await api.post(`/api/Pricing/UpdateStatus`, formData);
            if (response.data.statusCode === 200 && response.data.isSuccess === true) {
                showNotification({
                    message: response.data.message || "Updated successfully!",
                    variant: "success",
                });
                queryClient.invalidateQueries(['allCategoryRules']);
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
    };





    const columns = [
        {
            name: 'Rule Name',
            selector: (row) => row.ruleName,
            cell: (row) => {
                return (
                    <div>
                        {row.ruleName}
                    </div>
                )
            },
            sortable: true,
        },
        {
            name: 'Discount Type',
            selector: (row) => row.discountType,
            cell: (row) => {
                return (
                    <div>
                        {row.discountType}
                    </div>
                )
            },
            sortable: true,
        },
        {
            name: 'Active From',
            selector: (row) => row.activeFrom,
            cell: (row) => {
                return (
                    <div>
                        {transformDate(row.activeFrom)}
                    </div>
                )
            },
            sortable: true,
        },

        {
            name: 'Active Till',
            selector: (row) => row.activeFrom,
            cell: (row) => {
                return (
                    <div>
                        {transformDate(row.activeTo)}
                    </div>
                )
            },
            sortable: true,
        },

        {
            name: 'Created By',
            selector: (row) => row.createdBy,
            sortable: false,
        },
        {
            name: 'Updated By',
            selector: (row) => row.updatedBy,
            sortable: false,
        },
        {
            name: 'Status',
            selector: (row) => row.isActive,
            sortable: false,
            cell: (row) => (
                <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        title={row.isActive ? 'Active' : 'Inactive'}
                        id={`flexSwitch-${row.id}`}
                        checked={row.isActive}
                        onChange={(e) => {
                            const updatedRow = { id: row.id, isActive: e.target.checked };
                            updateRuleStatus(updatedRow);
                        }}
                    />
                </div>
            ),
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div className="d-flex gap-1">
                    <a href={`/promotions/category-price-rules/edit-price-rules/${encodeId(row.id)}`}
                        className={`btn btn-soft-primary btn-sm`} title="Edit User">
                        <IconifyIcon icon="solar:pen-2-broken" className="align-middle fs-18" />
                    </a>
                    <button className={`btn btn-soft-danger btn-sm`} title="Delete Store" onClick={() => handleDeleteModal(row)}>
                        <IconifyIcon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" />
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: false,
            button: true,
            width: '150px',
        },
    ]

    const clearDateRange = () => {
        setTempDateRange({ from: '', to: '' });
        setFilters(prev => ({
            ...prev,
            dateRange: { from: null, to: null }
        }));
    }





    return (
        <>

            <Card>
                <CardHeader>
                    <CardTitle>Category Price Rule Management</CardTitle>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col lg={3} md={5} sm={5} >
                            <label className="form-label mb-1">Search Price Rule</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Price Rule..."
                                // value={searchTerm}
                                onChange={(e) => debouncedSearch(e.target.value)}
                            />
                        </Col>
                        <Col lg={3} md={5} sm={5} >
                            <label className="form-label mb-1">Price Rule Status</label>
                            <Select
                                options={[{ label: "All", value: 0 }, { label: "Active", value: 1 }, { label: "In-Active", value: 2 }]}
                                // value={roleStatus}
                                onChange={(selectedOption) => setFilters(prev => ({
                                    ...prev,
                                    status: selectedOption?.value
                                }))}
                                placeholder="Select Role Status"
                                isClearable
                                styles={customSelectStyles}
                                classNamePrefix="react-select"
                            />
                        </Col>
                        <Col Col lg={3} md={5} sm={5}>
                            <div className="form-group">
                                <label className="form-label">Date Range (From)</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    onChange={handleDateRange}
                                    name="from"
                                    value={filters.dateRange.from || ''}
                                />
                            </div>
                        </Col>
                        <Col Col lg={3} md={5} sm={5}>
                            <div className="form-group mb-1">
                                <label className="form-label">to</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    onChange={handleDateRange}
                                    name="to"
                                    value={filters.dateRange.to || ''}
                                />
                            </div>
                            <div className="d-flex justify-content-end">
                                <button type="button" className="btn btn-primary" onClick={clearDateRange}>
                                    Clear Date Range
                                </button>
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>

            <div className="table-responsive">
                <DataTable
                    columns={columns}
                    data={categoryRules?.data || []}
                    pagination
                    paginationServer
                    responsive
                    persistTableHead
                    paginationTotalRows={categoryRules?.totalRecords}
                    customStyles={customTableStyles(isDarkMode)}
                    onChangePage={(page) => setPagination((prev) => ({ ...prev, page }))}
                    onChangeRowsPerPage={(newPerPage, page) => {
                        setPagination({
                            page,
                            perPage: newPerPage
                        })
                    }}
                    onSort={(column, direction) => {
                        const sortBy = columnFieldMap[column.name] || '';
                        setSort({
                            sortBy,
                            sortDirection: direction
                        });
                        queryClient.invalidateQueries(['allCategoryRules']);
                    }}
                />
            </div>

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
                    <Button variant="danger" onClick={deleteCategoryPriceRule}>
                        Delete
                    </Button>
                </ModalFooter>
            </ConfirmationModal>
        </>
    )
}

export default PriceRuleList

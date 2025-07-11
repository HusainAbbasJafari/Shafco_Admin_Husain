
"use client";
import ConfirmationModal from '@/components/ConfirmationModal';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { useNotificationContext } from '@/context/useNotificationContext';
import api from '@/services/api';
import { useWarehouseList } from '@/services/warehouseServices';
import { customSelectStyles, customTableStyles, debounce, detectDarkMode, encodeId } from '@/utils/other';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, ModalBody, ModalFooter, ModalHeader, ModalTitle, Overlay, Popover, Row } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import Select from 'react-select';



const WarehouseTable = () => {

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10)
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [filters, setFilters] = useState({ search: null, status: null })
    const target = useRef(null);
    const [deleteProps, setDeleteProps] = useState({ modal: false, id: null })

    const queryClient = useQueryClient();
    const { showNotification } = useNotificationContext()

    const { data: warehouseList, isLoading } = useWarehouseList({
        pageSize: perPage,
        pageNumber: page,
        filterStatus: filters?.status,
        searchingTerm: filters?.search
    })

    const debouncedSearch = debounce((value) => {
        setFilters(prev => ({
            ...prev,
            search: value || null
        }))
    }, 600);

    useEffect(() => {
        const mode = detectDarkMode(setIsDarkMode)
        setIsDarkMode(mode)
    }, [])

    useEffect(() => {
        queryClient.invalidateQueries(['warehouseList']);
    }, [])

    const handleDelete = (id) => {
        setDeleteProps({ modal: true, id: id })
    }


    const updateWarehouseStatus = async (id, status) => {
        try {
            const formData = new FormData();
            formData.append('Id', id);
            formData.append('ActiveStatus', status);
            const response = await api.post(`/api/Warehouse/UpdateWarehouseStatus`, formData);
            if (response.data.statusCode === 200 && response.data.isSuccess === true) {
                showNotification({
                    message: response.data.message || "Delete Success!",
                    variant: "success",
                });
                queryClient.invalidateQueries(['warehouseList']);
            } else {
                showNotification({
                    message: response.data.message || "Delete Failed!",
                    variant: "danger",
                });
            }
        } catch (error) {
            queryClient.invalidateQueries(['warehouseList']);
            showNotification({
                message: error?.response?.data?.message || "An error occurred during warehouse update.",
                variant: "danger",
            });
        }
    };


    const deleteWarehouse = async () => {
        try {
            const response = await api.get(`/api/Warehouse/DeleteWarehouseByID?id=${deleteProps?.id}`);
            if (response.data.statusCode === 200 && response.data.isSuccess === true) {
                showNotification({
                    message: response.data.message || "Delete Success!",
                    variant: "success",
                });
                queryClient.invalidateQueries(['warehouseList']);
                setDeleteProps({ modal: false, id: null })
            } else {
                showNotification({
                    message: response.data.message || "Delete Failed!",
                    variant: "danger",
                });
                setDeleteProps({ modal: false, id: null })
            }
        } catch (error) {
            showNotification({
                message: error?.message || "An error occurred during warehouse deletion.",
                variant: "danger",
            });
            setDeleteProps({ modal: false, id: null })
        }
    };


    const columns = [
        {
            name: 'Name',
            sortable: true,
            selector: (row) => row.warehouseName,
        },
        {
            name: 'Code',
            sortable: true,
            selector: (row) => row.warehousecode,
        },
        {
            name: 'Country',
            sortable: true,
            selector: (row) => row.country_Name,
        },
        {
            name: 'State',
            sortable: true,
            selector: (row) => row.state_Name,
        },
        {
            name: 'City',
            sortable: true,
            selector: (row) => row.city_Name,
        },
        {
            name: 'Created By',
            selector: row => row.createdBy || 'N/A',
            sortable: false,
        },
        {
            name: 'Updated By',
            selector: row => row.updatedBy || 'N/A',
            sortable: false,
        },
        {
            name: 'Status',
            selector: (row) => row.isActive,
            sortable: true,
            cell: (row) => (
                <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        title={row.isActive ? 'Active' : 'Inactive'}
                        id={`flexSwitch-${row.id}`}
                        onChange={(e) => updateWarehouseStatus(row.id, e.target.checked)}
                        checked={row.isActive}
                    />
                </div>
            ),
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div className="d-flex gap-1">
                    <a
                        href={`/warehouse/warehouse-edit/${encodeId(row.id)}`}
                        className={`btn btn-soft-primary btn-sm}`}
                        title="Edit Warehouse"
                    >
                        <IconifyIcon icon="solar:pen-2-broken" className="align-middle fs-18" />
                    </a>
                    {/* <button
                        className={`btn btn-soft-danger btn-sm }`}
                        title="Suspend Warehouse"
                        onClick={() => handleDelete(row.id)}
                    >
                        <IconifyIcon icon="heroicons-outline:ban" className="align-middle fs-18" />
                    </button> */}
                    <button
                        className={`btn btn-soft-danger btn-sm }`}
                        title="Delete Warehouse"
                        onClick={() => handleDelete(row.id)}
                    >
                        <IconifyIcon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" />
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: false,
            button: true,
            width: "300px"
        },
    ];


    return <>

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
                <Button variant="danger" onClick={deleteWarehouse}>
                    Delete
                </Button>
            </ModalFooter>
        </ConfirmationModal>
        <Card>
            <CardHeader>
                <CardTitle>Warehouse Management</CardTitle>
            </CardHeader>
            <CardBody>
                <Row className='d-flex gap-3'>
                    <Col lg={3} md={5} sm={5} >
                        <label className="form-label mb-1">Search Warehouse</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Warehouse Name..."
                            // value={searchTerm}
                            onChange={(e) => debouncedSearch(e.target.value)}
                        />
                    </Col>
                    <Col lg={3} md={5} sm={5} >
                        <label className="form-label mb-1">Warehouse Status</label>
                        <Select
                            options={[{ label: "All", value: null }, { label: "Active", value: 1 }, { label: "In-Active", value: 0 }]}
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
                </Row>
            </CardBody>
        </Card>

        <Card className="overflow-hidden Coupons">
            <CardBody className="p-0">
                <div className='table-responsive' >
                    <DataTable
                        columns={columns}
                        data={isLoading ? [] : warehouseList?.warehosePagingList || []}
                        pagination
                        paginationServer
                        responsive
                        persistTableHead
                        paginationTotalRows={warehouseList?.totalCount || 0}
                        onChangePage={(page) => setPage(page)}
                        onChangeRowsPerPage={(newPerPage, page) => {
                            setPerPage(newPerPage);
                            setPage(page);
                        }}
                        customStyles={customTableStyles(isDarkMode)}
                    />
                </div>
            </CardBody>
        </Card>

    </>;
};
export default WarehouseTable;
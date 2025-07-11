
"use client";
import ConfirmationModal from '@/components/ConfirmationModal';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { useNotificationContext } from '@/context/useNotificationContext';
import api from '@/services/api';
import { useStoreList } from '@/services/storeServices';
import { customSelectStyles, customTableStyles, debounce, detectDarkMode, encodeId } from '@/utils/other';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, ModalBody, ModalFooter, ModalHeader, ModalTitle, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import Select from 'react-select';


const StoreListTable = () => {

    const { showNotification } = useNotificationContext()
    const [isDarkMode, setIsDarkMode] = useState(false)
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [deleteProps, setDeleteProps] = useState({ modal: false, id: null })
    const [filters, setFilters] = useState({ search: null, status: null })


    const { data: storeList } = useStoreList({
        pageSize: perPage,
        pageNumber: page,
        searchingTerm: filters?.search,
        filterStatus: filters?.status
    })

    const debouncedSearch = debounce((value) => {
        setFilters(prev => ({
            ...prev,
            search: value || null
        }))
    }, 600);

    useEffect(() => {
        queryClient.invalidateQueries(['storeList']);
    }, [perPage, page])

    const handleDelete = (id) => {
        setDeleteProps({ modal: true, id: id })
    }

    useEffect(() => {
        const mode = detectDarkMode(setIsDarkMode)
        setIsDarkMode(mode)
    }, [])

    const updateStoreStatus = async (id, status) => {
        try {
            const formData = new FormData();
            formData.append('Id', id);
            formData.append('ActiveStatus', status);
            const response = await api.post(`/api/Store/UpdateStoresStatus`, formData);
            if (response.data.statusCode === 200 && response.data.isSuccess === true) {
                showNotification({
                    message: response.data.message || "Status updated Successfully!",
                    variant: "success",
                });
                queryClient.invalidateQueries(['storeList']);
            } else {
                showNotification({
                    message: response.data.message || "Status update Failed!",
                    variant: "danger",
                });
            }
        } catch (error) {
            showNotification({
                message: error?.response?.data?.message || "An error occurred during status update.",
                variant: "danger",
            });
        }
    };



    const deleteStore = async () => {
        try {
            const response = await api.get(`/api/Store/DeleteStoreByID?id=${deleteProps?.id}`);
            if (response.data.statusCode === 200 && response.data.isSuccess === true) {
                showNotification({
                    message: response.data.message || "Delete Success!",
                    variant: "success",
                });
                queryClient.invalidateQueries(['storeList']);
                setDeleteProps({ modal: false, id: null });
            } else {
                showNotification({
                    message: response.data.message || "Delete Failed!",
                    variant: "danger",
                });
                setDeleteProps({ modal: false, id: null });
            }
        } catch (error) {
            showNotification({
                message: error?.response?.data?.message || "An error occurred during store deletion.",
                variant: "danger",
            });
            setDeleteProps({ modal: false, id: null });
        }
    };

    const columns = [
        {
            name: 'Store Image',
            selector: (row) => row.storeName,
            cell: (row) => {
                const imageUrl = row?.storeImage ? row?.storeImage : null;
                return (
                    <div className="d-flex align-items-center p-2">
                        <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
                            <img
                                src={imageUrl || 'https://shorturl.at/MAEWU'}
                                alt={`category${row.id}`}
                                className="avatar-md"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://shorturl.at/MAEWU'
                                }}
                            />
                        </div>
                    </div>
                )
            },
            sortable: false,
        },
        {
            name: 'Store Code',
            selector: (row) => row.storeCode || 'N/A',
            sortable: true,
        },
        {
            name: 'Store Name',
            selector: (row) => row.storeName,
            sortable: true,
        },
        {
            name: 'Store Owner',
            selector: row => row.storeOwner,
            sortable: true,
        },

        {
            name: 'Entry Warehouse',
            selector: row => row.warehouse || 'N/A',
            sortable: true,
        },

        {
            name: 'Brands',
            cell: (row) => {
                const previewBrands = row.brands?.slice(0, 2).map(b => b.brandName).join(', ');
                const fullList = row.brands?.map(b => b.brandName).join(', ');
                const hasMore = row.brands?.length > 2;

                return (
                    <OverlayTrigger
                        placement="top"
                        overlay={
                            <Tooltip id={`tooltip-${row.accountId}`}>
                                {fullList}
                            </Tooltip>
                        }
                    >
                        <span>
                            {previewBrands}
                            {hasMore && ` +${row.brands.length - 2} more`}
                        </span>
                    </OverlayTrigger>
                )
            },
        },
        {
            name: 'Country',
            selector: (row) => row.country_Name,
            sortable: true

        },
        {
            name: 'State',
            selector: (row) => row.state_Name,
            sortable: true


        },
        {
            name: 'City',
            selector: (row) => row.city_Name,
            sortable: true

        },

        {
            name: 'Created By',
            selector: row => row?.createdBy || 'N/A',
            sortable: false,
        },
        {
            name: 'Updated By',
            selector: row => row?.updatedBy || 'N/A',
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
                        onChange={(e) => updateStoreStatus(row.id, e.target.checked)}
                        checked={row.isActive}
                    />
                </div>
            ),
        },
        // ${!row.isActive ? "disabled-actions" : 
        {
            name: 'Actions',
            cell: (row) => (
                <div className="d-flex gap-1">
                    <a
                        href={`/store/edit-store/${encodeId(row.id)}`}
                        className={`btn btn-soft-primary btn-sm `}
                        title="Edit User"
                    >
                        <IconifyIcon icon="solar:pen-2-broken" className="align-middle fs-18" />
                    </a>
                    <button
                        className={`btn btn-soft-danger btn-sm `}
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

    return <>
        {/* <div className="mb-3 d-flex justify-content-end position-relative">
            <button
                className="btn btn-outline-primary d-flex align-items-center gap-1"
                ref={target}
                onClick={() => setShowFilters(!showFilters)}
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
                                    placeholder="Search name or brand"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </Popover.Body>
                </Popover>
            </Overlay>
        </div> */}
        <Card>
            <CardHeader>
                <CardTitle>Store Management</CardTitle>
            </CardHeader>
            <CardBody>
                <Row className='d-flex gap-3'>
                    <Col lg={3} md={5} sm={5} >
                        <label className="form-label mb-1">Search Stores</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Store Name..."
                            // value={searchTerm}
                            onChange={(e) => debouncedSearch(e.target.value)}
                        />
                    </Col>
                    <Col lg={3} md={5} sm={5} >
                        <label className="form-label mb-1">Store Status</label>
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
                        data={storeList?.storesResponses}
                        pagination
                        paginationServer
                        responsive
                        persistTableHead
                        paginationTotalRows={storeList?.totalCount || 0}
                        customStyles={customTableStyles(isDarkMode)}
                        onChangePage={(page) => setPage(page)}
                        onChangeRowsPerPage={(newPerPage, page) => {
                            setPerPage(newPerPage);
                            setPage(page);
                        }}
                        onSort={() => setPerPage(perPage)}
                    />
                </div>
            </CardBody>
        </Card>
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
                <Button variant="danger" onClick={deleteStore}>
                    Delete
                </Button>
            </ModalFooter>
        </ConfirmationModal>
    </>;
};
export default StoreListTable;
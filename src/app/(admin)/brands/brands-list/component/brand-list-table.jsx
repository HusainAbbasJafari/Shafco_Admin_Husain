
"use client";
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { customTableStyles, detectDarkMode, encodeId } from '@/utils/other';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Button, Card, CardBody, ModalBody, ModalFooter, ModalHeader, ModalTitle, Overlay, Popover } from 'react-bootstrap';
import { useBrandList } from '@/services/brandServices';
import DataTable from 'react-data-table-component';
import { useQueryClient } from '@tanstack/react-query';
import { useNotificationContext } from '@/context/useNotificationContext';
import api from '@/services/api';
import ConfirmationModal from '../../../../../components/ConfirmationModal.jsx';



const BrandListTable = () => {

    const { showNotification } = useNotificationContext();
    const queryClient = useQueryClient();
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [showFilters, setShowFilters] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [deleteProps, setDeleteProps] = useState({ modal: false, id: null })
    const target = useRef(null);

    const { data: brandList } = useBrandList({ pageSize: perPage, pageNumber: page, searchTerm })

    const handleDelete = (id) => {
        setDeleteProps({ modal: true, id: id })
    }

    useEffect(() => {
        queryClient.invalidateQueries(['brandList']);
    }, []);

    useEffect(() => {
        const mode = detectDarkMode(setIsDarkMode)
        setIsDarkMode(mode)
    }, [])


    const deleteBrand = async () => {
        try {
            const formData = new FormData();
            formData.append("id", deleteProps?.id);
            const response = await api.post(`/api/Brand/DeleteBrand`, formData);

            if (response.data.statusCode === 200 && response.data.isSuccess === true) {
                showNotification({
                    message: response.data.message || "Delete Success!",
                    variant: "success",
                });
                queryClient.invalidateQueries(['brandList']);
                setDeleteProps({ modal: false, id: null });
            } else {
                showNotification({
                    message: response.data.message || "Delete Failed!",
                    variant: "danger",
                });
                setDeleteProps({ modal: false, id: null })
            }
        } catch (error) {
            showNotification({
                message: error?.response?.data?.message || "An error occurred during brand deletion.",
                variant: "danger",
            });
            setDeleteProps({ modal: false, id: null })
        }
    };

    const updateStatus = async (id, status) => {
        try {
            const formData = new FormData();
            formData.append("Id", id);
            formData.append("ActiveStatus", status);

            const response = await api.post(`/api/Brand/BrandStatusUpdate`, formData);

            if (response.data.statusCode === 200 && response.data.isSuccess === true) {
                showNotification({
                    message: response.data.message || "Status update Successfull!",
                    variant: "success",
                });
                queryClient.invalidateQueries(['brandList']);
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

    const columns = [
        {
            name: 'Brand Logo',
            selector: row => row.brandImages,
            cell: (row) => (
                <div className={`rounded avatar-lg d-flex align-items-center justify-content-center m-2 ${row.isDeleted ? "disabled-actions" : ""}`}>
                    {row.brandImages && <img
                        src={row.brandImages || 'https://shorturl.at/MAEWU'} 
                        alt={`category${row.id}`}
                        // className='avatar-lg'
                        className="w-100 h-100 object-fit-contain"
                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://shorturl.at/MAEWU'
                        }}

                    />}
                </div>
            ),
            width: '33.3%',
        },
        {
            name: 'Brand Name',
            selector: row => row.brandName,
            cell: row => (
                <div className={`${row.isDeleted ? "disabled-actions" : ""}`} >
                    {row.brandName}
                </div>
            ),
            sortable: true,
            width: '33.3%',
        },
        {
            name: 'Status',
            selector: (row) => row.isActive,
            sortable: true,
            cell: (row) => {
                return (<div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        title={row.isActive ? 'Active' : 'Inactive'}
                        id={`flexSwitch-${row.id}`}
                        onChange={(e) => updateStatus(row.id, e.target.checked)}
                        checked={row.isActive}
                    />
                </div>)
            }
        },
        {
            name: 'Action',
            cell: row => (
                <div className={`d-flex justify-content-center gap-2 ${row.isDeleted ? "disabled-actions" : ""}`}>
                    <Link
                        href={`/brands/edit-brands/${encodeId(row.id)}`}
                        className="btn btn-soft-primary btn-sm"
                    >
                        <IconifyIcon icon="solar:pen-2-broken" className="align-middle fs-18" />
                    </Link>
                    <button
                        className="btn btn-soft-danger btn-sm"
                        onClick={() => handleDelete(row.id)}
                    // disabled={loading}
                    >
                        <IconifyIcon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" />
                    </button>
                </div>
            ),
            width: '33.3%',
            ignoreRowClick: true,
            allowOverflow: true,
            button: true
        }
    ];


    return <>
        <div className="mb-3 d-flex justify-content-end position-relative">
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
                                    placeholder="Search brands"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </Popover.Body>
                </Popover>
            </Overlay>
        </div>
        <Card className="overflow-hidden Coupons">
            <CardBody className="p-0">
                <DataTable
                    columns={columns}
                    data={brandList?.data || []}
                    pagination
                    paginationServer
                    paginationTotalRows={brandList?.totalRecords || 0}
                    onChangePage={(page) => setPage(page)}
                    onChangeRowsPerPage={(newPerPage, page) => {
                        setPerPage(newPerPage);
                        setPage(page);
                    }}
                    responsive
                    persistTableHead
                    customStyles={customTableStyles(isDarkMode)}
                />
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
                <Button variant="danger" onClick={deleteBrand}>
                    Delete
                </Button>
            </ModalFooter>
        </ConfirmationModal>
    </>;
};
export default BrandListTable;

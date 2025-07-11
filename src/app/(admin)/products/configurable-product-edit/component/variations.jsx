'use client';
import ConfirmationModal from '@/components/ConfirmationModal';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { customTableStyles, detectDarkMode, formatIDRCurrency } from '@/utils/other';
import { useEffect, useState } from 'react';
import { Button, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { useQueryClient } from '@tanstack/react-query'
import api from '@/services/api';


const Variations = ({ setVariations, variations, productId, showNotification, updateVariantStatus }) => {

    const [deleteProps, setDeleteProps] = useState({ modal: false, id: null })
    const [isDarkMode, setIsDarkMode] = useState(false);
    const queryClient = useQueryClient();


    useEffect(() => {
        const mode = detectDarkMode(setIsDarkMode)
        setIsDarkMode(mode)
    }, [])

    const handleChangeById = (id, field, value) => {
        setVariations(prev =>
            prev.map(item =>
                item.varientsId === id ? { ...item, [field]: value } : item
            )
        );
    };


    const handleImageUpload = (event, id) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            handleChangeById(id, 'image', { imageUrl, file });
        }
    };



    const deleteVariant = async () => {
        try {
            const response = await api.post(`/api/Product/RemoveProductVariants?id=${deleteProps?.id}`);
            if (response.status === 200) {
                showNotification({
                    message: response.data.message || "Deleted successfully!",
                    variant: "success",
                });
                queryClient.invalidateQueries(['product', productId]);
                setDeleteProps({ modal: false, id: null })

            } else {
                showNotification({
                    message: response.data.message || "Deletion Failed!",
                    variant: "danger",
                });
                setDeleteProps({ modal: false, id: null })
            }
        } catch (error) {
            showNotification({
                message: error?.response?.data?.message || "An error occurred.",
                variant: "danger",
            });
            setDeleteProps({ modal: false, id: null })

        }
    };


    const columns = [
        {
            name: 'Variant Image',
            selector: (row) => row.category,
            cell: (row) => (

                <div className='py-2'>
                    <div className="logo-upload-wrapper mx-auto" onClick={() => document.getElementById(`upload-${row.varientsId}`).click()}>
                        <img
                            src={
                                row?.image?.imageUrl
                                ?? row?.variantImagesWithId?.[0]?.imageUrl
                                ?? "https://shorturl.at/4cgs1"
                            }
                            alt="Logo"
                            className="logo-img"
                        />
                        <div className="logo-overlay">
                            <IconifyIcon icon="bx:pencil" className="edit-icon" />
                        </div>
                        <input
                            type="file"
                            id={`upload-${row.varientsId}`}
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, row.varientsId)}
                            style={{ display: "none" }}
                        />
                    </div>
                </div>
            ),
            width: '250px',
        },
        {
            name: 'Variant Name',
            selector: (row) => {
                try {
                    if (Array.isArray(row.attributes)) {
                        return row.attributes.map((item) => item?.value ?? '').join('/') || '-';
                    }
                    return '-';
                } catch (error) {
                    console.error('Error processing attributes:', error);
                    return '-';
                }
            },
            // sortable: true,
        },
        {
            name: 'Price',
            selector: (row) => row.price || '',
            cell: (row) => (
                <div className="mb-3">
                    <label htmlFor="product-price" className="form-label">
                        Price
                    </label>
                    <input type="text" id="product-price" value={row.price || ''} className="form-control" placeholder="Price" onChange={(e) => handleChangeById(row.varientsId, 'price', formatIDRCurrency(e.target.value))} />
                </div>
            ),
            // sortable: true,
            width: '200px',

        },

        {
            name: 'Quantity',
            selector: (row) => row.brandName,
            cell: (row) => (
                <div className="mb-3">
                    <label htmlFor="product-quantity" className="form-label">
                        Quantity
                    </label>
                    <input type="number" id="product-quantity" className="form-control" placeholder="Quantity" value={row?.stock || ''} onChange={(e) => handleChangeById(row.varientsId, 'stock', e.target.value)} />
                </div>
            ),
            // sortable: true,
            width: '200px',

        },

        {
            name: 'SKU',
            selector: (row) => row?.sku || '',
            cell: (row) => (
                <div className="mb-3">
                    <label htmlFor="product-quantity" className="form-label">
                        SKU
                    </label>
                    <input type="text" id="product-quantity" className="form-control" placeholder="SKU" value={row?.sku || ''} onChange={(e) => handleChangeById(row.varientsId, 'sku', e.target.value)}
                    />
                </div>
            ),
            // sortable: true,
            width: '200px',

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
                        id={`flexSwitch`}
                        disabled={row.varientsId?.startsWith('temp-')}
                        onChange={(e) => updateVariantStatus(row.varientsId, e.target.checked)}
                        checked={row.isActive}
                    />
                </div>
            ),
            center: true,

        },
        {
            name: 'Actions',
            cell: (row) => (
                <div className="d-flex gap-1">
                    <button className={`btn btn-soft-danger btn-sm`} title="Delete Variation" disabled={row.varientsId?.startsWith('temp-')} type="button" onClick={() => setDeleteProps({ id: row.varientsId, modal: true })}>
                        <IconifyIcon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" />
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: false,
            button: true,
        },
    ]



    return (
        <>
            <div className="table-responsive">
                <DataTable
                    columns={columns}
                    data={variations}
                    paginationServer
                    responsive
                    persistTableHead
                    customStyles={customTableStyles(isDarkMode)}
                />
            </div>

            <ConfirmationModal show={deleteProps?.modal} onHide={() => setDeleteProps({ modal: false, id: null })}>
                <ModalHeader closeButton>
                    <ModalTitle>Confirm Delete</ModalTitle>
                </ModalHeader>

                <ModalBody>
                    Are you sure you want to delete Variant?
                </ModalBody>

                <ModalFooter>
                    <Button variant="secondary" onClick={() => setDeleteProps({ modal: false, id: null })}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={deleteVariant}>
                        Delete
                    </Button>
                </ModalFooter>
            </ConfirmationModal>
        </>

    )
}

export default Variations
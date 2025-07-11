'use client'
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { customTableStyles, detectDarkMode, formatIDRCurrency } from '@/utils/other';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

const Variations = ({ register, setVariations, variations }) => {

    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const mode = detectDarkMode(setIsDarkMode)
        setIsDarkMode(mode)
    }, [])

    const handleChangeById = (id, field, value) => {
        setVariations(prev =>
            prev.map(item =>
                item.tempId === id ? { ...item, [field]: value } : item
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


    const columns = [
        {
            name: 'Variant Image',
            selector: (row) => row.category,
            cell: (row) => (

                <div className='py-2'>
                    <div className="logo-upload-wrapper mx-auto" onClick={() => document.getElementById(`upload-${row.tempId}`).click()}>
                        <img src={row?.image?.imageUrl || "https://shorturl.at/4cgs1"} alt="Logo" className="logo-img" />
                        <div className="logo-overlay">
                            <IconifyIcon icon="bx:pencil" className="edit-icon" />
                        </div>
                        <input
                            type="file"
                            // ref={fileInputRef}
                            id={`upload-${row.tempId}`}
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, row.tempId)}
                            style={{ display: "none" }}
                        />
                    </div>
                </div>
            ),
            // sortable: false,
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
            name: 'Selling Price',
            selector: (row) => row.sku || '',
            cell: (row) => (
                <div className="mb-3">
                    <label htmlFor="product-price" className="form-label">
                        Selling Price
                    </label>
                    <input type="text" id="product-price" value={row.price} className="form-control" placeholder="Selling Price" onChange={(e) => handleChangeById(row.tempId, 'price', formatIDRCurrency(e.target.value))} />
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
                    <input type="number" id="product-quantity" className="form-control" placeholder="Quantity" onChange={(e) => handleChangeById(row.tempId, 'stock', e.target.value)} />
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
                    <input type="text" id="product-quantity" className="form-control" placeholder="SKU" value={row.sku} onChange={(e) => handleChangeById(row.tempId, 'sku', e.target.value)}
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
                        onChange={(e) => handleChangeById(row.tempId, 'isActive', e.target.checked)}
                        checked={row.isActive}
                    />
                </div>
            ),
            center: true,

        },
        // {
        //     name: 'Actions',
        //     cell: (row) => (
        //         <div className="d-flex gap-1">

        //             <button className={`btn btn-soft-danger btn-sm`} title="Delete Variation" type="button">
        //                 <IconifyIcon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" />
        //             </button>
        //         </div>
        //     ),
        //     ignoreRowClick: true,
        //     allowOverflow: false,
        //     button: true,
        // },
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
        </>

    )
}

export default Variations
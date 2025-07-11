"use client";
import FileUpload from '@/components/FileUpload';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { customTableStyles } from '@/utils/other';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Row, CardHeader, CardTitle, Dropdown, DropdownMenu, DropdownToggle, } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { clearImages, storeImage } from '@/redux/slices/fileSlice';
import { useDispatch } from 'react-redux';
import api from '@/services/api';
import { useNotificationContext } from '@/context/useNotificationContext';
import { useRouter } from 'next/navigation';
const BulkUpload = () => {
    const { showNotification } = useNotificationContext();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [imagePreview, setImagePreview] = useState(false);
    const dispatch = useDispatch();
    const [CSVList, setCSVList] = useState({ data: [], totalRecords: 0 });
    const [isUploading, setIsUploading] = useState(false)
    const [isCsvUpload, setIsCsvUpload] = useState(false)

    const router = useRouter()

    useEffect(() => {
        dispatch(clearImages())
    }, [])


    const successRows = CSVList.data || [];
    const failures = CSVList.failures || [];
    const failureMap = new Map();

    failures?.forEach(failure => {
        failureMap?.set(failure.row - 1, {
            ...(failure.rowData || {}), 
            errors: failure.errors || {},
            isError: true,
            rowIndex: failure.row,
        });
    });

    const totalRows = successRows?.length + failures?.length;

    const mergedData = [];
    for (let i = 1; i <= totalRows; i++) {
        if (failureMap.has(i)) {
            mergedData.push(failureMap.get(i));
        } else if (successRows[i - 1]) {
            mergedData.push(successRows[i - 1]);
        }
    }



    const columns = [
        {
            name: 'Product Name',
            selector: row => row.productName,
            cell: row => (
                <span style={{ color: row.errors?.ProductName ? 'red' : 'inherit' }}>
                    {row.productName}
                    {row.errors?.ProductName && (
                        <div style={{ fontSize: 12, color: 'red' }}>{row.errors.ProductName}</div>
                    )}
                </span>
            ),
            sortable: true,
        },
        {
            name: 'Description',
            selector: row => row.description,
            sortable: true,
        },
        {
            name: 'Category',
            selector: row => row.productCategoryName,
            cell: row => (
                <span style={{ color: row.errors?.ProductCategoryName ? 'red' : 'inherit' }}>
                    {row.productCategoryName}
                    {row.errors?.ProductCategoryName && (
                        <div style={{ fontSize: 12, color: 'red' }}>{row.errors.ProductCategoryName}</div>
                    )}
                </span>
            ),
            sortable: true,
        },
        {
            name: 'Brand',
            selector: row => row.brandName,
            cell: row => (
                <span style={{ color: row.errors?.BrandName ? 'red' : 'inherit' }}>
                    {row.brandName}
                    {row.errors?.BrandName && (
                        <div style={{ fontSize: 12, color: 'red' }}>{row.errors.BrandName}</div>
                    )}
                </span>
            ),
            sortable: true,
        },
        {
            name: 'SKU',
            selector: row => row.sku,
            cell: row => (
                <span style={{ color: row.errors?.SKU ? 'red' : 'inherit' }}>
                    {row.sku}
                    {row.errors?.SKU && (
                        <div style={{ fontSize: 12, color: 'red' }}>{row.errors.SKU}</div>
                    )}
                </span>
            ),
            sortable: true,
        },
        {
            name: 'Cost Price',
            selector: row => row?.price,
            cell: row => (
                <span style={{ color: row.errors?.Price ? 'red' : 'inherit' }}>
                    {row?.price}
                    {row?.errors?.Price && (
                        <div style={{ fontSize: 12, color: 'red' }}>{row.errors.Price}</div>
                    )}
                </span>
            ),
            sortable: true,
        },
        {
            name: 'Selling Price',
            selector: row => row.sellingPrice,
            cell: row => (
                <span style={{ color: row.errors?.SellingPrice ? 'red' : 'inherit' }}>
                    {row?.sellingPrice}
                    {row?.errors?.SellingPrice && (
                        <div style={{ fontSize: 12, color: 'red' }}>{row.errors.SellingPrice}</div>
                    )}
                </span>
            ),
            sortable: true,
        },
        {
            name: 'Quantity',
            selector: row => row.quantity,
            cell: row => (
                <span style={{ color: row.errors?.Quantity ? 'red' : 'inherit' }}>
                    {row?.quantity}
                    {row?.errors?.Quantity && (
                        <div style={{ fontSize: 12, color: 'red' }}>{row.errors.Quantity}</div>
                    )}
                </span>
            ),
            sortable: true,
        },
        {
            name: 'Variant',
            selector: row => row.variantAtttribute,
            cell: row => (
                <span style={{ color: row.errors?.VariantAtttribute ? 'red' : 'inherit' }}>
                    {row?.variantAtttribute}
                    {row?.errors?.VariantAtttribute && (
                        <div style={{ fontSize: 12, color: 'red' }}>{row.errors.VariantAtttribute}</div>
                    )}
                </span>
            ),
            sortable: true,
        },
        {
            name: 'Variant Values',
            selector: row => row.variantAtttributeValue,
            cell: row => (
                <span style={{ color: row.errors?.VariantAtttributeValue ? 'red' : 'inherit' }}>
                    {row?.variantAtttribute}
                    {row?.errors?.VariantAtttributeValue && (
                        <div style={{ fontSize: 12, color: 'red' }}>{row.errors.VariantAtttributeValue}</div>
                    )}
                </span>
            ),
            sortable: true,
        },
    ];


    const handleImageUpload = async (files) => {
        try {
            setIsUploading(true);
            const formData = new FormData();
            files.forEach(file => formData.append('files', file));
            const res = await api.post('api/Product/UploadMultipleImages', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (res.request.status === 200 && res.data.success === true) {
                const uploadedFiles = res.data?.files || [];

                const imageObjects = uploadedFiles.map(({ url, fileName }) => ({
                    name: fileName,
                    preview: url,
                    path: url,
                }));

                dispatch(storeImage(imageObjects));
                setImagePreview(true);
                showNotification({
                    message: res.data.message || "Created successfully!",
                    variant: "success",
                });
                setIsUploading(false);

            } else {
                showNotification({
                    message: res.data.message || "Creation Failed!",
                    variant: "danger",
                });
                setIsUploading(false);
            }

        } catch (err) {
            showNotification({
                message: err.response?.data?.message || 'Image upload failed',
                variant: 'danger',
            });
            setIsUploading(false);
        }
    };


    const handleCSVUpload = async (file) => {
        file = file[0];
        if (Array.isArray(file) && file.length > 0) {
            return;
        }
        try {
            setIsCsvUpload(true);
            const formData = new FormData();
            formData.append('file', file);
            const res = await api.post('api/Product/ProductBulkImportPreview', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });


            if (res.request.status === 200) {
                showNotification({
                    message: res.data.message || "Created successfully!",
                    variant: "success",
                });

                setCSVList({
                    data: res.data.success || [],
                    failures: res.data.failures || [],
                    totalRecords: res.data.success?.length || 0,
                });
                setIsCsvUpload(false);
            } else {
                showNotification({
                    message: res.data.message || "Creation Failed!",
                    variant: "danger",
                });
                setIsCsvUpload(false);
            }
        } catch (err) {
            showNotification({
                message: err.response?.data?.message || 'CSV upload failed',
                variant: 'danger',
            });
            setIsCsvUpload(false);

        }
    };

    const handleSendCSVData = async () => {
        if (CSVList.data.length === 0) {
            showNotification({
                message: 'No data to send. Please upload a CSV file first.',
                variant: 'warning',
            });
            return;
        }
        try {
            const res = await api.post('api/Product/ProductBulkImport', CSVList.data);
            if (res.request.status === 200) {
                showNotification({
                    message: res.data.message || "Created successfully!",
                    variant: "success",
                });
                router.push("/products/product-list");

            } else {
                showNotification({
                    message: res.data.message || "Creation Failed!",
                    variant: "danger",
                });
            }
        } catch (err) {
            showNotification({
                message: err.response?.data?.message || 'Bulk upload failed',
                variant: 'danger',
            });
        }
    };
    const handleDownloadCSV = () => {
        const headers = ['ProductImages', 'Product Name', 'Description', 'Product Category', 'Brand Name', 'SKU', 'Quantity', 'Cost Price', 'Selling Price', 'Variant Attributes', 'Variant Values', 'Barcode'];

        // Create CSV content
        const csvContent = [headers]
            .map((e) => e.join(','))
            .join('\n');

        // Create a blob and trigger download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'sample_attributes.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };




    return (
        <>
            <div className='d-flex justify-content-end mb-3'>
                <Button
                    variant="outline-primary"
                    onClick={handleDownloadCSV}
                    type="button"
                    className="d-flex align-items-center gap-1"
                >
                    Download Sample CSV
                    <IconifyIcon icon="solar:download-outline" width={16} height={16} />
                </Button>
            </div>
            <Row>
                <Col lg={12} xl={12} >
                    <FileUpload
                        title="Add Images"
                        reduxKey="image"
                        showPreview={imagePreview}
                        maxFiles={10}
                        showCopyIcon={true}
                        onFileUpload={handleImageUpload}
                        acceptedFile={{
                            'image/jpeg': [],
                            'image/png': [],
                            'image/jpg': [],
                        }}
                        isUploading={isUploading}
                    />
                </Col>
                <Col lg={12} xl={12} >
                    <FileUpload
                        title="Add Files"
                        boldPlaceholder="Drop your files here, or click to browse"
                        showPreview={true}
                        subPlaceholder={"(csv files are allowed )"}
                        reduxKey="files"
                        acceptedFile={{
                            'text/csv': []
                        }}
                        isUploading={isCsvUpload}
                        onFileUpload={handleCSVUpload}
                    />

                </Col>
            </Row>
            <Card className="mb-3">
                <CardHeader className="d-flex align-items-center gap-1">
                    <CardTitle as={'h4'} className="flex-grow-1">
                        All Product List
                    </CardTitle>

                </CardHeader>
                <div className="table-responsive ">
                    <DataTable
                        columns={columns}
                        data={mergedData}
                        pagination={false}
                        responsive
                        persistTableHead
                        paginationTotalRows={CSVList?.totalRecords}
                        customStyles={customTableStyles(isDarkMode)}
                        onChangePage={(page) => setPage(page)}
                        onChangeRowsPerPage={(newPerPage, page) => {
                            setPerPage(newPerPage);
                            setPage(page);
                        }}
                    />
                </div>
            </Card>
            <div className="d-flex justify-content-end mb-3">
                <button
                    className="btn btn-primary"
                    onClick={handleSendCSVData}
                >
                    Bulk Import Products
                </button>
            </div>

        </>
    )
}

export default BulkUpload
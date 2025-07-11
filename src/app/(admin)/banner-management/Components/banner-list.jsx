'use client';
import IconifyIcon from "@/components/wrappers/IconifyIcon";
import { customTableStyles, detectDarkMode } from "@/utils/other";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const BannerList = () => {

    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const mode = detectDarkMode(setIsDarkMode)
        setIsDarkMode(mode)
    }, [])


    const columns = [
        {
            name: 'Preview',
            selector: (row) => row.id,
            cell: (row) => {
                return (
                    <div>
                        {row.productName}
                    </div>
                )
            },
            sortable: true,
        },
        {
            name: 'Title',
            selector: (row) => row.categoryName,
            sortable: true,
        },

        {
            name: 'Web Url',
            selector: (row) => row.brandName,
            sortable: true,
        },
        {
            name: 'Mobile Config',
            selector: (row) => row?.id || "",
            cell: (row) => {
                return (
                    <div>
                        {row.sku}
                    </div>
                )
            },
            sortable: true,
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
                        checked={row.isActive}
                    />
                </div>
            ),
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div className="d-flex gap-1">
                    <a href={`#`}
                        className={`btn btn-soft-primary btn-sm`} title="Edit User">
                        <IconifyIcon icon="solar:pen-2-broken" className="align-middle fs-18" />
                    </a>
                    <button className={`btn btn-soft-danger btn-sm`} title="Delete Store">
                        <IconifyIcon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" />
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: false,
            button: true,
            width: '200px',
        },
    ]



    return (
        <div className="table-responsive">
            <DataTable
                columns={columns}
                data={[]}
                pagination
                paginationServer
                responsive
                persistTableHead
                // paginationTotalRows={productList?.totalRecords}
                customStyles={customTableStyles(isDarkMode)}
            // onChangePage={(page) => setPage(page)}
            // onChangeRowsPerPage={(newPerPage, page) => {
            //     setPerPage(newPerPage);
            //     setPage(page);
            // }}
            // onSort={() => {
            //   setPerPage(10)
            // }}
            />
        </div>
    )
}

export default BannerList
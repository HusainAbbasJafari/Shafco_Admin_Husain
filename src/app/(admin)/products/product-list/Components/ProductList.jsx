'use client';
import ConfirmationModal from '@/components/ConfirmationModal';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { useNotificationContext } from '@/context/useNotificationContext';
import api from '@/services/api';
import { useProductList } from '@/services/productServices';
import { customTableStyles, debounce, detectDarkMode, encodeId } from '@/utils/other';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Dropdown, DropdownMenu, DropdownToggle, ModalBody, ModalFooter, ModalHeader, ModalTitle, Row } from 'react-bootstrap';
import DataTable from 'react-data-table-component';


// const ProductCard = ({
//   title,
//   price,
//   category,
//   image,
//   rating,
//   size,
//   stockLeft,
//   stockSold
// }) => {
//   return <tr>
//     <td>
//       <div className="form-check ms-1">
//         <input type="checkbox" className="form-check-input" id="customCheck2" />
//         <label className="form-check-label" htmlFor="customCheck2">
//           &nbsp;
//         </label>
//       </div>
//     </td>
//     <td>
//       <div className="d-flex align-items-center gap-2">
//         <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
//           <Image src={image} alt="product" className="avatar-md" />
//         </div>
//         <div>
//           <Link href="" className="text-dark fw-medium fs-15">
//             {title}
//           </Link>
//           <p className="text-muted mb-0 mt-1 fs-13">
//             <span>Size : </span>
//             {size}
//           </p>
//         </div>
//       </div>
//     </td>
//     <td>
//       {currency}
//       {price}.00
//     </td>
//     <td>
//       <p className="mb-1 text-muted">
//         <span className="text-dark fw-medium">{stockLeft} Item</span> Left
//       </p>
//       <p className="mb-0 text-muted">{stockSold} Sold</p>
//     </td>
//     <td>{category}</td>
//     <td>
//       {' '}
//       <span className="badge p-1 bg-light text-dark fs-12 me-1">
//         <IconifyIcon icon="bxs:star" className="align-text-top fs-14 text-warning me-1" />
//         {rating.star}
//       </span>{' '}
//       {rating.review} Review
//     </td>
//     <td>
//       <div className="d-flex gap-2">
//         <Link href="" className="btn btn-light btn-sm">
//           <IconifyIcon icon="solar:eye-broken" className="align-middle fs-18" />
//         </Link>
//         <Link href="" className="btn btn-soft-primary btn-sm">
//           <IconifyIcon icon="solar:pen-2-broken" className="align-middle fs-18" />
//         </Link>
//         <Link href="" className="btn btn-soft-danger btn-sm">
//           <IconifyIcon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" />
//         </Link>
//       </div>
//     </td>
//   </tr>;
// };


const columnFieldMap = {
  'Product Name': 'productName',
  'Product Category': 'categoryName',
  'Brand Name': 'brandName',
  'SKU': 'sku',
  'Stock': 'quantity',
};

const ProductList = () => {
  // const productData = await getProductData();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [deleteProps, setDeleteProps] = useState({ modal: false, id: null, variantId: null });
  const [sort, setSort] = useState({ sortBy: null, sortDirection: null });
  const { showNotification } = useNotificationContext();
  const queryClient = useQueryClient();
  const { data: productList } = useProductList({ pageSize: perPage, pageNumber: page, searchTerm, sortBy: sort.sortBy, sortDirection: sort.sortDirection });

  useEffect(() => {
    const mode = detectDarkMode(setIsDarkMode)
    setIsDarkMode(mode)
  }, [])


  useEffect(() => {
    queryClient.invalidateQueries(['productList']);
  }, []);


  const debouncedSearch = debounce((value) => {
    setSearchTerm(value);
  }, 600);

  const handleDelete = (id, variantId) => {
    setDeleteProps({ modal: true, id: id, variantId });
  }


  const deleteProduct = async () => {
    try {
      const response = await api.post(`/api/Product/RemoveProduct?id=${deleteProps?.id}${deleteProps?.variantId ? `&variantId=${deleteProps.variantId}` : ''}`);
      if (response.data.statusCode === 200 && response.data.isSuccess === true) {
        showNotification({
          message: response.data.message || "Delete Success!",
          variant: "success",
        });
        queryClient.invalidateQueries(['productList']);
        setDeleteProps({ modal: false, id: null, variantId: null });
      } else {
        showNotification({
          message: response.data.message || "Delete Failed!",
          variant: "danger",
        });
        setDeleteProps({ modal: false, id: null, variantId: null })
      }
    } catch (error) {
      showNotification({
        message: error?.response?.data?.message || "An error occurred during category deletion.",
        variant: "danger",
      });
      setDeleteProps({ modal: false, id: null, variantId: null })
    }
  };

  const updateProductStatus = async (id, status) => {
    try {

      const formData = new FormData();
      formData.append('Id', id);
      formData.append('ActiveStatus', status);
      const response = await api.post(`/api/Product/UpdateProductStatus`, formData);
      if (response.data.statusCode === 200 && response.data.isSuccess === true) {
        showNotification({
          message: response.data.message || "Status updated Successfully!",
          variant: "success",
        });
        queryClient.invalidateQueries(['productList']);
      } else {
        showNotification({
          message: response.data.message || "Status update Failed!",
          variant: "danger",
        });
      }
    } catch (error) {
      showNotification({
        message: error?.response?.data?.message || "An error occurred during category deletion.",
        variant: "danger",
      });
    }
  };

  const columns = [
    {
      name: 'Product Image',
      cell: (row) => {
        const imageUrl = (Array.isArray(row.defaultImageUrl) && row.defaultImageUrl?.length) ? row?.defaultImageUrl?.[0] : null;
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
      name: 'Product Name',
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
      name: 'Product Category',
      cell: (row) => {
        return (
          <div>
            {row.categoryName}
          </div>
        )
      },
      sortable: true,
    },

    {
      name: 'Brand Name',
      cell: (row) => {
        return (
          <div>
            {row.brandName}
          </div>
        )
      },
      sortable: true,
    },
    {
      name: 'SKU',
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
      name: 'Stock',
      cell: (row) => {
        return (
          <div>
            {row.quantity}
          </div>
        )
      },
      sortable: true,
    },
    {
      name: 'Tag',
      selector: (row) => row.productTag,
      sortable: false,
    },
    {
      name: 'Created By',
      selector: (row) => row.createdBy,
      sortable: false,
      width: "150px"
    },
    {
      name: 'Updated By',
      selector: (row) => row.updatedBy,
      sortable: false,
      width: "150px"
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
            onChange={(e) => updateProductStatus(row.id, e.target.checked)}
            checked={row.isActive}
          />
        </div>
      ),
    },
    {
      name: 'Actions',
      cell: (row) => {
        const isConfigurable = row.productTypeName === "Configurable";
        const variantId = row?.variantId
        return (
          <div className="d-flex gap-1">
            <a href={`/products/${isConfigurable ? "configurable-product-edit" : "product-edit"}/${encodeId(row.id)}${variantId ? `?variantId=${encodeId(variantId)}` : ''}`}
              className={`btn btn-soft-primary btn-sm`} title="Edit User">
              <IconifyIcon icon="solar:pen-2-broken" className="align-middle fs-18" />
            </a>
            <button className={`btn btn-soft-danger btn-sm`} onClick={() => handleDelete(row.id , row.variantId)} title="Delete Store">
              <IconifyIcon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" />
            </button>
          </div>
        )
      },
      ignoreRowClick: true,
      allowOverflow: false,
      button: true,
      width: '200px',
    },
  ]

  return <>
    <Card>
      <CardHeader>
        <CardTitle>Product Management</CardTitle>
      </CardHeader>
      <CardBody>
        <Row className='d-flex gap-3'>
          <Col lg={3} md={5} sm={5} >
            <label className="form-label mb-1">Search Products</label>
            <input
              type="text"
              className="form-control"
              placeholder="Search by Name, Category, Brand, SKU..."
              onChange={(e) => debouncedSearch(e.target.value)}
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
    <Card>
      <CardHeader className="d-flex justify-content-between align-items-center gap-1">
        <CardTitle as={'h4'} className="flex-grow-1">
          All Product List
        </CardTitle>
        <Dropdown>
          <DropdownToggle
            as="button"
            type="button"
            className="btn btn-sm btn-outline-light content-none"
            data-bs-toggle="dropdown"
            aria-expanded="false">
            Option
            <IconifyIcon width={16} height={16} className="ms-1" icon="bx:chevron-down" />
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-end">
            <Link href="/products/bulk-uploads" className="dropdown-item">
              Bulk Import
            </Link>
            <Link href='/products/manage-tags' className="dropdown-item" >
              Manage Tags
            </Link>
          </DropdownMenu>
        </Dropdown>
      </CardHeader>
      <div>
        <div className="table-responsive">
          <DataTable
            columns={columns}
            data={productList?.data}
            keyField="id"
            pagination
            paginationServer
            responsive
            persistTableHead
            paginationTotalRows={productList?.totalRecords}
            customStyles={customTableStyles(isDarkMode)}
            onChangePage={(page) => setPage(page)}
            onChangeRowsPerPage={(newPerPage, page) => {
              setPerPage(newPerPage);
              setPage(page);
            }}
            onSort={(column, direction) => {
              const sortBy = columnFieldMap[column.name] || '';
              setSort({
                sortBy,
                sortDirection: direction
              });
              // setPerPage(perPage);
              queryClient.invalidateQueries(['productList']);
            }}
          />
        </div>
      </div>

      <ConfirmationModal show={deleteProps?.modal} onHide={() => setDeleteProps({ modal: false, id: null, variantId: null })
      }>
        <ModalHeader closeButton>
          <ModalTitle>Confirm Delete</ModalTitle>
        </ModalHeader>

        <ModalBody>
          Are you sure you want to delete?
        </ModalBody>

        <ModalFooter>
          <Button variant="secondary" onClick={() => setDeleteProps({ modal: false, id: null, variantId: null })
          }>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteProduct}>
            Delete
          </Button>
        </ModalFooter>
      </ConfirmationModal>
    </Card>

  </>
};
export default ProductList;
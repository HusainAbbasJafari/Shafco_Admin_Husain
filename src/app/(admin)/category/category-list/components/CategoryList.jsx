'use client'
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { customTableStyles, detectDarkMode, encodeId, stripHtmlTags } from '@/utils/other';
import { useEffect, useRef, useState } from 'react';
import { Button, Card, ModalBody, ModalFooter, ModalHeader, ModalTitle, Overlay, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { useCategoryList } from '@/services/categoryServices';
import { useNotificationContext } from '@/context/useNotificationContext';
import api from '@/services/api';
import { useQueryClient } from '@tanstack/react-query';
import ConfirmationModal from '../../../../../components/ConfirmationModal.jsx';


const CategoryList = () => {

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [status, setStatus] = useState(0);
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [deleteProps, setDeleteProps] = useState({ modal: false, id: null })
  const target = useRef(null)
  const { showNotification } = useNotificationContext()
  const queryClient = useQueryClient();

  const { data: categoryList } = useCategoryList({ status, searchTerm, pageSize: perPage, pageNumber: page })


  useEffect(() => {
    const mode = detectDarkMode(setIsDarkMode)
    setIsDarkMode(mode)
    queryClient.invalidateQueries(['categoryList']);
  }, [])


  const handleDelete = (id) => {
    setDeleteProps({ modal: true, id: id })
  }



  const deleteCategory = async () => {
    try {
      const formData = new FormData();
      formData.append("id", deleteProps?.id);
      const response = await api.post(`/api/ProductCategory/DeleteProductCategory`, formData);
      if (response.data.statusCode === 200 && response.data.isSuccess === true) {
        showNotification({
          message: response.data.message || "Delete Success!",
          variant: "success",
        });
        queryClient.invalidateQueries(['categoryList']);
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
        message: error?.response?.data?.message || "An error occurred during category deletion.",
        variant: "danger",
      });
      setDeleteProps({ modal: false, id: null })
    }
  };


  const updateProductCategoryStatus = async (id, status) => {
    try {
      const formData = new FormData();
      formData.append('Id', id);
      formData.append('ActiveStatus', status);

      const response = await api.post(`/api/ProductCategory/CategoryStatusUpdate`, formData);
      if (response.data.statusCode === 200 && response.data.isSuccess === true) {
        showNotification({
          message: response.data.message || "Status updated Successfully!",
          variant: "success",
        });
        queryClient.invalidateQueries(['categoryList']);
      } else {
        showNotification({
          message: response.data.message || "Status update Failed!",
          variant: "danger",
        });
        queryClient.invalidateQueries(['categoryList']);
      }
    } catch (error) {
      queryClient.invalidateQueries(['categoryList']);
      showNotification({
        message: error?.response?.data?.message || "An error occurred during category deletion.",
        variant: "danger",
      });
    }
  };



  const columns = [
    {
      name: 'Category Image',
      selector: (row) => row.category,
      cell: (row) => (
        <div className="d-flex align-items-center p-2">
          <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
            {row.categoryImage && <img src={row.categoryImage} alt={`category${row.id}`} className="avatar-md" />}
          </div>
        </div>
      ),
    },
    {
      name: 'Category',
      selector: (row) => row.categoryName,
      sortable: true,
    },

    {
      name: 'Description',
      selector: (row) => stripHtmlTags(row.description),
      sortable: true,
      cell: (row) => {
        const plainText = stripHtmlTags(row.description) ? stripHtmlTags(row.description) : 'N/A'
        return (
          <OverlayTrigger placement="top" overlay={<Tooltip id={`tooltip-${row.id}`}>{plainText}</Tooltip>}>
            <span>{plainText}</span>
          </OverlayTrigger>
        )
      },
    },
    // {
    //   name: 'Status',
    //   selector: (row) => (row.status === 1 ? 'Published' : 'Draft'),
    //   sortable: true,
    // },
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
            title={row.status ? 'Active' : 'Inactive'}
            id={`flexSwitch-${row.id}`}
            onChange={(e) => updateProductCategoryStatus(row.id, e.target.checked)}
            checked={row.status === 1 ? true : false}
          />
        </div>
      ),
    },
    {
      name: 'Created By',
      selector: (row) => row.createdBy,
      sortable: true,
    },

    {
      name: 'Updated By',
      selector: row => row.updatedBy,
      sortable: false,
    },

    {
      name: 'Actions',
      cell: (row) => (
        <div className={`d-flex gap-1 ${row.status === 0 ? "disabled-actions" : ""}`}>
          <a href={`/category/category-edit/${encodeId(row.id)}`} className={`btn btn-soft-primary btn-sm`} title="Edit Category" disabled={row.status === 2}>
            <IconifyIcon icon="solar:pen-2-broken" className="align-middle fs-18" />
          </a>
          <button className={`btn btn-soft-danger btn-sm`} onClick={() => handleDelete(row.id)} title="Delete Category" disabled={row.status === 2}>
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

  return <>
    <div className="mb-3 d-flex justify-content-end position-relative">
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
                  placeholder="Search Category"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <p>Status</p>
                <div className="d-flex gap-2 align-items-center">
                  <div className="form-check">
                    <input className="form-check-input" value={0} type="radio" name="flexRadioDefault" id="flexRadioDefault3" onChange={(e) => setStatus(e.target.value)} />
                    <label className="form-check-label" htmlFor="flexRadioDefault3">
                      All
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" value={2} type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={(e) => setStatus(e.target.value)} />
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                      Draft
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" value={1} type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={(e) => setStatus(e.target.value)} defaultChecked />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                      Published
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
    <Card>
      <div>
        <div className="table-responsive">
          <DataTable
            columns={columns}
            data={categoryList?.data}
            pagination
            paginationServer
            responsive
            persistTableHead
            paginationTotalRows={categoryList?.totalRecords}
            customStyles={customTableStyles(isDarkMode)}
            onChangePage={(page) => setPage(page)}
            onChangeRowsPerPage={(newPerPage, page) => {
              setPerPage(newPerPage);
              setPage(page);
            }}
          />
        </div>
      </div>
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
        <Button variant="danger" onClick={deleteCategory}>
          Delete
        </Button>
      </ModalFooter>
    </ConfirmationModal>
  </>
};
export default CategoryList;
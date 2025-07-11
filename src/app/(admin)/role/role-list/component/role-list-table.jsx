
"use client";
import ConfirmationModal from '@/components/ConfirmationModal';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { useLoader } from '@/context/useLoaderContext';
import { useNotificationContext } from '@/context/useNotificationContext';
import api from '@/services/api';
import { customSelectStyles, customTableStyles, debounce, detectDarkMode, encodeId } from '@/utils/other';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, ModalBody, ModalFooter, ModalHeader, ModalTitle, Row } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import Select from 'react-select';
import { useRoleList } from '../../../../../services/roleServices';

const RoleListTable = () => {

    const { showNotification } = useNotificationContext();
    const { loading } = useLoader();
    const queryClient = useQueryClient();
    const [isDarkMode, setIsDarkMode] = useState(false)
    // const [showFilters, setShowFilters] = useState(false)
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const [roleStatus, setRoleStatus] = useState({ label: 'All', value: 0 })
    // const [roleType, setRoleType] = useState({ label: '', value: '' })
    const [deleteProps, setDeleteProps] = useState({ modal: false, id: null })
    const { data: roleList, isLoading } = useRoleList({
        searchingTerm: searchTerm,
        filterStatus: roleStatus?.value,
        roleType: null,
        pageNumber: page,
        pageSize: perPage
    });

    const debouncedSearch = debounce((value) => {
        setSearchTerm(value);
    }, 600);




    useEffect(() => {
        const mode = detectDarkMode(setIsDarkMode)
        setIsDarkMode(mode)
    }, [])

    const handleDelete = (id) => {
        setDeleteProps({ modal: true, id: id })
    }

    const columns = [
        {
            name: 'Role',
            selector: row => row.roleName,
            sortable: true,
            width: '16.6%',
        },
        {
            name: 'Role Type',
            selector: row => row.isSub ? "Sub Role" : "Standard Role",
            sortable: false,
            width: '16.6%',
        },
        {
            name: 'Status',
            selector: row => row.isActive,
            sortable: true,
            cell: row => (
                <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id={`flexSwitch-${row.id}`}
                        onChange={(e) => updateRoles({ ...row, status: e.target.checked })}
                        checked={row.isActive}
                    />
                </div>
            ),
            width: '16.6%',
        },
        {
            name: 'Created By',
            selector: row => row.createdBy,
            sortable: false,
            width: '16.6%',
        },
        {
            name: 'Updated By',
            selector: row => row.updatedBy,
            sortable: false,
            width: '16.6%',
        },

        // {
        //     name: 'Permissions',
        //     selector: row => row.id,
        //     cell: row => (
        //       <div className="d-flex flex-column gap-1 py-2">
        //         <div className="form-check form-switch">
        //           <label className="form-check-label me-2" htmlFor={`create-${row.id}`}>Create</label>
        //           <input
        //                 className="form-check-input"
        //                 type="checkbox"
        //                 role="switch"
        //                 id={`flexSwitch-${row.id}`}
        //                 // onChange={(e) => updateRoles({ ...row, status: e.target.checked })}
        //                 // checked={row.isActive}
        //             />
        //         </div>

        //         <div className="form-check form-switch">
        //           <label className="form-check-label me-2" htmlFor={`view-${row.id}`}>View Only</label>
        //           <input
        //                 className="form-check-input"
        //                 type="checkbox"
        //                 role="switch"
        //                 id={`flexSwitch-${row.id}`}
        //                 // onChange={(e) => updateRoles({ ...row, status: e.target.checked })}
        //                 // checked={row.isActive}
        //             />
        //         </div>

        //         <div className="form-check form-switch">
        //           <label className="form-check-label me-2" htmlFor={`edit-${row.id}`}>Edit</label>
        //           <input
        //                 className="form-check-input"
        //                 type="checkbox"
        //                 role="switch"
        //                 id={`flexSwitch-${row.id}`}
        //                 // onChange={(e) => updateRoles({ ...row, status: e.target.checked })}
        //                 // checked={row.isActive}
        //             />
        //         </div>

        //         <div className="form-check form-switch">
        //           <label className="form-check-label me-2" htmlFor={`delete-${row.id}`}>Delete</label>
        //           <input
        //                 className="form-check-input"
        //                 type="checkbox"
        //                 role="switch"
        //                 id={`flexSwitch-${row.id}`}
        //                 // onChange={(e) => updateRoles({ ...row, status: e.target.checked })}
        //                 // checked={row.isActive}
        //             />
        //         </div>
        //       </div>
        //     ),
        //     width: "20%"
        // },
        {
            name: 'Action',
            cell: row => (
                <div className="d-flex justify-content-center gap-2">
                    <Link
                        href={`/role/role-edit/${encodeId(row.id)}`}
                        className="btn btn-soft-primary btn-sm"
                    >
                        <IconifyIcon icon="solar:pen-2-broken" className="align-middle fs-18" />
                    </Link>
                    <button
                        className="btn btn-soft-danger btn-sm"
                        onClick={() => handleDelete(row.id)}
                        disabled={loading}
                    >
                        <IconifyIcon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" />
                    </button>
                </div>
            ),
            center: true,
            width: '16.6%',
            ignoreRowClick: true,
            allowOverflow: true,
            button: true
        }
    ];

    useEffect(() => {
        queryClient.invalidateQueries(['roleList']);
    }, []);

    const updateRoles = async (data) => {
        try {
            const requestBody = {
                roleId: data.id,
                roleName: data.roleName,
                roleDescription: data.description,
                isActive: data.status,
            };
            const response = await api.post("/api/GeneralSettings/AddOrUpdateRole", requestBody, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.data.statusCode === 200 && response.data.isSuccess === true) {
                showNotification({
                    message: response.data.message || "Update Success!",
                    variant: "success",
                });
                queryClient.invalidateQueries(['roleList']);
            } else {
                showNotification({
                    message: response.data.message || "Update Failed!",
                    variant: "danger",
                });
            }
        } catch (error) {
            showNotification({
                message: error?.response?.data?.message || "An error occurred during role creation.",
                variant: "danger",
            });
        }
    };

    const deleteRoles = async () => {
        try {
            const response = await api.get(`/api/GeneralSettings/DeleteRole?RoleId=${deleteProps.id}`);
            if (response.data.statusCode === 200 && response.data.isSuccess === true) {
                showNotification({
                    message: response.data.message || "Deleted Successfully!",
                    variant: "success",
                });
                queryClient.invalidateQueries(['roleList']);
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
                message: error?.response?.data?.message || "An error occurred during role deletion.",
                variant: "danger",
            });
            setDeleteProps({ modal: false, id: null })

        }
    };

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
                <Button variant="danger" onClick={deleteRoles}>
                    Delete
                </Button>
            </ModalFooter>
        </ConfirmationModal>
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
                                    placeholder="Search roles"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div>
                                <p>Role Type</p>
                                <div className="d-flex gap-2 align-items-center">
                                    <div className="form-check">
                                        <input className="form-check-input" value={"all"} type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={() => setRoleType(null)} defaultChecked />
                                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                                            All
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" value={"sub"} type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={(e) => setRoleType(e.target.value)} />
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            Sub Role
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" value={"standard"} type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={(e) => setRoleType(e.target.value)} />
                                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                                            Standard Role
                                        </label>
                                    </div>

                                </div>
                            </div>
                            <div>
                                <label className="form-label mb-1">Role</label>
                                <Select
                                    options={roleOptions}
                                    value={selectedRole}
                                    onChange={setSearchedRole}
                                    isClearable
                                    styles={customSelectStyles}
                                    classNamePrefix="react-select"
                                />
                            </div>
                        </div>
                    </Popover.Body>
                </Popover>
            </Overlay>
        </div> */}

        <Card>
            <CardHeader>
                <CardTitle>Role Management</CardTitle>
            </CardHeader>
            <CardBody>
                <Row >
                    <Col lg={4}  >
                        <label className="form-label mb-1">Search Roles</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Role Name..."
                            // value={searchTerm}
                            onChange={(e) => debouncedSearch(e.target.value)}
                        />
                    </Col>
                    <Col lg={4}  >
                        <label className="form-label mb-1">Role Status</label>
                        <Select
                            options={[{ label: "All", value: 0 }, { label: "Active", value: 1 }, { label: "In-Active", value: 2 }]}
                            value={roleStatus}
                            onChange={(selectedOption) => setRoleStatus(selectedOption)}
                            placeholder="Select Role Status"
                            isClearable
                            styles={customSelectStyles}
                            classNamePrefix="react-select"
                        />
                    </Col>
                    {/* <Col lg={4}  >
                        <label className="form-label mb-1">Role Type</label>
                        <Select
                            options={[{ label: "All", value: 0 }, { label: "Active", value: 1 }, { label: "In-Active", value: 2 }]}
                            value={roleStatus}
                            onChange={(selectedOption) => setRoleType(selectedOption)}
                            placeholder="Select Role Status"
                            isClearable
                            styles={customSelectStyles}
                            classNamePrefix="react-select"
                        />
                    </Col> */}
                </Row>
            </CardBody>
        </Card>

        <Card className="overflow-hidden Coupons">
            <CardBody className="p-0">
                <DataTable
                    columns={columns}
                    data={isLoading ? [] : roleList?.data?.filter(item => item.roleName !== "SuperAdmin")}
                    progressPending={isLoading}
                    pagination
                    paginationServer
                    responsive
                    persistTableHead
                    paginationTotalRows={roleList?.totalRecords}
                    customStyles={customTableStyles(isDarkMode)}
                    onChangePage={(page) => setPage(page)}
                    onChangeRowsPerPage={(newPerPage, page) => {
                        setPerPage(newPerPage);
                        setPage(page);
                    }}
                />
            </CardBody>
        </Card>
    </>;
};
export default RoleListTable;



{/* {item.icon ? <td>
                                    {item.icon && <Image src={item.icon} className="avatar-xs rounded-circle me-1" alt="..." />} {item.workspace}
                                </td> : <td>
                                    <Link href="" className="link-primary">
                                        + {item.workspace}
                                    </Link>
                                </td>} */}
{/* <td>
                                    {' '}
                                    {item.tags.map((tagItem, idx) => <>
                                        <span key={idx} className="badge bg-light-subtle text-muted border py-1 px-2">
                                            {tagItem}
                                        </span>
                                        &nbsp;
                                    </>)}{' '}
                                </td> */}
{/* <td>
                                    <div className="avatar-group">
                                        {item.users && item.users.map((user, idx) => <Fragment key={idx}>
                                            {user.image && user.image.map((img, idx) => <div className="avatar" key={idx}>
                                                <Image src={img} alt="avatar" className="rounded-circle avatar-sm" />
                                            </div>)}
                                            {user.TextAvatar && user.TextAvatar.map((text, idx) => <div className="avatar" key={idx}>
                                                <span className={`avatar-sm d-flex align-items-center justify-content-center bg-${text.variant}-subtle text-${text.variant} rounded-circle fw-bold shadow`}>
                                                    {text.text}
                                                </span>
                                            </div>)}
                                        </Fragment>)}
                                        {!item.users && <Link href="" className="link-primary">
                                            + Add User
                                        </Link>}
                                    </div>
                                </td> */}
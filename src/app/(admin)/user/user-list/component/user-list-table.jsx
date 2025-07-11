
"use client";
import ConfirmationModal from '@/components/ConfirmationModal';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { useNotificationContext } from '@/context/useNotificationContext';
import api from '@/services/api';
import { useRoleList } from '@/services/roleServices';
import { useUserList } from "@/services/userServices";
import { customSelectStyles, customTableStyles, detectDarkMode, encodeId } from '@/utils/other';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, ModalBody, ModalFooter, ModalHeader, ModalTitle, Row } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import ForcePasswordChange from './force-password-change';

const UserListTable = () => {



    const { showNotification } = useNotificationContext()
    const user = useSelector((state) => state.auth.user);

    // const [searchTerm, setSearchTerm] = useState('');
    // const [searchedRole, setSearchedRole] = useState(null);
    // const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({ search: null, userStatus: null, roleType: null, role: null })
    const [showForcePassword, setShowForcePassword] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRole, setSelectedRole] = useState()
    const [roleType, setRoleType] = useState(null)
    const [isDarkMode, setIsDarkMode] = useState(false)
    // const target = useRef(null);
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [deleteProps, setDeleteProps] = useState({ modal: false, id: null, isDelete: false })

    const { data: userList } = useUserList({
        userNameOrEmail: filters?.search,
        status: filters?.userStatus,
        roleType: filters.roleType,
        roleId: filters?.role,
        pageNumber: page,
        pageSize: perPage
    });

    const { data: roleList } = useRoleList({
        roleType: null,
        pageNumber: 1,
        pageSize: 100,
        searchingTerm: "",
        filterStatus: 0
    });


    useEffect(() => {
        const mode = detectDarkMode(setIsDarkMode)
        setIsDarkMode(mode)
    }, [])

    const handleDelete = (id, isDelete) => {
        setDeleteProps({ modal: true, id: id, isDelete: isDelete })
    }


    const roleOptions = roleList?.data
        ?.filter((item) => item.roleName !== "SuperAdmin")
        ?.map((item) => ({
            value: item.id,
            label: item.roleName
        }));



    const handleFiltersChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value || null,
        }));
    };



    const handleRoleChange = (selected, user) => {
        changeUserRole({ accountId: user.accountId, roleId: selected.value })
        setSelectedRole(selected)
    };

    const handleModalOpen = (user) => {
        setShowForcePassword(true);
        setSelectedUser(user)
    };


    const columns = [
        {
            name: 'Profile Picture',
            selector: (row) => row.profileImageUrl,
            cell: (row) => (
                <img
                    src={
                        row.profilePic ||
                        'https://static-00.iconduck.com/assets.00/avatar-default-icon-2048x2048-h6w375ur.png'
                    }
                    alt="Profile"
                    className={`rounded-circle  ${!row.isActive ? "disabled-actions" : ""}`}
                    style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                />
            ),
            sortable: false,
        },
        {
            name: 'Full Name',
            selector: row => row.fullName,
            cell: (row) => (
                <div className={`${!row.isActive ? "disabled-actions" : ""}`} >
                    {row.fullName}
                </div>
            ),
            sortable: true,
        },
        {
            name: 'Role',
            selector: row => {
                const role = roleOptions?.find(opt => opt.value === row.roleId);
                return role?.label || '';
            },
            cell: row => {
                const role = roleOptions?.find(opt => opt.value === row.roleId);
                return (
                    <Select
                        options={roleOptions}
                        value={role}
                        onChange={(selected) => { handleRoleChange(selected, row) }}
                        className={`react-select-container ${!row.isActive ? "disabled-actions" : ""} `}
                        classNamePrefix="react-select"
                        isDisabled={!row.isActive}
                        styles={{
                            control: (base, state) => ({
                                ...base,
                                minHeight: '32px',
                                fontSize: '0.875rem',
                                scrollbarWidth: 'none',
                                borderColor: state.isFocused ? '#ced4da' : '#ced4da',
                                width: '150px',
                                backgroundColor: isDarkMode ? "var(--bs-light)" : "#fff",
                                color: isDarkMode ? "var(--bs-body-color)" : '',
                            }),
                            option: (base, { isSelected }) => ({
                                ...base,
                                fontSize: '0.8rem',
                                backgroundColor: isSelected ? '#ffe6e6' : '#fff',
                                color: isDarkMode ? "var(--bs-body-color)" : '#212529',
                                backgroundColor: isDarkMode ? "var(--bs-light)" : "#fff",
                                '&:hover': {
                                    backgroundColor: '#ffe6e6'
                                }
                            }),

                            menu: (base) => ({
                                ...base,
                                backgroundColor: isDarkMode ? "var(--bs-light)" : "",
                            }),
                            singleValue: (base) => ({
                                ...base,
                                color: isDarkMode ? "var(--bs-body-color)" : "",
                            }),
                            dropdownIndicator: (base) => ({
                                ...base,
                                padding: 4,
                            }),
                            clearIndicator: (base) => ({
                                ...base,
                                padding: 4,
                            }),
                            valueContainer: (base) => ({
                                ...base,
                                padding: '0 6px',
                            }),

                        }}
                        menuPlacement="auto"
                    />
                );
            },
            width: "200px",
            sortable: true,
            center: true
        },
        {
            name: 'Role Type',
            cell: (row) => (
                <div className={`${!row.isActive ? "disabled-actions" : ""}`} >
                    {row.isInternal ? "Sub Role" : "Standard Role"}
                </div>
            ),
            center: true
        },
        {
            name: 'Email',
            selector: (row) => row.email,
            cell: (row) => (
                <div className={`${!row.isActive ? "disabled-actions" : ""}`} >
                    {row.email}
                </div>
            ),
            sortable: true,
        },
        {
            name: 'Phone',
            selector: (row) => row.phoneNo,
            cell: (row) => (
                <div className={`${!row.isActive ? "disabled-actions" : ""}`} >
                    {row.phoneNo}
                </div>
            ),
        },
        {
            name: 'Created By',
            selector: row => row?.createdBy || "N/A",
            sortable: false,
        },
        {
            name: 'Updated By',
            selector: row => row.updatedBy || "N/A",
            sortable: false,
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div className="d-flex gap-1">
                    <a
                        href={`/user/user-edit/${encodeId(row.accountId)}`}
                        className={`btn btn-soft-primary btn-sm ${!row.isActive ? "disabled-actions" : ""}`}
                        title="Edit User"
                    >
                        <IconifyIcon icon="solar:pen-2-broken" className="align-middle fs-18" />
                    </a>
                    <button
                        className={`btn btn-soft-danger btn-sm ${!row.isActive ? "disabled-actions" : ""}`}
                        onClick={() => handleDelete(row.accountId, true)}
                        title="Delete User"
                    >
                        <IconifyIcon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" />
                    </button>
                    <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => { row.isActive ? handleDelete(row.accountId, false) : activateUser(row.accountId, true) }}
                        title={row.isActive ? "Suspend User" : "Activate User"}
                    >
                        <IconifyIcon
                            icon={row.isActive ? "solar:user-block-bold" : "solar:user-check-bold"}
                            className="align-middle fs-18"
                        />
                    </button>
                    {user?.roleName === "SuperAdmin" && (
                        <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => handleModalOpen(row)}
                            title="Force Change Password"
                            disabled={!row.isActive}
                        >
                            <IconifyIcon icon="solar:lock-password-bold" className="align-middle fs-18" />
                        </button>
                    )}
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: false,
            button: true,
            width: "250px"
        },
    ];

    const changeUserRole = async (data) => {
        try {
            const formData = new FormData();
            formData.append("UserId", data.accountId);
            formData.append("RoleId", data.roleId);
            const response = await api.post("/api/UserManagement/ChangeUserRole", formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.data.statusCode === 200 && response.data.isSuccess === true) {
                showNotification({
                    message: response.data.message,
                    variant: "success",
                });
                queryClient.invalidateQueries(['userList']);
            } else {
                showNotification({
                    message: response.data.message || "Update Failed!",
                    variant: "danger",
                });
            }
        } catch (error) {
            showNotification({
                message: error?.message || "An error occurred during password change.",
                variant: "danger",
            });
        }
    };


    const deleteUser = async () => {
        try {
            const formData = new FormData();
            formData.append("UserId", deleteProps?.id);
            formData.append("IsDelete", deleteProps?.isDelete);
            const response = await api.post(`/api/UserManagement/SuspendOrDeleteUser`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (response.data.statusCode === 200 && response.data.isSuccess === true) {
                showNotification({
                    message: response.data.message || "Delete Success!",
                    variant: "success",
                });
                queryClient.invalidateQueries(['userList']);
                setDeleteProps({ modal: false, id: null, isDelete: false })
            } else {
                showNotification({
                    message: response.data.message || "Delete Failed!",
                    variant: "danger",
                });
                setDeleteProps({ modal: false, id: null, isDelete: false })
            }
        } catch (error) {
            showNotification({
                message: error?.message || "An error occurred during role deletion.",
                variant: "danger",
            });
            setDeleteProps({ modal: false, id: null, isDelete: false })
        }
    };

    const activateUser = async (userId, isRetrieve) => {
        try {
            const formData = new FormData();
            formData.append("UserId", userId);
            formData.append("IsRetrieve", isRetrieve);
            const response = await api.post(`/api/UserManagement/RestoreUserAccount`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (response.data.statusCode === 200 && response.data.isSuccess === true) {
                showNotification({
                    message: response.data.message || "Delete Success!",
                    variant: "success",
                });
                queryClient.invalidateQueries(['userList']);
            } else {
                showNotification({
                    message: response.data.message || "Delete Failed!",
                    variant: "danger",
                });
            }
        } catch (error) {
            showNotification({
                message: error?.message || "An error occurred during role deletion.",
                variant: "danger",
            });
        }
    };


    return <>
        <ConfirmationModal show={deleteProps?.modal} onHide={() => setDeleteProps({ modal: false, id: null, isDelete: false })}>
            <ModalHeader closeButton>
                <ModalTitle>{`${deleteProps.isDelete ? "Confirm Delete" : "Confirm Suspend"} `}</ModalTitle>
            </ModalHeader>

            <ModalBody>
                {`Are you sure you want to ${deleteProps.isDelete ? "delete user" : "suspend user"} ?`}
            </ModalBody>

            <ModalFooter>
                <Button variant="secondary" onClick={() => setDeleteProps({ modal: false, id: null, isDelete: false })}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={deleteUser}>
                    {deleteProps.isDelete ? "Delete" : "Suspend"}
                </Button>
            </ModalFooter>
        </ConfirmationModal>

        <Card>
            <CardHeader>
                <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardBody>
                <Row >
                    <Col lg={3} className='mb-3'>
                        <label className="form-label mb-1">Search Users</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search Name or Email"
                            // value={searchTerm}
                            name='search'
                            onChange={(e) => handleFiltersChange(e)}
                        />
                    </Col>
                    <Col lg={3} className='mb-3'>
                        <label className="form-label mb-1">User Status</label>
                        <Select
                            options={[{ label: "All", value: null }, { label: "Active", value: true }, { label: "In-Active", value: false }]}
                            onChange={(selectedOption) =>
                                setFilters(prev => ({
                                    ...prev,
                                    userStatus: selectedOption ? selectedOption.value : ""
                                }))
                            }
                            placeholder="Select User Status"
                            isClearable
                            styles={customSelectStyles}
                            classNamePrefix="react-select"
                        />
                    </Col>
                    <Col lg={3} className='mb-3'>
                        <label className="form-label mb-1">User Role Type</label>
                        <Select
                            options={[{ label: "All", value: null }, { label: "Standard", value: 'standard' }, { label: "Sub", value: 'sub' }]}
                            onChange={(selectedOption) =>
                                setFilters(prev => ({
                                    ...prev,
                                    roleType: selectedOption ? selectedOption.value : ""
                                }))
                            }
                            placeholder="Select User Role Type"
                            isClearable
                            styles={customSelectStyles}
                            classNamePrefix="react-select"
                        />
                    </Col>
                    <Col lg={3} className='mb-3'>
                        <label className="form-label mb-1">Role</label>
                        <Select
                            options={roleOptions}
                            value={selectedRole}
                            onChange={(selectedOption) =>
                                setFilters(prev => ({
                                    ...prev,
                                    role: selectedOption ? selectedOption.value : ""
                                }))
                            }
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
                        data={userList?.userDetail}
                        pagination
                        paginationServer
                        responsive
                        persistTableHead
                        customStyles={customTableStyles(isDarkMode)}
                        paginationTotalRows={userList?.totalCount || 0}
                        onChangePage={(page) => setPage(page)}
                        onChangeRowsPerPage={(newPerPage, page) => {
                            setPerPage(newPerPage);
                            setPage(page);
                        }}
                    />
                </div>
            </CardBody>
        </Card>
        <ForcePasswordChange show={showForcePassword} onHide={() => setShowForcePassword(false)} selectedUser={selectedUser} />
    </>;
};
export default UserListTable;
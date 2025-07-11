'use client';
import { useNotificationContext } from '@/context/useNotificationContext';
import api from '@/services/api';
import { customSelectStyles } from '@/utils/other';
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Row } from 'react-bootstrap';
import { Controller, useForm } from "react-hook-form";
import Select from 'react-select';
import * as Yup from "yup";


const schema = Yup.object().shape({
  rolename: Yup.string()
    .trim()
    .min(1, 'Role Name is required')
    .max(100, "Full Name must be at most 100 characters")
    .required('Role Name is required'),
  description: Yup.string()
    .trim()
    .min(1, 'Description is required')
    .required('Description is required'),
  roleType: Yup.object().nullable().test(
    "roleType-required",
    "Role Type is required",
    function (value) {
      return value && value.label && value.value !== undefined;
    }
  ),
});

const EditForm = () => {

  const params = useParams();
  const { showNotification } = useNotificationContext();
  const [roleData, setRoleData] = useState(null)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  useEffect(() => {
    if (params?.encodedId) {
      const decodedId = atob(params.encodedId);
      getRole(decodedId);
    }
  }, [params])

  const roleTypes = [
    { value: 0, label: "Standard Role" },
    { value: 1, label: "Sub Role" },
  ]


  useEffect(() => {
    if (roleData) {
      reset({
        rolename: roleData.roleName || "",
        description: roleData.description || "",
        status: roleData.isActive ? "active" : "inactive",
        roleType: roleTypes.find((role) => role.value === Number(roleData.isSub)) || null,
      });
    }
  }, [roleData])


  const getRole = async (id) => {
    try {
      const response = await api.get(`/api/GeneralSettings/GetRoleById?RoleId=${id}`);
      if (response.data.statusCode === 200 && response.data.isSuccess === true) {
        setRoleData(response.data.data);
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


  const updateRoles = async (data) => {
    try {
      const requestBody = {
        roleId: params?.encodedId ? atob(params?.encodedId) : "",
        roleName: data.rolename,
        roleDescription: data.description,
        isActive: data.status === "active",
        roleTypeId: data.roleType.value,
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
        router.push("/role/role-list");
      } else {
        showNotification({
          message: response.data.message || "Update Failed!",
          variant: "danger",
        });
      }
    } catch (error) {
      showNotification({
        message: error?.response?.data?.message || "An error occurred during role update.",
        variant: "danger",
      });
    }
  };



  return <>
    {/* <PageTItle title="ROLE EDIT" /> */}
    <Row>
      <Col lg={12}>
        <form onSubmit={handleSubmit(updateRoles)}>
          <Card>
            <CardHeader>
              <CardTitle as={'h4'}>Roles Information</CardTitle>
            </CardHeader>
            <CardBody>
              <Row>
                <Col lg={6}>
                  <div className="mb-3">
                    <label htmlFor="roles-name" className="form-label">
                      Roles Name <span className='text-primary'>*</span>
                    </label>
                    <input type="text" id="roles-name" className="form-control" {...register("rolename")} placeholder="Role name" defaultValue="Workspace Manager" />
                    {errors.rolename && <p className="text-danger">{errors.rolename.message}</p>}
                  </div>
                </Col>

                <Col lg={6}>
                  <div className="mb-3">
                    <label htmlFor="roles" className="form-label">
                      Role Type<span className='text-primary'>*</span>
                    </label>
                    <Controller
                      name="roleType"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={roleTypes}
                          className="react-select-container"
                          classNamePrefix="react-select"
                          styles={customSelectStyles}
                        />
                      )}
                    />
                    {errors.roleType && <p className="text-danger">{errors.roleType.message}</p>}
                  </div>
                </Col>
                {/* <Col lg={6}>
                  <form>
                    <div className="mb-3">
                      <label htmlFor="workspace" className="form-label">
                        Add Workspace
                      </label>
                      <ChoicesFormInput className="form-control" id="workspace" data-choices data-choices-groups data-placeholder="Select Workspace">
                        <option>Facebook</option>
                        <option value="Slack">Slack</option>
                        <option value="Zoom">Zoom</option>
                        <option value="Analytics">Analytics</option>
                        <option value="Meet">Meet</option>
                        <option value="Mail">Mail</option>
                        <option value="Strip">Strip</option>
                      </ChoicesFormInput>
                    </div>
                  </form>
                </Col> */}
                {/* <Col lg={6}>
                  <div className="mb-3">
                    <label htmlFor="role-tag" className="form-label">
                      Tag
                    </label>
                    <ChoicesFormInput options={{
                    removeItemButton: true
                  }} className="form-control" id="choices-multiple-remove-button" data-choices data-choices-removeitem multiple>
                      <option value="Manager">Manager</option>
                      <option value="Product">Product</option>
                      <option value="Data">Data</option>
                      <option value="Designer">Designer</option>
                      <option value="Supporter">Supporter</option>
                      <option value="System Design">System Design</option>
                      <option value="QA">QA</option>
                    </ChoicesFormInput>
                  </div>
                </Col> */}
                {/* <Col lg={6}>
                  <div className="mb-3">
                    <label htmlFor="user-name" className="form-label">
                      User Name
                    </label>
                    <input type="text" id="user-name" className="form-control" placeholder="Enter name" defaultValue="Gaston Lapierre " />
                  </div>
                </Col> */}
                <Col lg={6}>
                  <p>Role Status <span className='text-primary'>*</span></p>
                  <div className="d-flex gap-2 align-items-center">
                    <div className="form-check">
                      <input className="form-check-input" type="radio" value={"active"} name="flexRadioDefault" id="flexRadioDefault1" {...register("status")} />
                      <label className="form-check-label" htmlFor="flexRadioDefault1">
                        Active
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" value={"inactive"} name="flexRadioDefault" id="flexRadioDefault2" {...register("status")} />
                      <label className="form-check-label" htmlFor="flexRadioDefault2">
                        In Active
                      </label>
                    </div>
                    {errors.status && <p className="text-danger">{errors.status.message}</p>}
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description <span className='text-primary'>*</span>
                    </label>
                    <textarea id="description" rows={4} className="form-control" placeholder="Type description" {...register("description")} />
                    {errors.description && <p className="text-danger">{errors.description.message}</p>}
                  </div>
                </Col>
              </Row>
            </CardBody>
            <CardFooter className="border-top">
              <button type='submit' className="btn btn-primary">
                Save Change
              </button>
            </CardFooter>
          </Card>
        </form>
      </Col>
    </Row>
  </>;
};
export default EditForm;
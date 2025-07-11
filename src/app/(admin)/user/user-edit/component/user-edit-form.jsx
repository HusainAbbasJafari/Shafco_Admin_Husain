"use client";
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { useNotificationContext } from "@/context/useNotificationContext";
import api from "@/services/api";
import { useCityList, useCountryList, useStateList } from "@/services/miscServices";
import { useRoleList } from "@/services/roleServices";
import { useUser } from "@/services/userServices";
import { allowNumbersOnly, customSelectStyles, decodeId, mapToSelectOptions } from '@/utils/other';
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from 'react';
import { Button, Card, CardBody, Col, Row, Tab, Tabs } from 'react-bootstrap';
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Select from 'react-select';
import * as Yup from "yup";



const schema = Yup.object().shape({
    fullName: Yup.string()
        .trim()
        .max(50, "Full Name must be at most 50 characters")
        .required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    roles: Yup.object().nullable().test("roles-required", "Role is required", function (value) {
        return value && value.label && value.value;
    }),

    address1: Yup.string().required("Address Line 1 is required"),

    country: Yup.object().nullable().test("country-required", "Country is required", function (value) {
        return value && value.label && value.value;
    }),

    city: Yup.object().nullable().test("city-required", "City is required", function (value) {
        return value && value.label && value.value;
    }),

    state: Yup.object().nullable().test("state-required", "State is required", function (value) {
        return value && value.label && value.value;
    }),
    zip: Yup.string().required("Zip Code is required"),

});

const UserEditForm = () => {

    const params = useParams();

    const {
        register,
        control,
        formState: { errors },
        watch,
        handleSubmit,
        setValue,
        reset
    } = useForm({
        resolver: yupResolver(schema),
    });


    const country = watch('country');
    const state = watch('state');
    const router = useRouter();

    const [banner, setBanner] = useState("");
    const [accountId, setAccountId] = useState(null);
    const [formInitialized, setFormInitialized] = useState(false);
    const fileInputRef = useRef(null);
    const { showNotification } = useNotificationContext();
    const { data: roleList } = useRoleList(
        {
            roleType: null,
            pageNumber: 1,
            pageSize: 100,
            searchingTerm: "",
            filterStatus: 0
        }
    );
    const { data: countryList } = useCountryList()
    const { data: stateList } = useStateList(country?.value);
    const { data: cityList } = useCityList(state?.value)
    const { data: user } = useUser(accountId)
    const userDetails = useSelector((state) => state.auth.user);


    const stateOptions = mapToSelectOptions(stateList, "name", "id")
    const countryOptions = mapToSelectOptions(countryList, "name", "id")
    const cityOptions = mapToSelectOptions(cityList, "name", "id")

    const roleOptions = mapToSelectOptions(roleList?.data, "roleName", "id")

    const roleTypes = [
        { value: 0, label: "Standard Role" },
        { value: 1, label: "Sub Role" },
    ]


    useEffect(() => {
        if (params.encodedId) {
            const decoded = decodeId(params.encodedId)
            setAccountId(decoded)
        }
    }, [params])


    useEffect(() => {
        if (user) {
            setBanner(user.profilePic || "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=")
            reset({
                fullName: user.fullName || "",
                email: user.email || "",
                phone: user.phoneNo || "",
                address1: user.address1 || "",
                address2: user.address2 || "",
                landmark: user.landMark || "",
                city: cityOptions?.find((city) => city.value === user.cityId) || { label: "", value: "" },
                state: stateOptions?.find((state) => state.value === user.stateId) || { label: "", value: "" },
                zip: user.zipCode || "",
                country: countryOptions?.find((country) => country.value === user.countryId) || { label: "", value: "" },
                roles: roleOptions?.find((role) => role.value === user.roleId) || { label: "", value: "" },
                roleType: roleTypes.find(rt => rt.value === (user?.isInternal ? 1 : 0))
            })
        }
    }, [user]);


    useEffect(() => {
        if (user && countryOptions?.length && !formInitialized) {
            const country = countryOptions.find(c => c.value === user.countryId);
            setValue("country", country || { label: "", value: "" });
        }
    }, [user, countryOptions, formInitialized]);

    useEffect(() => {
        if (user && stateOptions?.length && !formInitialized) {
            const state = stateOptions.find(s => s.value === user.stateId);
            setValue("state", state || { label: "", value: "" });
        }
    }, [user, stateOptions, formInitialized]);

    useEffect(() => {
        if (user && cityOptions?.length && !formInitialized) {
            const city = cityOptions.find(c => c.value === user.cityId);
            setValue("city", city || { label: "", value: "" });
            setFormInitialized(true);
        } else if (!cityOptions?.length) {
            setTimeout(() => {
                setFormInitialized(true);
            }, 1500)
        }
    }, [user, cityOptions, formInitialized]);


    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setBanner(URL.createObjectURL(file)); // Preview
            setValue("profileImage", file);
        }
    };


    const handleAddUser = handleSubmit(async (data) => {
        try {
            const formData = new FormData();
            formData.append("UserId", user.accountId);
            formData.append("FullName", data.fullName);
            formData.append("Email", data.email);
            formData.append("PhoneNo", data.phone);
            formData.append("Address1", data.address1);
            formData.append("Address2", data.address2);
            formData.append("CityId", data.city.value);
            formData.append("StateId", data.state.value);
            formData.append("ZipCode", data.zip);
            formData.append("CountryId", data.country.value);
            formData.append("Password", data.password);
            formData.append("Landmark", data.landmark);
            formData.append("RoleId", data.roles.value);
            formData.append("ParentId", userDetails?.userId);
            formData.append("IsInternal", data.roleType.value ? true : false);
            formData.append("ProfilePic", data.profileImage ? data.profileImage : user?.profilePic);
            const response = await api.post("/api/UserManagement/AddUpdateNewUser", formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.data.statusCode === 200 && response.data.isSuccess === true) {
                showNotification({
                    message: response?.data?.message,
                    variant: "success",
                });
                router.push("/user/user-list");
            } else {
                showNotification({
                    message: response?.data?.message || "Update Failed!",
                    variant: "danger",
                });
            }
        } catch (error) {

            if (error?.response?.data?.errors?.PhoneNo && Array.isArray(error?.response?.data?.errors?.PhoneNo)) {
                showNotification({
                    message: error?.response?.data?.errors?.PhoneNo[0] || "An error occurred during user update",
                    variant: "danger",
                })
            } else {
                showNotification({
                    message: error?.response?.data?.message || "An error occurred during user update",
                    variant: "danger",
                });
            }
        }
    });

    return <Row>
        <Col lg={12}>
            <Card>
                <CardBody>
                    <Tabs defaultActiveKey="userinfo" id="user-info-tabs" className="mb-3">
                        <Tab eventKey={"userinfo"} title="User Info">
                            <form onSubmit={handleAddUser}>
                                <Row>
                                    <Col lg={6}>
                                        <div className="mb-4 d-flex flex-column align-items-center justify-content-center">
                                            <div
                                                className="position-relative border border-secondary overflow-hidden"
                                                style={{ width: "145px", borderRadius: "50%", height: "145px", cursor: "pointer" }}
                                                onClick={() => fileInputRef.current.click()}
                                            >
                                                <img
                                                    src={banner || "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="}
                                                    alt="Logo"
                                                    className="img-fluid w-100 h-100 object-fit-cover rounded-circle"
                                                />
                                                <div className="position-absolute top-50 start-50 translate-middle">
                                                    <i className="bx bx-pencil text-white fs-4"></i>
                                                </div>
                                                <div
                                                    className="position-absolute top-0 start-0 w-100 h-100 bg-primary bg-opacity-50 d-flex align-items-center justify-content-center rounded-circle"
                                                    style={{ opacity: 0, transition: "opacity 0.3s" }}
                                                    onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                                                    onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
                                                >
                                                    <IconifyIcon icon="bx:pencil" className="text-white fs-24" />
                                                </div>
                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    style={{ display: "none" }}
                                                />
                                            </div>
                                        </div>
                                    </Col>

                                    <Col lg={6}>
                                        <Col lg={12} >
                                            <div className="mb-3">
                                                <label htmlFor="company-name" className="form-label">
                                                    Full Name <span className='text-primary'>*</span>
                                                </label>
                                                <input type="text" id="full-name" className="form-control" placeholder="Full Name"  {...register("fullName")} />
                                                {errors.fullName && <p className="text-danger">{errors.fullName.message}</p>}
                                            </div>
                                        </Col>
                                        <Col lg={12}>
                                            <div className="mb-3">
                                                <label htmlFor="email" className="form-label">
                                                    Email <span className='text-primary'>*</span>
                                                </label>
                                                <input type="text" id="email" className="form-control" placeholder="Enter Email" {...register("email")} />
                                                {errors.email && <p className="text-danger">{errors.email.message}</p>}

                                            </div>
                                        </Col>
                                    </Col>

                                    <Col lg={6}>
                                        <div className="mb-3">
                                            <label htmlFor="phone" className="form-label">
                                                Phone <span className='text-primary'>*</span>
                                            </label>
                                            <input type="tel" id="phone" className="form-control" placeholder="Enter Phone Number"  {...register("phone")} onKeyDown={(e) => allowNumbersOnly(e)} />
                                            {errors.phone && <p className="text-danger">{errors.phone.message}</p>}
                                        </div>

                                    </Col>
                                    {/* <Col lg={6} >
                                        <PasswordFormInput control={control} name="password" label={"Password"} containerClassName="mb-3" placeholder="Password" id="password-id" {...register("password")} />
                                    </Col> */}
                                    <Col lg={6}>
                                        <div className="mb-3">
                                            <label htmlFor="roles" className="form-label">
                                                Role Type <span className='text-primary'>*</span>
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
                                    <Col lg={6}>
                                        <div className="mb-3">
                                            <label htmlFor="roles" className="form-label">
                                                Roles <span className='text-primary'>*</span>
                                            </label>
                                            <Controller
                                                name="roles"
                                                control={control}
                                                // rules={{ required: true }}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        options={roleOptions}
                                                        className="react-select-container"
                                                        classNamePrefix="react-select"
                                                    />
                                                )}
                                            />
                                            {errors.roles && <p className="text-danger">{errors.roles.message}</p>}
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className="mb-3">
                                            <label htmlFor="address-line-1" className="form-label">
                                                Address Line 1 <span className='text-primary'>*</span>
                                            </label>
                                            <input type="text" id="address-line-1" className="form-control" placeholder="Enter Your Address" {...register("address1")} />
                                            {errors.address1 && <p className="text-danger">{errors.address1.message}</p>}
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className="mb-3">
                                            <label htmlFor="address-line-2" className="form-label">
                                                Address Line 2 (Optional)
                                            </label>
                                            <input type="text" id="address-line-2" className="form-control" placeholder="Enter Your Address 2" {...register("address2")} />
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className="mb-3">
                                            <label htmlFor="landmark" className="form-label">
                                                Landmark
                                            </label>
                                            <input type="text" id="landmark" className="form-control" placeholder="Enter Your Landmark" {...register("landmark")} />
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className="mb-3">
                                            <label htmlFor="country" className="form-label">
                                                Country <span className='text-primary'>*</span>
                                            </label>
                                            <Controller
                                                name="country"
                                                control={control}
                                                // rules={{ required: true }}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        options={countryOptions}
                                                        className="react-select-container"
                                                        classNamePrefix="react-select"
                                                        value={field.value}
                                                        onChange={(selectedOption) => {
                                                            setValue('state', null);
                                                            setValue('city', null);
                                                            field.onChange(selectedOption);
                                                        }}

                                                    />
                                                )}
                                            />
                                            {errors.country && <p className="text-danger">{errors.country.message}</p>}
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className="mb-3">
                                            <label htmlFor="state" className="form-label">
                                                State <span className='text-primary'>*</span>
                                            </label>
                                            <Controller
                                                name="state"
                                                control={control}
                                                // rules={{ required: true }}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        options={stateOptions}
                                                        className="react-select-container"
                                                        classNamePrefix="react-select"
                                                        value={field.value}
                                                        onChange={(selectedOption) => { setValue('city', null); field.onChange(selectedOption); }}
                                                    />
                                                )}
                                            />
                                            {errors.state && <p className="text-danger">{errors.state.message}</p>}
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className="mb-3">
                                            <label htmlFor="city" className="form-label">
                                                City <span className='text-primary'>*</span>
                                            </label>
                                            <Controller
                                                name="city"
                                                control={control}
                                                // rules={{ required: true }}

                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        options={cityOptions}
                                                        className="react-select-container"
                                                        classNamePrefix="react-select"
                                                        value={field.value}
                                                    />
                                                )}
                                            />
                                            {errors.city && <p className="text-danger">{errors.city.message}</p>}
                                        </div>
                                    </Col>

                                    <Col lg={6}>
                                        <div className="mb-3">
                                            <label htmlFor="zip-code" className="form-label">
                                                Zip Code <span className='text-primary'>*</span>
                                            </label>
                                            <input type="text" id="zip-code" className="form-control" placeholder="Enter Your Zip-Code" {...register("zip")} />
                                            {errors.zip && <p className="text-danger">{errors.zip.message}</p>}
                                        </div>
                                    </Col>

                                </Row>
                                <div className="d-flex justify-content-end">
                                    <Button variant="danger" type="submit" className=" rounded-pill">
                                        Save Details
                                    </Button>
                                </div>
                            </form>
                        </Tab>
                        {/* <Tab eventKey={"personalinfo"} title="Personal Info" >
                                <Row>
                                    <Col lg={6}>
                                        <div className="mb-3">
                                            <label htmlFor="shippingadd" className="form-label">
                                                Shipping Address
                                            </label>
                                            <textarea id="shippingadd" className="form-control" {...register("shippingAddress")} />
                                        </div>
                                    </Col>
                                </Row>
                            </Tab> */}
                    </Tabs>

                </CardBody>
            </Card>
        </Col>
    </Row>;
};


export default UserEditForm;
'use client';
import { useEffect, useRef, useState } from "react";
import IconifyIcon from "@/components/wrappers/IconifyIcon";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNotificationContext } from "@/context/useNotificationContext";
import api from "@/services/api";
import { allowNumbersOnly } from "@/utils/other";


// Validation schema
const schema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    gender: Yup.string().required("Gender is required"),
    countryCode: Yup.string().required("Please select a country code"),
});

const EditProfileModal = ({ show, onHide, userData, getProfileDetails }) => {
    const fileInputRef = useRef(null);
    const [avatarUrl, setAvatarUrl] = useState("");
    const { showNotification } = useNotificationContext()

    const { register, handleSubmit, reset, setValue, formState: { errors }, } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            gender: "",
        }
    });

    const countryCodes = [
        { code: "+62", name: "Indonesia" },
        { code: "+60", name: "Malaysia" },
        { code: "+65", name: "Singapore" },
        { code: "+66", name: "Thailand" },
        { code: "+63", name: "Philippines" },
        { code: "+84", name: "Vietnam" },
        { code: "+95", name: "Myanmar (Burma)" },
        { code: "+673", name: "Brunei" },
        { code: "+856", name: "Laos" },
        { code: "+855", name: "Cambodia" },
        { code: "+880", name: "Bangladesh" },
        { code: "+94", name: "Sri Lanka" },
        { code: "+91", name: "India" },
        { code: "+92", name: "Pakistan" },
        { code: "+81", name: "Japan" },
        { code: "+86", name: "China" },
        { code: "+82", name: "South Korea" },
        { code: "+64", name: "New Zealand" },
        { code: "+61", name: "Australia" },
    ];



    useEffect(() => {
        if (userData) {
            const phoneNumber = userData?.phoneNumber?.split(" ");
            reset({
                fullName: userData?.fullName || "",
                email: userData?.email || "",
                phone: Array.isArray(phoneNumber) && phoneNumber[1] || "",
                gender: userData?.gender || "",
                countryCode: Array.isArray(phoneNumber) && phoneNumber[0] || "",
            });

            if (userData?.profilePic) {
                setAvatarUrl(userData.profilePic);
            }
        }
    }, [userData, reset]);



    const updateProfile = handleSubmit(async (data) => {
        try {
            const formData = new FormData();
            formData.append("Id", userData?.userId);
            formData.append("FullName", data.fullName);
            formData.append("Email", data.email);
            formData.append("Gender", data.gender);
            formData.append("PhoneNumber", `${data.countryCode} ${data.phone}`);

            if (data.profileImage) {
                formData.append("Profilepic", data.profileImage);
            }

            const response = await api.post("/api/Account/Updateprofile", formData);

            if (response.data.statusCode === 200 && response.data.isSuccess === true) {
                showNotification({
                    message: response.data.message,
                    variant: "success",
                });
                onHide();
                getProfileDetails();
            } else {
                showNotification({
                    message: response.data.message || "Profile update failed!",
                    variant: "danger",
                });
                getProfileDetails();
            }
        } catch (error) {
            showNotification({
                message: error?.message || "An error occurred during profile update.",
                variant: "danger",
            });
            getProfileDetails();

        }
    });


    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setAvatarUrl(URL.createObjectURL(file)); // Preview
            setValue("profileImage", file);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Body className="p-4">
                <form onSubmit={updateProfile}>
                    <div className="text-center mb-4 position-relative" style={{ width: "100px", margin: "0 auto" }}>
                        <img
                            src={avatarUrl}
                            className="rounded-circle border border-2 border-danger m-1"
                            width={100}
                            height={100}
                            alt="Avatar"
                        />
                        <span
                            className="position-absolute d-flex justify-content-center align-items-center bg-danger rounded-circle"
                            style={{
                                width: "30px",
                                height: "30px",
                                bottom: "0",
                                right: "0",
                                top: "60%",
                                right: "10%",
                                transform: "translate(25%, 25%)",
                                cursor: "pointer"
                            }}
                            onClick={() => fileInputRef.current.click()}
                        >
                            <IconifyIcon icon="bx:pencil" className="text-white" />
                        </span>
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ display: "none" }}
                        />
                    </div>

                    {/* Full Name */}
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control {...register("fullName")} isInvalid={!!errors.fullName} />
                        <Form.Control.Feedback type="invalid">{errors.fullName?.message}</Form.Control.Feedback>
                    </Form.Group>

                    {/* Email */}
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control {...register("email")} isInvalid={!!errors.email} />
                        <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
                    </Form.Group>

                    {/* Phone */}
                    <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <div className="d-flex">
                            <Form.Select
                                {...register("countryCode")}
                                className="me-2"
                                style={{ maxWidth: '120px' }}
                            >
                                {countryCodes.map((country, index) => (
                                    <option key={index} value={country.code}>
                                        {country.name} ({country.code})
                                    </option>
                                ))}
                            </Form.Select>

                            <Form.Control
                                type="tel"
                                {...register("phone")}
                                onKeyDown={(e) => allowNumbersOnly(e)}
                                isInvalid={!!errors.phone}
                            />
                        </div>
                        <Form.Control.Feedback type="invalid">
                            {errors.phone?.message}
                        </Form.Control.Feedback>
                    </Form.Group>


                    {/* Gender */}
                    <Form.Group className="mb-3">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control {...register("gender")} isInvalid={!!errors.gender} />
                        <Form.Control.Feedback type="invalid">{errors.gender?.message}</Form.Control.Feedback>
                    </Form.Group>

                    {/* DOB */}
                    {/* <Form.Group className="mb-3">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control
                            type="date"
                            {...register("dob", {
                                required: "Date of birth is required",
                            })}
                            isInvalid={!!errors.dob}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.dob?.message}
                        </Form.Control.Feedback>
                    </Form.Group> */}

                    {/* Submit */}
                    <Button variant="danger" type="submit" className="w-100 rounded-pill">
                        Save Details
                    </Button>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default EditProfileModal;

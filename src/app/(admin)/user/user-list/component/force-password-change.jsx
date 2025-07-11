'use client';
import PasswordFormInput from "@/components/form/PasswordFormInput";
import { useNotificationContext } from "@/context/useNotificationContext";
import api from "@/services/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as Yup from "yup";


// Validation schema
const schema = Yup.object().shape({
    password: Yup
        .string()
        .required('Please enter your new password')
        .min(8, 'Password must be at least 8 characters')
        .max(15, 'Password cannot be more than 15 characters'),

    confirmpassword: Yup
        .string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Please confirm your new password')
        .min(8, 'Password must be at least 8 characters')
        .max(15, 'Password cannot be more than 15 characters'),
});

const ForcePasswordChange = ({ show, onHide, selectedUser }) => {
    const { showNotification } = useNotificationContext()

    const { handleSubmit, control,reset, formState: { errors }, } = useForm({
        resolver: yupResolver(schema)
    });

    const updateProfile = handleSubmit(async (data) => {
        try {
            const formData = new FormData();
            formData.append("Email", selectedUser.email);
            formData.append("Password", data.password);

            const response = await api.post("/api/UserManagement/ChangeUserPassword", formData);

            if (response.data.statusCode === 200 && response.data.isSuccess === true) {
                showNotification({
                    message: response.data.message,
                    variant: "success",
                });
                onHide();
                reset();
            } else {
                showNotification({
                    message: response.data.message || "Password change failed!",
                    variant: "danger",
                });
            }
        } catch (error) {
            showNotification({
                message: error?.message || "An error occurred during password change.",
                variant: "danger",
            });
        }
    });



    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton className="py-3" >
                <Modal.Title className="h5">Change Password</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4">
                <form onSubmit={updateProfile}>
                    <PasswordFormInput control={control} name="password" label={"Password"} containerClassName="mb-3" placeholder="Password" id="password-id" />
                    <PasswordFormInput control={control} name="confirmpassword" label={"Confirm Password"} containerClassName="mb-3" placeholder="Confirm Password" id="confirm-password-id" />

                    <Button variant="danger" type="submit" className="w-100 rounded-pill">
                        Change Password
                    </Button>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default ForcePasswordChange;

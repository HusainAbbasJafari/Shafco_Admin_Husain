'use client';

import logoDark from '@/assets/images/shafco-logo-light.png';
import logoLight from '@/assets/images/shafco-logo-dark.png';
import smallImg from '@/assets/images/hijab-girl.jpg';
import PasswordFormInput from '@/components/form/PasswordFormInput';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { useNotificationContext } from '@/context/useNotificationContext';
import api from '@/services/api';
import { useRouter } from 'next/navigation';

const ChangePassword = () => {


    const { showNotification } = useNotificationContext();
    const { push } = useRouter()
    const user = useSelector((state) => state.auth.user);

    const changePasswordSchema = yup.object({
        password: yup
            .string()
            .required('Please enter your current password')
            .min(8, 'Password must be at least 8 characters')
            .max(15, 'Password cannot be more than 15 characters'),

        newpassword: yup
            .string()
            .required('Please enter your new password')
            .min(8, 'Password must be at least 8 characters')
            .max(15, 'Password cannot be more than 15 characters'),

        confirmpassword: yup
            .string()
            .oneOf([yup.ref('newpassword'), null], 'Passwords must match')
            .required('Please confirm your new password')
            .min(8, 'Password must be at least 8 characters')
            .max(15, 'Password cannot be more than 15 characters'),
    });

    const { control, handleSubmit } = useForm({ resolver: yupResolver(changePasswordSchema) });

    const changePassword = handleSubmit(async (values) => {
        try {
            const payload = {
                email: user.email,
                currentPassword: values.password,
                newPassword: values.newpassword,
            };

            const response = await api.post("/api/Account/ChangePassword", payload);
            if (response.data.statusCode === 200 && response.data.isSuccess === true) {
                showNotification({
                    message: response.data.message,
                    variant: "success",
                });
                push("/dashboard");
            } else {
                showNotification({
                    message: response.data.message || "Login failed!",
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
        <>
            <div className="d-flex vh-100 p-3">
                {/* <div className="d-flex flex-column flex-grow-1">
                    <Row className="h-100">
                        <Col md={7}>
                            <Row className="justify-content-center h-100">
                                <Col lg={6} className="py-lg-3">
                                    <div className="d-flex flex-column h-100 justify-content-center">
                                        <div className="auth-logo mb-2 d-inline-block">
                                            <Link href="/dashboard" className="logo-dark">
                                                <Image src={logoDark} height={150} alt="logo dark" />
                                            </Link>
                                            <Link href="/dashboard" className="logo-light">
                                                <Image src={logoLight} height={150} alt="logo light" />
                                            </Link>
                                        </div>
                                        <h2 className="fw-bold fs-24">Change Password</h2>
                                        <p className="text-muted mt-1 mb-4">
                                            Enter your current and new password.
                                        </p>
                                        <div>
                                            <form className="authentication-form" onSubmit={changePassword}>
                                                <PasswordFormInput control={control} name="password" label={"Current Password"} containerClassName="mb-3" placeholder="Current Password" id="password-id" />
                                                <PasswordFormInput control={control} name="newpassword" label={"New Password"} containerClassName="mb-3" placeholder="New Password" id="new-password-id" />
                                                <PasswordFormInput control={control} name="confirmpassword" label={"Confirm Password"} containerClassName="mb-3" placeholder="Confirm Password" id="confirm-password-id" />


                                                <OTPInput control={control} name="otp" containerClassName="mb-3" label="OTP" id="otp-input" length={4} />
                                                <div className="mb-1 text-center d-grid">
                                                    <Button variant="primary" type="submit">
                                                        Change Password
                                                    </Button>
                                                </div>
                                            </form>
                                        </div>
                                        <p className="mt-2 text-danger text-center">
                                            <Link href="/dashboard" className="text-dark fw-bold ms-1">
                                                Back
                                            </Link>
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={5} className="d-none d-md-flex">
                            <Card className="mb-0 overflow-hidden vh-100">
                                <div className="d-flex flex-column">
                                    <Image
                                        src={smallImg}
                                        height={867}
                                        width={759}
                                        alt="small-img"
                                        className="w-100 h-100"
                                        objectFit='cover'
                                    />
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div> */}

                <div className="d-flex flex-column justify-content-center flex-grow-1 px-4 w-100 w-md-65">
                    <div style={{ maxWidth: "500px" }} className='mx-auto w-100' >
                        <div className="auth-logo mb-2">
                            <Link href="/dashboard" className="logo-dark">
                                <Image src={logoDark} height={150} alt="logo dark" />
                            </Link>
                            <Link href="/dashboard" className="logo-light">
                                <Image src={logoLight} height={150} alt="logo light" />
                            </Link>
                        </div>
                        <h2 className="fw-bold fs-24">Change Password</h2>
                        <div>
                            <form className="authentication-form" onSubmit={changePassword}>
                                <PasswordFormInput control={control} name="password" label={"Current Password"} containerClassName="mb-3" placeholder="Current Password" id="password-id" />
                                <PasswordFormInput control={control} name="newpassword" label={"New Password"} containerClassName="mb-3" placeholder="New Password" id="new-password-id" />
                                <PasswordFormInput control={control} name="confirmpassword" label={"Confirm Password"} containerClassName="mb-3" placeholder="Confirm Password" id="confirm-password-id" />
                                <div className="mb-1 text-center d-grid">
                                    <Button variant="primary" type="submit">
                                        Change Password
                                    </Button>
                                </div>
                            </form>
                        </div>
                        <p className="mt-2 text-danger text-center">
                            <Link href="/dashboard" className="text-dark fw-bold ms-1">
                                Back
                            </Link>
                        </p>
                    </div>
                </div>
                <div className="ms-auto overflow-hidden d-none d-md-flex w-100 h-100" style={{ maxWidth: "35%" }}>
                    <Image
                        src={smallImg}
                        alt="side image"
                        className="rounded-3 w-100 h-100"
                        style={{ objectFit: "cover" }}
                    />
                </div>

            </div>
        </>)
};
export default ChangePassword;
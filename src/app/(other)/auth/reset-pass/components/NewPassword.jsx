'use client';
import logoLight from '@/assets/images/shafco-logo-dark.png';
import logoDark from '@/assets/images/shafco-logo-light.png';
import PasswordFormInput from '@/components/form/PasswordFormInput';
import { useNotificationContext } from '@/context/useNotificationContext';
import api from '@/services/api';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const NewPassword = ({ email , clearSessionStorage }) => {

    const { showNotification } = useNotificationContext();
    const [loading, setLoading] = useState(false);


    const { push } = useRouter();


    const passwordSchema = yup.object({
        password: yup.string()
            .min(8, 'Password must be at least 8 characters long')
            .max(15, 'Password cannot be more than 15 characters long')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .matches(/[@$!%*?&]/, 'Password must contain at least one special character (@$!%*?&)')
            .required('Please enter your password'),

        confirmpassword: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Please confirm your password'),
    });


    const { control, handleSubmit, setValue } = useForm({
        resolver: yupResolver(passwordSchema),
    });


    const newPassword = handleSubmit(async (values) => {
        setLoading(true);

        try {
            const requestBody = {
                email: email,
                password : values.password,
            };

            const response = await api.post("/api/Account/ForgetPassword", requestBody, {
                headers: {
                    "Content-Type": "application/json", // Ensures JSON is sent
                },
            });

            if (response.data.statusCode === 200 && response.data.isSuccess === true) {
                push("/auth/sign-in"); // Redirect user after login
                clearSessionStorage()
                showNotification({
                    message: response.data.message,
                    variant: "success",
                });
            } else {
                showNotification({
                    message: response.data.message || "Login failed!",
                    variant: "danger",
                });
            }
        } catch (error) {
            showNotification({
                message: error?.message || "An error occurred during login.",
                variant: "danger",
            });
        }
        setLoading(false);
    });


    return (
        <>
            {/* // <div className="d-flex flex-column vh-100 p-3"> */}
            {/* <div className="d-flex flex-column flex-grow-1">
            <Row className="h-100"> */}
            <Col md={7}>
                <Row className="justify-content-center h-100">
                    <Col lg={6} className="py-lg-5">
                        <div className="d-flex flex-column h-100 justify-content-center">
                            <div className="auth-logo mb-2">
                                <Link href="/auth/sign-in" className="logo-dark">
                                    <Image src={logoDark} height={150} alt="logo dark" />
                                </Link>
                                <Link href="/auth/sign-in" className="logo-light">
                                    <Image src={logoLight} height={150} alt="logo light" />
                                </Link>
                            </div>
                            <h2 className="fw-bold fs-24">New Password</h2>
                            <p className="text-muted mt-1 mb-4">
                                {/* Enter your email address and we&apos;ll send you an email with instructions to reset your password. */}
                            </p>
                            <div>
                                <form className="authentication-form" onSubmit={newPassword}>
                                    {/* <TextFormInput control={control} name="email" containerClassName="mb-3" label="Email" id="email-id" placeholder="Enter your email" /> */}
                                    <PasswordFormInput control={control} name="password" containerClassName="mb-3" placeholder="Enter your password" id="password-id" label="Password" />
                                    <PasswordFormInput control={control} name="confirmpassword" containerClassName="mb-3" placeholder="Confirm your password" id="confirmpassword-id" label="Confirm Password" />

                                    <div className="mb-1 text-center d-grid">
                                        <Button variant="primary" type="submit">
                                            {/* {otpGenerated ? "Verify OTP" : "Generate OTP"} */}
                                            Submit
                                        </Button>
                                    </div>
                                </form>
                            </div>
                            <p className="mt-5 text-danger text-center">
                                Back to
                                <Link href="/auth/sign-in" className="text-dark fw-bold ms-1" onClick={clearSessionStorage}>
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </Col>
                </Row>
            </Col>
            {/* <Col md={5} className="d-none d-md-flex">
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
                </Col> */}
            {/* </Row> */}
            {/* </div> */}
            {/* </div>; */}
        </>
    )

};
export default NewPassword;
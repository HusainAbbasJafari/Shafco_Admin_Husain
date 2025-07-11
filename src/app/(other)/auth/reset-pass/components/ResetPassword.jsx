'use client';
import logoDark from '@/assets/images/shafco-logo-light.png';
import logoLight from '@/assets/images/shafco-logo-dark.png';
import smallImg from '@/assets/images/hijab-girl.jpg';
import TextFormInput from '@/components/form/TextFormInput';
import OTPInput from '../../../../../components/form/OtpInput';
import NewPassword from './NewPassword'
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useNotificationContext } from '@/context/useNotificationContext';
import { useEffect, useState } from 'react';
import api from '@/services/api';
const ResetPassword = () => {

  const { showNotification } = useNotificationContext();
  const [otpGenerated, setOtpGenerated] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  useEffect(() => {
    const isOtp = sessionStorage.getItem('otpGenerated');
    if (isOtp) {
      setOtpGenerated(true);
    }
  }, []);
  
  useEffect(() => {
    const isOtpVerified = sessionStorage.getItem('otpVerified');
    if (isOtpVerified) {
      setOtpVerified(true);
    }
  }, []);

  const clearSessionStorage = () => {
    sessionStorage.removeItem('otpGenerated');
    sessionStorage.removeItem('otpVerified');
  };

  const resetPasswordSchema = yup.object({
    email: yup.string().email('Please enter a valid email').required('Please enter your email'),
  });

  const otpSchema = yup.object({
    otp: yup.string().matches(/^\d{4}$/, 'OTP must be exactly 4 digits').required('Please enter the OTP'),
  });

  const { control, handleSubmit, watch, setValue } = useForm({
    resolver: yupResolver(otpGenerated ? otpSchema.concat(resetPasswordSchema) : resetPasswordSchema),
  });

  const email = watch("email")

  const generateOtp = handleSubmit(async (values) => {
    try {
      const response = await api.post("/api/Account/GenerateOTP", {
        email: values.email,
      });

      if (response.data.statusCode === 200 && response.data.isSuccess === true) {
        sessionStorage.setItem('otpGenerated', true);
        setOtpGenerated(true);
        showNotification({
          message: response.data.message,
          variant: "success",
        });
        setValue("otp", "");
      } else {
        showNotification({
          message: response.data.message || "Login failed!",
          variant: "danger",
        });
        setValue("otp", "");
      }
    } catch (error) {
      showNotification({
        message: error?.message || "An error occurred during login.",
        variant: "danger",
      });
      setValue("otp", "");
    }
  });

  const verifyOtp = handleSubmit(async (values) => {
    try {
      const response = await api.post("/api/Account/VerifyOTP", {
        email: values.email,
        code: values.otp,
      });

      if (response.data.statusCode === 200 && response.data.isSuccess === true) {
        sessionStorage.setItem('otpGenerated', false);
        sessionStorage.setItem('otpVerified', true);
        setOtpGenerated(false);
        setOtpVerified(true);
        showNotification({
          message: response.data.message,
          variant: "success",
        });
      } else {
        sessionStorage.setItem('otpGenerated', false);
        setOtpGenerated(false);
        showNotification({
          message: response.data.message || "Verification failed!",
          variant: "danger",
        });
      }
    } catch (error) {
      showNotification({
        message: error?.message || "An error occurred during login.",
        variant: "danger",
      });
    }
  });



  return <>
  <div className="d-flex flex-column vh-100 p-3">
    <div className="d-flex flex-column flex-grow-1">
      <Row className="h-100">
        {!otpVerified ? (
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
                  <h2 className="fw-bold fs-24">Forgot Password</h2>
                  <p className="text-muted mt-1 mb-4">
                    We&apos;ll send OTP to your email for next steps.
                  </p>
                  <div>
                    <form className="authentication-form" onSubmit={otpGenerated ? verifyOtp : generateOtp}>
                      <TextFormInput control={control} name="email" containerClassName="mb-3" label="Email" id="email-id" placeholder="Enter your email" />

                      {otpGenerated && (
                        <OTPInput control={control} name="otp" containerClassName="mb-2" label="OTP" id="otp-input" length={4} />
                      )}


                      <div className="mb-1 text-center d-grid">
                        <Button variant="primary" type="submit">
                          {otpGenerated ? "Verify OTP" : "Send OTP"}
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
        ) : (
          <NewPassword email={email} clearSessionStorage={clearSessionStorage} />
        )}

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
    </div>
  </div>;
  </>
};
export default ResetPassword;
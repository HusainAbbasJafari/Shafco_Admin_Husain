'use client';
import smallImg from '@/assets/images/hijab-girl.jpg';
import logoLight from '@/assets/images/shafco-logo-dark.png';
import logoDark from '@/assets/images/shafco-logo-light.png';
// import IconifyIcon from '@/components/wrappers/IconifyIcon';
import Image from 'next/image';
import Link from 'next/link';
import LoginFrom from './LoginFrom';
const SignIn = () => {
  return <>
    {/* <div className="d-flex flex-column vh-100 p-3 mb-4">
    <div className="d-flex flex-column flex-grow-1">
      <Row className="h-100">
        <Col md={7}>
          <Row className="justify-content-center h-100">
            <Col lg={6} className="py-lg-2">
              <div className="d-flex flex-column h-100 justify-content-center">
                <div className="auth-logo">
                  <Link href="#" className="logo-dark">
                    <Image src={logoDark} height={150} alt="logo dark" />
                  </Link>
                  <Link href="#" className="logo-light">
                    <Image src={logoLight} height={150} alt="logo light" />
                  </Link>
                </div>
                <h2 className="fw-bold fs-24">Sign In</h2>
                <p className="text-muted mt-1 mb-4">Enter your email address and password to access admin panel.</p>
                <div className="mb-5">
                  <LoginFrom />
                </div>
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
    </div>
  </div> */}

    <div className="d-flex vh-100 p-3">
      <div className="d-flex flex-column justify-content-center flex-grow-1 px-4 w-100 w-md-65" >
        <div style={{ maxWidth: "600px" }} className='mx-auto' >
          <div className="auth-logo mb-4">
            <Link href="#" className="logo-dark">
              <Image src={logoDark} height={150} alt="logo dark" />
            </Link>
            <Link href="#" className="logo-light">
              <Image src={logoLight} height={150} alt="logo light" />
            </Link>
          </div>
          <h2 className="fw-bold fs-24">Sign In</h2>
          <p className="text-muted mt-1 mb-4">Enter your email address and password to access admin panel.</p>
          <div className="mb-5">
            <LoginFrom />
          </div>
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


    {/* <div className='d-flex'>
      <div className="d-flex flex-column h-100 justify-content-center p-3" style={{ width: "60%"}}>
        <div style={{width : "80%" }}>
        <div className="auth-logo">
          <Link href="#" className="logo-dark">
            <Image src={logoDark} height={150} alt="logo dark" />
          </Link>
          <Link href="#" className="logo-light">
            <Image src={logoLight} height={150} alt="logo light" />
          </Link>
        </div>
        <h2 className="fw-bold fs-24">Sign In</h2>
        <p className="text-muted mt-1 mb-4">Enter your email address and password to access admin panel.</p>
        <div className="mb-5">
          <LoginFrom />
          <p className="mt-3 fw-semibold no-span">OR sign with</p>
          <div className="d-grid gap-2">
                    <Link href="" className="btn btn-soft-dark">
                      <IconifyIcon icon="bxl:google" className="fs-20 me-1" /> Sign in with Google
                    </Link>
                    <Link href="" className="btn btn-soft-primary">
                      <IconifyIcon icon="bxl:facebook" className="fs-20 me-1" /> Sign in with Facebook
                    </Link>
                  </div>
                  </div>
        </div>
        <p className="text-danger text-center">
                  Don&apos;t have an account?{' '}
                  <Link href="/auth/sign-up" className="text-dark fw-bold ms-1">
                    Sign Up
                  </Link>
                </p>
      </div>
      <div style={{ width: "400px"}}>
        <Card className="mb-0 overflow-hidden">
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
      </div>
    </div> */}
  </>;
};
export default SignIn;
{/* <p className="mt-3 fw-semibold no-span">OR sign with</p> */ }
{/* <div className="d-grid gap-2">
  <Link href="" className="btn btn-soft-dark">
    <IconifyIcon icon="bxl:google" className="fs-20 me-1" /> Sign in with Google
  </Link>
  <Link href="" className="btn btn-soft-primary">
    <IconifyIcon icon="bxl:facebook" className="fs-20 me-1" /> Sign in with Facebook
  </Link>
</div> */}
{/* <p className="text-danger text-center">
Don&apos;t have an account?{' '}
<Link href="/auth/sign-up" className="text-dark fw-bold ms-1">
  Sign Up
</Link>
</p> */}
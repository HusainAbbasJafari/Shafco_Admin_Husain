"use client";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
// import ChoicesFormInput from '@/components/form/ChoicesFormInput';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { useEffect, useRef, useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap';
import { forwardRef, useImperativeHandle } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { allowNumbersOnly } from '@/utils/other';
import api from "@/services/api";
import { useNotificationContext } from "@/context/useNotificationContext";


const schema = Yup.object().shape({
  companyName: Yup.string().required("Company Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  address1: Yup.string().required("Address Line 1 is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zip: Yup.string().required("Zip Code is required"),
  country: Yup.string().required("Country is required"),
});

const GeneralSettings = forwardRef((props, ref) => {
  const [banner, setBanner] = useState("https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=");
  const fileInputRef = useRef(null);
  const { showNotification } = useNotificationContext();
  const [settings, setSettings] = useState(null)

  const {
    register,
    handleSubmit, reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });


  useEffect(() => {
    getCompanySettings();
  }, [])


  useEffect(() => {
    if (settings) {
      setBanner(settings.companyBanner || "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=")
      reset({
        companyName: settings.companyName || "",
        email: settings.email || "",
        phone: settings.phoneNo || "",
        address1: settings.address1 || "",
        address2: settings.address2 || "",
        city: settings.city || "",
        state: settings.state || "",
        zip: settings.zipCode || "",
        country: settings.country || ""
      })
    }
  }, [settings])

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBanner(URL.createObjectURL(file)); // Preview
      setValue("profileImage", file);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("CompanyName", data.companyName);
      formData.append("Email", data.email);
      formData.append("PhoneNo", data.phone);
      formData.append("Address1", data.address1);
      formData.append("Address2", data.address2);
      formData.append("City", data.city);
      formData.append("State", data.state);
      formData.append("ZipCode", data.zip);
      formData.append("Country", data.country);

      // If banner is a file or Blob, append it
      if (data.profileImage) {
        formData.append("CompanyBanner", data.profileImage);
      }
      const response = await api.post("/api/GeneralSettings/ApplyCompanySetting", formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.statusCode === 200 && response.data.isSuccess === true) {
        showNotification({
          message: "Settings updated successfully !",
          variant: "success",
        });
        getCompanySettings()
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


  const getCompanySettings = async () => {
    try {
      const response = await api.get("/api/GeneralSettings/GetCompanySetting");
      if (response.data.statusCode === 200 && response.data.isSuccess === true) {
        setSettings(response.data.data);
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

  };



  useImperativeHandle(ref, () => ({
    submitForm: () => {
      handleSubmit(onSubmit)(); // triggers validation
    },
  }));

  return <Row>
    <Col lg={12}>
      <Card>
        <CardHeader >
          <CardTitle as={'h4'} className="d-flex align-items-center gap-1">
            <IconifyIcon icon="solar:settings-bold-duotone" className="text-primary fs-20" />
            General Settings
          </CardTitle>

        </CardHeader>
        <CardBody>
          <form>
            <Row>
              <Col lg={6}>
                <div className='d-flex justify-content-between align-items-center w-100'>
                  <div className="logo-upload-wrapper mx-auto" onClick={() => fileInputRef.current.click()}>
                    <img src={banner} alt="Logo" className="logo-img" />
                    <div className="logo-overlay">
                      <IconifyIcon icon="bx:pencil" className="edit-icon" />
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
                <Col lg={12}>
                  <div className="mb-3">
                    <label htmlFor="company-name" className="form-label">
                      Company Name
                    </label>
                    <input type="text" id="company-name" className="form-control" placeholder="Company Name"  {...register("companyName")} />
                    {errors.companyName && <p className="text-danger">{errors.companyName.message}</p>}
                  </div>
                </Col>
                <Col lg={12}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input type="text" id="email" className="form-control" placeholder="Enter Email" {...register("email")} />
                    {errors.email && <p className="text-danger">{errors.email.message}</p>}

                  </div>
                </Col>
              </Col>

              {/* <Col lg={6}>
                <form>
                <div className="mb-3">
                  <label htmlFor="themes" className="form-label">
                    Store Themes
                  </label>
                  <ChoicesFormInput className="form-control" id="themes" data-choices data-choices-groups data-placeholder="Select Themes">
                    <option>Default</option>
                    <option value="Dark">Dark</option>
                    <option value="Minimalist">Minimalist</option>
                    <option value="High Contrast">High Contrast</option>
                  </ChoicesFormInput>
                </div>
              </form>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input type="tel" id="phone" className="form-control" placeholder="Enter Phone Number"  {...register("phone")} onKeyDown={(e) => allowNumbersOnly(e)} />
                  {errors.phone && <p className="text-danger">{errors.phone.message}</p>}
                </div>

              </Col> */}
              {/* <Col lg={6}> */}
                {/* <form>
                <div className="mb-3">
                  <label htmlFor="layout" className="form-label">
                    Layout
                  </label>
                  <ChoicesFormInput className="form-control" id="layout" data-choices data-choices-groups data-placeholder="Select Layout">
                    <option>Default</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Dining">Dining</option>
                    <option value="Interior">Interior</option>
                    <option value="Home">Home</option>
                  </ChoicesFormInput>
                </div>
              </form> */}
              {/* </Col> */}
              <Col lg={6}>
                <div className="mb-3">
                  <label htmlFor="address-line-1" className="form-label">
                    Address Line 1
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
                  <input type="text" id="address-line-2" className="form-control" placeholder="Enter Your Address" />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <input type="text" id="city" className="form-control" placeholder="Enter Your City"   {...register("city")} />
                  {errors.city && <p className="text-danger">{errors.city.message}</p>}
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <input type="text" id="state" className="form-control" placeholder="Enter Your State" {...register("state")} />
                  {errors.state && <p className="text-danger">{errors.state.message}</p>}
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <label htmlFor="zip-code" className="form-label">
                    Zip Code
                  </label>
                  <input type="text" id="zip-code" className="form-control" placeholder="Enter Your Zip-Code" {...register("zip")} />
                  {errors.zip && <p className="text-danger">{errors.zip.message}</p>}
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <label htmlFor="country" className="form-label">
                    Country
                  </label>
                  <input type="text" id="country" className="form-control" placeholder="Enter Your Country" {...register("country")} />
                  {errors.country && <p className="text-danger">{errors.country.message}</p>}
                </div>
              </Col>
              {/* <Col lg={12}>
              <div>
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea className="form-control bg-light-subtle" id="description" rows={4} placeholder="Type description" defaultValue={''} />
              </div>
            </Col> */}
            </Row>
          </form>
        </CardBody>
      </Card>
    </Col>
  </Row>;
});

GeneralSettings.displayName = "GeneralSettings";
export default GeneralSettings;
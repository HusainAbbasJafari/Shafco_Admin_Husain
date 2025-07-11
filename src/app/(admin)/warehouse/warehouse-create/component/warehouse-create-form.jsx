"use client";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, CardBody, CardFooter, Col, Row, Tab, Tabs } from 'react-bootstrap';
import { useCityList, useCountryList, useStateList } from "@/services/miscServices";
import Select from 'react-select';
import { customSelectStyles, mapToSelectOptions } from "@/utils/other";
import { useCallback, useEffect, useRef, useState } from "react";
import LocationModal from "@/components/LocationModal";
import { useNotificationContext } from "@/context/useNotificationContext";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";


const schema = Yup.object().shape({
    warehousename: Yup.string().trim().min(1, "Warehouse Name is required").max(100, "Warehouse Name cannot exceed 100 characters").required("Warehouse Name is required"),
    address1: Yup.string().trim().min(1, "Address Line 1 is required").max(100, "Address Line 1 cannot exceed 100 characters").required("Address Line 1 is required"),
    code: Yup.string().trim().min(1, "Code is required").max(20, "Code cannot exceed 20 characters").required("Code is required"),
    latitude: Yup.string().trim().min(1, "Latitude is required").required("Latitude is required"),
    longitude: Yup.string().trim().min(1, "Longitude is required").required("Longitude is required"),
    country: Yup.object().nullable().test("country-required", "Country is required", function (value) {
        return value && value.label && value.value;
    }),
    city: Yup.object().nullable().test("city-required", "City is required", function (value) {
        return value && value.label && value.value;
    }),
    state: Yup.object().nullable().test("state-required", "State is required", function (value) {
        return value && value.label && value.value;
    }),
    zip: Yup.string().trim().min(1, "Zip Code is required").max(20, "Zip Code cannot exceed 20 characters").required("Zip Code is required"),
});

const CreateWareHouseForm = () => {

    // const [showLocationModal, setShowLocationModal] = useState(false)
    const hasFetchedLocation = useRef(false)
    const router = useRouter()

    const { showNotification } = useNotificationContext();

    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
        setValue,
        watch
    } = useForm({
        resolver: yupResolver(schema),
    });

    const country = watch('country');
    const state = watch('state');

    const { data: countryList } = useCountryList()
    const { data: stateList } = useStateList(country?.value);
    const { data: cityList } = useCityList(state?.value)
    const user = useSelector((state) => state.auth.user);

    const stateOptions = mapToSelectOptions(stateList, "name", "id")
    const countryOptions = mapToSelectOptions(countryList, "name", "id")
    const cityOptions = mapToSelectOptions(cityList, "name", "id")

    useEffect(() => {
        handleGetLocation();
    }, [])


    const handleCreateWarehouse = handleSubmit(async (data) => {
        try {
            const reqBody = {
                name: data.warehousename,
                code: data.code,
                addressLine1: data.address1,
                addressLine2: data.address2,
                zipCode: data.zip,
                latitude: data.latitude,
                longitude: data.longitude,
                countryId: data.country.value,
                stateId: data.state.value,
                cityId: data.city.value,
                isActive: true,
                userId: user?.userId
            };

            const response = await api.post("/api/Warehouse/CreateOrUpdateWarehouse", reqBody, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.data.statusCode === 200 && response.data.isSuccess === true) {
                showNotification({
                    message: response.data.message,
                    variant: "success",
                });
                router.push('/warehouse/warehouse-list')
            } else {
                showNotification({
                    message: response.data.message || "Update Failed!",
                    variant: "danger",
                });
            }
        } catch (error) {
            showNotification({
                message: error?.message || "An error occurred during warehouse creation.",
                variant: "danger",
            });
        }
    });


    const handleGetLocation = useCallback(() => {

        if (hasFetchedLocation.current) return;

        if (navigator.geolocation) {
            // setShowLocationModal(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setValue('latitude', latitude);
                    setValue('longitude', longitude)
                    hasFetchedLocation.current = true;
                },
                (error) => {
                    showNotification({ variant: "danger", message: "Location access denied or unavailable." });
                    // setShowLocationModal(false);
                }
            );
        } else {
            showNotification({ variant: "danger", message: "Geolocation is not supported by this browser." });
        }
    }, []);

    return <Row>
        <Col lg={12}>
            <Card>
                <form onSubmit={handleCreateWarehouse} >
                    <CardBody>
                        <Tabs defaultActiveKey="warehouse" id="user-info-tabs" className="mb-3">
                            <Tab eventKey={"warehouse"} title="Warehouse">
                                <Row>
                                    <Col lg={6}>
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">
                                                Warehouse Name <span className="text-primary">*</span>
                                            </label>
                                            <input type="text" id="name" className="form-control" placeholder="Enter Warehouse Name" {...register("warehousename")} />
                                            {errors.warehousename && <p className="text-danger">{errors.warehousename.message}</p>}
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className="mb-3">
                                            <label htmlFor="code" className="form-label">
                                                Code <span className="text-primary">*</span>
                                            </label>
                                            <input type="text" id="code" className="form-control" placeholder="Enter Your Code" {...register("code")} />
                                            {errors.code && <p className="text-danger">{errors.code.message}</p>}
                                        </div>
                                    </Col>

                                    <Col lg={6}>
                                        <div className="mb-3">
                                            <label htmlFor="address-line-1" className="form-label">
                                                Address Line 1 <span className="text-primary">*</span>
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
                                            <label htmlFor="country" className="form-label">
                                                Country <span className="text-primary">*</span>
                                            </label>
                                            <Controller
                                                name="country"
                                                control={control}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        options={countryOptions}
                                                        className="react-select-container"
                                                        classNamePrefix="react-select"
                                                        styles={customSelectStyles}
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
                                                State <span className="text-primary">*</span>
                                            </label>
                                            <Controller
                                                name="state"
                                                control={control}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        options={stateOptions}
                                                        className="react-select-container"
                                                        classNamePrefix="react-select"
                                                        styles={customSelectStyles}
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
                                                City <span className="text-primary">*</span>
                                            </label>
                                            <Controller
                                                name="city"
                                                control={control}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        options={cityOptions}
                                                        className="react-select-container"
                                                        classNamePrefix="react-select"
                                                        styles={customSelectStyles}
                                                        onChange={(selectedOption) => { field.onChange(selectedOption); }}

                                                    />
                                                )}
                                            />
                                            {errors.city && <p className="text-danger">{errors.city.message}</p>}
                                        </div>
                                    </Col>

                                    <Col lg={6}>
                                        <div className="mb-3">
                                            <label htmlFor="zip-code" className="form-label">
                                                Zip Code <span className="text-primary">*</span>
                                            </label>
                                            <input type="text" id="zip-code" className="form-control" placeholder="Enter Your Zip-Code" {...register("zip")} />
                                            {errors.zip && <p className="text-danger">{errors.zip.message}</p>}
                                        </div>
                                    </Col>

                                    <Col lg={6}>
                                        <div className="mb-3">
                                            <label htmlFor="address-line-1" className="form-label">
                                                Latitude <span className="text-primary">*</span>
                                            </label>
                                            <input type="text" id="address-line-1" className="form-control" placeholder="Enter Your Latitude" {...register('latitude')} />
                                            {errors.latitude && <p className="text-danger">{errors.latitude.message}</p>}
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className="mb-3">
                                            <label htmlFor="address-line-1" className="form-label">
                                                Longitude <span className="text-primary">*</span>
                                            </label>
                                            <input type="text" id="address-line-1" className="form-control" placeholder="Enter Your Longitude" {...register('longitude')} />
                                            {errors.longitude && <p className="text-danger">{errors.longitude.message}</p>}
                                        </div>
                                    </Col>
                                </Row>
                                {/* <Button variant="danger" type="submit" className="w-100 rounded-pill">
                                    Save Details
                                </Button> */}
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
                    <CardFooter className="border-top d-flex justify-content-end">
                        <button type='submit' className="btn btn-primary">
                            Create Warehouse
                        </button>
                    </CardFooter>
                </form>
            </Card>
            {/* <LocationModal show={showLocationModal} onHide={() => setShowLocationModal(false)} /> */}
        </Col>
    </Row>;
};


export default CreateWareHouseForm;
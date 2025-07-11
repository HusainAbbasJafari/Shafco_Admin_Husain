
"use client"
import FileUpload from '@/components/FileUpload'
import { useNotificationContext } from '@/context/useNotificationContext'
import { clearImages } from '@/redux/slices/fileSlice'
import api from '@/services/api'
import { useBrands, useCityList, useCountryList, useStateList } from '@/services/miscServices'
import { useStoreOwnerList } from '@/services/storeServices'
import { useUserList } from '@/services/userServices'
import { useWarehouseList } from '@/services/warehouseServices'
import { customSelectStyles, mapToSelectOptions } from '@/utils/other'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardBody, CardFooter, Col, Row, Tab, Tabs } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import Select, { components } from 'react-select'
import * as Yup from 'yup'

const schema = Yup.object().shape({
  name: Yup.string().trim().min(1, 'Store Name is required').max(100, 'Store Name cannot exceed 100 characters').required('Store Name is required'),
  address1: Yup.string()
    .trim()
    .min(1, 'Address Line 1 is required')
    .max(100, 'Address Line 1 cannot exceed 100 characters')
    .required('Address Line 1 is required'),
  zip: Yup.string().trim().min(1, 'Zip Code is required').max(20, 'Zip Code cannot exceed 20 characters').required('Zip Code is required'),
  storecode: Yup.string().trim().min(1, 'Store Code is required').max(20, 'Store Code cannot exceed 20 characters').required('Store Code is required'),
  latitude: Yup.string().trim().min(1, "Latitude is required").required("Latitude is required"),
  longitude: Yup.string().trim().min(1, "Longitude is required").required("Longitude is required"),
  entrywarehouse: Yup.object()
    .nullable()
    .test('entrywarehouse-required', 'Entry Warehouse is required', function (value) {
      return value && value.label && value.value
    }),
  country: Yup.object()
    .nullable()
    .test('country-required', 'Country is required', function (value) {
      return value && value.label && value.value
    }),
  city: Yup.object()
    .nullable()
    .test('city-required', 'City is required', function (value) {
      return value && value.label && value.value
    }),

  state: Yup.object()
    .nullable()
    .test('state-required', 'State is required', function (value) {
      return value && value.label && value.value
    }),
  storeowner: Yup.object()
    .nullable()
    .test('storeowner-required', 'Store Owner is required', function (value) {
      return value && value.label && value.value
    }),
  brands: Yup.array()
    .min(1, 'At least one brand must be selected')
    .of(
      Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      }),
    )
    .required('Brands are required'),
})

const CreateStoreForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const country = watch('country')
  const state = watch('state')
  const storeOwner = watch('storeowner')
  const router = useRouter()

  const dispatch = useDispatch()

  const { data: countryList } = useCountryList()
  const { data: stateList } = useStateList(country?.value)
  const { data: cityList } = useCityList(state?.value)
  const { data: brandList } = useBrands()
  const { data: storeOwnerList } = useStoreOwnerList()
  const { data: userList } = useUserList({ userNameOrEmail: '', roleType: null, roleId: null, pageNumber: 1, pageSize: 1000 })
  const { data: warehouseList } = useWarehouseList({
    pageSize: 500,
    pageNumber: 1,
  })
  const uploadedImages = useSelector((state) => state.files.image);

  const { showNotification } = useNotificationContext()
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null })

  const distributors = userList?.userDetail
    ?.filter((item) => item.roleName === 'Distributor')
    ?.map((item) => ({ value: item.accountId, label: item.fullName }))

  const stateOptions = mapToSelectOptions(stateList, 'name', 'id')
  const countryOptions = mapToSelectOptions(countryList, 'name', 'id')
  const cityOptions = mapToSelectOptions(cityList, 'name', 'id')
  const brandOptions = mapToSelectOptions(brandList?.data, 'brandName', 'id')
  const storeOwnerOptions = mapToSelectOptions(storeOwnerList, 'ownerName', 'id')
  const warehouseOptions = mapToSelectOptions(warehouseList?.warehosePagingList, 'warehouseName', 'id')

  useEffect(() => {
    dispatch(clearImages())
  }, [])


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setCoordinates({ lat: latitude, lng: longitude })
          setValue('longitude', longitude)
          setValue('latitude', latitude)
        },
        (error) => {
          showNotification({ variant: 'danger', message: 'Location access denied or unavailable.' })
        },
      )
    } else {
      showNotification({ variant: 'danger', message: 'Geolocation is not supported by this browser.' })
    }
  }, [])


  const CheckboxOption = (props) => {
    return (
      <components.Option {...props}>
        <input type="checkbox" checked={props.isSelected} className="form-check-input" onChange={() => { }} style={{ marginRight: 8 }} />
        <label>{props.label}</label>
      </components.Option>
    )
  }

  const NoChipsValueContainer = ({ children, ...props }) => {
    const filteredChildren = children.filter((child) => child && child.type !== components.MultiValue)
    return <components.ValueContainer {...props}>{filteredChildren}</components.ValueContainer>
  }

  const handleCreateStore = handleSubmit(async (data) => {
    try {
      const formData = new FormData();

      formData.append('storeName', data.name || '');
      formData.append('location', 'string');
      formData.append('latitude', data?.latitude || coordinates.lat || '');
      formData.append('longitude', data?.longitude || coordinates.lng || '');
      formData.append('isPriorityOutlet', 'true');
      formData.append('description', '');
      formData.append('isActive', 'true');
      formData.append('isPickupAvailable', 'true');
      formData.append('storeOwner', data?.storeowner?.label || '');
      formData.append('ownerId', data?.storeowner?.value || '');
      formData.append('countryId', data?.country?.value || '');
      formData.append('stateId', data?.state?.value || '');
      formData.append('cityId', data?.city?.value || '');
      formData.append('zipCode', data?.zip || '');
      formData.append('addressLine1', data?.address1 || '');
      formData.append('StoreImage', uploadedImages[0] || '');

      formData.append('addressLine2', data?.address2 || '');
      (data?.brands || []).forEach((brand, index) => {
        formData.append(`brandIds[${index}]`, brand.value);
      });

      formData.append('distributorName', data?.distributor?.label || '');
      formData.append('distributorId', data?.distributor?.value || '');
      formData.append('warehouseId', data?.entrywarehouse?.value || '');
      formData.append('storeCode', data?.storecode || '');

      const response = await api.post('/api/Store/CreateUpdateStore', formData)
      if (response.data.statusCode === 200 && response.data.isSuccess === true) {
        showNotification({
          message: response?.data?.message,
          variant: 'success',
        })
        router.push('/store/store-list')
      } else {
        showNotification({
          message: response?.data?.message || 'Update Failed!',
          variant: 'danger',
        })
      }
    } catch (error) {
      if (error?.response?.data?.errors?.PhoneNo && Array.isArray(error?.response?.data?.errors?.PhoneNo)) {
        showNotification({
          message: error?.response?.data?.errors?.PhoneNo[0] || 'An error occurred while creating store',
          variant: 'danger',
        })
      } else {
        showNotification({
          message: error?.response?.data?.message || 'An error occurred while creating store',
          variant: 'danger',
        })
      }
    }
  })

  return (
    <>
      <Row>
        <Col xl={12} lg={12}>
          <FileUpload title="Add Store Photo" />
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <Card>
            <form onSubmit={handleCreateStore}>
              <CardBody>
                <Tabs defaultActiveKey="storeinfo" id="store-info-tabs" className="mb-3">
                  <Tab eventKey={'storeinfo'} title="Store Info">
                    <Row>
                      <Col lg={6}>
                        <div className="mb-3">
                          <label htmlFor="name" className="form-label">
                            Name <span className="text-primary">*</span>
                          </label>
                          <input type="text" id="name" className="form-control" placeholder="Enter Store Name" {...register('name')} />
                          {errors.name && <p className="text-danger">{errors.name.message}</p>}
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <label htmlFor="storeowner" className="form-label">
                            Store Owner <span className="text-primary">*</span>
                          </label>
                          <Controller
                            name="storeowner"
                            control={control}
                            render={({ field }) => (
                              <Select
                                {...field}
                                options={storeOwnerOptions}
                                className="react-select-container"
                                classNamePrefix="react-select"
                                styles={customSelectStyles}
                              />
                            )}
                          />
                          {errors.storeowner && <p className="text-danger">{errors.storeowner.message}</p>}
                        </div>
                      </Col>

                      {storeOwner?.label === 'Distributor Owned' && (
                        <Col lg={6}>
                          <div className="mb-3">
                            <label htmlFor="distributor" className="form-label">
                              Distributors <span className="text-primary">*</span>
                            </label>
                            <Controller
                              name="distributor"
                              control={control}
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  options={distributors}
                                  className="react-select-container"
                                  classNamePrefix="react-select"
                                  styles={customSelectStyles}
                                />
                              )}
                            />
                          </div>
                        </Col>
                      )}


                      <Col lg={6}>
                        <div className="mb-3">
                          <label htmlFor="storeowner" className="form-label">
                            Store Code <span className="text-primary">*</span>
                          </label>
                          <input type="text" id="store-code" className="form-control" placeholder="Enter Your Store Code" {...register('storecode')} />
                          {errors.storecode && <p className="text-danger">{errors.storecode.message}</p>}
                        </div>
                      </Col>

                      <Col lg={6}>
                        <div className="mb-3">
                          <label htmlFor="distributor" className="form-label">
                            Entry Warehouse <span className="text-primary">*</span>
                          </label>
                          <Controller
                            name="entrywarehouse"
                            control={control}
                            render={({ field }) => (
                              <Select
                                {...field}
                                options={warehouseOptions}
                                className="react-select-container"
                                classNamePrefix="react-select"
                                styles={customSelectStyles}
                                placeholder="Select Entry Warehouse"
                              />
                            )}
                          />
                          {errors.entrywarehouse && <p className="text-danger">{errors.entrywarehouse.message}</p>}
                        </div>
                      </Col>

                      <Col lg={6}>
                        <div className="mb-3">
                          <label htmlFor="brands" className="form-label">
                            Available Brands <span className="text-primary">*</span>
                          </label>
                          {/* here */}
                          <Controller
                            name="brands"
                            control={control}
                            render={({ field }) => (
                              <Select
                                {...field}
                                options={brandOptions}
                                className="react-select-container"
                                classNamePrefix="react-select"
                                closeMenuOnSelect={false}
                                hideSelectedOptions={false}
                                components={{ Option: CheckboxOption, ValueContainer: NoChipsValueContainer }}
                                isMulti
                                styles={customSelectStyles}
                              />
                            )}
                          />
                          {errors.brands && <p className="text-danger">{errors.brands.message}</p>}
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <label htmlFor="address-line-1" className="form-label">
                            Address Line 1 <span className="text-primary">*</span>
                          </label>
                          <input type="text" id="address-line-1" className="form-control" placeholder="Enter Your Address" {...register('address1')} />
                          {errors.address1 && <p className="text-danger">{errors.address1.message}</p>}
                        </div>
                      </Col>

                      <Col lg={6}>
                        <div className="mb-3">
                          <label htmlFor="address-line-2" className="form-label">
                            Address Line 2 (Optional)
                          </label>
                          <input
                            type="text"
                            id="address-line-2"
                            className="form-control"
                            placeholder="Enter Your Address 2"
                            {...register('address2')}
                          />
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
                                  setValue('state', null)
                                  setValue('city', null)
                                  field.onChange(selectedOption)
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
                                onChange={(selectedOption) => {
                                  setValue('city', null)
                                  field.onChange(selectedOption)
                                }}
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
                                onChange={(selectedOption) => {
                                  field.onChange(selectedOption)
                                }}
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
                          <input type="text" id="zip-code" className="form-control" placeholder="Enter Your Zip-Code" {...register('zip')} />
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
                <button type="submit" className="btn btn-primary">
                  Create Store
                </button>
              </CardFooter>
            </form>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default CreateStoreForm

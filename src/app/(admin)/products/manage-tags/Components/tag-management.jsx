"use client";
import { customSelectStyles } from "@/utils/other";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "react-bootstrap"
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Select, { components } from 'react-select';
import IconifyIcon from "@/components/wrappers/IconifyIcon";
import CreateTag from "./create-tags"
import { useState } from "react";
import * as Yup from "yup";
import { useTagList } from "@/services/productServices";

const schema = Yup.object({
  tagname: Yup.string()
    .trim()
    .min(1, "Tag Name is required")
    .max(100, "Tag Name cannot exceed 100 characters")
    .required("Tag Name is required"),
});

const TagManagement = () => {

  const [createTagModal, setCreateTagModal] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      backgroundColor: "#FF0101",
      textColor: "#FFFFF"
    },
  });

    const  { data : tagList } = useTagList();

    const tagOptions = tagList?.map(tag => ({
      value: tag.id,
      label: tag.tagName,
      backgroundColor: tag.backgroundColor,
      textColor: tag.textColor,  
    }));  


  const ColorCheckboxOption = (props) => (
    <components.Option {...props}>
      <input
        type="checkbox"
        checked={props.isSelected}
        className="form-check-input"
        onChange={() => { }}
        style={{ marginRight: 8 }}
      />
      <span
        style={{
          width: 16,
          height: 16,
          borderRadius: '50%',
          backgroundColor: props.data.color,
          display: 'inline-block',
          marginRight: 7
        }}
      />
      <label>{props.label}</label>
    </components.Option>
  );


  const NoChipsValueContainer = ({ children, ...props }) => {
    const filteredChildren = children.filter((child) => child && child.type !== components.MultiValue)
    return <components.ValueContainer {...props}>{filteredChildren}</components.ValueContainer>
  }

  const tags = [
    { label: 'Recommended', bgColor: '#F97316', textColor: '#fff' }, // orange
    { label: 'Best Seller', bgColor: '#EA580C', textColor: '#fff' },  // dark orange
    { label: 'Trending', bgColor: '#0D9488', textColor: '#fff' },     // teal
  ];




  return (
    <Row>
      <Col xl={12} lg={12}>
        <Card>
          <CardHeader className="d-flex align-items-center justify-content-between">
            <CardTitle as={'h4'} >
              Product Tag Management
            </CardTitle>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setCreateTagModal(true)}
            >
              <IconifyIcon icon="tabler:plus" className="fs-5" /> Create Tags
            </button>
          </CardHeader>
          <CardBody>
            <Row>
              <Col lg={6}>
                <div className='mb-3'>
                  <label htmlFor={'Select Tags'} className="form-label">
                    Select Tags
                  </label>
                  <Controller
                    name={'selectTags'}
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isMulti
                        options={tagOptions}
                        className="react-select-container"
                        classNamePrefix="react-select"
                        placeholder={`Select Tags`}
                        styles={customSelectStyles}
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        components={
                          {
                            Option: ColorCheckboxOption,
                            ValueContainer: NoChipsValueContainer
                          }
                        }
                        onChange={(selectedOption) => field.onChange(selectedOption)}
                      />
                    )}
                  />
                  {/* {errors[attr.attributeName] && (
                    <p className="text-danger">{errors[attr.attributeName]?.message}</p>
                  )} */}
                </div>
              </Col>

              <Col lg={6}>
                <label className="form-label">
                  Selected Tags
                </label>
                <div className="border border-dashed rounded p-3 mb-3">
                  <div className="d-flex gap-2 flex-wrap">
                    {tags.map((tag, index) => (
                      <div
                        key={index}
                        className="d-inline-flex align-items-center justify-content-between px-2 py-1 rounded-pill"
                        style={{ backgroundColor: tag.bgColor, color: tag.textColor }}
                      >
                        {tag.label}
                        <IconifyIcon
                          icon="solar:close-circle-bold"
                          className="align-middle ms-2"
                          width={18}
                          height={18}
                          style={{ cursor: 'pointer' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <CreateTag
          show={createTagModal}
          setCreateTagModal={setCreateTagModal}
          register={register}
          control={control}
          watch={watch}
          errors={errors}
          handleSubmit={handleSubmit}
        />
      </Col>
    </Row>
  )
}

export default TagManagement
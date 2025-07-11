'use client'
import React from 'react'
import ConfirmationModal from '../../../../../components/ConfirmationModal'
import { Button, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap'
import { ColorPicker } from 'antd'
import { Controller } from 'react-hook-form'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useNotificationContext } from '@/context/useNotificationContext'
import api from '@/services/api'

const CreateTag = ({ show, setCreateTagModal, register, control, watch, errors, handleSubmit }) => {

    const { showNotification } = useNotificationContext()
    const tagBackgrounColor = watch('backgroundColor');
    const tagTextColor = watch('textColor')
    const tagName = watch('tagname')

    const createTags = handleSubmit(async (data) => {
        try {
            const payload = {
                "tagName": data.tagname,
                "isActive": true,
                "backgroundColor": data.backgroundColor,
                "textColor": data.textColor
            }
            const response = await api.post("/api/ProductTag/CreateProductTags", payload);

            if (response.data.statusCode === 200 && response.data.isSuccess === true) {
                showNotification({
                    message: response.data.message || "Created successfully!",
                    variant: "success",
                });
                setCreateTagModal(false);
            } else {
                showNotification({
                    message: response.data.message || "Creation Failed!",
                    variant: "danger",
                });
            }
        } catch (error) {
            showNotification({
                message: error?.response?.data?.message || "An error occurred.",
                variant: "danger",
            });
        }

    });


    return (
        <ConfirmationModal show={show} onHide={() => setCreateTagModal(false)}>
            <ModalHeader closeButton>
                <ModalTitle>
                    Create Product Tag
                </ModalTitle>
            </ModalHeader>

            <form onSubmit={createTags}>
                <ModalBody>
                    <div>
                        <div className="mb-3">
                            <label htmlFor="tag-name" className="form-label">
                                Tag Name <span className='text-primary'>*</span>
                            </label>
                            <input type="text" id="tag-name" className="form-control" placeholder="Tag Name" {...register("tagname")} />
                            {errors.tagname && <p className="text-danger">{errors.tagname.message}</p>}
                        </div>
                        <div className='mb-3'>
                            <label className="form-label">
                                Tag Colors
                            </label>
                            <div className='d-flex gap-2 align-items-center'>
                                <span className='fw-bold'>Background &#58;</span>
                                <Controller
                                    control={control}
                                    name={`backgroundColor`}
                                    render={({ field: { value, onChange } }) => (
                                        <ColorPicker
                                            value={value}
                                            onChange={(color) => {
                                                onChange(color.toHexString());
                                            }}
                                            style={{ zIndex: 1000 }}
                                            mode="single"
                                            size="large"
                                            getPopupContainer={(triggerNode) => triggerNode.parentNode}
                                        />
                                    )}
                                />
                                <span className='fw-bold'>Text &#58;</span>
                                <Controller
                                    control={control}
                                    name={`textColor`}
                                    render={({ field: { value, onChange } }) => (
                                        <ColorPicker
                                            value={value}
                                            onChange={(color) => {
                                                onChange(color.toHexString());
                                            }}
                                            style={{ zIndex: 1000 }}
                                            mode="single"
                                            size="large"
                                            getPopupContainer={(triggerNode) => triggerNode.parentNode}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div
                            className="d-inline-flex align-items-center justify-content-between px-2 py-1 rounded-pill"
                            style={{ backgroundColor: tagBackgrounColor, color: tagTextColor }}
                        >
                            {tagName}
                            <IconifyIcon
                                icon="solar:tag-outline"
                                className="align-middle ms-2"
                                style={{ color: tagTextColor }}

                                width={18}
                                height={18}
                            />
                        </div>
                    </div>
                </ModalBody>

                <ModalFooter>
                    <Button variant="secondary" onClick={() => setCreateTagModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" type="submit">
                        Save
                    </Button>
                </ModalFooter>
            </form>
        </ConfirmationModal>
    )
}

export default CreateTag
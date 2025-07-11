'use client';

import { Card, Col, FormLabel, FormText, Row } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import useFileUploader from '@/hooks/useFileUploader';
import Link from 'next/link';
import IconifyIcon from '../wrappers/IconifyIcon';
import { useSelector } from 'react-redux';
import { storeFiles, storeImage } from '@/redux/slices/fileSlice';
import { useNotificationContext } from '@/context/useNotificationContext';
const DropzoneFormInput = ({
  label,
  labelClassName,
  helpText,
  iconProps,
  showPreview,
  className,
  text,
  textClassName,
  onFileUpload,
  maxFiles = 1,
  acceptedFile,
  reduxKey,
  showCopyIcon = false,
  isUploading = false

}) => {

  const reduxAction = reduxKey === "files" ? storeFiles : storeImage;

  const {
    selectedFiles,
    handleAcceptedFiles,
    removeFile
  } = useFileUploader(showPreview, reduxAction);

  const uploadedImages = useSelector((state) => state.files[reduxKey]);
  const { showNotification } = useNotificationContext();

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      showNotification({
        variant: "success",
        message: 'Image URL copied to clipboard!'
      });
    }).catch(() => {
      showNotification({
        variant: "success",
        message: 'Failed to copy image URL!'
      });
    });
  };


  return <>
    {label && <FormLabel className={labelClassName}>{label}</FormLabel>}
    <div className={`position-relative `}>
      <Dropzone onDrop={acceptedFiles => handleAcceptedFiles(acceptedFiles, onFileUpload)} maxFiles={maxFiles} accept={acceptedFile} >
        {({ getRootProps, getInputProps }) => <>
          <div className={`dropzone dropzone-custom ${className}`}>
            <div className="dz-message" {...getRootProps()}>
              <input {...getInputProps()} />
              <IconifyIcon icon={iconProps?.icon ?? 'bx:cloud-upload'} {...iconProps} />
              <h3 className={textClassName}>{text}</h3>
              {helpText && typeof helpText === 'string' ? <FormText>{helpText}</FormText> : helpText}
            </div>
          </div>

          {showPreview && uploadedImages.length > 0 && <div className="dz-preview mt-3">
            {(uploadedImages || []).map((file, idx) => {
              const ext = file.name.substr(file.name.lastIndexOf('.') + 1);
              let parsedUrl = null;
              if (file?.path?.startsWith("http://") || file?.path?.startsWith("https://")) {
                parsedUrl = new URL(file.path);
              }
              const pathname = parsedUrl ? parsedUrl.pathname : null;
              const fileName = pathname ? pathname.substring(pathname.lastIndexOf('/') + 1) : file.name;
  
              return(
                file?.preview?.trim() &&
                  <Card className="mt-1 mb-0 shadow-none border" key={idx + '-file'}>
                    <div className="p-2">
                      <Row className="align-items-center">
                        {file.preview ? <Col className="col-auto">
                          <img data-dz-thumbnail="" className="avatar-sm rounded bg-light" alt={fileName} src={file.preview} />
                        </Col> : <Col className="col-auto">
                          <div className="avatar-sm">
                            <span className="avatar-title bg-primary rounded">{ext.toUpperCase()}</span>
                          </div>
                        </Col>}

                        <Col className="ps-0">
                          <div className="d-flex align-items-center gap-2">
                            <Link href={file.name} className="text-muted fw-bold" target="_blank" rel="noopener noreferrer">
                              {fileName}
                            </Link>

                            {showCopyIcon && (file.path.startsWith("http://") || file.path.startsWith("https://")) && (
                              <button
                                onClick={() => handleCopyUrl(file.path)}
                                className="btn btn-sm btn-outline-secondary"
                                title="Copy Image URL"
                              >
                                <IconifyIcon icon="mdi:content-copy" width={16} />
                              </button>
                            )}
                          </div>
                          <p className="mb-0">
                            <strong>{file.formattedSize}</strong>
                          </p>
                        </Col>

                        <Col className="text-end">
                          <button data-dz-remove className="btn btn-sm btn-primary" onClick={() => removeFile(file)}>
                            Delete
                          </button>
                        </Col>
                      </Row>
                    </div>
                  </Card>
              )
            })}
          </div>}
        </>}
      </Dropzone>

      {isUploading && (
        <div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center bg-dark bg-opacity-50"
          style={{ zIndex: 10 }}
        >
          <div className="spinner-border text-light mb-2" role="status" />
          <strong className="text-white">Uploading...</strong>
        </div>
      )}
    </div>
  </>;
};
export default DropzoneFormInput;
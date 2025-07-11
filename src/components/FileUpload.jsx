import { Card, CardBody, CardHeader, CardTitle, } from 'react-bootstrap';
import DropzoneFormInput from './form/DropzoneFormInput';
const FileUpload = ({
  title,
  maxFiles = 1,
  boldPlaceholder = "Drop your images here, or click to browse",
  subPlaceholder = "(PNG, JPG files are allowed )",
  showPreview = true,
  reduxKey = "image",
  acceptedFile = {
    'image/jpeg': [],
    'image/png': [],
    'image/jpg': [],
  },
  showCopyIcon = false,
  onFileUpload,
  isUploading = false
}) => {
  return <Card>
    <CardHeader>
      <CardTitle as={'h4'}>{title}</CardTitle>
    </CardHeader>
    <CardBody>
      <DropzoneFormInput className="py-5" showCopyIcon={showCopyIcon} acceptedFile={acceptedFile} reduxKey={reduxKey} maxFiles={maxFiles} iconProps={{
        icon: 'bx:cloud-upload',
        height: 48,
        width: 48,
        className: 'mb-4 text-primary'
      }} text={boldPlaceholder} helpText={<span className="text-muted fs-13 ">{subPlaceholder}</span>} showPreview={showPreview} onFileUpload={onFileUpload} isUploading={isUploading} />
    </CardBody>
  </Card>;
};
export default FileUpload;
import PasswordFormInput from '@/components/form/PasswordFormInput';
import TextFormInput from '@/components/form/TextFormInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, FormCheck } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
const SignUpForm = () => {
  const signUpSchema = yup.object({
    name: yup.string().required('please enter your name'),
    email: yup.string().email('Please enter a valid email').required('please enter your email'),
    password: yup.string().required('Please enter your password')
  });
  const {
    control,
    handleSubmit
  } = useForm({
    resolver: yupResolver(signUpSchema)
  });
  return <form onSubmit={handleSubmit(() => {})} className="authentication-form">
      <TextFormInput control={control} name="name" containerClassName="mb-3" label="Name" id="name" placeholder="Enter your name" />
      <TextFormInput control={control} name="email" containerClassName="mb-3" label="Email" id="email-id" placeholder="Enter your email" />
      <PasswordFormInput control={control} name="password" containerClassName="mb-3" placeholder="Enter your password" id="password-id" label="password" />
      <div className="mb-3">
        <FormCheck label="I accept Terms and Condition" id="termAndCondition2" />
      </div>
      <div className="mb-1 text-center d-grid">
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </div>
    </form>;
};
export default SignUpForm;
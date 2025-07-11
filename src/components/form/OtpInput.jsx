import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import Feedback from 'react-bootstrap/esm/Feedback';
import { Controller } from 'react-hook-form';
import { useRef } from 'react';

const OTPInput = ({
  name,
  containerClassName: containerClass,
  control,
  id,
  label,
  length = 6,
  noValidate,
  labelClassName: labelClass,
  ...other
}) => {
  const inputsRef = useRef([]);

  const handleChange = (e, index, field) => {
    let value = e.target.value.replace(/\D/g, ''); // Allow only numbers
    if (value.length > 0) {
      value = value.charAt(value.length - 1); // Keep only the last entered digit
    }

    const newValue = field.value.split('');
    newValue[index] = value;
    const updatedValue = newValue.join('');

    field.onChange(updatedValue);

    e.target.value = value; // Ensure only the last digit is displayed

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (!/^[0-9]$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
      e.preventDefault(); // Block any non-numeric input
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={{ required: "Please enter the OTP", pattern: { value: /^\d{4}$/, message: "OTP must be exactly 4 digits" } }}
      render={({ field, fieldState }) => (
        <FormGroup className={containerClass}>
          {label && (typeof label === 'string' ? (
            <FormLabel htmlFor={id ?? name} className={labelClass}>
              {label}
            </FormLabel>
          ) : (
            <>{label}</>
          ))}
          <div className="d-flex gap-2">
            {[...Array(length)].map((_, index) => (
              <FormControl
                key={index}
                id={`${id ?? name}-${index}`}
                type="text"
                maxLength={1}
                isInvalid={fieldState.invalid}
                ref={(el) => (inputsRef.current[index] = el)}
                onChange={(e) => handleChange(e, index, field)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="text-center"
                inputMode="numeric"
                pattern="[0-9]*"
                {...other}
              />
            ))}
          </div>
          {!noValidate && fieldState.error?.message && (
            <Feedback type="invalid">{fieldState.error?.message}</Feedback>
          )}
        </FormGroup>
      )}
    />
  );
};

export default OTPInput;

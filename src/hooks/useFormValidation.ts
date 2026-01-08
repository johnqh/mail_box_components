import { useState, useCallback, useMemo } from 'react';

export type ValidationRule<T> = (value: T) => string | undefined;

export interface FieldConfig<T> {
  /** Initial value */
  initialValue: T;
  /** Validation rules (return error string or undefined) */
  validate?: ValidationRule<T>[];
  /** Whether field is required */
  required?: boolean;
  /** Custom required message */
  requiredMessage?: string;
}

export interface FormFieldState<T> {
  value: T;
  error?: string;
  touched: boolean;
  dirty: boolean;
}

export interface UseFormValidationOptions<T extends Record<string, unknown>> {
  /** Field configurations */
  fields: { [K in keyof T]: FieldConfig<T[K]> };
  /** Validate on change (default: only after blur) */
  validateOnChange?: boolean;
  /** Validate on blur (default: true) */
  validateOnBlur?: boolean;
}

export interface UseFormValidationResult<T extends Record<string, unknown>> {
  /** Current form values */
  values: T;
  /** Field errors */
  errors: Partial<Record<keyof T, string>>;
  /** Which fields have been touched (blurred) */
  touched: Partial<Record<keyof T, boolean>>;
  /** Which fields have been modified */
  dirty: Partial<Record<keyof T, boolean>>;
  /** Whether the form is valid */
  isValid: boolean;
  /** Whether any field has been modified */
  isDirty: boolean;
  /** Set a field value */
  setValue: <K extends keyof T>(field: K, value: T[K]) => void;
  /** Set multiple values at once */
  setValues: (values: Partial<T>) => void;
  /** Mark a field as touched (trigger validation) */
  setTouched: (field: keyof T) => void;
  /** Validate a single field */
  validateField: (field: keyof T) => string | undefined;
  /** Validate all fields */
  validateAll: () => boolean;
  /** Reset form to initial values */
  reset: () => void;
  /** Reset a single field */
  resetField: (field: keyof T) => void;
  /** Get props for an input field */
  getFieldProps: <K extends keyof T>(field: K) => {
    value: T[K];
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onBlur: () => void;
    name: string;
    'aria-invalid': boolean;
  };
  /** Get error message for a field (only if touched) */
  getFieldError: (field: keyof T) => string | undefined;
}

/**
 * useFormValidation Hook
 *
 * A comprehensive form validation hook with touched state tracking,
 * field-level validation, and accessibility support.
 *
 * @example
 * ```tsx
 * const { values, errors, getFieldProps, getFieldError, validateAll, isValid } = useFormValidation({
 *   fields: {
 *     email: {
 *       initialValue: '',
 *       required: true,
 *       requiredMessage: 'Email is required',
 *       validate: [
 *         (v) => !v.includes('@') ? 'Invalid email format' : undefined,
 *       ],
 *     },
 *     password: {
 *       initialValue: '',
 *       required: true,
 *       validate: [
 *         (v) => v.length < 8 ? 'Password must be at least 8 characters' : undefined,
 *       ],
 *     },
 *   },
 * });
 *
 * const handleSubmit = (e: FormEvent) => {
 *   e.preventDefault();
 *   if (validateAll()) {
 *     // Submit form
 *   }
 * };
 *
 * return (
 *   <form onSubmit={handleSubmit}>
 *     <input {...getFieldProps('email')} type="email" />
 *     {getFieldError('email') && <span>{getFieldError('email')}</span>}
 *
 *     <input {...getFieldProps('password')} type="password" />
 *     {getFieldError('password') && <span>{getFieldError('password')}</span>}
 *
 *     <button type="submit" disabled={!isValid}>Submit</button>
 *   </form>
 * );
 * ```
 */
export function useFormValidation<T extends Record<string, unknown>>({
  fields,
  validateOnChange = false,
  validateOnBlur = true,
}: UseFormValidationOptions<T>): UseFormValidationResult<T> {
  // Initialize state from field configs
  const initialValues = useMemo(() => {
    const values = {} as T;
    for (const key in fields) {
      values[key] = fields[key].initialValue;
    }
    return values;
  }, [fields]);

  const [values, setValuesState] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouchedState] = useState<Partial<Record<keyof T, boolean>>>({});
  const [dirty, setDirty] = useState<Partial<Record<keyof T, boolean>>>({});

  // Validate a single field
  const validateField = useCallback(
    (field: keyof T): string | undefined => {
      const config = fields[field];
      const value = values[field];

      // Check required
      if (config.required) {
        const isEmpty =
          value === '' ||
          value === null ||
          value === undefined ||
          (Array.isArray(value) && value.length === 0);
        if (isEmpty) {
          return config.requiredMessage || 'This field is required';
        }
      }

      // Run validation rules
      if (config.validate) {
        for (const rule of config.validate) {
          const error = rule(value);
          if (error) {
            return error;
          }
        }
      }

      return undefined;
    },
    [fields, values]
  );

  // Set a single value
  const setValue = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
      setValuesState((prev) => ({ ...prev, [field]: value }));
      setDirty((prev) => ({ ...prev, [field]: true }));

      if (validateOnChange && touched[field]) {
        const error = validateField(field);
        setErrors((prev) => ({ ...prev, [field]: error }));
      }
    },
    [validateOnChange, touched, validateField]
  );

  // Set multiple values
  const setValues = useCallback((newValues: Partial<T>) => {
    setValuesState((prev) => ({ ...prev, ...newValues }));
    const dirtyUpdates: Partial<Record<keyof T, boolean>> = {};
    for (const key in newValues) {
      dirtyUpdates[key as keyof T] = true;
    }
    setDirty((prev) => ({ ...prev, ...dirtyUpdates }));
  }, []);

  // Mark field as touched and validate
  const setTouched = useCallback(
    (field: keyof T) => {
      setTouchedState((prev) => ({ ...prev, [field]: true }));

      if (validateOnBlur) {
        const error = validateField(field);
        setErrors((prev) => ({ ...prev, [field]: error }));
      }
    },
    [validateOnBlur, validateField]
  );

  // Validate all fields
  const validateAll = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    const newTouched: Partial<Record<keyof T, boolean>> = {};
    let isValid = true;

    for (const field in fields) {
      newTouched[field as keyof T] = true;
      const error = validateField(field as keyof T);
      if (error) {
        newErrors[field as keyof T] = error;
        isValid = false;
      }
    }

    setTouchedState(newTouched);
    setErrors(newErrors);
    return isValid;
  }, [fields, validateField]);

  // Reset form
  const reset = useCallback(() => {
    setValuesState(initialValues);
    setErrors({});
    setTouchedState({});
    setDirty({});
  }, [initialValues]);

  // Reset single field
  const resetField = useCallback(
    (field: keyof T) => {
      setValuesState((prev) => ({ ...prev, [field]: fields[field].initialValue }));
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
      setTouchedState((prev) => {
        const newTouched = { ...prev };
        delete newTouched[field];
        return newTouched;
      });
      setDirty((prev) => {
        const newDirty = { ...prev };
        delete newDirty[field];
        return newDirty;
      });
    },
    [fields]
  );

  // Get props for input field
  const getFieldProps = useCallback(
    <K extends keyof T>(field: K) => ({
      value: values[field],
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
      ) => {
        setValue(field, e.target.value as T[K]);
      },
      onBlur: () => setTouched(field),
      name: String(field),
      'aria-invalid': !!(touched[field] && errors[field]),
    }),
    [values, setValue, setTouched, touched, errors]
  );

  // Get error for field (only if touched)
  const getFieldError = useCallback(
    (field: keyof T): string | undefined => {
      return touched[field] ? errors[field] : undefined;
    },
    [touched, errors]
  );

  // Computed values
  const isValid = useMemo(() => {
    for (const field in fields) {
      if (validateField(field as keyof T)) {
        return false;
      }
    }
    return true;
  }, [fields, validateField]);

  const isDirty = useMemo(() => {
    return Object.values(dirty).some(Boolean);
  }, [dirty]);

  return {
    values,
    errors,
    touched,
    dirty,
    isValid,
    isDirty,
    setValue,
    setValues,
    setTouched,
    validateField,
    validateAll,
    reset,
    resetField,
    getFieldProps,
    getFieldError,
  };
}

export default useFormValidation;

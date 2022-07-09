import { FocusEventHandler, useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import styles from './Register.module.css';

import { IErrors } from '../Interfaces/IError';
import { useLoginFormValidator } from '../../helpers/useLoginFormValidators';
import useDebounce from '../../helpers/useDebounce';

const Register = () => {

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const debouncedFormValue = useDebounce(form, 500);
    const [showPass, setShowPass] = useState(false);
    const [showRePass, setShowRePass] = useState(false);
    const [formValid, setFormValid] = useState(false);

    const {
        errors,
        validateForm,
        onBlurField,
    }: {
        errors: IErrors,
        validateForm: Function,
        onBlurField: FocusEventHandler
    } = useLoginFormValidator(form);

    useEffect(()=> {
        const { isFormValid } = validateForm({
            form,
            errors,
        });
        setFormValid(isFormValid);
    }, []);

    const onUpdateField = (e: any) => {
        const field = e.target.name;
        const value = e.target.value;
        const nextFormState = {
            ...form,
            [field]: value,
        };
        errors[field].dirty = true;
        setForm(nextFormState);
    }

    useEffect(() => {
        onValidateField();
    }, [debouncedFormValue]);

    const onValidateField = () => {
        const { isFormValid } =
            validateForm({
                form,
                errors,
            });
        setFormValid(isFormValid);
    };

    const revealPass = (event: React.MouseEvent) => {
        event.preventDefault();
        setShowPass(showPass => !showPass);
    }

    const revealRePass = (event: React.MouseEvent) => {
        event.preventDefault();
        setShowRePass(showRePass => !showRePass);
    }

    const onSubmitForm = (e: any) => {
        e.preventDefault();
        console.log('submitting');
        const forceTouchErrors = true;
        const { isFormValid } = validateForm({
            form,
            errors,
            forceTouchErrors
        });
        setFormValid(isFormValid);
        if (!formValid) {
            return;
        }

        console.log(JSON.stringify(form, null, 2));
    };

    return (
        <form
            className={styles.form}
            onSubmit={onSubmitForm}
        >

            <div className={styles.formTitle}>
                <h1>Registration Form</h1>
            </div>
            <div className={styles.formGroup}>
                <label className={styles.formLabel}>First Name</label>
                <input
                    className={clsx(
                        styles.formField,
                        errors.firstName.dirty && errors.firstName.error && styles.formFieldError,
                    )}
                    type="text"
                    aria-label='First Name field'
                    name='firstName'
                    placeholder="John"
                    value={form.firstName}
                    onChange={onUpdateField}
                    onBlur={onBlurField}
                />
                {errors.firstName.dirty && errors.firstName.error ? (
                    <p className={styles.formFieldErrorMessage}>{errors.firstName.message}</p>
                ) : null}
            </div>

            <div className={styles.formGroup}>
                <label className={styles.formLabel}>Last Name</label>
                <input
                    className={clsx(
                        styles.formField,
                        errors.lastName.dirty && errors.lastName.error && styles.formFieldError,
                    )}
                    type="text"
                    aria-label='Last Name field'
                    name='lastName'
                    placeholder="Doe"
                    value={form.lastName}
                    onChange={onUpdateField}
                    onBlur={onBlurField}
                />
                {errors.lastName.dirty && errors.lastName.error ? (
                    <p className={styles.formFieldErrorMessage}>{errors.firstName.message}</p>
                ) : null}
            </div>

            <div className={styles.formGroup}>
                <label className={styles.formLabel}>Email</label>
                <input
                    className={clsx(
                        styles.formField,
                        errors.email.dirty && errors.email.error && styles.formFieldError,
                    )}
                    type="email"
                    aria-label='Email field'
                    name='email'
                    placeholder="john.doe@my.com"
                    value={form.email}
                    onChange={onUpdateField}
                    onBlur={onBlurField}
                />
                {errors.email.dirty && errors.email.error ? (
                    <p className={styles.formFieldErrorMessage}>{errors.email.message}</p>
                ) : null}
            </div>

            <div className={styles.formGroup}>
                <label className={styles.formLabel}>Password</label>
                <div className={styles.inputGroup}>
                    <input
                        className={clsx(
                            styles.formField,
                            errors.password.dirty &&
                            errors.password.error &&
                            styles.formFieldError
                        )}
                        type={showPass ? 'text' : 'password'}
                        aria-label='Password field'
                        name='password'
                        placeholder="********"
                        value={form.password}
                        onChange={onUpdateField}
                        onBlur={onBlurField}
                    />
                    <div className={styles.faIcon} onClick={revealPass} >
                        <FontAwesomeIcon icon={showPass ? faEyeSlash : faEye} />
                    </div>
                </div>
                {errors.password.dirty && errors.password.error ? (
                    <p className={styles.formFieldErrorMessage}>{errors.password.message}</p>
                ) : null}
            </div>
            <div className={clsx(
                styles.formGroup,
                errors.confirmPassword.dirty &&
                errors.confirmPassword.error &&
                styles.formGroupError)}>
                <label className={styles.formLabel}>Confirm Password</label>
                <div className={styles.inputGroup}>
                    <input className={styles.formField}
                        type={showRePass ? 'text' : 'password'}
                        aria-label='Confirm password field'
                        name="confirmPassword"
                        placeholder="********"
                        value={form.confirmPassword}
                        onChange={onUpdateField}
                        onBlur={onBlurField}
                    />
                    <div className={styles.faIcon} >
                        <FontAwesomeIcon icon={showRePass ? faEyeSlash : faEye} onClick={revealRePass} />
                    </div>
                </div>
                {errors.confirmPassword.dirty && errors.confirmPassword.error ? (
                    <p className={styles.formFieldErrorMessage}>{errors.confirmPassword.message}</p>
                ) : null}
            </div>
            <div className={styles.formActions}>
                <button 
                    className={styles.formSubmitBtn}
                    type="submit"
                    disabled={!formValid}
                >
                    Register
                </button>
            </div>
        </form>
    );
};

export default Register;
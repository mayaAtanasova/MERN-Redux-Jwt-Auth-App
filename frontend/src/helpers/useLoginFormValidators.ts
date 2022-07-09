import { useState } from 'react';
import {
    nameValidaotr,
    emailValidator,
    passwordValidator,
    confrimPasswordValidator,
} from './validators';
import { IErrors } from '../Components/Interfaces/IError';
import { IForm } from '../Components/Interfaces/IForm';

const touchErrors = (errors: IErrors): IErrors => {
    return Object.entries(errors).reduce((acc, [field, fieldError]) => {
        acc[field] = {
            ...fieldError,
            dirty: true,
        };
        return acc;
    }, errors);
};

export const useLoginFormValidator = (form: IForm) => {

    const fieldNames = Object.keys(form);

    const initialState: IErrors = fieldNames.reduce((acc, fieldName) => ({
        ...acc,
        [fieldName]: {
            dirty: false,
            error: false,
            message: '',
        },
    }), {});

    const validatorsDict: {
        [key: string]: Function,
    } = ({
        'name': nameValidaotr,
        'email': emailValidator,
        'password': passwordValidator,
        'confirmPassword': confrimPasswordValidator,
    });

    const [errors, setErrors] = useState(initialState);

    const validateForm = ({ form, errors, forceTouchErrors = false }: { form: IForm, errors: IErrors, forceTouchErrors: boolean }) => {
        let isValid = true;

        //create a deep copy of the errors object
        let nextErrors = JSON.parse(JSON.stringify(errors));

        //force validate all the fields on submit form
        if (forceTouchErrors) {
            nextErrors = touchErrors(errors);
        }

        fieldNames.forEach(fieldName => {
            const fieldValue = form[fieldName];
            let error = '';
            if (nextErrors[fieldName].dirty) {
                error = validatorsDict[fieldName](fieldValue, form.password);
                nextErrors[fieldName].error = !!error;
                nextErrors[fieldName].message = error;
            };
            isValid = Object.keys(nextErrors).every(key => !nextErrors[key].error);

        });

        setErrors(nextErrors);

        return {
            isValid,
            errors: nextErrors,
        };

    };

    const onBlurField = (e: any) => {
        const field: string = e.target.name;

        let updatedErrors = {
            ...errors
        };

        updatedErrors[field].dirty = true;

        validateForm({ form, errors: updatedErrors, forceTouchErrors: false });
    };

    return {
        validateForm,
        onBlurField,
        errors,
    };

};

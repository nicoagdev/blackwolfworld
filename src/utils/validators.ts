// src/utils/validators.ts

export const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const validatePassword = (password: string): boolean => {
    return password.length >= 6;
};

export const validateRequired = (value: string): boolean => {
    return value.trim() !== '';
};

export const validatePhoneNumber = (phone: string): boolean => {
    const regex = /^\+?[1-9]\d{1,14}$/;
    return regex.test(phone);
};

export const validateZipCode = (zip: string): boolean => {
    const regex = /^\d{5}(-\d{4})?$/;
    return regex.test(zip);
};
import React from 'react';

const InputField = ({ label, name, type = 'text', value, placeholder, onChange, onBlur, error, required }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">
                {label}{required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0F172A] focus:border-[#0F172A] sm:text-sm"
            />
            {error ? (
                <div className="text-red-500 text-sm mt-1">{error}</div>
            ) : null}
        </div>
    );
};

export default InputField;

import React from 'react';

const TextAreaField = ({ label, name, value, onChange, onBlur, error, required }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-black dark:text-gray-100">
                {label}
                {required && <span className="text-red-500">*</span>}
            </label>
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                rows="2"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-[#0F172A] focus:border-[#0F172A] sm:text-sm"
            />
            {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
        </div>
    );
};

export default TextAreaField;

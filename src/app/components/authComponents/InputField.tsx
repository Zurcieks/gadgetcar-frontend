import React from 'react';

interface InputFieldProps {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  error?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
}

const InputField: React.FC<InputFieldProps> = ({ id, name, type, placeholder, error, onChange, value }) => {
  return (
    <div>
      <label className="block text-md font-medium text-gray-700 mb-2" htmlFor={id}>
        {placeholder}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        className={`w-full px-4 py-2 border ${error ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-base`}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default InputField;

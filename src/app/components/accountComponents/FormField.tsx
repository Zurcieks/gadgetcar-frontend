interface FormFieldProps {
    label: string;
    name: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    readOnly: boolean;
  }
  
  export const FormField: React.FC<FormFieldProps> = ({
    label,
    name,
    type,
    value,
    onChange,
    readOnly
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        readOnly={readOnly}
      />
    </div>
  );
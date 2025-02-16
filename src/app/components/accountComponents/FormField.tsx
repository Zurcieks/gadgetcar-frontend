interface FormFieldProps {
  label: string;

  name: string;
  type: string;
  className?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,

  type,
  value,
  className,
  onChange,
  readOnly,
}) => (
  <div className={`form-field ${className}`}>
    <label className="block text-sm font-medium  mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border bg-white text-black border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      readOnly={readOnly}
    />
  </div>
);

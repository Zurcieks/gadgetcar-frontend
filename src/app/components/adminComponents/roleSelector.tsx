interface RoleSelectorProps {
    role: string;
    onChange: (role: string) => void;
  }
  
  export const RoleSelector = ({ role, onChange }: RoleSelectorProps) => (
    <select
      value={role}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded px-2 py-1 w-full sm:w-auto"
    >
      <option value="user">User</option>
      <option value="admin">Admin</option>
    </select>
  );
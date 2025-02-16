interface RoleBadgeProps {
    role: string;
  }
  
  export const RoleBadge = ({ role }: RoleBadgeProps) => (
    <span className={`px-2 py-1 rounded ${
      role === 'admin' ? 'bg-purple-200 text-purple-800' : 'bg-blue-200 text-blue-800'
    }`}>
      {role}
    </span>
  );
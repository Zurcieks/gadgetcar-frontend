import { User } from '../../../../types/user.types'
import { RoleBadge } from './roleBadge';
import { RoleSelector } from './roleSelector';

interface UserTableProps {
  users: User[];
  onRoleChange: (userId: string, newRole: string) => void;
}

export const UserTable = ({ users, onRoleChange }: UserTableProps) => (
  <div className="w-full">
 
    <div className="hidden sm:block overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-50">
            <th className="hidden lg:table-cell px-4 py-2 border-b text-left">ID</th>
            <th className="px-4 py-2 border-b text-left">Imię i Nazwisko</th>
            <th className="px-4 py-2 border-b text-left">Email</th>
            <th className="px-4 py-2 border-b text-left">Rola</th>
            <th className="px-4 py-2 border-b text-left">Akcja</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-50">
              <td className="hidden lg:table-cell px-4 py-2 border-b">{user._id}</td>
              <td className="px-4 py-2 border-b">
                <div className="flex gap-1">
                  <span>{user.firstName}</span>
                  <span>{user.lastName}</span>
                </div>
              </td>
              <td className="px-4 py-2 border-b">{user.email}</td>
              <td className="px-4 py-2 border-b">
                <RoleBadge role={user.role} />
              </td>
              <td className="px-4 py-2 border-b">
                <RoleSelector role={user.role} onChange={(role) => onRoleChange(user._id, role)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Mobile View */}
    <div className="sm:hidden">
      {users.map((user) => (
        <div key={user._id} className="bg-white rounded-lg shadow mb-4 p-4">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div className="font-medium">
                {user.firstName} {user.lastName}
              </div>
              <RoleBadge role={user.role} />
            </div>
            <div className="text-sm text-gray-600">{user.email}</div>
            <div className="mt-2">
              <RoleSelector 
                role={user.role} 
                onChange={(role) => onRoleChange(user._id, role)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
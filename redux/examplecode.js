// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { User } from '../../types/user.types';


// //userSlice.ts
// interface UserState {
//   userData: User | null;
//   isLoading: boolean;
//   error: string | null;
// }

// const initialState: UserState = {
//   userData: null,
//   isLoading: false,
//   error: null,
// };

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     setUser: (state, action: PayloadAction<User>) => {
//       state.userData = action.payload;
//     },
//     updateUser: (state, action: PayloadAction<Partial<User>>) => {
//       if (state.userData) {
//         state.userData = { ...state.userData, ...action.payload };
//       }
//     },
//     clearUser: (state) => {
//       state.userData = null;
//     },
//   },
// });

// export const { setUser, updateUser, clearUser } = userSlice.actions;
// export default userSlice.reducer;

// //Store.ts

// import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './slices/userSlice';

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;


// //Hook useForm

// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { User } from '../types/user.types';
// import axiosInstance from '@/app/api/axiosInstance';
// import { setUser, updateUser } from '../store/slices/userSlice';
// import { RootState } from '../store/store';

// export const useUserForm = () => {
//   const dispatch = useDispatch();
//   const userData = useSelector((state: RootState) => state.user.userData);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState<User | null>(userData);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axiosInstance.get("/user/id");
//         dispatch(setUser(response.data));
//         setFormData(response.data);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     if (!userData) {
//       fetchUser();
//     }
//   }, [dispatch, userData]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => prev ? { ...prev, [name]: value } : null);
//   };

//   const handleSave = async () => {
//     try {
//       if (formData) {
//         await axiosInstance.put(`/user`, formData);
//         dispatch(updateUser(formData));
//         setIsEditing(false);
//       }
//     } catch (error) {
//       console.error("Error updating user data:", error);
//     }
//   };

//   return {
//     formData,
//     isEditing,
//     handleChange,
//     handleSave,
//     setIsEditing
//   };
// };


// //provider.tsx

// import { Provider } from 'react-redux';
// import { store } from '../store/store';

// export function Providers({ children }: { children: React.ReactNode }) {
//   return <Provider store={store}>{children}</Provider>;
// }


// //layout.tsx

// import { Providers } from './providers';

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body>
//         <Providers>{children}</Providers>
//       </body>
//     </html>
//   );
// }


// //example

// import { useSelector } from 'react-redux';
// import { RootState } from '../store/store';

// const ExampleComponent = () => {
//   const userData = useSelector((state: RootState) => state.user.userData);
  
//   return <div>Welcome {userData?.firstName}!</div>;
// };

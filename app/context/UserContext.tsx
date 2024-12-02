
// context/UserContext.tsx
"use client";
import React, { createContext, useContext, ReactNode } from 'react';

interface UserData {
  id: number;
  firstName: string;
  lastName: string;
}

interface UserContextType {
  userData: UserData | null;
  }

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ userData, children }: { userData: UserData, children: ReactNode }) => {
  return (
    <UserContext.Provider value={{ userData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserData must be used within a UserProvider');
  }
  return context;
};

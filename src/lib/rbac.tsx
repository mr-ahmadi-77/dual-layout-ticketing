import { createContext, useContext, useState, type ReactNode } from "react";

export type Role = "buyer" | "organizer" | "admin" | "guest";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

type RbacContextValue = {
  user: SessionUser | null;
  role: Role;
  isAuthenticated: boolean;
  signIn: (role: Exclude<Role, "guest">, email?: string) => void;
  signOut: () => void;
  hasRole: (roles: Role[]) => boolean;
};

const RbacContext = createContext<RbacContextValue | null>(null);

// NOTE: This is a client-side stub for the design phase only. Real auth
// will attach role claims from the JWT/OAuth2 token per the PRD.
export function RbacProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);

  const signIn: RbacContextValue["signIn"] = (role, email = `${role}@stagepass.dev`) => {
    setUser({
      id: `demo-${role}`,
      name: role.charAt(0).toUpperCase() + role.slice(1),
      email,
      role,
    });
  };

  const signOut = () => setUser(null);
  const role: Role = user?.role ?? "guest";
  const hasRole = (roles: Role[]) => roles.includes(role);

  return (
    <RbacContext.Provider
      value={{ user, role, isAuthenticated: !!user, signIn, signOut, hasRole }}
    >
      {children}
    </RbacContext.Provider>
  );
}

export function useRbac() {
  const ctx = useContext(RbacContext);
  if (!ctx) throw new Error("useRbac must be used inside RbacProvider");
  return ctx;
}
// AUTH CONTEXT (Codelab 4 Modul 4): pusat status login untuk seluruh aplikasi.
// Layar mana pun cukup memanggil: const { user, role, nama, signOut } = useAuth();
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { Role } from "../constants/types";

// Bentuk data yang dibagikan context ke semua layar
interface AuthContextType {
  user: User | null; // user Supabase (null jika belum login)
  session: Session | null; // sesi berisi token JWT
  isLoading: boolean; // true selama sesi tersimpan sedang dibaca
  role: Role | null; // dari user_metadata.role (dipilih saat register)
  nama: string; // dari user_metadata.nama, fallback bagian depan email
  signOut: () => Promise<void>;
}

// createContext: membuat "wadah" global. undefined = belum dibungkus AuthProvider
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // 1. REHIDRASI: saat aplikasi dibuka, baca sesi tersimpan (dari SecureStore)
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // 2. REAL-TIME: dengarkan event auth (SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED, USER_UPDATED).
    // Setiap event, state diisi ulang sehingga semua layar otomatis ikut berubah.
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Cleanup: berhenti berlangganan saat provider dilepas agar listener tidak menumpuk
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Keluar: membatalkan sesi di cloud dan menghapus token dari perangkat
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  // Data tambahan dari user_metadata (diisi lewat options.data saat signUp)
  const role: Role | null = user?.user_metadata?.role ?? null;
  const emailDepan = user?.email ? user.email.split("@")[0] : "";
  const nama: string = user?.user_metadata?.nama ?? emailDepan;

  return (
    <AuthContext.Provider value={{ user, session, isLoading, role, nama, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// CUSTOM HOOK: cara singkat memakai AuthContext di layar mana pun
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth harus dipakai di dalam AuthProvider!");
  }
  return context;
}

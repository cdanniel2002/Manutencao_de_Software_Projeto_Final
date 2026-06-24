"use client";

import { useEffect } from "react";

// Libs
import { useRouter, usePathname } from "next/navigation";

// Context
import { useAuth } from "@/hooks/context";

// Components
import LoadingView from "@/components/loadingView";

// Rotas que o administrador (is_staff) pode acessar. As demais (dashboard,
// despesas, categorias, suporte) sao redirecionadas para "Solicitações".
const ADMIN_ALLOWED_ROUTES = ["/profile", "/support-requests"];

export default function AuthGuard({ children }) {
  const { user, userData, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isStaff = userData?.is_staff;
  const adminBlocked =
    isStaff &&
    !ADMIN_ALLOWED_ROUTES.some((route) => pathname?.startsWith(route));

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, userData, loading, router]);

  useEffect(() => {
    if (adminBlocked) {
      router.push("/support-requests");
    }
  }, [adminBlocked, router]);

  if (loading || !userData || adminBlocked) {
    return <LoadingView />;
  }

  return <>{children}</>;
}

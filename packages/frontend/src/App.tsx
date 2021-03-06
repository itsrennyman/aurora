import { Center, Spinner } from "@chakra-ui/react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import { AuthProvider, useAuth } from "./lib/context/auth-context";
import { Account } from "./pages/Account";
import { Analytics } from "./pages/Analytics";
import { EditWebsite } from "./pages/EditWebsite";
import { NewWebsite } from "./pages/NewWebsite/NewWebsite";
import { NotFound } from "./pages/NotFound";
import { Setup } from "./pages/Setup";
import { SignIn } from "./pages/SignIn";
import { Websites } from "./pages/Websites/Websites";

interface AuthenticatedRouteProps {
  children: JSX.Element;
}

export function AuthenticatedRoute({ children }: AuthenticatedRouteProps) {
  const location = useLocation();
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Center style={{ height: "100vh" }}>
        <Spinner size="xl" />
      </Center>
    );
  }

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <AuthenticatedRoute>
              <MainLayout />
            </AuthenticatedRoute>
          }
        >
          <Route index element={<Websites />} />
          <Route path="account" element={<Account />} />
          <Route path="websites/new" element={<NewWebsite />} />
          <Route path="websites/:id/edit" element={<EditWebsite />} />
          <Route path="websites/:id/analytics" element={<Analytics />} />
        </Route>

        <Route
          path="websites/:id/s/analytics"
          element={<MainLayout isPublic />}
        >
          <Route index element={<Analytics isPublic />} />
        </Route>

        <Route path="signin" element={<SignIn />} />
        <Route path="setup" element={<Setup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
};

export { App };

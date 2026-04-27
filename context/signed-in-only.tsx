import { LoadingSpinner } from "@/components/loading-spinner/loading-spinner";
import { useUser } from "@/hooks/use-user/use-user";
import { useRouter } from "expo-router";
import { useEffect } from "react";

const SignedInOnly = ({ children }: { children: any }) => {
  const { user, authChecked } = useUser();
  const router = useRouter();

  // If user is authenticated and user is null, redirect to login screen
  useEffect(() => {
    if (authChecked && user === null) {
      router.replace("/(auth)");
    }
  }, [authChecked, user, router]);

  const validSession = !authChecked || !user;

  // Shows loading message till valid user session is found
  if (validSession) {
    return <LoadingSpinner isVisible={validSession} />;
  }

  return children;
};

export default SignedInOnly;

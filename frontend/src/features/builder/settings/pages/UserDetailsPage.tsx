import Breadcrumbs from "@/features/builder/layout/Breadcrumb";
import Heading from "../../components/Heading";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema, profileSchema } from "../../schema/settingsSchema";
import FormSection from "../../components/form/FormSection";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ErrorAlert from "@/components/shared/ErrorAlert";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/authentication/context/AuthContext";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { toast } from "react-hot-toast";
import { queryClient } from "@/lib/reactQuery/QueryProvider";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";

const breadcrumbs = [{ label: "Settings" }, { label: "user details" }];

function UserDetailsPage() {
  document.title = "Portify - " + "User Details";
  const { user, setToken, setUser } = useAuth();
  const navigate = useNavigate();

  const updateProfileMutation = useMutation({
    mutationFn: (data: { name: string }) => api.patch("/users/me", data),
    onSuccess: (res) => {
      toast.success("Your information has been updated successfully.");
      setUser(res.data);
      profileForm.reset({ name: res.data.name });
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong.");
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: (data: { currentPassword: string; newPassword: string }) =>
      api.patch("/users/me/password", data),

    onSuccess: () => {
      toast.success("Password changed, please login again.");
      logout();
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Invalid current password.",
      );
    },
  });
  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      await api.post("/auth/logout");
    },
    onSuccess: () => {
      setToken(null);
      setUser(null);
      queryClient.clear();
      navigate("/login");
    },
  });
  // Form 1: User Info
  const profileForm = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
    },
  });

  const {
    register: registerProfile,
    handleSubmit: submitProfile,
    reset: resetProfile,
    formState: {
      errors: profileErrors,
      isDirty: isProfileDirty,
      isSubmitting: isProfileSubmitting,
    },
  } = profileForm;

  useEffect(() => {
    if (user) {
      resetProfile({
        name: user.name ?? "",
      });
    }
  }, [user, resetProfile]);

  const onProfileSubmit = (data: { name: string }) => {
    updateProfileMutation.mutate(data);
  };

  //Form 2: Change Password

  const passwordForm = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const {
    register: registerPassword,
    handleSubmit: submitPassword,
    formState: {
      errors: passwordErrors,
      isSubmitting: isPasswordSubmitting,
      isDirty: isPasswordDirty,
    },
    reset: resetPassword,
  } = passwordForm;

  const onPasswordSubmit = (data: any) => {
    changePasswordMutation.mutate({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
    resetPassword();
  };

  return (
    <div>
      <Breadcrumbs items={breadcrumbs} />
      <div className="py-16 px-4 md:px-10 max-w-7xl ">
        <Heading title="User details" />
        <FormProvider {...profileForm}>
          <form onSubmit={submitProfile(onProfileSubmit)}>
            <FormSection title="User Info">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">User name</Label>
                  <Input
                    id="name"
                    placeholder="John"
                    {...registerProfile("name")}
                  />
                  {profileErrors.name?.message && (
                    <ErrorAlert error={String(profileErrors.name.message)} />
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input disabled value={user?.email ?? ""} />
                </div>
              </div>

              <div className="flex md:justify-end mt-4">
                <Button
                  type="submit"
                  disabled={!isProfileDirty || isProfileSubmitting}
                >
                  {isProfileSubmitting ? (
                    <div className="flex gap-1.5 items-center">
                      <Spinner className="size-6" />
                      Saving password...
                    </div>
                  ) : (
                    <> Save changes</>
                  )}
                </Button>
              </div>
            </FormSection>
          </form>
        </FormProvider>

        <FormProvider {...passwordForm}>
          <div className="mt-6" />
          <form onSubmit={submitPassword(onPasswordSubmit)}>
            <div className="mt-8" />

            <FormSection
              title="Set new password"
              description="Create a new password to secure your account."
            >
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current password</Label>
                  <Input
                    type="password"
                    {...registerPassword("currentPassword")}
                  />
                  {passwordErrors.currentPassword?.message && (
                    <ErrorAlert
                      error={String(passwordErrors.currentPassword.message)}
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New password</Label>
                  <Input type="password" {...registerPassword("newPassword")} />
                  {passwordErrors.newPassword?.message && (
                    <ErrorAlert
                      error={String(passwordErrors.newPassword.message)}
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm password</Label>
                  <Input
                    type="password"
                    {...registerPassword("confirmPassword")}
                  />
                  {passwordErrors.confirmPassword?.message && (
                    <ErrorAlert
                      error={String(passwordErrors.confirmPassword.message)}
                    />
                  )}
                </div>
              </div>

              <div className="flex md:justify-end mt-4">
                <Button
                  type="submit"
                  disabled={isPasswordSubmitting || !isPasswordDirty}
                >
                  {isPasswordSubmitting ? (
                    <div className="flex gap-1.5 items-center">
                      <Spinner className="size-6" />
                      Updating password...
                    </div>
                  ) : (
                    <>Update password</>
                  )}
                </Button>
              </div>
            </FormSection>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default UserDetailsPage;

import ChangePasswordForm from "@/components/modules/public/ChangePasswordForm";


export default function ChangePasswordPage() {
  return (
    <section className="max-w-md mx-auto mt-16 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Change Password</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 text-center">
        Update your account password for better security.
      </p>
      <ChangePasswordForm />
    </section>
  );
}

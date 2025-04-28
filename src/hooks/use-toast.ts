export const useToast = () => {
  const toast = ({ title, description }: { title: string; description?: string }) => {
    // logic to show a toast
    console.log("Toast:", title, description);
    // (or you can integrate a real toast library like `sonner`, `react-hot-toast`, etc.)
  };

  return { toast };
};
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddDomainSchema, AddDomainType } from "@/schemas/settings.schema"; // TODO: Define this schema
import { UploadClient } from "@uploadcare/upload-client";
import { onIntegrateDomain } from "@/actions/settings";
import { useToast } from "@/hooks/use-toast";

const upload = new UploadClient({
  publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string
});

export const useDomain = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<AddDomainType>({
    resolver: zodResolver(AddDomainSchema), // Validate form with Zod
  });

  const pathname = usePathname();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [isDomain, setIsDomain] = useState<string | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    setIsDomain(pathname?.split("/").pop()?.trim() || undefined);
  }, [pathname]);

  const onAddDomain = handleSubmit(async (values: AddDomainType) => {
    setLoading(true);

    try {
      // TODO: Upload the domain icon image
      let iconUrl: string | undefined = undefined;

      if (values.icon && values.icon.length > 0) {
        const file = values.icon[0]; 
      
        const uploadResponse = await upload.uploadFile(file, { store: "auto" });
        iconUrl = uploadResponse.cdnUrl;
      }
      // TODO: Call the server action to add the domain
      const response = await onIntegrateDomain(values.domain, iconUrl || "");
      
      toast({ title: response.status === 200 ? "Success" : "Error", description: response.message });

      if (response.status === 200) {
        reset(); // Reset form after success
        router.refresh(); // Refresh the UI
      }
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  });

  return { register, onAddDomain, errors, loading, isDomain };
};



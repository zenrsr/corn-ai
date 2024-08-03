import { onCreateNewDomainProduct } from "@/actions/product";
import { useToast } from "@/components/ui/use-toast";
import { AddProductProps, AddProductSchema } from "@/schemas/settings.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { UploadClient } from "@uploadcare/upload-client";

const upload = new UploadClient({
  publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string
});

export const useProducts = (domainId: string) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit
  } = useForm<AddProductProps>({
    resolver: zodResolver(AddProductSchema)
  });

  const onCreateNewProduct = handleSubmit(async (values) => {
    try {
      setLoading(true);
      const uploaded = await upload.uploadFile(values.image[0]);
      const product = await onCreateNewDomainProduct(
        domainId,
        values.name,
        uploaded.uuid,
        values.price
      );
      if (product) {
        reset();
        toast({
          title: "Success",
          description: product.message
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  });

  return { onCreateNewProduct, register, errors, loading };
};

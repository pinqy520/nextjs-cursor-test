"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BasicInfo } from "./BasicInfo";
import { AccessInfo } from "./AccessInfo";
import { LegalInfo } from "./LegalInfo";
import { FormNavigation } from "./FormNavigation";
import type { ProductFormState } from "@/types/product";
import type { Product } from "@/types/product";
import { ProductStatuses, ProductTypes } from "@/types/product";

interface ProductFormProps {
  mode?: "create" | "edit";
  initialData?: Product;
  onSuccess?: () => void;
  loading?: boolean;
}

export function ProductForm({ mode = "create", initialData, onSuccess, loading = false }: ProductFormProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ProductFormState>({
    step: 1,
    data: {
      basic: {
        name: "",
        type: ProductTypes.PHYSICAL,
        description: "",
        tags: [],
        status: ProductStatuses.DRAFT,
      },
      access: {
        productId: "",
        webhookUrl: "",
        callbackKey: "",
      },
      legal: {
        businessLicense: null,
        qualificationCert: null,
        supplementalDocs: [],
      },
    },
  });

  // Initialize form with existing data in edit mode
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        step: 1,
        data: {
          basic: {
            name: initialData.name,
            type: initialData.type,
            description: initialData.description,
            tags: initialData.tags,
            status: initialData.status,
          },
          access: {
            productId: initialData.productId,
            webhookUrl: initialData.webhookUrl,
            callbackKey: initialData.callbackKey,
            apiVersion: initialData.apiVersion || undefined,
          },
          legal: {
            businessLicense: null, // Files need to be re-uploaded
            qualificationCert: null,
            supplementalDocs: [],
          },
        },
      });
    }
  }, [mode, initialData]);

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      
      // Add basic info
      formDataToSend.append('name', formData.data.basic.name);
      formDataToSend.append('type', formData.data.basic.type);
      formDataToSend.append('description', formData.data.basic.description);
      formDataToSend.append('tags', JSON.stringify(formData.data.basic.tags));
      formDataToSend.append('status', formData.data.basic.status);
      if (formData.data.basic.image) {
        formDataToSend.append('image', formData.data.basic.image);
      }
      
      // Add access info
      formDataToSend.append('productId', formData.data.access.productId);
      formDataToSend.append('webhookUrl', formData.data.access.webhookUrl);
      formDataToSend.append('callbackKey', formData.data.access.callbackKey);
      if (formData.data.access.apiVersion) {
        formDataToSend.append('apiVersion', formData.data.access.apiVersion);
      }
      
      // Add legal docs
      if (formData.data.legal.businessLicense) {
        formDataToSend.append('businessLicense', formData.data.legal.businessLicense);
      }
      if (formData.data.legal.qualificationCert) {
        formDataToSend.append('qualificationCert', formData.data.legal.qualificationCert);
      }
      formData.data.legal.supplementalDocs.forEach((doc, index) => {
        formDataToSend.append(`supplementalDocs[${index}]`, doc);
      });
      
      const url = mode === "edit" && initialData 
        ? `/api/products/${initialData.id}`
        : '/api/products';
      
      const response = await fetch(url, {
        method: mode === "edit" ? 'PUT' : 'POST',
        body: formDataToSend,
      });
      
      if (!response.ok) throw new Error(`Failed to ${mode} product`);
      
      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/products');
      }
    } catch (error) {
      console.error(`Error ${mode}ing product:`, error);
      // Handle error (e.g., show error message)
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <FormNavigation 
        currentStep={step} 
        onStepChange={setStep} 
      />
      
      {step === 1 && (
        <BasicInfo 
          data={formData.data.basic}
          onChange={(basic) => setFormData(prev => ({
            ...prev,
            data: { ...prev.data, basic }
          }))}
        />
      )}
      
      {step === 2 && (
        <AccessInfo 
          data={formData.data.access}
          onChange={(access) => setFormData(prev => ({
            ...prev,
            data: { ...prev.data, access }
          }))}
          readOnlyFields={mode === "edit" ? ["productId"] : []}
        />
      )}
      
      {step === 3 && (
        <LegalInfo 
          data={formData.data.legal}
          onChange={(legal) => setFormData(prev => ({
            ...prev,
            data: { ...prev.data, legal }
          }))}
          onSubmit={handleSubmit}
          mode={mode}
        />
      )}
    </div>
  );
} 
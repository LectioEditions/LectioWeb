"use client"; // Ensure this is a client component

import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { CartItem, Items } from '../types';

// Zod schema for validation
const formSchema = z.object({
  Quantite: z
    .number()
    .min(1, { message: 'Quantité doit être supérieure à 0' })
    .max(9999, { message: 'Quantité doit être inférieure à 9999' }),
});

interface QuantityFormProps {
  addToCart: (item: Items, Quantite: number) => Promise<CartItem | undefined>;
  Item: Items;
}

const QuantityForm = ({ Item, addToCart }: QuantityFormProps) => {
  const formMethods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Quantite: 1, // Set a valid default value
    },
  });

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(async (data) => {
       
          const toastId= toast.loading("Adding item to cart...");
        try {
          await addToCart(Item, data.Quantite);
          toast.success("Item is added successfully!");
            
          formMethods.reset();
        } catch (error) {
          toast.error("You have already added this item");
          console.error("Submission error:", error);
        }finally{
            const t = toast.dismiss(toastId);
        }
      })}>
<FormField
  control={formMethods.control}
  name="Quantite"
  render={({ field }) => (
    <FormItem className="flex flex-col gap-2.5">
      <FormLabel className="text-base font-bold text-black-1 dark:text-white-1">Quantité</FormLabel>
      <FormControl>
        <Input
          inputMode="numeric"
          type="number"
          {...field}
          onBlur={(e) => {
            // Ensure the value is treated as a number
            const valueAsNumber = Number(e.target.value);
            if (!isNaN(valueAsNumber)) {
              field.onChange(valueAsNumber);
            }
            // Trigger validation
            formMethods.trigger('Quantite');
          }}
          className="input-class focus-visible:ring-offset-green-1 no-arrows"
          placeholder="1" // Set placeholder to a valid number
        />
      </FormControl>
      <FormMessage className="text-black-1 dark:text-white-1">
        {formMethods.formState.errors.Quantite?.message}
      </FormMessage>
    </FormItem>
  )}
/>

        
        <Button type="submit" className="btn-submit w-full bg-green-1 font-semibold mt-5 text-white-1">
          Ajouter au Panier
        </Button>
      </form>
    </FormProvider>
  );
};

export default QuantityForm;

"use client";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { toast } from 'sonner'; // Import Sonner toast
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { CartItems, Order, OrderProps } from "@/src/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { cn } from "../lib/utils";
import { Label } from "./ui/label";
import { Categories, Communes } from "../constants";
import "@/src/app/globals.css";
import { useRouter } from "next/navigation";
// Updated form schema
const formSchema = z.object({
  adress: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  Commune: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  
  NumTel: z.string().regex(/^0[5-7][0-9]{8}$/, { message: "Invalid phone number format" }),
  
});

export function OrderForm({ insertOrder , CartItems}: {CartItems:CartItems[], insertOrder: (cart: OrderProps) => Promise<string | undefined> }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      adress: "",
      Commune: "",
      NumTel: "0",
    },
  });


  return (
    <section className="mt-10 flex flex-col pb-10">
      <h1 className='text-xl font-bold text-black-1 dark:text-white-1'>Ajouter une Impression</h1>
      <Form {...form}>
        <form
         onSubmit={form.handleSubmit(async (data) => {
          setIsLoading(true);
          const Order: Order = {
            Adress: data.adress,
            Commune: data.Commune,
            NumTel: data.NumTel,
            Prix: 0,
            Traite: false,
          };
          const toastId = toast.loading("Order is being treated, please wait a moment...");
          try {
            const newImpression = await insertOrder({order:Order ,cartItems:CartItems});
            if (!newImpression) throw new Error("Failed to submit impression");
            toast.success("Ordeer submitted successfully!");
            
            form.reset(); // Reset the form
            
          } catch (error) {
            // Error feedback
            toast.error("An error occurred while submitting the Order.");
            console.error("Submission error:", error); // Log the error for debugging
          } finally {
            // Reset loading state
            toast.dismiss(toastId);
            setIsLoading(false);
            router.push("/")

          }
          
        })}
          className="space-y-8 mt-12 flex flex-col w-full"
        >
            <div className="flex flex-col gap-2.5">
              <Label className="text-16 font-bold text-black-1 dark:text-white-1">
                Commune
              </Label>

              <Select onValueChange={(value) => {form.setValue("Commune", value);
                form.trigger("Commune")}}>
                <SelectTrigger className={cn('text-16 w-full border-none bg-white-6  dark:bg-black-6 text-gray-1 focus-visible:ring-offset-green-1')}>
                  <SelectValue placeholder="Selectionner votre Commune" className="placeholder:text-gray-1 " />
                </SelectTrigger>
                <SelectContent className="text-16 border-none bg-white-6  dark:bg-black-6 font-bold text-black-1 dark:text-white-1 focus:ring-green-1">
                  {Communes.map((category) => (
                    <SelectItem key={category} value={category} className="capitalize focus:bg-green-1">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
            <FormField
              control={form.control}
              name="adress"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-base font-bold text-black-1 dark:text-white-1">Adress</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onBlur={() => form.trigger("adress")} // Validate on blur
                      className="input-class focus-visible:ring-offset-green-1"
                      placeholder="Rue xxxxxxxx"
                    />
                  </FormControl>
                  <FormMessage className="text-black-1 dark:text-white-1" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="NumTel"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-base font-bold text-black-1 dark:text-white-1">Télephone</FormLabel>
                  <FormControl>
                  <Input
                    {...field}
                     type="tel" // Allows phone numbers
                     onBlur={(e) => {   ; // or parseInt(field.value) for whole numbers
                      form.trigger("NumTel");}} // Validate on blur
                     className="input-class focus-visible:ring-offset-green-1"
                     pattern="0[5-7][0-9]{8}" // Pattern to match a valid phone number format
                    placeholder="05000000"
                    />

                  </FormControl>
                  <FormMessage className="text-black-1 dark:text-white-1" />
                </FormItem>
              )}
            />
            
          </div>

          <div className="flex flex-col">
          
            <div className="">
              <Button
                type="submit"
                className="text-base w-full bg-green-1 py-4 font-extrabold text-white-1 transition-all duration-500 "
              >
                {isLoading ? (
                  <>
                    <Loader size={20} className="animate-spin ml-2" /> Submitting
                  </>
                ) : (
                  "Submit Impression"
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
}

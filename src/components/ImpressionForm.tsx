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
import { Cours, Impression } from "@/src/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { cn } from "../lib/utils";
import { Label } from "./ui/label";
import { Categories } from "../constants";
import "@/src/app/globals.css";
import { insertImpression } from "../server/db";
// Updated form schema
const formSchema = z.object({
  adress: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  Commune: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  Quantite: z.number(),
  NumTel: z.number(),
});

export function ImpressionForm({ insertCours , Cours}: {Cours:Cours, insertCours: (Cours: Cours) => Promise<Cours | undefined> }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [Commune, setCommune] = useState<string>("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      adress: "",
      Commune: "",
      Quantite: 0,
      NumTel: 0,
    },
  });


  return (
    <section className="mt-10 flex flex-col pb-10">
      <h1 className='text-xl font-bold text-white-1'>Ajouter une Impression</h1>
      <Form {...form}>
        <form
         onSubmit={form.handleSubmit(async (data) => {
          setIsLoading(true);
          const impression: Impression = {
            Adress: data.adress,
            Commune: data.Commune,
            PdfUrl: Cours.PdfUrl,
            imageURL: Cours.imageURL,
            Quantite: data.Quantite,
            NumTel: data.NumTel,

          };
          try {
             console.log(form.getValues());
            
            toast.success("impression submitted successfully!");
            
            form.reset(); // Reset the form
 
          } catch (error) {
            // Error feedback
            toast.error("An error occurred while submitting the Cours.");
            console.error("Submission error:", error); // Log the error for debugging
          } finally {
            // Reset loading state
            setIsLoading(false);

          }
          
        })}
          className="space-y-8 mt-12 flex flex-col w-full"
        >
            <div className="flex flex-col gap-2.5">
              <Label className="text-16 font-bold text-white-1">
                Selectionner votre Commune
              </Label>

              <Select onValueChange={(value) => setCommune(value)}>
                <SelectTrigger className={cn('text-16 w-full border-none bg-black-1 text-gray-1 focus-visible:ring-offset-orange-1')}>
                  <SelectValue placeholder="Dar El Beida" className="placeholder:text-gray-1 " />
                </SelectTrigger>
                <SelectContent className="text-16 border-none bg-black-1 font-bold text-white-1 focus:ring-orange-1">
                  {Categories.map((category) => (
                    <SelectItem key={category} value={category} className="capitalize focus:bg-orange-1">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
            <FormField
              control={form.control}
              name="Commune"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-base font-bold text-white-1">Adress</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onBlur={() => form.trigger("Commune")} // Validate on blur
                      className="input-class focus-visible:ring-offset-orange-1"
                      placeholder="Rue xxxxxxxx"
                    />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Quantite"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-base font-bold text-white-1">Quantité</FormLabel>
                  <FormControl>
                  <Input
                     inputMode="numeric"
                     type="number"
                     {...field}
                      onBlur={() => form.trigger("Quantite")} // Validate on blur
                     className="input-class focus-visible:ring-offset-orange-1 no-arrows" // Add a custom class to hide arrows
                     placeholder="1234"
                     pattern="[0-9]*"
                    />


                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="NumTel"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-base font-bold text-white-1">Télephone</FormLabel>
                  <FormControl>
                  <Input
                    {...field}
                     type="number" // Allows phone numbers
                     onBlur={() => form.trigger("NumTel")} // Validate on blur
                     className="input-class focus-visible:ring-offset-orange-1"
                     pattern="0[5-7][0-9]{8}" // Pattern to match a valid phone number format
                    placeholder="05000000"
                    />

                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
            
          </div>

          <div className="flex flex-col">
          
            <div className="">
              <Button
                type="submit"
                className="text-base w-full bg-orange-1 py-4 font-extrabold text-white-1 transition-all duration-500 hover:bg-black-1"
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

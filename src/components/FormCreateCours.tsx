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
import { Textarea } from "@/src/components/ui/textarea";
import { Input } from "@/src/components/ui/input";
import MyDropzone from "./DropZone";
import { Item } from "@/src/types";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Categories, NivUniv, Types, Unites } from "../constants";
import { cn } from "../lib/utils";
import { useRouter } from "next/navigation";
// Updated form schema
const formSchema = z.object({
  Title: z.string().min(1, 'Title is required'),
  Description: z.string().min(1, 'Description is required'),
  Departement: z.string().min(1, 'Département is required'),
  Unite: z.string(),
  CoursURL: z.string(),
  imageURL: z.string(),
  Annee: z.string().min(1, 'Year is required'),
  NivUniv: z.string().min(1, 'Niveau Universitaire is required'),
  Module: z.string().min(1, 'Module is required'),
  Type: z.string().min(1, 'Type is required'),
  Prix: z.number(), // Adjust regex for the format you expect
});

export function FormCreateCours({ insertItem }: { insertItem: (Item: Item) => Promise<Item | undefined> }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [Type, setType] = useState<string>("");
  const [imageURL, setImageURL] = useState<string>("");
  const [Dep, setDep] = useState<string>("");
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Title: "",
      Description: "",
      Departement: "",
      Unite:"",
      CoursURL: "",
      imageURL: "",
      Annee: "",
      Module: "",
      NivUniv:"",
      Type: "",
      Prix: 0,
    },
  });

  // Update form values when CoursURL or imageURL changes
  useEffect(() => {
    form.setValue("imageURL", imageURL);
  }, [ imageURL, form]);

  return (
    <section className="mt-10 flex flex-col">
      <h1 className='text-xl font-bold text-black-1 dark:text-white-1'>Create Cours</h1>
      <Form {...form}>
        <form
         onSubmit={form.handleSubmit(async (data) => {
          setIsLoading(true);
          toast.success("Item is beeing submitted wait a moment");
          const item: Item = {
            Titre: data.Title,
            Module: data.Module,
            Annee: data.Annee,
            NivUniv:data.NivUniv,
            Departement: data.Departement,
            description: data.Description,
            Unite: data.Unite,
            Type: data.Type,
            PdfUrl: data.CoursURL,
            imageURL: data.imageURL === "" ? "https://utfs.io/f/UbLnnOeeK6tTefMZw0I5HyLIpj0E9Rl6SDaWfcQvVsdiGMoC" : data.imageURL,
            Prix: data.Prix,
            Achat: 0,
            etat: "Disponible",

          };
          const toastId = toast.loading("Entrain d'ajouter l'Item...");
          try {
            const newCours = await insertItem(item);
            if (!newCours) throw new Error("No Cours returned");
            
            // Success feedback
            toast.success("Item submitted successfully!");
            form.reset(); // Reset the form

          } catch (error) {
            // Error feedback
            toast.error("An error occurred while submitting the Cours.");
            console.error("Submission error:", error); // Log the error for debugging
          } finally {
            // Reset loading state
            toast.dismiss(toastId); // Dismiss the loading toast
            setIsLoading(false);
            router.push("/");

          }
          
        })}
          className="space-y-8 mt-12 flex flex-col w-full"
        >
          <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
            <FormField
              control={form.control}
              name="Title"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-base font-bold text-black-1 dark:text-white-1">Title </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onBlur={() => form.trigger("Title")} // Validate on blur
                      className="input-class focus-visible:ring-offset-green-1"
                      placeholder="Enter Cours title"
                    />
                  </FormControl>
                  <FormMessage className="text-black-1 dark:text-white-1" />
                </FormItem>
              )}
            />
              <FormField
              control={form.control}
              name="Module"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-base font-bold text-black-1 dark:text-white-1">Module </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onBlur={() => form.trigger("Module")} // Validate on blur
                      className="input-class focus-visible:ring-offset-green-1"
                      placeholder="Enter Module"
                    />
                  </FormControl>
                  <FormMessage className="text-black-1 dark:text-white-1" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Annee"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-base font-bold text-black-1 dark:text-white-1">Année </FormLabel>
                  <FormControl>
                  <Input
                     inputMode="numeric"
                     type="number"
                     {...field}
                      onBlur={(e) => {    
                        form.trigger("Annee");}} // Validate on blur
                     className="input-class focus-visible:ring-offset-green-1 no-arrows" // Add a custom class to hide arrows
                     placeholder="1234"
                     pattern="[0-9]*"
                    />
                  </FormControl>
                  <FormMessage className="text-black-1 dark:text-white-1" />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2.5">
              <Label className="text-16 font-bold text-black-1 dark:text-white-1">
                Département
              </Label>

              <Select onValueChange={(value) => {form.setValue("Departement",value);setDep(value)}}>
                <SelectTrigger className={cn('text-16 w-full border-none bg-white-6  dark:bg-black-6 text-gray-1 focus-visible:ring-offset-green-1')}>
                  <SelectValue placeholder="Select Cours category" className="placeholder:text-gray-1 " />
                </SelectTrigger>
                <SelectContent className="text-16 border-none bg-white-6  dark:bg-black-6 font-bold text-black-1 dark:text-white-1 focus:ring-green-1">
                  {Categories.map((category) => (
                    <SelectItem key={category} value={category} className="capitalize focus:bg-green-1">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {Dep==="Medecine" && <div className="flex flex-col gap-2.5">
              <Label className="text-16 font-bold text-black-1 dark:text-white-1">
                Unité
              </Label>

              <Select onValueChange={(value) => form.setValue("Unite",value)}>
                <SelectTrigger className={cn('text-16 w-full border-none bg-white-6  dark:bg-black-6 text-gray-1 focus-visible:ring-offset-green-1')}>
                  <SelectValue placeholder="Select Cours category" className="placeholder:text-gray-1 " />
                </SelectTrigger>
                <SelectContent className="text-16 border-none bg-white-6  dark:bg-black-6 font-bold text-black-1 dark:text-white-1 focus:ring-green-1">
                  {Unites.map((category) => (
                    <SelectItem key={category} value={category} className="capitalize focus:bg-green-1">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>}
            <div className="flex flex-col gap-2.5">
              <Label className="text-16 font-bold text-black-1 dark:text-white-1">
                Niveau Universitaire
              </Label>

              <Select onValueChange={(value) => {form.setValue("NivUniv",value);setType(value) }}>
                <SelectTrigger className={cn('text-16 w-full border-none bg-white-6  dark:bg-black-6 text-gray-1 focus-visible:ring-offset-green-1')}>
                  <SelectValue placeholder="Select Cours category" className="placeholder:text-gray-1 " />
                </SelectTrigger>
                <SelectContent className="text-16 border-none bg-white-6  dark:bg-black-6 font-bold text-black-1 dark:text-white-1 focus:ring-green-1">
                  {NivUniv.map((Type) => (
                    <SelectItem key={Type} value={Type} className="capitalize focus:bg-green-1">
                      {Type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

            </div>
            <FormField
              control={form.control}
              name="Description"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-base font-bold text-black-1 dark:text-white-1">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      onBlur={() => form.trigger("Description")} // Validate on blur
                      className="input-class focus-visible:ring-offset-green-1"
                      placeholder="Enter Cours description"
                    />
                  </FormControl>
                  <FormMessage className="text-black-1 dark:text-white-1" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-2.5">
              <Label className="text-16 font-bold text-black-1 dark:text-white-1">
                Type
              </Label>

              <Select onValueChange={(value) => {form.setValue("Type",value);setType(value) }}>
                <SelectTrigger className={cn('text-16 w-full border-none bg-white-6  dark:bg-black-6 text-gray-1 focus-visible:ring-offset-green-1')}>
                  <SelectValue placeholder="Select Cours category" className="placeholder:text-gray-1 " />
                </SelectTrigger>
                <SelectContent className="text-16 border-none bg-white-6  dark:bg-black-6 font-bold text-black-1 dark:text-white-1 focus:ring-green-1">
                  {Types.map((Type) => (
                    <SelectItem key={Type} value={Type} className="capitalize focus:bg-green-1">
                      {Type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

            </div>
            <FormField
              control={form.control}
              name="Prix"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-base font-bold text-black-1 dark:text-white-1">Prix</FormLabel>
                  <FormControl>
                  <Input
                     inputMode="numeric"
                     type="number"
                     {...field}
                     onBlur={(e) => { 
                      const price = parseFloat(e.target.value); 
                      if (!isNaN(price)) {
                        form.setValue("Prix", price); 
                      }
                      form.trigger("Prix"); 
                    }}
                    
                     className="input-class focus-visible:ring-offset-green-1 no-arrows" // Add a custom class to hide arrows
                     placeholder="1234"
                     pattern="[0-9]*"
                    />


                  </FormControl>
                  <FormMessage className="text-black-1 dark:text-white-1" />
                </FormItem>
              )}
            />
            {Type ==="Cours" && <FormField
              control={form.control}
              name="CoursURL"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-base font-bold text-black-1 dark:text-white-1">URL du Cours </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onBlur={() => form.trigger("CoursURL")} // Validate on blur
                      className="input-class focus-visible:ring-offset-green-1"
                      placeholder="Enter Cours URL"
                    />
                  </FormControl>
                  <FormMessage className="text-black-1 dark:text-white-1" />
                </FormItem>
              )}
            />}
           {Type === "Livre" && <div>
           <MyDropzone 
              setImageURL={setImageURL} 
              
            />
            </div>}
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
                  "Submit & Publish Cours"
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
}

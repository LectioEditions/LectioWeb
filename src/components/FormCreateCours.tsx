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
import { Cours } from "@/src/types";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Categories } from "../constants";
import { cn } from "../lib/utils";
import { QueryResult } from "@vercel/postgres";

// Updated form schema
const formSchema = z.object({
  CoursTitle: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  Description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  CoursURL: z.string().url("Invalid Cours URL").nonempty("Cours URL is required"),
  imageURL: z.string().url("Invalid image URL").nonempty("Image URL is required"),
});

export function FormCreateCours({ insertCours }: { insertCours: (Cours: Cours) => Promise<Cours | undefined> }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [CoursURL, setCoursURL] = useState<string>("");
  const [imageURL, setImageURL] = useState<string>("");
  const [reset,setReset] = useState<boolean>(false);
  const [coursType, setCoursType] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      CoursTitle: "",
      Description: "",
      CoursURL: "",
      imageURL: "",
    },
  });

  // Update form values when CoursURL or imageURL changes
  useEffect(() => {
    form.setValue("CoursURL", CoursURL);
    form.setValue("imageURL", imageURL);
  }, [CoursURL, imageURL, form]);

  return (
    <section className="mt-10 flex flex-col">
      <h1 className='text-xl font-bold text-white-1'>Create Cours</h1>
      <Form {...form}>
        <form
         onSubmit={form.handleSubmit(async (data) => {
          setIsLoading(true);
          const Cours: Cours = {
            Titre: data.CoursTitle,
            description: data.Description,
            PdfUrl: data.CoursURL,
            imageURL: data.imageURL,

          };
          try {
            const newCours = await insertCours(Cours);
            console.log(newCours);
            if (!newCours) throw new Error("No Cours returned");
            
            // Success feedback
            toast.success("Cours submitted successfully!");
            
            form.reset(); // Reset the form
          } catch (error) {
            // Error feedback
            toast.error("An error occurred while submitting the Cours.");
            console.error("Submission error:", error); // Log the error for debugging
          } finally {
            // Reset loading state
            setIsLoading(false);
            setReset(false); // Reset the dropzone

          }
          
        })}
          className="space-y-8 mt-12 flex flex-col w-full"
        >
          <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
            <FormField
              control={form.control}
              name="CoursTitle"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-base font-bold text-white-1">Title </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onBlur={() => form.trigger("CoursTitle")} // Validate on blur
                      className="input-class focus-visible:ring-offset-orange-1"
                      placeholder="Enter Cours title"
                    />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2.5">
              <Label className="text-16 font-bold text-white-1">
                Category
              </Label>

              <Select onValueChange={(value) => setCoursType(value)}>
                <SelectTrigger className={cn('text-16 w-full border-none bg-black-1 text-gray-1 focus-visible:ring-offset-orange-1')}>
                  <SelectValue placeholder="Select Cours category" className="placeholder:text-gray-1 " />
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
            <FormField
              control={form.control}
              name="Description"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-base font-bold text-white-1">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      onBlur={() => form.trigger("Description")} // Validate on blur
                      className="input-class focus-visible:ring-offset-orange-1"
                      placeholder="Enter Cours description"
                    />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col">
          {!reset && <MyDropzone 
              setCoursURL={setCoursURL} 
              setImageURL={setImageURL} 
            />}
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

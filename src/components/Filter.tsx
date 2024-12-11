import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Categories, Modules, NivUniv_Med, Unites } from '../constants';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { z } from 'zod';

const filterSchema = z.object({
  NivUniv_Med: z.string().refine((value) => NivUniv_Med.includes(value), {
    message: 'Please select a valid university level',
  }),
  Module: z.string().optional(),
  Unite: z.string().optional(),
});

const Filter = ({
  setModule,
  setNivUniv_Med,
  setunite,
  onFilter,
  Dep,
}: {
  setModule: React.Dispatch<React.SetStateAction<string | undefined>>;
  setNivUniv_Med: React.Dispatch<React.SetStateAction<string | undefined>>;
  setunite: React.Dispatch<React.SetStateAction<string | undefined>>;
  onFilter: () => void;
  Dep: string;
}) => {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(filterSchema),
  });

  const [niv, setNiv] = useState<string | undefined>(undefined);
  const [modules, setModules] = useState(
    Modules.filter((mod) => mod.departement === Dep && (!niv || mod.annee === niv))
  );

  const handleFormSubmit = (data: any) => {
    setModule(data.Module);
    setNivUniv_Med(data.NivUniv_Med);
    setunite(data.Unite);
    onFilter(); // Call the onFilter function to trigger filtering
  };

  useEffect(() => {
    setModules(Modules.filter((mod) => mod.departement === Dep && (!niv || mod.annee === niv)));
  }, [niv, Dep]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full h-fit Cours_grid">
      {/* Niveau Universitaire Field */}
      <div className="flex justify-between items-center gap-2.5 min-w-[200px]">
        <Label className="text-16 font-bold whitespace-nowrap text-black-1 dark:text-white-1">
          Niveau
        </Label>

        <Select
          onValueChange={(value) => {
            setValue('NivUniv_Med', value);
            setNiv(value);
          }}
        >
          <SelectTrigger
            className={cn(
              'text-16 w-full border-none max-w-[300px] bg-white-6 dark:bg-black-6 text-gray-1 focus-visible:ring-offset-green-1'
            )}
          >
            <SelectValue placeholder="Select university level" className="placeholder:text-gray-1" />
          </SelectTrigger>
          <SelectContent className="text-16 border-none bg-white-6 dark:bg-black-6 font-bold text-black-1 dark:text-white-1 focus:ring-green-1">
            {NivUniv_Med.map((Niv) => (
              <SelectItem key={Niv} value={Niv} className="capitalize focus:bg-green-1">
                {Niv}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {Dep === 'Medecine' && (
        <div className="flex justify-between items-center gap-2.5 min-w-[200px]">
          <Label className="text-16 font-bold text-black-1 dark:text-white-1">Unité</Label>

          <Select onValueChange={(value) => setValue('Unite', value)}>
            <SelectTrigger
              className={cn(
                'text-16 w-full border-none max-w-[300px] bg-white-6 dark:bg-black-6 text-gray-1 focus-visible:ring-offset-green-1'
              )}
            >
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
        </div>
      )}

      {/* Module Field */}
      <div className="flex justify-between items-center gap-2.5 min-w-[200px]">
        <Label className="text-16 font-bold text-black-1 dark:text-white-1">Module</Label>

        <Select onValueChange={(value) => setValue('Module', value)}>
          <SelectTrigger
            className={cn(
              'text-16 w-full border-none max-w-[300px] bg-white-6 dark:bg-black-6 text-gray-1 focus-visible:ring-offset-green-1'
            )}
          >
            <SelectValue placeholder="Select a module" className="placeholder:text-gray-1" />
          </SelectTrigger>
          <SelectContent className="text-16 border-none bg-white-6 dark:bg-black-6 font-bold text-black-1 dark:text-white-1 focus:ring-green-1">
            {modules.map((Module) => (
              <SelectItem key={Module.module} value={Module.module} className="capitalize focus:bg-green-1">
                {Module.module}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Filter Button */}
      <Button type="submit" className="text-16 font-bold text-white-1 bg-green-1 dark:bg-green-1">
        Filtrer
      </Button>
    </form>
  );
};

export default Filter;

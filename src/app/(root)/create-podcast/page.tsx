
import {FormCreateCours} from "@/src/components/FormCreateCours"
import { insertcours } from "@/src/server/db";
import { Cours, Courss } from "@/src/types";
import { QueryResult } from "@vercel/postgres";
export default async function Home () {
  
  async function handleCours(Cours:Cours) :Promise<Cours | undefined>{ 
    "use server";
    return await insertcours(Cours);
  }
  return (
  <div>
    <FormCreateCours insertCours={handleCours}
    />
    </div>);
}




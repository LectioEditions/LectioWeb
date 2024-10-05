
import {FormCreateCours} from "@/src/components/FormCreateCours"
import { insertItem, isAgent } from "@/src/server/db";
import { Item, Items } from "@/src/types";
export default async function Home () {
  
  async function handleCours(Item:Item) :Promise<Item | undefined>{ 
    "use server";
    return await insertItem(Item);
  }
  const Agent= await isAgent();
  if(!Agent) return;
  return (
  <div>
    <FormCreateCours insertItem={handleCours}
    />
    </div>);
}




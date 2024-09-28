
import {FormCreateCours} from "@/src/components/FormCreateCours"
import { insertItem } from "@/src/server/db";
import { Item, Items } from "@/src/types";
export default async function Home () {
  
  async function handleCours(Item:Item) :Promise<Item | undefined>{ 
    "use server";
    return await insertItem(Item);
  }
  return (
  <div>
    <FormCreateCours insertItem={handleCours}
    />
    </div>);
}




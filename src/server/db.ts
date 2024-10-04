"use strict";
import './envConfig';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql , desc ,like, isNull, or, and, ne} from 'drizzle-orm'
import * as schema from './schema';
import { eq } from "drizzle-orm";
import { sql as pg, QueryResult } from '@vercel/postgres';
import { Item, Items, Upload ,CartItem,CartItems, Order, OrderProps, Orders } from '@/src/types';
import { User as NewUser } from '@/src/types';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { use } from 'react';
export const db =  drizzle(pg, { schema });
 

export async function getUsers() {
  return await db.query.Users.findMany();
};

export async function getUserById (id?: number)  {
  if(!id) throw new Error('id is required');
  return await db.query.Users.findFirst(
    {where:(model,{eq})=>eq(model.id,id),}
   );}
export async function getUserByClerkId  (clerkId: string  | null | undefined)  {
  if(!clerkId) throw new Error('clerkId is required');
  return await db.query.Users.findFirst(
    {where:(model,{eq})=>eq(model.clerkId,clerkId),}
   );}

export async function insertUser  (user?: NewUser)  {
  if(!user) throw new Error('user is required');
  return await db.insert(schema.Users).values(user);
}
export async function UpdateUser  ( user?: NewUser)  {
  if(!user) throw new Error('user is required');
  return await db.update(schema.Users).set(user).where(eq(schema.Users.clerkId, user.clerkId));
}

export async function deleteUser (clerkId?: string)  {
  if(!clerkId) throw new Error('clerkId is required');
  return await db.delete(schema.Users).where(eq(schema.Users.clerkId, clerkId));
}




export async function getTopUserByItemCount() {
  return await db.select().from(schema.Users).orderBy(desc(schema.Users.ItemCount)).limit(6).execute();
}




  export async function getItemById (id: number | null | undefined)  {
    if(!id) throw new Error('id is required');
    return await db.query.Item.findFirst(
      {where:(model,{eq})=>eq(model.id,id),}
     );
  }

  export async function getItemByURL  (url: string ) {
    if(!url) throw new Error("no url");
    return await db.query.Item.findFirst({where:(eq(schema.Item.PdfUrl,url))})
    }

export async function getItemes() {
  return await db.query.Item.findMany();
}

export async function getItemBySearch(search?: string) {
  if (search === '') return;
  if (!search) throw new Error('search is required');

  const [ByTitle, ByModule, ByDescription, ByAnnee] = await Promise.all([
    db.select().from(schema.Item).where(like(schema.Item.Titre, `%${search}%`)).execute(),
    db.select().from(schema.Item).where(like(schema.Item.Module, `%${search}%`)).execute(),
    db.select().from(schema.Item).where(like(schema.Item.description, `%${search}%`)).execute(),
    db.select().from(schema.Item).where(like(schema.Item.Annee, `%${search}%`)).execute()
  ]);

  // Use a Set to track unique items by ID to avoid duplicates
  const seenIds = new Set<number>();
  const orderedResults = [
    ...ByTitle.filter(item => {
      if (!seenIds.has(item.id)) {
        seenIds.add(item.id);
        return true;
      }
      return false;
    }),
    ...ByModule.filter(item => {
      if (!seenIds.has(item.id)) {
        seenIds.add(item.id);
        return true;
      }
      return false;
    }),
    ...ByDescription.filter(item => {
      if (!seenIds.has(item.id)) {
        seenIds.add(item.id);
        return true;
      }
      return false;
    }),
    ...ByAnnee.filter(item => {
      if (!seenIds.has(item.id)) {
        seenIds.add(item.id);
        return true;
      }
      return false;
    })
  ];

  return orderedResults;
}

export async function insertItem  (Item: Item): Promise<Item|undefined> {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");
  const agent = await clerkClient.users.getUser(user.userId);
  if (!agent) throw new Error("Unauthorized");
  if(!agent.publicMetadata.agent) throw new Error("Unauthorized");
  if(!Item) throw new Error('Item is required');
  Item.userId = user.userId;
  const newuser= await getUserByClerkId(user.userId);
  if(!newuser) throw new Error('user not found');
  
  
  const newItem = await db.insert(schema.Item).values(Item);
  if(!newItem) return ;
  newuser.ItemCount = newuser.ItemCount + 1;
  await UpdateUser(newuser);

  return Item;
 }

export async function UpdateItem (Item:Items){
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");
  return await db.update(schema.Item).set(Item).where(eq(schema.Item.PdfUrl, Item.PdfUrl));
}
 
export async function getItemByUserId (userId: string | null)  {
  if(!userId) throw new Error('author is required');
  return  await db.select().from(schema.Item).where(eq(schema.Item.userId, userId)).execute();
}
export async function getItemByTitle (title?: string)  {
  if(!title) throw new Error('title is required');
  return  await db.select().from(schema.Item).where(eq(schema.Item.PdfUrl, title)).execute();
}
export async function getItemByDescription (description?: string)  {
  if(!description) throw new Error('description is required');
  return  await db.select().from(schema.Item).where(eq(schema.Item.description, description)).execute();
}


export async function getItemMaxViews() {
  return  await db.select().from(schema.Item).orderBy(desc(schema.Item.Achat)).limit(1).execute();
}

export async function deleteItem (id?: number)  {
const user = auth();
if (!user.userId) throw new Error("Unauthorized");
const agent = await clerkClient.users.getUser(user.userId);
if (!agent) throw new Error("Unauthorized");
if(!agent.publicMetadata.agent) throw new Error("Unauthorized");
  if(!id) throw new Error('id is required');

  return await db.delete(schema.Item).where(eq(schema.Item.id, id));
}





export async function insertCartItem(CartItem: CartItem): Promise<CartItem | undefined> {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");
  if (!CartItem) throw new Error('Item is required');
  
  CartItem.userId = user.userId;
  const userRecord = await getCartItemsByUserId(user.userId);
  console.log(userRecord);
  // Check if the new item already exists in the user's cart
  const itemExists = userRecord.some(cartItem => cartItem.idItem === CartItem.idItem);
  
  if (itemExists) {
    throw new Error('This item is already in your cart');
  }
  
  // Execute independent async calls concurrently
  const [newUser, newCartItem, newItem] = await Promise.all([
    getUserByClerkId(user.userId),
    db.insert(schema.CartItem).values(CartItem),
    getItemById(CartItem.idItem)
  ]);

  if (!newCartItem) return;
  if (!newUser || !newItem) throw new Error('User or Item not found');

  // Update user and Item counts
  newUser.Achat += 1;
  newItem.Achat += 1;

  // Execute update operations concurrently
  await Promise.all([
    UpdateUser(newUser),
    UpdateItem(newItem)
  ]);

  return CartItem;
}

export async function getCartItemById(cartItemId: number | null | undefined): Promise<CartItem | undefined> {
  if (!cartItemId) throw new Error('CartItem ID is required');
  return await db.query.CartItem.findFirst({ where: (model, { eq }) => eq(model.id, cartItemId) });
}

export async function deleteCartItem(cartItemId: number | null | undefined , itemId : number | undefined): Promise<CartItem> {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");
  if (!cartItemId) throw new Error('CartItem ID is required');
  if (!itemId) throw new Error('Item ID is required');
  // Fetch the CartItem, associated User, and Item concurrently
  const [cartItem, userRecord, item] = await Promise.all([
    getCartItemById(cartItemId),
    getUserByClerkId(user.userId),
    db.query.Item.findFirst({ where: (model, { eq }) => eq(model.id, itemId) })
  ]);
  console.log("cart item",cartItem);
  console.log(item);
  if (!cartItem) throw new Error('CartItem not found');
  if (!userRecord || !item) throw new Error('User or Item not found');

  // Execute the deletion of the CartItem
  const deleteCartItemResult = await db.delete(schema.CartItem).where(eq(schema.CartItem.id, cartItemId)).execute();
  if (!deleteCartItemResult) throw new Error('Error deleting CartItem');

  // Update the User's and Item's Achat counts after deletion
  userRecord.Achat -= 1;
  item.Achat -= 1;
   console.log( "deleted")
  // Execute the update operations concurrently
  await Promise.all([
    UpdateUser(userRecord),
    UpdateItem(item)
  ]);

  return cartItem; 
}

export async function getCartItems() {
  return await db.query.CartItem.findMany();
}
export async function getCartItemsByUserId(userId: string) {
  const cartItems = await db.select()
    .from(schema.CartItem)
    .where(and(and(eq(schema.CartItem.userId, userId),eq(schema.CartItem.OrderId,""))));
  return cartItems;
}

export async function getCartItemsByOrderId(orderId: string) {
  return await db.query.CartItem.findMany({ where: (model, { eq }) => eq(model.OrderId, orderId) });
}

export async function insertOrder(orderProp: OrderProps) {
  const user = auth();
  if (!user || !user.userId) throw new Error("Unauthorized"); // Ensure user is valid
  if (!orderProp) throw new Error('Order is required');
  
  try {
    const timestamp = Date.now(); // Get current timestamp in milliseconds
    const identifier = timestamp.toString(); // Combine timestamp and random number as a string
    console.log("identifier",identifier);
    // Assign the identifier to the order
    orderProp.order.identifier = identifier; // Adjusted to direct assignment
    orderProp.cartItems.forEach(cartItem => {
      if(!orderProp.order.Prix)orderProp.order.Prix= cartItem.Prix; 
      else if(cartItem.Prix) orderProp.order.Prix += cartItem.Prix;
      
    });
    const updatePromises = orderProp.cartItems.map(async (cartItem) => {
      cartItem.OrderId = identifier; // Assign the identifier to OrderId
      return db.update(schema.CartItem).set(cartItem).where(eq(schema.CartItem.id, cartItem.id));
    });

    const newOrder = await db.insert(schema.Order).values(orderProp.order);
    if (!newOrder) throw new Error('Failed to insert order');
     console.log("order inserted");
    // Wait for all cart items to be updated
    await Promise.all(updatePromises);
    console.log("cart items updated");
    console.log("id",identifier); 
    return identifier; 
  } catch (err) {
    console.error("Error inserting order:", err); // Log full error details
    throw err; // Optionally rethrow to allow error propagation
  }
}


export async function deleteOrder(orderId: number) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");
  const agent = await clerkClient.users.getUser(user.userId);
  if (!agent) throw new Error("Unauthorized");
  if(!agent.publicMetadata.agent) throw new Error("Unauthorized");
  if(!orderId) throw new Error('order is required');
  const deleted = await db.delete(schema.Order).where(eq(schema.Order.id, orderId));
  if(!deleted) throw new Error('order not deleted');
  return deleted;
}

export async function getOrders() {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");
  const agent = await clerkClient.users.getUser(user.userId);
  if (!agent) throw new Error("Unauthorized");
  if(!agent.publicMetadata.agent) throw new Error("Unauthorized");
  return await db.query.Order.findMany();
}



export async function updateOrder(order:Orders) {
  const user = auth()
  if(!user)throw new Error("unauthorized");
  order.userId=user.userId;
  const agent = await isAgent();
  if(!agent) throw new Error("unauthorized");

  const neworder= await db.update(schema.Order).set(order).where(eq(schema.Order.id, order.id));
  if(!neworder)return;
  return order;

  
}

export async function insertUpload({uploadURL }:Upload){
  return await db.insert(schema.Uploads).values({uploadURL});
}


export async function getOrderByIdentifier(identifier:string) {
  const user = auth();
  if(!user) throw new Error('unauthorized');
  const order = await db.query.Order.findFirst({ where: (model, { eq }) => eq(model.identifier, identifier) })
  if( order?.userId !== user.userId){
    const agent = await isAgent();
    if(!agent) throw new Error('unauthorized')
  }
return order;

}



export async function isAgent(){
  const user = auth();
  if(!user.userId) return;
  const fullUserData = clerkClient.users.getUser(user.userId);
  if((await fullUserData).publicMetadata.agent===true) return true;
  return;

}
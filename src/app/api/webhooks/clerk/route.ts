
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";
import {Users} from "@/src/server/schema";
import * as queries from "@/src/server/db";
import { NextResponse } from "next/server";



export async function POST(req: Request) {

  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    })
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const { id } = evt.data;
  const eventType = evt.type;
  if(eventType === 'user.created') {
    type NewUser = typeof Users.$inferInsert;
    const user : NewUser = {
    email: evt.data.email_addresses[0].email_address,
    name: evt.data.first_name + ' '+evt.data.last_name,
    image: evt.data.image_url,
    clerkId: evt.data.id,
    createdAt: new Date,}
    const user_created= await queries.insertUser(user);
    if(user_created){
      console.log('User created successfully');
      return NextResponse.json({message: 'User created successfully'})
    }
  }
  if(eventType === 'user.updated') {
    type NewUser = typeof Users.$inferInsert;
    const user : NewUser = {
    email: evt.data.email_addresses[0].email_address,
    name: evt.data.first_name + ' '+evt.data.last_name,
    image: evt.data.image_url,
    clerkId: evt.data.id,
    createdAt: new Date,}
    const user_updated= await queries.UpdateUser( user);
    if(user_updated){
      console.log('User updated successfully');
      return NextResponse.json({message: 'User updated successfully'})
    }
  
  }
  if(eventType === 'user.deleted') {
    const user_deleted= await queries.deleteUser(evt.data.id);
    if(user_deleted){
      console.log('User deleted successfully');
      return NextResponse.json({message: 'User deleted successfully'})
    }
  }

  console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
  console.log('Webhook body:', body)

  return new Response('', { status: 200 })
}
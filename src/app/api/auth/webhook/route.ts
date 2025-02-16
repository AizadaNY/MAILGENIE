import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
console.log('started route.ts')
const prisma = new PrismaClient();
export const dynamic = "force-dynamic";
export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET
 
  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
    
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET)

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json('Error: Missing Svix headers', {
      status: 400,
    })
  }

  // Get body
  const payload = await req.json()
  
  const body = JSON.stringify(payload)
  console.log('Webhook payload:', body)

  let evt: WebhookEvent

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', {
      status: 400,
    })
  }

  if (evt.type === "user.created") {
    const userData = evt.data;
    const clerkId = userData.id;
    const email = userData.email_addresses?.[0]?.email_address || "";
    const fullname = `${userData.first_name || ""} ${userData.last_name || ""}`.trim();
    const createdAt = new Date(userData.created_at);

    console.log(`✅ User Created: ID ${clerkId}, Email: ${email}, Name: ${fullname}`);

    try {
      const user = await prisma.user.create({
        data: {
          clerkId,
          fullname,
          type: "customer", // Default user type
          createdAt,
        },
      });

      console.log("✅ User saved to database:", user);
      return NextResponse.json({ message: "User created successfully", user }, { status: 201 });
    } catch (dbError) {
      console.error("❌ Database error:", dbError);
      return NextResponse.json({ message: "Database error" }, { status: 500 });
    }
  }
  

  }
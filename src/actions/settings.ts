"use server";
import { auth } from "@clerk/nextjs/server"; // Fetch the current authenticated user
import { client } from "@/lib/db"; // Prisma client for database operations
import { PrismaClient } from '@prisma/client';

export const onIntegrateDomain = async (domain: string, icon: string) => {
  const user = await auth();
  if (!user) return { status: 401, message: "Unauthorized" };

  try {
    // TODO: Fetch the user's subscription and count their current domains.
    if(user.userId){
    const subscription = await client.subscription.findUnique({
      where: { userId: user.userId},
      include: { user: true },
    });
  
    const domainCount = await client.domain.count({
      where: { userId: user.userId },
    });

    if (!subscription) {
      throw new Error("Subscription not loaded. Please fetch the subscription first.");
    }

    switch (subscription.plan) {
      case 'STANDARD':
        if (subscription.maxStorage <= 1024) { // 1 GB = 1024 MB
          console.log("Limit reached: Max 1GB storage allowed for STANDARD plan");
        }
        if(domainCount <5){
          console.log("Limit reached: Max 5 domains allowed for STANDARD plan");
        }
        break;
        case 'PRO':
          if (subscription.maxStorage <= 2048) { // 1 GB = 1024 MB
            console.log("Limit reached: Max 1GB storage allowed for STANDARD plan");
          }
          if(domainCount <5){
            console.log("Limit reached: Max 10 domains allowed for STANDARD plan");
          }
      break;
    case 'ULTIMATE':
      if (subscription.maxStorage <= 5120) { // 1 GB = 1024 MB
        console.log("Limit reached: Max 1GB storage allowed for STANDARD plan");
      }
      if(domainCount <5){
        console.log("Limit reached: Max 20 domains allowed for STANDARD plan");
      }
      break;
    default:
      throw new Error("Unknown subscription plan");
  }
}else{
    return { status: 403, message: "No active subscription found." };
  }
   
  // TODO: Check if the domain already exists.
  const domainNameFromUI = "example.com";

  const existingDomain = await client.domain.findUnique({
   where: { name: domainNameFromUI }, // or url, or whatever field you're using
 });
 if (existingDomain) {
   console.log("Domain already exists");
 } else {
   console.log("Domain is available");
 }


 // TODO: Create a new domain entry and link it to the user.
 const prisma = new PrismaClient();

async function createDomainForUser(userId: string, domainData: { name: string, icon: string, campaignId: string }) {
  try {
    // Create the new domain and link it to the user by using the userId
    const newDomain = await prisma.domain.create({
      data: {
        name: domainData.name,
        icon: domainData.icon,
        userId: userId,           // Link to user by userId
        campaignId: domainData.campaignId,  // Campaign ID, assuming it's also required
      },
    });

    console.log('Domain created and linked to user:', newDomain);
    return newDomain;
  } catch (error) {
    console.error('Error creating domain:', error);
  }
}

    return { status: 200, message: "Domain successfully added" };

  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal Server Error" };
  }
};

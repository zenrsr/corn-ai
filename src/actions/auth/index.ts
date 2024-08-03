"use server";

import { client } from "@/lib/prisma";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { onGetAllAccountsDomains } from "../settings";

export const onCompleteUserRegistration = async (
  fullname: string,
  clerkId: string,
  type: string
) => {
  try {
    const registered = await client.user.create({
      data: {
        fullname,
        clerkId,
        type,
        subscription: {
          create: {}
        }
      },
      select: {
        fullname: true,
        id: true,
        type: true
      }
    });

    if (registered) {
      return { status: 200, user: registered };
    }
  } catch (error: any) {
    return { status: 400, message: error.message };
  }
};

export const isLoggedInUser = async () => {
  const user = await currentUser();
  if (!user) redirectToSignIn();
  else {
    try {
      const authenticated = await client.user.findUnique({
        where: {
          clerkId: user.id
        },
        select: {
          fullname: true,
          id: true,
          type: true
        }
      });
      if (authenticated) {
        const domains = await onGetAllAccountsDomains();
        return { status: 200, user: authenticated, domain: domains?.domains };
      }
    } catch (error: any) {
      console.log({ error });
      return { status: 400, message: error.message };
    }
  }
};

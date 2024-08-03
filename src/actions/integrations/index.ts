import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";

export const onGetPaymentConnected = async () => {
  try {
    const user = await currentUser();
    if (user) {
      const connected = await client.user.findUnique({
        where: {
          clerkId: user.id
        },
        select: {
          stripeId: true
        }
      });
      if (connected) {
        return connected.stripeId;
      }
    }
  } catch (error) {
    console.log({ error });
  }
};

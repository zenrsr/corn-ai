"use server";
import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  typescript: true,
  apiVersion: "2024-06-20"
});

export const onCreateCustomerPaymentIntentSecret = async (
  amount: number,
  stripeId: string
) => {
  try {
    const stripeAmount = Math.max(Math.round(amount * 100), 50);
    const paymentIntent = await stripe.paymentIntents.create(
      {
        currency: "usd",
        amount: stripeAmount,
        automatic_payment_methods: { enabled: true }
      },
      {
        stripeAccount: stripeId
      }
    );
    if (paymentIntent) {
      return { secret: paymentIntent.client_secret };
    }
  } catch (error) {
    console.log({ error });
  }
};

export const onUpdateSubscription = async (
  plan: "STANDARD" | "PRO" | "ULTIMATE"
) => {
  try {
    const user = await currentUser();
    if (!user) return;

    const update = await client.user.update({
      where: {
        clerkId: user.id
      },
      data: {
        subscription: {
          update: {
            data: {
              plan,
              credits: plan == "PRO" ? 50 : plan == "ULTIMATE" ? 100 : 10
            }
          }
        }
      },
      select: {
        subscription: {
          select: {
            plan: true
          }
        }
      }
    });

    if (update) {
      return {
        status: 200,
        message: "Subscription Updated",
        plan: update.subscription?.plan
      };
    }
  } catch (error) {
    console.log({ error });
  }
};

const setPlanAmount = (item: "STANDARD" | "PRO" | "ULTIMATE") => {
  if (item == "PRO") {
    return 500;
  }
  if (item == "ULTIMATE") {
    return 2500;
  }
  return 50;
};

export const onGetStripeClientSecret = async (
  item: "STANDARD" | "PRO" | "ULTIMATE"
) => {
  try {
    const amount = setPlanAmount(item);

    if (amount < 50) {
      // Create a Setup Intent for saving the payment method without immediate charge
      const setupIntent = await stripe.setupIntents.create({
        usage: "off_session"
      });
      return { secret: setupIntent.client_secret, isSetupIntent: true };
    } else {
      const paymentIntent = await stripe.paymentIntents.create({
        currency: "usd",
        amount: amount,
        automatic_payment_methods: {
          enabled: true
        }
      });
      return { secret: paymentIntent.client_secret, isSetupIntent: false };
    }
  } catch (error) {
    console.log(error);
  }
};

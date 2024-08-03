import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  typescript: true,
  apiVersion: "2024-06-20"
});

export async function GET() {
  try {
    const user = await currentUser();
    if (!user)
      return new NextResponse("User not authenticated", { status: 401 });

    const account = await stripe.accounts.create({
      country: "US",
      type: "custom",
      business_type: "company",
      capabilities: {
        card_payments: {
          requested: true
        },
        transfers: {
          requested: true
        }
      },
      external_account: "btok_us",
      tos_acceptance: {
        date: 1547923073,
        ip: "172.18.80.19"
      }
    });

    if (account) {
      const approve = await stripe.accounts.update(account.id, {
        business_profile: {
          mcc: "5045",
          url: "https://apple-15.vercel.com"
        },
        company: {
          address: {
            city: "Fairfax",
            line1: "125 State St",
            postal_code: "22035",
            state: "VA"
          },
          tax_id: "000000009",
          name: "The Best Apple Co",
          phone: "8888675509"
        }
      });
      if (approve) {
        const person = await stripe.accounts.createPerson(account.id, {
          first_name: "Sunny",
          last_name: "Reddy",
          relationship: {
            representative: true,
            title: "CTO"
          }
        });
        if (person) {
          const approvePerson = await stripe.accounts.updatePerson(
            account.id,
            person.id,
            {
              address: {
                city: "victoria ",
                line1: "123 State St",
                postal_code: "V8P 1A2",
                state: "BC"
              },
              dob: {
                day: 10,
                month: 11,
                year: 1980
              },
              ssn_last_4: "0000",
              phone: "8888675309",
              email: "jenny@apple-15.com",
              relationship: {
                executive: true
              }
            }
          );
          if (approvePerson) {
            const owner = await stripe.accounts.createPerson(account.id, {
              first_name: "Brucer",
              last_name: "Wayner",
              email: "kathleen@email.com",
              address: {
                city: "victoria ",
                line1: "125 State St",
                postal_code: "V8P 1A1",
                state: "BC"
              },
              dob: {
                day: 10,
                month: 11,
                year: 1980
              },
              phone: "8888675309",
              relationship: {
                owner: true,
                percent_ownership: 80
              }
            });
            if (owner) {
              const complete = await stripe.accounts.update(account.id, {
                company: {
                  owners_provided: true
                }
              });
              if (complete) {
                const saveAccountId = await client.user.update({
                  where: {
                    clerkId: user.id
                  },
                  data: {
                    stripeId: account.id
                  }
                });

                if (saveAccountId) {
                  const accountLink = await stripe.accountLinks.create({
                    account: account.id,
                    refresh_url:
                      "http://localhost:3000/callback/stripe/refresh",
                    return_url: "http://localhost:3000/callback/stripe/success",
                    type: "account_onboarding",
                    collection_options: {
                      fields: "currently_due"
                    }
                  });

                  return NextResponse.json({
                    url: accountLink.url
                  });
                }
              }
            }
          }
        }
      }
    }
    return new NextResponse("Failed to complete Stripe account setup", {
      status: 500
    });
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to create an account:",
      error
    );
    return new NextResponse(
      "An error occurred while setting up the Stripe account",
      { status: 500 }
    );
  }
}

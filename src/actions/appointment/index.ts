"use server";

import { client } from "@/lib/prisma";

export const onDomainCustomerResponses = async (customerId: string) => {
  try {
    const customerQuestions = await client.customer.findUnique({
      where: {
        id: customerId
      },
      select: {
        email: true,
        questions: {
          select: {
            id: true,
            question: true,
            answered: true
          }
        }
      }
    });

    if (customerQuestions) {
      return customerQuestions;
    }
  } catch (error) {
    console.log({ error });
  }
};

export const onGetAllDomainBookings = async (domainId: string) => {
  try {
    const bookings = await client.bookings.findMany({
      where: {
        domainId
      },
      select: {
        slot: true,
        date: true
      }
    });
    if (bookings) {
      return bookings;
    }
  } catch (error) {
    console.log({ error });
  }
};

export const onBookNewAppointment = async (
  domainId: string,
  customerId: string,
  slot: string,
  date: string,
  email: string
) => {
  try {
    const booking = await client.customer.update({
      where: {
        id: customerId
      },
      data: {
        booking: {
          create: {
            domainId,
            slot,
            date,
            email
          }
        }
      }
    });

    if (booking) {
      return {
        status: 200,
        message: "Appointment Booked Successfully"
      };
    }

    return {
      status: 400,
      message: "Failed to Book Appointment"
    };
  } catch (error) {
    return {
      status: 400,
      message: "Failed to Book Appointment"
    };
  }
};

export const SaveAnswers = async (
  questions: [question: string],
  customerId: string
) => {
  try {
    for (const question in questions) {
      await client.customer.update({
        where: { id: customerId },
        data: {
          questions: {
            update: {
              where: {
                id: question
              },
              data: {
                answered: questions[question]
              }
            }
          }
        }
      });
    }
    console.log("Answers Updated Successfully from the actions folder");
    return {
      status: 200,
      message: "Answers Updated Successfully"
    };
  } catch (error) {
    console.log({ error });
    throw new Error("Failed to save answers");
  }
};

export const onGetAllBookingsForCurrentUser = async (clerkId: string) => {
  try {
    const bookings = await client.bookings.findMany({
      where: {
        Customer: {
          Domain: {
            User: {
              clerkId
            }
          }
        }
      },
      select: {
        id: true,
        slot: true,
        createdAt: true,
        date: true,
        email: true,
        domainId: true,
        Customer: {
          select: {
            Domain: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });

    if (bookings) {
      return {
        bookings
      };
    }
  } catch (error) {
    console.log({ error });
  }
};

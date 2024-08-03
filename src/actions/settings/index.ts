"use server";
import { client } from "@/lib/prisma";
import { clerkClient, currentUser } from "@clerk/nextjs";

export const ongetSubscriptionPlan = async () => {
  try {
    const user = await currentUser();
    if (!user) return;

    const plan = await client.user.findUnique({
      where: {
        clerkId: user.id
      },
      select: {
        subscription: {
          select: {
            plan: true
          }
        }
      }
    });

    if (plan) {
      return plan.subscription?.plan;
    }
  } catch (error) {
    console.log({ error });
  }
};

export const onGetAllAccountsDomains = async () => {
  const user = await currentUser();
  if (!user) return;
  try {
    const domains = await client.user.findUnique({
      where: {
        clerkId: user.id
      },
      select: {
        id: true,
        domains: {
          select: {
            name: true,
            icon: true,
            id: true,
            customer: {
              select: {
                chatRoom: {
                  select: {
                    id: true,
                    live: true
                  }
                }
              }
            }
          }
        }
      }
    });

    return { ...domains };
  } catch (error) {
    console.log({ error });
  }
};

export const onIntgerateDomain = async (domain: string, icon: string) => {
  const user = await currentUser();
  if (!user) return;
  try {
    const subscription = await client.user.findUnique({
      where: {
        clerkId: user.id
      },
      select: {
        _count: {
          select: {
            domains: true
          }
        },
        subscription: {
          select: {
            plan: true
          }
        }
      }
    });
    const domainExists = await client.user.findFirst({
      where: {
        clerkId: user.id,
        domains: {
          some: {
            name: domain
          }
        }
      }
    });

    if (!domainExists) {
      if (
        (subscription?.subscription?.plan == "STANDARD" &&
          subscription._count.domains < 1) ||
        (subscription?.subscription?.plan == "PRO" &&
          subscription._count.domains < 5) ||
        (subscription?.subscription?.plan == "ULTIMATE" &&
          subscription._count.domains < 10)
      ) {
        const newDomain = await client.user.update({
          where: {
            clerkId: user.id
          },
          data: {
            domains: {
              create: {
                name: domain,
                icon,
                chatBot: {
                  create: {
                    welcomeMessage:
                      "Hey there, have a question? Text us here 😉"
                  }
                }
              }
            }
          }
        });
        if (newDomain) {
          return { status: 200, message: "Domain added successfully" };
        }
      }
      return {
        status: 400,
        message:
          "Domain limit reached! Consider upgrading your existing plan to add more domains"
      };
    }
    return { status: 400, message: "Domain already exists" };
  } catch (error) {
    console.log({ error });
  }
};

export const onUpdatePassword = async (password: string) => {
  try {
    const user = await currentUser();
    if (!user) return;

    const update = await clerkClient.users.updateUser(user.id, { password });
    if (update) {
      return { status: 200, message: "Password updated successfully" };
    }
  } catch (error) {
    console.log({ error });
    return { status: 400, message: "Error updating password" };
  }
};

export const onGetCurrentDomainInfo = async (domain: string) => {
  const user = await currentUser();
  if (!user) return;
  try {
    const userDomain = await client.user.findUnique({
      where: {
        clerkId: user.id
      },
      select: {
        subscription: {
          select: {
            plan: true
          }
        },
        domains: {
          where: {
            name: {
              contains: domain
            }
          },
          select: {
            id: true,
            name: true,
            icon: true,
            userId: true,
            products: true,
            chatBot: {
              select: {
                id: true,
                welcomeMessage: true,
                icon: true
              }
            }
          }
        }
      }
    });
    if (userDomain) {
      return userDomain;
    }
  } catch (error) {
    console.log(error);
  }
};

export const onUpdateDomain = async (id: string, name: string) => {
  try {
    const domainExists = await client.domain.findFirst({
      where: {
        name: {
          contains: name
        }
      }
    });

    if (!domainExists) {
      const domain = await client.domain.update({
        where: {
          id
        },
        data: {
          name
        }
      });

      if (domain) {
        return { status: 200, message: "Domain updated successfully" };
      } else {
        return { status: 400, message: "Error updating domain" };
      }
    }
    return { status: 400, message: "Domain with this name already exists" };
  } catch (error) {
    console.log({ error });
  }
};

export const onChatBotImageUpdate = async (id: string, icon: string) => {
  const user = await currentUser();
  try {
    const domain = await client.domain.update({
      where: {
        id
      },
      data: {
        chatBot: {
          update: {
            data: {
              icon
            }
          }
        }
      }
    });

    if (domain) {
      return { status: 200, message: "Image updated successfully" };
    }
    return { status: 400, message: "Error updating image" };
  } catch (error) {
    console.log({ error });
  }
};

export const onUpdateWelcomeMessage = async (
  domainId: string,
  message: string
) => {
  try {
    const update = await client.domain.update({
      where: {
        id: domainId
      },
      data: {
        chatBot: {
          update: {
            data: {
              welcomeMessage: message
            }
          }
        }
      }
    });

    if (update) {
      return { status: 200, message: "Welcome Message updated successfully" };
    }
    return { status: 400, message: "Error updating message" };
  } catch (error) {
    console.log({ error });
  }
};

export const onDeleteUserDomain = async (id: string) => {
  const user = await currentUser();
  if (!user) return;
  try {
    const validUser = await client.user.findUnique({
      where: {
        clerkId: user.id
      },
      select: {
        id: true
      }
    });

    if (validUser) {
      const deleteDomain = await client.domain.delete({
        where: {
          userId: validUser.id,
          id
        },
        select: {
          name: true
        }
      });

      if (deleteDomain) {
        return {
          status: 200,
          message: `${deleteDomain.name} deleted successfully`
        };
      }
    }
  } catch (error) {
    console.log({ error });
  }
};

export const onCreateHelpDeskQuestion = async (
  id: string,
  question: string,
  answer: string
) => {
  try {
    const helpDeskQuestion = await client.domain.update({
      where: {
        id
      },
      data: {
        helpdesk: {
          create: {
            question,
            answer
          }
        }
      },
      include: {
        helpdesk: {
          select: {
            id: true,
            question: true,
            answer: true
          }
        }
      }
    });

    if (helpDeskQuestion) {
      return {
        status: 200,
        message: "New help desk question added",
        questions: helpDeskQuestion.helpdesk
      };
    }

    return {
      status: 400,
      message: "Something went wrong"
    };
  } catch (error) {
    console.log(error);
  }
};

export const onGetAllHelpDeskQuestions = async (id: string) => {
  try {
    const questions = await client.helpDesk.findMany({
      where: {
        domainId: id
      },
      select: {
        question: true,
        answer: true,
        id: true
      }
    });

    return {
      status: 200,
      message: "Questions fetched successfully",
      questions: questions
    };
  } catch (error) {
    console.log({ error });
  }
};

export const onCreateFilterQuestions = async (id: string, question: string) => {
  try {
    const filterQuestions = await client.domain.update({
      where: {
        id
      },
      data: {
        filterQuestions: {
          create: {
            question
          }
        }
      },
      include: {
        filterQuestions: {
          select: {
            question: true,
            id: true
          }
        }
      }
    });

    if (filterQuestions) {
      return {
        status: 200,
        message: "Filter question added",
        questions: filterQuestions.filterQuestions
      };
    }

    return {
      status: 400,
      message: "Something went wrong"
    };
  } catch (error) {
    console.log({ error });
  }
};

export const onGetAllFilterQuestions = async (id: string) => {
  try {
    const questions = await client.filterQuestions.findMany({
      where: {
        domainId: id
      },
      select: {
        question: true,
        id: true
      },
      orderBy: {
        question: "asc"
      }
    });

    return {
      status: 200,
      message: "Questions fetched successfully",
      questions: questions
    };
  } catch (error) {
    console.log({ error });
  }
};

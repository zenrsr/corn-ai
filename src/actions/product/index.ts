import { client } from "@/lib/prisma";

export const onCreateNewDomainProduct = async (
  domainId: string,
  name: string,
  image: string,
  price: string
) => {
  try {
    const product = await client.domain.update({
      where: {
        id: domainId
      },
      data: {
        products: {
          create: {
            name,
            image,
            price: parseInt(price)
          }
        }
      }
    });

    if (product) {
      return {
        status: 200,
        message: "Product created successfully"
      };
    }
  } catch (error) {
    console.log({ error });
  }
};

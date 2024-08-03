import React from "react";
import TabsMenu from "../tabs";
import { SideSheet } from "../side-sheet/side-sheet";
import { PlusIcon } from "lucide-react";
import { TabsContent } from "@radix-ui/react-tabs";
import DataTable from "../data-table";
import { TableCell, TableRow } from "../ui/table";
import Image from "next/image";
import { CreateProductForm } from "./product-form";

type Props = {
  id: string;
  products: {
    name: string;
    id: string;
    price: number;
    image: string;
    createdAt: Date;
    domainId: string | null;
  }[];
};

const ProductTable = ({ id, products }: Props) => {
  return (
    <div className="min-h-[600px]">
      <div className="">
        <h2 className="font-bold text-2xl">Products</h2>
        <p className="text-sm font-light">
          Add products to your domain and set them live, to accept payments from
          customers
        </p>
      </div>
      <TabsMenu
        className="w-full flex justify-start"
        triggers={[
          { label: "All products" },
          { label: "Live" },
          { label: "Deactivated" }
        ]}
        button={
          <div className="flex-1 flex justify-end">
            <SideSheet
              description="Add products to your domain and set them live, to accept payments from
          customers"
              title="Add a product"
              className="flex items-center gap-2 bg-orange px-4 py-2 text-black font-semibold rounded-lg text-sm"
              trigger={
                <>
                  <PlusIcon size={20} />
                  <p>Add product</p>
                </>
              }
            >
              <CreateProductForm id={id} />
            </SideSheet>
          </div>
        }
      >
        <TabsContent value="All products">
          <DataTable headers={["Featured Image", "Name", "Pricing", "Created"]}>
            {products &&
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Image
                      src={`https://ucarecnd.com/${product.image}/`}
                      width={50}
                      height={50}
                      alt="image"
                    />
                  </TableCell>
                </TableRow>
              ))}
          </DataTable>
        </TabsContent>
      </TabsMenu>
    </div>
  );
};

export default ProductTable;

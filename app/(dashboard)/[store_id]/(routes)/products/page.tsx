import { format } from "date-fns";

import { ProductClient } from "./components/client";
import prismadb from "@/lib/prismadb";
import { ProductColumn } from "./components/colums";
import { formatter } from "@/lib/utils";

const ProductsPage = async ({ params }: { params: { store_id: string } }) => {
  const products = await prismadb.product.findMany({
    where: {
      store_id: params.store_id,
    },
    include: {
      //las relaciones, en forma de un objeto
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductColumn[] = products.map((product) => ({
    product_id: product.product_id,
    name: product.name,
    isFeatured: product.isFeatured,
    isArchived: product.isArchived,
    price: formatter.format(product.price.toNumber()),
    category: product.category.name,
    size: product.size.name,
    color: product.color.value,
    createdAt: format(product.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;

import { format } from "date-fns";

import { OrderClient } from "./components/client";
import prismadb from "@/lib/prismadb";
import { OrderColumn } from "./components/colums";
import { formatter } from "@/lib/utils";

const OrdersPage = async ({ params }: { params: { store_id: string } }) => {
  const orders = await prismadb.order.findMany({
    where: {
      store_id: params.store_id,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((order) => ({
    id: order.order_id,
    phone: order.phone,
    address: order.address,
    products: order.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    totalPrice: formatter.format(
      order.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    isPaid: order.isPaid,
    createdAt: format(order.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;

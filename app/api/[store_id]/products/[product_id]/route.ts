import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { store_id: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const {
      name,
      price,
      category_id,
      color_id,
      size_id,
      images,
      isFeatured,
      isArchived,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!category_id) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    if (!color_id) {
      return new NextResponse("Color id is required", { status: 400 });
    }

    if (!size_id) {
      return new NextResponse("Size id is required", { status: 400 });
    }

    if (!params.store_id) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        store_id: params.store_id,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const product = await prismadb.product.create({
      data: {
        name,
        price,
        isFeatured,
        isArchived,
        category_id,
        color_id,
        size_id,
        store_id: params.store_id,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { store_id: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const category_id = searchParams.get("category_id") || undefined;
    const color_id = searchParams.get("color_id") || undefined;
    const size_id = searchParams.get("size_id") || undefined;
    const isFeatured = searchParams.get("isFeatured");

    if (!params.store_id) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        store_id: params.store_id,
        category_id,
        color_id,
        size_id,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

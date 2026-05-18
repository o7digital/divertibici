const WOO_PRODUCTS_URL =
  "https://tienda.divertibici.com.mx/wp-json/wc/store/v1/products?category=17&per_page=24";

function formatPrice(product) {
  const prices = product.prices || {};
  const minorUnit = Number(prices.currency_minor_unit ?? 2);
  const rawPrice = Number(prices.price || 0) / Math.pow(10, minorUnit);

  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: prices.currency_code || "MXN",
    maximumFractionDigits: 2,
  }).format(rawPrice);
}

function mapWooProduct(product) {
  const image = product.images?.[0];

  return {
    id: product.id,
    title: product.name,
    category: product.categories?.[0]?.name || "Bikes",
    price: formatPrice(product),
    imgSrc: image?.src || "/assets/images/products/product-38-1.jpg",
    permalink:
      product.permalink ||
      `https://tienda.divertibici.com.mx/producto/${product.slug}/`,
    ratings: Math.max(1, Math.round(Number(product.average_rating || 5))),
    filterCategory: product.on_sale ? "Bestsellers" : "Most Viewed",
  };
}

export async function GET() {
  try {
    const response = await fetch(WOO_PRODUCTS_URL, {
      headers: {
        Accept: "application/json",
        "User-Agent": "DivertiBiciCatalog/1.0",
      },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return Response.json(
        { error: "woocommerce_fetch_failed", status: response.status },
        { status: 502 }
      );
    }

    const products = await response.json();

    return Response.json({
      source: "tienda.divertibici.com.mx",
      products: Array.isArray(products) ? products.map(mapWooProduct) : [],
    });
  } catch (error) {
    return Response.json(
      { error: "woocommerce_fetch_failed", message: error.message },
      { status: 502 }
    );
  }
}

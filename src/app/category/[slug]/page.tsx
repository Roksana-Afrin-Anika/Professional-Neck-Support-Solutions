import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../Components/Navbar";

// Type definitions
interface Category {
  name: string;
  image: string;
  slug: string;
  description: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  image: string;
  rating: number;
  reviewCount: number;
  isPrime: boolean;
  badge?: string;
}

// Data
const categories: Category[] = [
  {
    name: "Neck Braces",
    image: "/category/neck-braces/1.jpeg",
    slug: "neck-braces",
    description: "Premium support for neck injuries and prevention",
  },
  {
    name: "Compression Gloves",
    image: "/category/Gloves/1.jpg",
    slug: "gloves",
    description: "Enhanced grip and joint support",
  },
  {
    name: "Arm Sleeves",
    image: "/category/arm-sleeves/1.jpg",
    slug: "arm-sleeves",
    description: "Compression sleeves for performance and recovery",
  },
  {
    name: "Recovery Gear",
    image: "/category/Recovery-Gear/1.jpg",
    slug: "recovery-gear",
    description: "Tools for faster muscle recovery",
  },
];

const allProducts: Record<string, Product[]> = {
  "neck-braces": [
    {
      id: 1,
      name: "Z7 Neck Bracket Pro",
      description: "High performance neck protection for athletes",
      price: "$89.99",
      originalPrice: "$119.99",
      image: "/category/neck-braces/1.jpeg",
      rating: 4.8,
      reviewCount: 142,
      isPrime: true,
      badge: "BEST SELLER",
    },
    {
      id: 2,
      name: "Z7 Neck Bracket Lite",
      description: "Everyday neck support with premium comfort",
      price: "$69.99",
      image: "/category/neck-braces/2.jpg",
      rating: 4.5,
      reviewCount: 89,
      isPrime: true,
      badge: "NEW",
    },
    {
      id: 3,
      name: "Neck Support Deluxe",
      description: "Professional-grade neck brace with adjustable support",
      price: "$99.99",
      image: "/category/neck-braces/3.jpg",
      rating: 4.7,
      reviewCount: 56,
      isPrime: true,
    },
  ],
  gloves: [
    {
      id: 4,
      name: "Compression Glove Pro",
      description: "Advanced compression for joint support",
      price: "$39.99",
      image: "/category/Gloves/1.jpg",
      rating: 4.6,
      reviewCount: 78,
      isPrime: true,
    },
    {
      id: 5,
      name: "Grip Master Gloves",
      description: "Enhanced grip technology for athletes",
      price: "$29.99",
      image: "/category/Gloves/2.jpg",
      rating: 4.3,
      reviewCount: 42,
      isPrime: true,
    },
    {
      id: 6,
      name: "Grip Master Gloves",
      description: "Enhanced grip technology for athletes",
      price: "$69.99",
      image: "/category/Gloves/3.jpg",
      rating: 3.3,
      reviewCount: 82,
      isPrime: true,
    },
  ],
  "arm-sleeves": [
    {
      id: 7,
      name: "Performance Arm Sleeve",
      description: "Compression sleeve for muscle support",
      price: "$24.99",
      image: "/category/arm-sleeves/1.jpg",
      rating: 4.4,
      reviewCount: 65,
      isPrime: true,
    },
    {
      id: 8,
      name: "Recovery Arm Sleeve",
      description: "Post-workout compression for faster recovery",
      price: "$27.99",
      image: "/category/arm-sleeves/2.jpg",
      rating: 4.7,
      reviewCount: 38,
      isPrime: true,
    },
    {
      id: 9,
      name: "Recovery Arm Sleeve",
      description: "Post-workout compression for faster recovery",
      price: "$27.99",
      image: "/category/arm-sleeves/3.jpg",
      rating: 4.7,
      reviewCount: 98,
      isPrime: true,
    },
  ],
  "recovery-gear": [
    {
      id: 10,
      name: "Muscle Recovery Roller",
      description: "Deep tissue massage roller",
      price: "$34.99",
      image: "/category/Recovery-Gear/1.jpg",
      rating: 4.8,
      reviewCount: 112,
      isPrime: true,
      badge: "BEST SELLER",
    },
    {
      id: 11,
      name: "Therapy Massage Gun",
      description: "Professional percussion massager",
      price: "$149.99",
      image: "/category/Recovery-Gear/2.jpg",
      rating: 4.9,
      reviewCount: 204,
      isPrime: true,
    },
    {
      id: 12,
      name: "Therapy Massage Gun",
      description: "Professional percussion massager",
      price: "$149.99",
      image: "/category/Recovery-Gear/3.jpg",
      rating: 4.9,
      reviewCount: 204,
      isPrime: true,
    },
  ],
};

// Component definition
export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categories.find((cat) => cat.slug === params.slug);
  if (!category) {
    notFound();
  }

  const products = allProducts[params.slug] || [];

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="relative bg-gray-900">
        <div className="relative h-64 md:h-80 w-full overflow-hidden">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {category.name}
              </h1>
              <p className="text-gray-200 max-w-2xl mx-auto">
                {category.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {category.name} Products
          </h2>
          <div className="text-sm text-gray-500">
            {products.length} {products.length === 1 ? "item" : "items"}
          </div>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white group relative border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-200 h-full flex flex-col"
              >
                <div className="relative pt-[100%] bg-gray-50 rounded-t-lg overflow-hidden">
                  {product.badge && (
                    <span
                      className={`absolute top-2 left-2 px-2 py-1 text-xs font-bold rounded ${
                        product.badge === "BEST SELLER"
                          ? "bg-[#CC0C39]"
                          : "bg-[#007600]"
                      } text-white z-10`}
                    >
                      {product.badge}
                    </span>
                  )}
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain object-center p-4 transition-transform duration-200 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                <div className="p-4 mt-auto">
                  <h3 className="text-md font-medium text-gray-900 line-clamp-2 min-h-[40px]">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center mt-2 mb-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-4 h-4 ${
                            star <= Math.floor(product.rating)
                              ? "text-[#FFA41C]"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-blue-600 text-xs ml-1">
                      {product.rating} ({product.reviewCount})
                    </span>
                  </div>

                  <div className="mt-2">
                    <span className="text-lg font-bold text-[#B12704]">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-500 line-through ml-1">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>

                  {product.isPrime && (
                    <div className="mt-1 flex items-center">
                      <div className="bg-[#00A8E1] text-white text-[10px] font-bold px-1 rounded mr-1">
                        PRIME
                      </div>
                      <span className="text-xs text-gray-600">
                        FREE Delivery
                      </span>
                    </div>
                  )}

                  <Link
                    href={`/products/${product.id}`}
                    className="mt-3 w-full block text-center bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-gray-900 py-2 rounded text-sm font-medium transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-8 text-center">
            <p className="text-gray-500">No products found in this category.</p>
            <Link
              href="/"
              className="mt-4 inline-block text-blue-600 hover:underline"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 bg-white rounded-lg shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          About {category.name}
        </h2>
        <div className="prose prose-sm text-gray-600">
          <p>
            Our {category.name.toLowerCase()} collection is designed with
            athletes and active individuals in mind. Whether you're recovering
            from an injury or looking to prevent one, our products provide the
            support and comfort you need to perform at your best.
          </p>
          <p className="mt-2">
            All products in this category are made with premium materials and
            undergo rigorous testing to ensure they meet our high standards for
            quality and performance.
          </p>
        </div>
      </section>
    </div>
  );
}

// Static generation
export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

// Metadata generation
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const category = categories.find((cat) => cat.slug === params.slug);

  return {
    title: category?.name || "Category Not Found",
    description: category?.description,
    openGraph: {
      title: category?.name || "Category Not Found",
      description: category?.description || "",
      images: [
        {
          url: category?.image || "",
          width: 800,
          height: 600,
          alt: category?.name || "Category image",
        },
      ],
    },
  };
}

// src/app/category/[slug]/page.tsx

import { notFound } from "next/navigation";
import Image from "next/image";
import Navbar from "../../Components/Navbar";

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
      name: "Grip Master Gloves V1",
      description: "Enhanced grip technology for athletes",
      price: "$29.99",
      image: "/category/Gloves/2.jpg",
      rating: 4.3,
      reviewCount: 42,
      isPrime: true,
    },
    {
      id: 6,
      name: "Grip Master Gloves V2",
      description: "Advanced grip with breathable fabric",
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
      name: "Recovery Arm Sleeve V1",
      description: "Post-workout compression for faster recovery",
      price: "$27.99",
      image: "/category/arm-sleeves/2.jpg",
      rating: 4.7,
      reviewCount: 38,
      isPrime: true,
    },
    {
      id: 9,
      name: "Recovery Arm Sleeve V2",
      description: "Ideal for post-workout and long sessions",
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
      name: "Therapy Massage Gun V1",
      description: "Professional percussion massager",
      price: "$149.99",
      image: "/category/Recovery-Gear/2.jpg",
      rating: 4.9,
      reviewCount: 204,
      isPrime: true,
    },
    {
      id: 12,
      name: "Therapy Massage Gun V2",
      description: "Silent and powerful massage solution",
      price: "$149.99",
      image: "/category/Recovery-Gear/3.jpg",
      rating: 4.9,
      reviewCount: 204,
      isPrime: true,
    },
  ],
};

export default async function CategoryPage({ params }: any) {
  const { slug } = params;
  const category = categories.find((cat) => cat.slug === slug);
  if (!category) return notFound();

  const products = allProducts[slug] || [];

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <header className="relative bg-gray-900">
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
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {category.name} Products
          </h2>
          <span className="text-sm text-gray-500">
            {products.length} {products.length === 1 ? "item" : "items"}
          </span>
        </div>

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
                      <path d="M9.049 2.927a1 1 0 011.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-gray-500">
                    ({product.reviewCount})
                  </span>
                </div>

                <div className="mt-1 text-sm font-semibold text-gray-900">
                  {product.price}
                  {product.originalPrice && (
                    <span className="ml-2 text-sm line-through text-gray-400">
                      {product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

"use client";
import { useState } from "react";
import Navbar from "../../Components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use } from "react";

// Sample products for each category
const allProducts = {
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
      // Adding detailed fields for consistency
      features: [
        "Breathable mesh fabric",
        "Adjustable straps",
        "Lightweight design",
      ],
      specs: {
        material: "Neoprene/Spandex blend",
        sizes: "S, M, L, XL",
        colors: "Black, White, Blue",
      },
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
      features: [
        "Memory foam padding",
        "Moisture-wicking fabric",
        "Slim profile",
      ],
      specs: {
        material: "Polyester/Elastane blend",
        sizes: "One size fits most",
        colors: "Black, Gray",
      },
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
      features: [
        "Memory foam padding",
        "Moisture-wicking fabric",
        "Slim profile",
      ],
      specs: {
        material: "Polyester/Elastane blend",
        sizes: "One size fits most",
        colors: "Black, Gray, Red",
      },
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
      badge: "BEST SELLER",
      // Fallback details in case these details aren’t available
      features: ["Ergonomic design", "Enhanced grip"],
      specs: {
        material: "High-quality synthetic",
        sizes: "S, M, L",
        colors: "Black, Red, Blue",
      },
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
      features: ["Flexible fabric", "Improved grip"],
      specs: {
        material: "Neoprene blend",
        sizes: "One size fits most",
        colors: "Black, Gray",
      },
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
      features: ["Extra cushioning", "Durable stitching"],
      specs: {
        material: "Polyester/Elastane blend",
        sizes: "S, M, L",
        colors: "Black, Gray, Red",
      },
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
      features: ["Breathable fabric", "Ergonomic design"],
      specs: {
        material: "Spandex blend",
        sizes: "S, M, L, XL",
        colors: "Black, White",
      },
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
      features: ["Moisture-wicking fabric", "Enhanced recovery"],
      specs: {
        material: "Polyester/Elastane blend",
        sizes: "One size fits most",
        colors: "Blue, Gray",
      },
    },
    {
      id: 9,
      name: "Recovery Arm Sleeve",
      description: "Post-workout compression for faster recovery",
      price: "$27.99",
      image: "/category/arm-sleeves/3.jpg",
      rating: 6.7,
      reviewCount: 98,
      isPrime: true,
      features: ["Ergonomic design", "Lightweight fabric"],
      specs: {
        material: "Polyester/Spandex blend",
        sizes: "S, M, L",
        colors: "Black, Red",
      },
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
      features: ["Ergonomic handle", "Durable material"],
      specs: {
        material: "High-density foam",
        sizes: "One Size",
        colors: "Black",
      },
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
      features: ["Multiple speed settings", "Quiet motor"],
      specs: {
        material: "Plastic/Metal",
        sizes: "One Size",
        colors: "Black, Gray",
      },
    },
    {
      id: 12,
      name: "Therapy Massage Gun",
      description: "Professional percussion massager",
      price: "$149.99",
      image: "/category/Recovery-Gear/3.jpg",
      rating: 7.9,
      reviewCount: 204,
      isPrime: true,
      features: ["Ergonomic grip", "Long battery life"],
      specs: {
        material: "Plastic/Metal",
        sizes: "One Size",
        colors: "Black, Red",
      },
    },
  ],
};

// Helper function to merge all products into a single array with fallbacks for missing fields
const getProducts = (): Product[] => {
  const fallbackSpecs = {
    material: "Not specified",
    sizes: "One Size",
    colors: "Not specified",
  };

  const fallbackFeatures: string[] = ["High quality product"];

  return Object.values(allProducts)
    .flat()
    .map((prod) => ({
      id: prod.id,
      name: prod.name,
      description: prod.description,
      price: prod.price,
      image: prod.image,
      // Use features and specs from product if available; otherwise provide default values
      features: prod.features || fallbackFeatures,
      specs: prod.specs || fallbackSpecs,
    }));
};

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  features: string[];
  specs: {
    material: string;
    sizes: string;
    colors: string;
  };
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const productId = parseInt(id);
  const products = getProducts();
  const product = products.find((p) => p.id === productId);

  // State management
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(
    product?.specs.colors.split(", ")[0] || ""
  );
  const [selectedSize, setSelectedSize] = useState(
    product?.specs.sizes.split(", ")[0] || ""
  );
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // Handlers
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const toggleSizeGuide = () => {
    setShowSizeGuide(!showSizeGuide);
  };

  const handleAddToCart = () => {
    router.push(
      `/checkout?productId=${productId}&quantity=${quantity}&color=${selectedColor}&size=${selectedSize}`
    );
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900">
              Product not found
            </h1>
            <Link
              href="/products"
              className="mt-4 inline-block rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
            >
              Back to products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-6 flex items-center space-x-2 text-sm">
          <Link href="/" className="text-blue-600 hover:underline">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/products" className="text-blue-600 hover:underline">
            Products
          </Link>
          <span className="text-gray-400">/</span>
          <span className="font-medium text-gray-600">{product.name}</span>
        </nav>

        {/* Product Content */}
        <div className="rounded-lg bg-white p-4 shadow-sm sm:p-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
            {/* Product Image Gallery */}
            <div className="space-y-4">
              <div className="relative h-80 w-full overflow-hidden rounded-lg bg-gray-100 sm:h-96">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="h-20 cursor-pointer rounded-md border border-gray-200 bg-gray-100"
                  ></div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                {product.name}
              </h1>
              {/* Rating */}
              <div className="mb-3 flex items-center">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  24 customer reviews
                </span>
              </div>

              <div className="mb-4">
                <span className="text-2xl font-bold text-gray-900">
                  {product.price}
                </span>
                <span className="ml-2 text-sm font-medium text-green-600">
                  In Stock
                </span>
              </div>

              <p className="mb-6 text-gray-700">{product.description}</p>

              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="mb-2 text-sm font-medium text-gray-900">
                  Color:{" "}
                  <span className="font-normal text-gray-600">
                    {selectedColor}
                  </span>
                </h3>
                <div className="flex space-x-2">
                  {product.specs.colors.split(", ").map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorSelect(color)}
                      className={`h-10 w-10 rounded-full border-2 transition ${
                        selectedColor === color
                          ? "border-blue-500"
                          : "border-gray-200 hover:border-blue-400"
                      }`}
                      style={{
                        backgroundColor:
                          color.toLowerCase() === "black"
                            ? "#000"
                            : color.toLowerCase() === "white"
                            ? "#fff"
                            : color.toLowerCase() === "blue"
                            ? "#1e40af"
                            : color.toLowerCase() === "gray"
                            ? "#6b7280"
                            : color.toLowerCase() === "red"
                            ? "#ff0000"
                            : "#fff",
                      }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">
                    Size:{" "}
                    <span className="font-normal text-gray-900">
                      {selectedSize}
                    </span>
                  </h3>
                  <button
                    onClick={toggleSizeGuide}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.specs.sizes.split(", ").map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeSelect(size)}
                      className={`rounded-md border px-3 py-2 text-sm text-gray-900 transition ${
                        selectedSize === size
                          ? "border-blue-500 bg-blue-50 text-blue-600"
                          : "border-gray-200 hover:border-blue-400 hover:bg-blue-50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {/* Size Guide Modal */}
                {showSizeGuide && (
                  <div className="mt-4 rounded-md border border-gray-200 p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-gray-900">Size Guide</h4>
                      <button
                        onClick={toggleSizeGuide}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <table className="w-full text-sm text-left text-gray-500">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                          <th className="px-4 py-2">Size</th>
                          <th className="px-4 py-2">Neck Circumference</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white border-b">
                          <td className="px-4 py-2">S</td>
                          <td className="px-4 py-2">13-14 inches</td>
                        </tr>
                        <tr className="bg-white border-b">
                          <td className="px-4 py-2">M</td>
                          <td className="px-4 py-2">14-15 inches</td>
                        </tr>
                        <tr className="bg-white border-b">
                          <td className="px-4 py-2">L</td>
                          <td className="px-4 py-2">15-16 inches</td>
                        </tr>
                        <tr className="bg-white">
                          <td className="px-4 py-2">XL</td>
                          <td className="px-4 py-2">16-17 inches</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <h3 className="mb-2 text-sm font-medium text-gray-900">
                  Quantity:
                </h3>
                <div className="flex w-32">
                  <button
                    onClick={decreaseQuantity}
                    className="rounded-l-md border border-gray-300 text-gray-900 px-3 py-2 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <div className="flex-1 border-t border-b border-gray-300 text-gray-900 py-2 text-center">
                    {quantity}
                  </div>
                  <button
                    onClick={increaseQuantity}
                    className="rounded-r-md border border-gray-300 text-gray-900 px-3 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full rounded-md bg-yellow-400 px-4 py-2 font-medium text-gray-900 shadow-sm hover:bg-yellow-500"
                >
                  Add to Cart
                </button>
              </div>

              {/* Delivery Info */}
              <div className="mt-6 rounded-md border border-gray-200 p-4">
                <div className="flex items-start">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <div className="ml-3">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Delivery:</span> Get it by{" "}
                      {new Date(
                        Date.now() + 5 * 24 * 60 * 60 * 1000
                      ).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="mt-12 border-t border-gray-200 pt-8">
            <h2 className="mb-6 text-xl font-bold text-gray-900">
              Product Details
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-3 text-lg font-medium text-gray-900">
                  Features
                </h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="h-5 w-5 flex-shrink-0 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-2 text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-3 text-lg font-medium text-gray-900">
                  Specifications
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Material</span>
                    <span className="font-medium text-gray-900">
                      {product.specs.material}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Sizes</span>
                    <span className="font-medium text-gray-900">
                      {product.specs.sizes}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Colors</span>
                    <span className="font-medium text-gray-900">
                      {product.specs.colors}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

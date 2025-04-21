import Navbar from "./Components/Navbar";
import Image from "next/image";
import Link from "next/link";
import Footer from "./Components/Footer/Footer";

export default function Home() {
  const products = [
    {
      id: 1,
      name: "Z7 Neck Bracket Pro",
      description: "High performance neck protection for athletes",
      price: "$89.99",
      originalPrice: "$119.99",
      image: "/Product_image/1.jpeg",
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
      image: "/Product_image/2.jpg",
      rating: 4.5,
      reviewCount: 89,
      isPrime: true,
      badge: "NEW",
    },
    {
      id: 3,
      name: "Z7 Neck Brace",
      description: "Everyday neck support with premium comfort",
      price: "$50.99",
      image: "/Product_image/3.jpg",
      rating: 4.5,
      reviewCount: 89,
      isPrime: true,
      badge: "NEW",
    },
    {
      id: 4,
      name: "Pro Gloves",
      description: "Gloves support with premium comfort",
      price: "$50.99",
      image: "/Product_image/4.jpg",
      rating: 5.5,
      reviewCount: 70,
      isPrime: true,
      badge: "NEW",
    },
    {
      id: 5,
      name: "Recovery Gear",
      description: "Recovery gear for support with premium comfort",
      price: "$120.50",
      image: "/Product_image/5.jpg",
      rating: 5.8,
      reviewCount: 70,
      isPrime: true,
      badge: "NEW",
    },
  ];
  const categories = [
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

  return (
    <>
      <main className="bg-gray-100">
        <Navbar />

        {/* Modern Hero Carousel with Background Image */}
        <div className="relative">
          <div className="relative h-[90vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center">
            {/* Background Image with overlay */}
            <div className="absolute inset-0 bg-black/20 z-0" />
            <Image
              src="/assets/Logo.jpg"
              alt="Neck support products"
              fill
              className="object-cover"
              priority
              quality={100}
            />

            {/* Optional Content Overlay */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto bg-black/50 p-8 rounded-xl backdrop-blur-sm">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Professional Neck Support Solutions
              </h1>
              <p className="text-white text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed">
                Engineered for athletes who demand superior protection
              </p>
              <Link
                href="#featured"
                className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>

        {/* Category Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <h2 className="text-xl text-gray-900  font-bold mb-6">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={`/category/${category.slug}`}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden group"
              >
                <div className="relative h-48 sm:h-56">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover  group-hover:opacity-90 transition-opacity"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900">{category.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {category.description}
                  </p>
                  <p className="text-blue-600 text-sm mt-2 font-medium">
                    Explore {category.name}
                  </p>
                  <p className="text-blue-600 text-sm mt-1">Shop now</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products - Improved Image Positioning */}
        <section id="featured" className="bg-white py-8 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Featured Products
              </h2>
              <Link
                href="/products"
                className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium"
              >
                See all products →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white group relative border border-gray-200 rounded-md hover:shadow-lg transition-shadow duration-200 h-full flex flex-col"
                >
                  {/* Improved Image Container */}
                  <div className="relative pt-[100%] bg-gray-50">
                    {" "}
                    {/* 1:1 Aspect Ratio Container */}
                    <div className="absolute inset-0 p-4 flex items-center justify-center">
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
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      />
                    </div>
                  </div>

                  {/* Product Info - Now properly aligned at bottom */}
                  <div className="p-3 mt-auto">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 min-h-[40px]">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center mt-1 mb-1">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-3 h-3 ${
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
                        {product.rating}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="mt-1">
                      <span className="text-lg font-bold text-[#B12704]">
                        {product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-500 line-through ml-1">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>

                    {/* Prime Badge */}
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

                    {/* View Details Button */}
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
          </div>
        </section>

        {/* Value Propositions */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Free Shipping",
                description: "Free delivery on all orders over $50",
                icon: "M8 8h8m-4-4v8m-8 0h16a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-8",
              },
              {
                title: "30-Day Returns",
                description: "Hassle-free return policy",
                icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
              },
              {
                title: "Secure Payment",
                description: "100% secure checkout",
                icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start"
              >
                <div className="bg-blue-100 p-2 rounded-full mr-4">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={item.icon}
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

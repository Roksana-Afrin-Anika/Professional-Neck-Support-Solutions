"use client";
export const dynamic = "force-dynamic";
import Navbar from "../Components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity?: number;
  color?: string;
  size?: string;
  features?: string[];
  specs?: {
    material: string;
    sizes: string;
    colors: string;
  };
}

// Product data should match what's in your product detail page
const allProducts: Product[] = [
  // Neck braces
  {
    id: 1,
    name: "Z7 Neck Bracket Pro",
    price: "$89.99",
    image: "/category/neck-braces/1.jpeg",
  },
  {
    id: 2,
    name: "Z7 Neck Bracket Lite",
    price: "$69.99",
    image: "/category/neck-braces/2.jpg",
  },
  {
    id: 3,
    name: "Neck Support Deluxe",
    price: "$99.99",
    image: "/category/neck-braces/3.jpg",
  },
  // Gloves
  {
    id: 4,
    name: "Compression Glove Pro",
    price: "$39.99",
    image: "/category/Gloves/1.jpg",
  },
  {
    id: 5,
    name: "Grip Master Gloves",
    price: "$29.99",
    image: "/category/Gloves/2.jpg",
  },
  {
    id: 6,
    name: "Grip Master Gloves",
    price: "$69.99",
    image: "/category/Gloves/3.jpg",
  },
  // Arm sleeves
  {
    id: 7,
    name: "Performance Arm Sleeve",
    price: "$24.99",
    image: "/category/arm-sleeves/1.jpg",
  },
  {
    id: 8,
    name: "Recovery Arm Sleeve",
    price: "$27.99",
    image: "/category/arm-sleeves/2.jpg",
  },
  {
    id: 9,
    name: "Recovery Arm Sleeve",
    price: "$27.99",
    image: "/category/arm-sleeves/3.jpg",
  },
  // Recovery gear
  {
    id: 10,
    name: "Muscle Recovery Roller",
    price: "$34.99",
    image: "/category/Recovery-Gear/1.jpg",
  },
  {
    id: 11,
    name: "Therapy Massage Gun",
    price: "$149.99",
    image: "/category/Recovery-Gear/2.jpg",
  },
  {
    id: 12,
    name: "Therapy Massage Gun",
    price: "$149.99",
    image: "/category/Recovery-Gear/3.jpg",
  },
];

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    email: "",
    phone: "",
    paymentMethod: "creditCard",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    saveInfo: false,
    giftWrap: false,
  });
  const [activeStep, setActiveStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Initialize cart from URL parameters and localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Load cart from localStorage if available
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

    // Check for productId in URL to add to cart
    const productId = searchParams?.get("productId");
    if (productId) {
      addToCart(Number(productId));
    }
  }, [searchParams]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add product to cart or increment quantity if already exists
  const addToCart = (productId: number) => {
    if (typeof window === "undefined") return; // prevent SSR
    const productToAdd = allProducts.find((p) => p.id === productId);
    if (!productToAdd) return;

    // Get details from URL parameters
    const urlQuantity = searchParams ? searchParams.get("quantity") : null;
    const quantity = urlQuantity ? parseInt(urlQuantity) : 1;
    const color = searchParams ? searchParams.get("color") : null;
    const size = searchParams ? searchParams.get("size") : null;

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productId);

      if (existingItem) {
        // If item exists, update quantity and keep existing color/size
        return prevItems.map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: (item.quantity || 1) + quantity,
                // Only update color/size if they're provided in URL
                ...(color && { color }),
                ...(size && { size }),
              }
            : item
        );
      } else {
        // If item doesn't exist, add it with all details
        return [
          ...prevItems,
          {
            ...productToAdd,
            quantity,
            ...(color && { color }),
            ...(size && { size }),
          },
        ];
      }
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price.replace("$", ""));
      return sum + price * (item.quantity || 1);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = subtotal > 35 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeStep === 3) {
      // Process order
      setOrderPlaced(true);
      // Clear cart after order is placed
      localStorage.removeItem("cart");
      setCartItems([]);
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  if (orderPlaced) {
    return (
      <main className="bg-[#f5f5f5] min-h-screen">
        <Navbar />
        <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-md shadow-sm border border-gray-200 text-center">
            <div className="mb-6">
              <svg
                className="w-16 h-16 text-green-500 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Order Confirmed!
            </h1>
            <p className="text-gray-700 mb-6">
              Thank you for your purchase. Your order has been received and is
              being processed.
            </p>
            <p className="text-gray-700 mb-8">
              A confirmation email has been sent to{" "}
              <span className="font-semibold">{formData.email}</span>
            </p>
            <Link
              href="/"
              className="bg-[#FFD814] hover:bg-[#F7CA00] text-black font-bold py-2 px-6 rounded-md inline-block border border-[#FCD200]"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <main className="bg-[#f5f5f5] min-h-screen">
        <Navbar />
        <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center py-8 bg-white rounded-md shadow-sm border border-gray-200">
            <h2 className="text-xl font-medium text-gray-800 mb-4">
              Your cart is empty
            </h2>
            <Link
              href="/"
              className="bg-[#FFD814] hover:bg-[#F7CA00] text-black font-bold py-2 px-6 rounded-md inline-block border border-[#FCD200]"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#f5f5f5] min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-6">
          <Link href="/" className="text-blue-600 hover:underline">
            <span className="font-medium">Back to shop</span>
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Checkout Form */}
          <div className="flex-1">
            {/* Checkout Steps */}
            <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200 mb-4">
              <div className="flex justify-between items-center">
                <div
                  className={`flex items-center ${
                    activeStep >= 1
                      ? "text-[#067D62] font-semibold"
                      : "text-gray-500"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activeStep >= 1
                        ? "bg-[#067D62] text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    1
                  </div>
                  <span className="ml-2">Address</span>
                </div>
                <div className="flex-1 h-1 mx-2 bg-gray-200">
                  {activeStep > 1 && <div className="h-1 bg-[#067D62]"></div>}
                </div>
                <div
                  className={`flex items-center ${
                    activeStep >= 2
                      ? "text-[#067D62] font-semibold"
                      : "text-gray-500"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activeStep >= 2
                        ? "bg-[#067D62] text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    2
                  </div>
                  <span className="ml-2">Payment</span>
                </div>
                <div className="flex-1 h-1 mx-2 bg-gray-200">
                  {activeStep > 2 && <div className="h-1 bg-[#067D62]"></div>}
                </div>
                <div
                  className={`flex items-center ${
                    activeStep >= 3
                      ? "text-[#067D62] font-semibold"
                      : "text-gray-500"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activeStep >= 3
                        ? "bg-[#067D62] text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    3
                  </div>
                  <span className="ml-2">Review</span>
                </div>
              </div>
            </div>

            {/* Form Sections */}
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded-md shadow-sm border border-gray-200"
            >
              {activeStep === 1 && (
                <>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Shipping Address
                  </h2>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFA41C] focus:border-[#FF8F00] text-gray-900"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFA41C] focus:border-[#FF8F00] text-gray-900"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFA41C] focus:border-[#FF8F00] text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFA41C] focus:border-[#FF8F00] text-gray-900"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFA41C] focus:border-[#FF8F00] text-gray-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFA41C] focus:border-[#FF8F00] text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFA41C] focus:border-[#FF8F00] text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFA41C] focus:border-[#FF8F00] text-gray-900"
                      />
                    </div>
                  </div>

                  <div className="flex items-center mb-6">
                    <input
                      type="checkbox"
                      id="saveInfo"
                      name="saveInfo"
                      checked={formData.saveInfo}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-[#067D62] focus:ring-[#FFA41C] border-gray-300 rounded"
                    />
                    <label
                      htmlFor="saveInfo"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Save this information for next time
                    </label>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-[#FFD814] hover:bg-[#F7CA00] text-black font-medium py-2 px-6 rounded-md shadow-sm border border-[#FCD200] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFA41C]"
                    >
                      Continue to payment
                    </button>
                  </div>
                </>
              )}

              {activeStep === 2 && (
                <>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Payment Method
                  </h2>

                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <input
                        type="radio"
                        id="creditCard"
                        name="paymentMethod"
                        value="creditCard"
                        checked={formData.paymentMethod === "creditCard"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-[#067D62] focus:ring-[#FFA41C] border-gray-300"
                      />
                      <label
                        htmlFor="creditCard"
                        className="ml-2 block text-sm font-medium text-gray-700"
                      >
                        Credit or debit card
                      </label>
                    </div>

                    {formData.paymentMethod === "creditCard" && (
                      <div className="ml-6 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Card number
                          </label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            required
                            placeholder="1234 5678 9012 3456"
                            className="w-full border border-gray-300 px-3 text-gray-900 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFA41C] focus:border-[#FF8F00]"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name on card
                          </label>
                          <input
                            type="text"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleInputChange}
                            required
                            className="w-full border border-gray-300 px-3 text-gray-900 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFA41C] focus:border-[#FF8F00]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Expiration date
                            </label>
                            <input
                              type="text"
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleInputChange}
                              required
                              placeholder="MM/YY"
                              className="w-full border border-gray-300 px-3 text-gray-900 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFA41C] focus:border-[#FF8F00]"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              CVV
                            </label>
                            <input
                              type="text"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleInputChange}
                              required
                              className="w-full border border-gray-300 px-3 text-gray-900 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFA41C] focus:border-[#FF8F00]"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <input
                        type="radio"
                        id="paypal"
                        name="paymentMethod"
                        value="paypal"
                        checked={formData.paymentMethod === "paypal"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-[#067D62] focus:ring-[#FFA41C] border-gray-300"
                      />
                      <label
                        htmlFor="paypal"
                        className="ml-2 block text-sm font-medium text-gray-700"
                      >
                        PayPal
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center mb-6">
                    <input
                      type="checkbox"
                      id="giftWrap"
                      name="giftWrap"
                      checked={formData.giftWrap}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-[#067D62] focus:ring-[#FFA41C] border-gray-300 rounded"
                    />
                    <label
                      htmlFor="giftWrap"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Gift wrap items (+$5.99)
                    </label>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveStep(1)}
                      className="text-gray-600 hover:text-gray-800 font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFA41C]"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="bg-[#FFD814] hover:bg-[#F7CA00] text-black font-medium py-2 px-6 rounded-md shadow-sm border border-[#FCD200] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFA41C]"
                    >
                      Review your order
                    </button>
                  </div>
                </>
              )}

              {activeStep === 3 && (
                <>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Review your order
                  </h2>

                  <div className="mb-6 bg-gray-50 p-4 rounded-md">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Shipping address
                    </h3>
                    <p className="text-gray-700">
                      {formData.firstName} {formData.lastName}
                    </p>
                    <p className="text-gray-700">{formData.address}</p>
                    <p className="text-gray-700">
                      {formData.city}, {formData.state} {formData.zipCode}
                    </p>
                    <p className="text-gray-700">{formData.phone}</p>
                    <p className="text-gray-700">{formData.email}</p>
                    <button
                      type="button"
                      onClick={() => setActiveStep(1)}
                      className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Change
                    </button>
                  </div>

                  <div className="mb-6 bg-gray-50 p-4 rounded-md">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Payment method
                    </h3>
                    {formData.paymentMethod === "creditCard" ? (
                      <>
                        <p className="text-gray-700">
                          Credit card ending in {formData.cardNumber.slice(-4)}
                        </p>
                        <p className="text-gray-700">
                          Expires {formData.expiryDate}
                        </p>
                      </>
                    ) : (
                      <p className="text-gray-700">PayPal</p>
                    )}
                    <button
                      type="button"
                      onClick={() => setActiveStep(2)}
                      className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Change
                    </button>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Items
                    </h3>
                    {/* In the main form section */}
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start py-4 border-b border-gray-200"
                      >
                        <div className="relative w-20 h-20 mr-4">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-contain"
                            sizes="80px"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-900 font-medium">
                            {item.name}
                          </p>
                          <p className="text-gray-600">{item.price}</p>
                          {/* Add color and size information */}
                          {item.color && (
                            <p className="text-sm text-gray-600 mt-1">
                              Color:{" "}
                              <span className="text-gray-900">
                                {item.color}
                              </span>
                            </p>
                          )}
                          {item.size && (
                            <p className="text-sm text-gray-600">
                              Size:{" "}
                              <span className="text-gray-900">{item.size}</span>
                            </p>
                          )}
                          <div className="flex items-center mt-2">
                            <span className="text-sm text-gray-600 mr-2">
                              Quantity:
                            </span>
                            <select
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(
                                  item.id,
                                  parseInt(e.target.value)
                                )
                              }
                              className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                            >
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                <option key={num} value={num}>
                                  {num}
                                </option>
                              ))}
                            </select>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="ml-4 text-blue-600 hover:text-blue-800 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveStep(2)}
                      className="text-gray-600 hover:text-gray-800 font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFA41C]"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="bg-[#FFA41C] hover:bg-[#FA8900] text-black font-medium py-2 px-6 rounded-md shadow-sm border border-[#FF8F00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFA41C]"
                    >
                      Place your order
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="w-full lg:w-80">
            <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200 sticky top-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-start border-b pb-4">
                    <div className="relative w-16 h-16 mr-3 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">
                        {item.name}
                      </h3>
                      {/* Add color and size information */}
                      {item.color && (
                        <p className="text-xs text-gray-600 mt-1">
                          Color: {item.color}
                        </p>
                      )}
                      {item.size && (
                        <p className="text-xs text-gray-600">
                          Size: {item.size}
                        </p>
                      )}
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-gray-900 mr-2">Qty:</span>
                        <select
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              parseInt(e.target.value)
                            )
                          }
                          className="border border-gray-300 text-gray-900 rounded text-xs py-0.5 px-1"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="ml-2 text-xs text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      $
                      {(
                        parseFloat(item.price.replace("$", "")) *
                        (item.quantity || 1)
                      ).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-900">Subtotal:</span>
                  <span className="text-gray-600">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Shipping:</span>
                  <span className="text-gray-900">
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Tax:</span>
                  <span className="text-gray-900">${tax.toFixed(2)}</span>
                </div>
                {formData.giftWrap && (
                  <div className="flex justify-between">
                    <span className="text-gray-900">Gift wrap:</span>
                    <span className="text-gray-900">$5.99</span>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex justify-between font-semibold text-gray-900">
                  <span>Order Total:</span>
                  <span className="text-gray-900">
                    ${(total + (formData.giftWrap ? 5.99 : 0)).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Continue/Review/Place Order button based on step */}
              {activeStep === 1 && (
                <button
                  type="submit"
                  className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-black font-medium py-2 rounded-md shadow-sm border border-[#FCD200]"
                >
                  Continue to payment
                </button>
              )}

              {activeStep === 2 && (
                <button
                  type="submit"
                  className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-black font-medium py-2 rounded-md shadow-sm border border-[#FCD200]"
                >
                  Review your order
                </button>
              )}

              {activeStep === 3 && (
                <button
                  type="submit"
                  className="w-full bg-[#FFA41C] hover:bg-[#FA8900] text-black font-medium py-2 rounded-md shadow-sm border border-[#FF8F00]"
                >
                  Place your order
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

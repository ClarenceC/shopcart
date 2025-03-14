export type Product = {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
}

export const products: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "Premium noise-cancelling wireless headphones with long battery life.",
    price: 199.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Electronics",
  },
  {
    id: 2,
    name: "Smartphone",
    description: "Latest model smartphone with high-resolution camera and fast processor.",
    price: 799.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Electronics",
  },
  {
    id: 3,
    name: "Running Shoes",
    description: "Lightweight and comfortable running shoes for all terrains.",
    price: 89.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Footwear",
  },
  {
    id: 4,
    name: "Coffee Maker",
    description: "Programmable coffee maker with thermal carafe to keep your coffee hot.",
    price: 129.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Home Appliances",
  },
  {
    id: 5,
    name: "Backpack",
    description: "Durable backpack with multiple compartments and laptop sleeve.",
    price: 59.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Accessories",
  },
  {
    id: 6,
    name: "Fitness Tracker",
    description: "Water-resistant fitness tracker with heart rate monitor and sleep tracking.",
    price: 79.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Electronics",
  },
  {
    id: 7,
    name: "Wireless Earbuds",
    description: "True wireless earbuds with charging case and noise isolation.",
    price: 149.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Electronics",
  },
  {
    id: 8,
    name: "Desk Lamp",
    description: "Adjustable desk lamp with multiple brightness levels and color temperatures.",
    price: 49.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Home Decor",
  },
]


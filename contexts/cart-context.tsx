"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type CartItem = {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  selected: boolean
}

type CartContextType = {
  items: CartItem[]
  addToCart: (product: Omit<CartItem, "quantity" | "selected">) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  selectedItems: number
  selectedTotalPrice: number
  toggleSelectItem: (id: number) => void
  toggleSelectAll: () => void
  selectAll: () => void
  deselectAll: () => void
  isAllSelected: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on client side
  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      setItems(JSON.parse(storedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("cart", JSON.stringify(items))
    }
  }, [items])

  const addToCart = (product: Omit<CartItem, "quantity" | "selected">) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        return prevItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [...prevItems, { ...product, quantity: 1, selected: true }]
      }
    })
  }

  const removeFromCart = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))

    // If cart becomes empty, remove from localStorage
    if (items.length === 1) {
      localStorage.removeItem("cart")
    }
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }

    setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setItems([])
    localStorage.removeItem("cart")
  }

  const totalItems = items.reduce((total, item) => total + item.quantity, 0)

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)

  const toggleSelectItem = (id: number) => {
    setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item)))
  }

  const toggleSelectAll = () => {
    const allSelected = items.every((item) => item.selected)
    setItems((prevItems) => prevItems.map((item) => ({ ...item, selected: !allSelected })))
  }

  const selectAll = () => {
    setItems((prevItems) => prevItems.map((item) => ({ ...item, selected: true })))
  }

  const deselectAll = () => {
    setItems((prevItems) => prevItems.map((item) => ({ ...item, selected: false })))
  }

  const isAllSelected = items.length > 0 && items.every((item) => item.selected)

  const selectedItems = items.filter((item) => item.selected).length

  const selectedTotalPrice = items
    .filter((item) => item.selected)
    .reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        selectedItems,
        selectedTotalPrice,
        toggleSelectItem,
        toggleSelectAll,
        selectAll,
        deselectAll,
        isAllSelected,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}


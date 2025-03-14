"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"
import { Checkbox } from "@/components/ui/checkbox"

export default function CartPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    selectedTotalPrice,
    toggleSelectItem,
    toggleSelectAll,
    isAllSelected,
    selectedItems,
  } = useCart()

  const handleCheckout = () => {
    if (selectedItems === 0) {
      toast({
        title: "No items selected",
        description: "Please select at least one item to checkout.",
        variant: "destructive",
        duration: 3000,
      })
      return
    }

    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase.",
      duration: 3000,
    })
    clearCart()
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-10">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <p className="text-muted-foreground">Add some products to your cart to see them here.</p>
        <Button asChild>
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <Button variant="outline" onClick={clearCart}>
          Clear Cart
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Checkbox id="select-all" checked={isAllSelected} onCheckedChange={toggleSelectAll} />
            <label
              htmlFor="select-all"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {isAllSelected ? "Deselect All" : "Select All"} ({items.length} items)
            </label>
          </div>

          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="flex items-center">
                    <Checkbox
                      id={`item-${item.id}`}
                      checked={item.selected}
                      onCheckedChange={() => toggleSelectItem(item.id)}
                    />
                  </div>
                  <div className="h-24 w-24 relative flex-shrink-0 overflow-hidden rounded-md">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                          <span className="sr-only">Decrease quantity</span>
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                          <span className="sr-only">Increase quantity</span>
                        </Button>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove item</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items
                .filter((item) => item.selected)
                .map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              {selectedItems === 0 && <p className="text-sm text-muted-foreground">No items selected</p>}
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total ({selectedItems} items)</span>
                <span>${selectedTotalPrice.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleCheckout} disabled={selectedItems === 0}>
                Checkout ({selectedItems} items)
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}


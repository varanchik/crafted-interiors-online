
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Package, Settings, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Account = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, City, State 12345"
  });

  const [newOrder, setNewOrder] = useState({
    type: '',
    description: '',
    dimensions: { width: '', height: '', depth: '' },
    material: '',
    budget: ''
  });

  const orders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      status: "In Production",
      items: [
        { name: "Oak Dining Table", quantity: 1, price: 1299 }
      ],
      total: 1299,
      estimatedDelivery: "2024-02-28"
    },
    {
      id: "ORD-002", 
      date: "2023-12-10",
      status: "Delivered",
      items: [
        { name: "Leather Armchair", quantity: 2, price: 899 }
      ],
      total: 1798,
      deliveredDate: "2024-01-05"
    },
    {
      id: "ORD-003",
      date: "2023-11-20",
      status: "Completed",
      items: [
        { name: "Walnut Coffee Table", quantity: 1, price: 699 },
        { name: "Side Table", quantity: 2, price: 299 }
      ],
      total: 1297,
      deliveredDate: "2023-12-15"
    }
  ];

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleNewOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Order Submitted",
      description: "Your custom order request has been submitted. We'll contact you within 24 hours.",
    });
    setNewOrder({
      type: '',
      description: '',
      dimensions: { width: '', height: '', depth: '' },
      material: '',
      budget: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Production':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'Delivered':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'Completed':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-2">
              My Account
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage your profile, orders, and custom furniture requests
            </p>
          </div>

          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="orders" className="flex items-center space-x-2">
                <Package className="h-4 w-4" />
                <span>Orders</span>
              </TabsTrigger>
              <TabsTrigger value="new-order" className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>New Order</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </TabsTrigger>
            </TabsList>

            {/* Orders Tab */}
            <TabsContent value="orders" className="mt-8">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-serif font-semibold">Order History</h2>
                  <Badge variant="secondary">
                    {orders.length} Total Orders
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id} className="border-0 shadow-soft">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                          <div className="space-y-3">
                            <div className="flex items-center space-x-4">
                              <h3 className="font-semibold text-lg">Order {order.id}</h3>
                              <Badge className={getStatusColor(order.status)}>
                                {order.status}
                              </Badge>
                            </div>
                            
                            <div className="space-y-1">
                              {order.items.map((item, index) => (
                                <p key={index} className="text-sm text-muted-foreground">
                                  {item.quantity}x {item.name} - ${item.price.toLocaleString()}
                                </p>
                              ))}
                            </div>
                            
                            <div className="text-sm text-muted-foreground">
                              <p>Order Date: {new Date(order.date).toLocaleDateString()}</p>
                              {order.status === 'In Production' && order.estimatedDelivery && (
                                <p>Estimated Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}</p>
                              )}
                              {order.deliveredDate && (
                                <p>Delivered: {new Date(order.deliveredDate).toLocaleDateString()}</p>
                              )}
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary mb-2">
                              ${order.total.toLocaleString()}
                            </div>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* New Order Tab */}
            <TabsContent value="new-order" className="mt-8">
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Plus className="h-5 w-5 text-primary" />
                    <span>Submit Custom Order Request</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleNewOrderSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="order-type">Furniture Type *</Label>
                        <Select value={newOrder.type} onValueChange={(value) => setNewOrder(prev => ({ ...prev, type: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select furniture type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="table">Table</SelectItem>
                            <SelectItem value="chair">Chair/Seating</SelectItem>
                            <SelectItem value="wardrobe">Wardrobe/Storage</SelectItem>
                            <SelectItem value="bookshelf">Bookshelf</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="material">Preferred Material</Label>
                        <Select value={newOrder.material} onValueChange={(value) => setNewOrder(prev => ({ ...prev, material: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select material" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="oak">Oak</SelectItem>
                            <SelectItem value="walnut">Walnut</SelectItem>
                            <SelectItem value="cherry">Cherry</SelectItem>
                            <SelectItem value="maple">Maple</SelectItem>
                            <SelectItem value="mahogany">Mahogany</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">Project Description *</Label>
                      <Textarea
                        id="description"
                        value={newOrder.description}
                        onChange={(e) => setNewOrder(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe your vision, style preferences, and any specific requirements..."
                        rows={4}
                        required
                      />
                    </div>

                    <div>
                      <Label className="text-base font-medium mb-3 block">Custom Dimensions</Label>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="width" className="text-sm">Width (inches)</Label>
                          <Input
                            id="width"
                            placeholder="72"
                            value={newOrder.dimensions.width}
                            onChange={(e) => setNewOrder(prev => ({ 
                              ...prev, 
                              dimensions: { ...prev.dimensions, width: e.target.value }
                            }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="height" className="text-sm">Height (inches)</Label>
                          <Input
                            id="height"
                            placeholder="30"
                            value={newOrder.dimensions.height}
                            onChange={(e) => setNewOrder(prev => ({ 
                              ...prev, 
                              dimensions: { ...prev.dimensions, height: e.target.value }
                            }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="depth" className="text-sm">Depth (inches)</Label>
                          <Input
                            id="depth"
                            placeholder="36"
                            value={newOrder.dimensions.depth}
                            onChange={(e) => setNewOrder(prev => ({ 
                              ...prev, 
                              dimensions: { ...prev.dimensions, depth: e.target.value }
                            }))}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="budget">Budget Range</Label>
                      <Select value={newOrder.budget} onValueChange={(value) => setNewOrder(prev => ({ ...prev, budget: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-500">Under $500</SelectItem>
                          <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                          <SelectItem value="1000-2000">$1,000 - $2,000</SelectItem>
                          <SelectItem value="2000-5000">$2,000 - $5,000</SelectItem>
                          <SelectItem value="over-5000">Over $5,000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button type="submit" className="btn-primary w-full">
                      Submit Order Request
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="mt-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-primary" />
                      <span>Profile Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <div>
                        <Label htmlFor="profile-name">Full Name</Label>
                        <Input
                          id="profile-name"
                          value={profile.name}
                          onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="profile-email">Email Address</Label>
                        <Input
                          id="profile-email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="profile-phone">Phone Number</Label>
                        <Input
                          id="profile-phone"
                          value={profile.phone}
                          onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="profile-address">Address</Label>
                        <Textarea
                          id="profile-address"
                          value={profile.address}
                          onChange={(e) => setProfile(prev => ({ ...prev, address: e.target.value }))}
                          rows={3}
                        />
                      </div>
                      
                      <Button type="submit" className="btn-primary w-full">
                        Update Profile
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="h-5 w-5 text-primary" />
                      <span>Account Settings</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Password</h4>
                      <Button variant="outline" className="w-full">
                        Change Password
                      </Button>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Notifications</h4>
                      <div className="space-y-2 text-sm">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                          <span>Order updates via email</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                          <span>New product announcements</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded border-gray-300" />
                          <span>Promotional offers</span>
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Account Actions</h4>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full">
                          Download My Data
                        </Button>
                        <Button variant="destructive" className="w-full">
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Account;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    projectType: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    toast({
      title: "Message Sent",
      description: "Thank you for your inquiry. We'll get back to you within 24 hours.",
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      projectType: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone",
      info: "+1 (555) 123-4567",
      description: "Mon-Fri, 9:00 AM - 6:00 PM"
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      info: "info@craftfurniture.com",
      description: "We respond within 24 hours"
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Visit Our Showroom",
      info: "123 Craft Street, Design City, DC 12345",
      description: "By appointment only"
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Business Hours",
      info: "Mon-Fri: 9:00 AM - 6:00 PM",
      description: "Sat: 10:00 AM - 4:00 PM, Sun: Closed"
    }
  ];

  const faqs = [
    {
      question: "How long does it take to complete a custom piece?",
      answer: "Most custom pieces take 4-8 weeks to complete, depending on complexity and our current workload. We'll provide a detailed timeline during your consultation."
    },
    {
      question: "Do you offer delivery and setup?",
      answer: "Yes, we offer free delivery within 50 miles and can help with setup for an additional fee. For longer distances, we can arrange shipping."
    },
    {
      question: "What types of wood do you work with?",
      answer: "We work with a variety of sustainably sourced hardwoods including oak, walnut, cherry, maple, and mahogany. We can also source specialty woods upon request."
    },
    {
      question: "Can you match existing furniture?",
      answer: "Absolutely! We can match stains, finishes, and styles to complement your existing furniture pieces."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-beige-light to-beige-default">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
              Get In Touch
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-foreground">
              Let's Create Something
              <span className="text-primary block">Beautiful Together</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Ready to transform your space with custom furniture? We'd love to hear about your project and help bring your vision to life.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-soft-lg">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
                        Send Us a Message
                      </h2>
                      <p className="text-muted-foreground">
                        Tell us about your project and we'll get back to you with a detailed quote.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                        <div>
                          <Label htmlFor="projectType">Project Type</Label>
                          <Select value={formData.projectType} onValueChange={(value) => handleInputChange('projectType', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select project type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="table">Table</SelectItem>
                              <SelectItem value="chair">Chair/Seating</SelectItem>
                              <SelectItem value="wardrobe">Wardrobe/Storage</SelectItem>
                              <SelectItem value="multiple">Multiple Pieces</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          placeholder="Custom dining table inquiry"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="message">Project Details *</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          placeholder="Tell us about your project, including dimensions, style preferences, timeline, and budget..."
                          rows={6}
                          required
                        />
                      </div>

                      <Button type="submit" className="btn-primary w-full">
                        Send Message
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="border-0 shadow-soft">
                <CardContent className="p-6">
                  <h3 className="font-serif font-semibold text-xl mb-6">Contact Information</h3>
                  <div className="space-y-6">
                    {contactInfo.map((item, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                          <p className="text-foreground text-sm mb-1">{item.info}</p>
                          <p className="text-muted-foreground text-xs">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-soft">
                <CardContent className="p-6">
                  <h3 className="font-serif font-semibold text-xl mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                      <Twitter className="h-5 w-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-soft bg-primary text-white">
                <CardContent className="p-6">
                  <h3 className="font-serif font-semibold text-xl mb-4">Book a Consultation</h3>
                  <p className="text-sm opacity-90 mb-4">
                    Schedule a free consultation to discuss your project in detail.
                  </p>
                  <Button variant="secondary" className="bg-white text-primary hover:bg-gray-100 w-full">
                    Schedule Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-0">
        <div className="container mx-auto px-4">
          <Card className="border-0 shadow-soft overflow-hidden">
            <div className="h-96 bg-muted flex items-center justify-center">
              <div className="text-center space-y-2">
                <MapPin className="h-12 w-12 text-primary mx-auto" />
                <h3 className="font-semibold text-lg">Visit Our Showroom</h3>
                <p className="text-muted-foreground">123 Craft Street, Design City, DC 12345</p>
                <p className="text-sm text-muted-foreground">By appointment only</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Common questions about our custom furniture process
              </p>
            </div>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="border-0 shadow-soft bg-white">
                  <CardContent className="p-6">
                    <h3 className="font-serif font-semibold text-lg mb-3">{faq.question}</h3>
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

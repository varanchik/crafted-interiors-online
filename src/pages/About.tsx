
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Award, Leaf, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => {
  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Craftsmanship",
      description: "Every piece is handcrafted with attention to detail and passion for excellence"
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Sustainability",
      description: "We use only sustainably sourced materials and eco-friendly processes"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Customer Focus",
      description: "Your vision and satisfaction are at the heart of everything we create"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Quality",
      description: "Premium materials and traditional techniques ensure lasting beauty"
    }
  ];

  const team = [
    {
      name: "David Thompson",
      role: "Master Craftsman & Founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      bio: "With over 25 years of woodworking experience, David founded CraftFurniture to share his passion for creating beautiful, functional pieces."
    },
    {
      name: "Sarah Martinez",
      role: "Design Director",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      bio: "Sarah brings a modern aesthetic to traditional craftsmanship, ensuring each piece perfectly balances form and function."
    },
    {
      name: "Michael Chen",
      role: "Production Manager",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      bio: "Michael oversees our production process, ensuring every piece meets our rigorous quality standards before reaching your home."
    }
  ];

  const stats = [
    { number: "15+", label: "Years of Experience" },
    { number: "500+", label: "Happy Customers" },
    { number: "1000+", label: "Pieces Crafted" },
    { number: "98%", label: "Customer Satisfaction" }
  ];

  const processes = [
    {
      step: "01",
      title: "Design Consultation",
      description: "We work closely with you to understand your vision and requirements"
    },
    {
      step: "02",
      title: "Material Selection",
      description: "Choose from our premium selection of sustainably sourced woods"
    },
    {
      step: "03",
      title: "Crafting Process",
      description: "Our skilled artisans handcraft your piece using traditional techniques"
    },
    {
      step: "04",
      title: "Quality Control",
      description: "Every piece undergoes rigorous quality checks before delivery"
    },
    {
      step: "05",
      title: "Delivery & Setup",
      description: "We carefully deliver and can help set up your new furniture"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-beige-light to-beige-default">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
              Our Story
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-foreground">
              Crafting Beautiful Furniture
              <span className="text-primary block">Since 2009</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              What started as a small workshop in our garage has grown into a passionate team of craftspeople dedicated to creating furniture that tells your story and stands the test of time.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
                Our Journey
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  CraftFurniture was born from a simple belief: that furniture should be more than just functional—it should be personal, beautiful, and built to last. Founded by master craftsman David Thompson in 2009, our company started with a single mission: to create custom furniture pieces that reflect the unique personality and needs of each client.
                </p>
                <p>
                  Over the years, we've grown from a one-person operation to a dedicated team of skilled artisans, designers, and craftspeople. Despite our growth, we've never lost sight of our core values: exceptional craftsmanship, sustainable practices, and personalized service.
                </p>
                <p>
                  Today, we're proud to have created over 1,000 custom pieces for families across the country, each one a testament to the enduring beauty of handcrafted furniture.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop"
                alt="Our workshop"
                className="rounded-2xl shadow-soft-lg w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-soft">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">15+</div>
                  <div className="text-sm text-muted-foreground">Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These core principles guide everything we do, from selecting materials to delivering your finished piece.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-soft bg-white text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                    {value.icon}
                  </div>
                  <h3 className="font-serif font-semibold text-xl mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
              Meet Our Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The passionate craftspeople behind every beautiful piece we create.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-0 shadow-soft bg-white">
                <CardContent className="p-6 text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                  />
                  <h3 className="font-serif font-semibold text-xl mb-1">{member.name}</h3>
                  <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
              Our Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From initial consultation to final delivery, here's how we bring your vision to life.
            </p>
          </div>
          <div className="space-y-8">
            {processes.map((process, index) => (
              <div key={index} className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-8">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {process.step}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-serif font-semibold text-xl mb-2">{process.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{process.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold">
              Ready to Create Something Beautiful?
            </h2>
            <p className="text-lg opacity-90">
              Let's discuss your vision and create a custom piece that perfectly fits your space and style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                  Start Your Project
                </Button>
              </Link>
              <Link to="/catalog">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  View Our Work
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

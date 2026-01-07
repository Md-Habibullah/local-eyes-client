"use client";

import { useState } from "react";
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Send,
    CheckCircle,
    MessageSquare,
    User,
    Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const contactInfo = [
        {
            icon: <Mail className="h-6 w-6" />,
            title: "Email",
            details: "hello@localeyes.com",
            description: "We'll respond within 24 hours"
        },
        {
            icon: <Phone className="h-6 w-6" />,
            title: "Phone",
            details: "+1 (555) 123-4567",
            description: "Mon-Fri, 9AM-6PM EST"
        },
        {
            icon: <MapPin className="h-6 w-6" />,
            title: "Office",
            details: "123 Travel Street",
            description: "San Francisco, CA 94107"
        },
        {
            icon: <Clock className="h-6 w-6" />,
            title: "Support Hours",
            details: "24/7 Emergency",
            description: "For urgent booking issues"
        }
    ];

    const departments = [
        {
            title: "General Inquiries",
            email: "info@localeyes.com",
            description: "Questions about our platform"
        },
        {
            title: "Guide Support",
            email: "guides@localeyes.com",
            description: "For our local guide community"
        },
        {
            title: "Traveler Help",
            email: "help@localeyes.com",
            description: "Booking and experience support"
        },
        {
            title: "Partnerships",
            email: "partners@localeyes.com",
            description: "Business collaborations"
        }
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast.success("Message sent successfully!", {
            description: "We'll get back to you within 24 hours.",
            icon: <CheckCircle className="h-5 w-5 text-green-500" />,
        });

        setFormData({ name: "", email: "", subject: "", message: "" });
        setIsSubmitting(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-background via-background/95 to-background">
            {/* Hero */}
            <section className="relative overflow-hidden py-24">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(59,130,246,0.15),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_80%,rgba(236,72,153,0.1),transparent_50%)]" />

                <div className="relative container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-6">
                            <MessageSquare className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium text-primary">Get in Touch</span>
                        </div>

                        <h1 className="text-6xl font-bold tracking-tight mb-6">
                            Let&apos;s <span className="bg-linear-to-r from-primary to-pink-500 bg-clip-text text-transparent">Connect</span>
                        </h1>

                        <p className="text-2xl text-muted-foreground mb-10">
                            Have questions, feedback, or ready to join our community? We&apos;d love to hear from you.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Cards */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactInfo.map((info, index) => (
                            <div
                                key={index}
                                className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl"
                            >
                                <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {info.icon}
                                </div>
                                <h3 className="font-bold text-lg mb-2">{info.title}</h3>
                                <p className="text-foreground mb-2">{info.details}</p>
                                <p className="text-sm text-muted-foreground">{info.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-20">
                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Contact Form */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold">Send us a message</h2>
                            <p className="text-muted-foreground">
                                Fill out the form below and our team will get back to you as soon as possible.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="text-sm font-medium flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        Your Name
                                    </label>
                                    <Input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Smith"
                                        required
                                        className="h-12"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="text-sm font-medium flex items-center gap-2">
                                        <Mail className="h-4 w-4" />
                                        Email Address
                                    </label>
                                    <Input
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        required
                                        className="h-12"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-medium">Subject</label>
                                <Input
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="How can we help?"
                                    required
                                    className="h-12"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <MessageSquare className="h-4 w-4" />
                                    Your Message
                                </label>
                                <Textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell us what's on your mind..."
                                    rows={6}
                                    required
                                    className="resize-none"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 text-lg gap-3"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-background border-t-transparent" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="h-5 w-5" />
                                        Send Message
                                    </>
                                )}
                            </Button>
                        </form>
                    </div>

                    {/* Departments & FAQ */}
                    <div className="space-y-12">
                        {/* Departments */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold">Contact by Department</h3>
                            <div className="space-y-4">
                                {departments.map((dept, index) => (
                                    <div
                                        key={index}
                                        className="p-6 rounded-xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors duration-300"
                                    >
                                        <h4 className="font-bold text-lg mb-2">{dept.title}</h4>
                                        <div className="flex items-center justify-between">
                                            <p className="text-muted-foreground">{dept.description}</p>
                                            <a
                                                href={`mailto:${dept.email}`}
                                                className="text-primary hover:underline font-medium"
                                            >
                                                {dept.email}
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick FAQ */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold">Quick Questions</h3>
                            <div className="space-y-4">
                                <div className="p-5 rounded-xl bg-card/50 border border-border/50">
                                    <h4 className="font-bold mb-2">How do I become a guide?</h4>
                                    <p className="text-muted-foreground text-sm">
                                        Visit our &quot;Become a Guide&quot; page to start your application process.
                                    </p>
                                    <a href="/become-a-guide" className="text-primary text-sm font-medium hover:underline">
                                        Learn more →
                                    </a>
                                </div>

                                <div className="p-5 rounded-xl bg-card/50 border border-border/50">
                                    <h4 className="font-bold mb-2">Need urgent booking help?</h4>
                                    <p className="text-muted-foreground text-sm">
                                        Call our 24/7 emergency line for immediate assistance with active bookings.
                                    </p>
                                    <a href="tel:+15551234567" className="text-primary text-sm font-medium hover:underline">
                                        Call now →
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Global Support */}
                        <div className="p-6 rounded-2xl bg-linear-to-br from-primary/10 to-pink-500/10 border border-primary/20">
                            <div className="flex items-center gap-3 mb-4">
                                <Globe className="h-6 w-6 text-primary" />
                                <h3 className="text-xl font-bold">Global Support</h3>
                            </div>
                            <p className="text-muted-foreground mb-4">
                                We support multiple languages and time zones. Our team is available worldwide.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">English</span>
                                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">Español</span>
                                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">Français</span>
                                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">中文</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;

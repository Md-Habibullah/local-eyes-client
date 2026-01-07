"use client";

import { useState } from "react";
import {
    FileText,
    Scale,
    AlertCircle,
    CheckCircle,
    UserCheck,
    CreditCard,
    Shield,
    Globe,
    BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";

const TermsPage = () => {
    const [activeSection, setActiveSection] = useState("agreement");

    const sections = [
        { id: "agreement", label: "Agreement", icon: <FileText className="h-4 w-4" /> },
        { id: "eligibility", label: "Eligibility", icon: <UserCheck className="h-4 w-4" /> },
        { id: "accounts", label: "User Accounts", icon: <CheckCircle className="h-4 w-4" /> },
        { id: "content", label: "Content Rules", icon: <BookOpen className="h-4 w-4" /> },
        { id: "bookings", label: "Bookings", icon: <CreditCard className="h-4 w-4" /> },
        { id: "payments", label: "Payments", icon: <Scale className="h-4 w-4" /> },
        { id: "liability", label: "Liability", icon: <AlertCircle className="h-4 w-4" /> },
        { id: "termination", label: "Termination", icon: <Shield className="h-4 w-4" /> },
    ];

    const content = {
        agreement: {
            title: "Terms of Service Agreement",
            effectiveDate: "December 1, 2023",
            content: [
                {
                    type: "paragraph",
                    text: "Welcome to LocalEyes. These Terms of Service govern your access to and use of the LocalEyes platform, including our website, mobile applications, and services."
                },
                {
                    type: "paragraph",
                    text: "By accessing or using LocalEyes, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use our platform."
                },
                {
                    type: "note",
                    text: "These Terms constitute a legally binding agreement between you and LocalEyes."
                }
            ]
        },
        eligibility: {
            title: "Eligibility Requirements",
            content: [
                {
                    type: "heading",
                    text: "Age Requirement"
                },
                {
                    type: "paragraph",
                    text: "You must be at least 18 years old to use LocalEyes. By using our platform, you represent and warrant that you are at least 18 years of age."
                },
                {
                    type: "heading",
                    text: "Guide Requirements"
                },
                {
                    type: "list",
                    items: [
                        "Must be at least 18 years old",
                        "Must have valid identification",
                        "Must pass background verification",
                        "Must have relevant local knowledge and expertise",
                        "Must comply with all local laws and regulations"
                    ]
                },
                {
                    type: "heading",
                    text: "Geographic Restrictions"
                },
                {
                    type: "paragraph",
                    text: "Some features may not be available in all regions. You are responsible for compliance with local laws."
                }
            ]
        },
        accounts: {
            title: "User Accounts",
            content: [
                {
                    type: "heading",
                    text: "Account Creation"
                },
                {
                    type: "paragraph",
                    text: "You must create an account to access certain features. You agree to provide accurate, complete, and current information."
                },
                {
                    type: "heading",
                    text: "Account Security"
                },
                {
                    type: "paragraph",
                    text: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account."
                },
                {
                    type: "list",
                    items: [
                        "Do not share your login credentials",
                        "Notify us immediately of any unauthorized use",
                        "Use strong, unique passwords",
                        "Enable two-factor authentication when available"
                    ]
                },
                {
                    type: "warning",
                    text: "LocalEyes is not liable for any loss or damage arising from your failure to protect your account."
                }
            ]
        },
        content: {
            title: "Content Rules & Guidelines",
            content: [
                {
                    type: "heading",
                    text: "User-Generated Content"
                },
                {
                    type: "paragraph",
                    text: "Users may post content including reviews, messages, photos, and tour descriptions. You retain ownership of your content but grant LocalEyes a license to use it."
                },
                {
                    type: "heading",
                    text: "Prohibited Content"
                },
                {
                    type: "list",
                    items: [
                        "Illegal or fraudulent content",
                        "Hate speech, harassment, or discrimination",
                        "Sexually explicit material",
                        "False or misleading information",
                        "Intellectual property infringement",
                        "Spam or commercial solicitations"
                    ]
                },
                {
                    type: "note",
                    text: "We reserve the right to remove any content that violates these guidelines."
                }
            ]
        },
        bookings: {
            title: "Booking Terms",
            content: [
                {
                    type: "heading",
                    text: "Booking Process"
                },
                {
                    type: "paragraph",
                    text: "Bookings are made directly between travelers and guides. LocalEyes facilitates the transaction but is not a party to the agreement."
                },
                {
                    type: "heading",
                    text: "Cancellation Policies"
                },
                {
                    type: "paragraph",
                    text: "Cancellation policies are set by individual guides and displayed on each tour listing. Standard policies include:"
                },
                {
                    type: "list",
                    items: [
                        "Full refund if cancelled 48+ hours before",
                        "50% refund if cancelled 24-48 hours before",
                        "No refund if cancelled less than 24 hours before",
                        "Weather-related cancellations may be rescheduled"
                    ]
                },
                {
                    type: "heading",
                    text: "Guide Responsibilities"
                },
                {
                    type: "list",
                    items: [
                        "Provide the experience as described",
                        "Arrive on time at the meeting point",
                        "Carry appropriate insurance",
                        "Follow all safety guidelines"
                    ]
                }
            ]
        },
        payments: {
            title: "Payment Terms",
            content: [
                {
                    type: "heading",
                    text: "Payment Processing"
                },
                {
                    type: "paragraph",
                    text: "All payments are processed securely through our payment partners. We use encryption and comply with PCI DSS standards."
                },
                {
                    type: "heading",
                    text: "Service Fees"
                },
                {
                    type: "paragraph",
                    text: "LocalEyes charges a service fee for each booking. This fee is clearly displayed during checkout and helps us maintain the platform."
                },
                {
                    type: "list",
                    items: [
                        "Traveler service fee: 10% of booking total",
                        "Guide service fee: 15% of earnings",
                        "Payment processing fees: 2.9% + $0.30 per transaction"
                    ]
                },
                {
                    type: "heading",
                    text: "Payouts to Guides"
                },
                {
                    type: "paragraph",
                    text: "Guides receive payment 24 hours after the experience completes. Payouts are made via direct deposit, PayPal, or other supported methods."
                }
            ]
        },
        liability: {
            title: "Limitations of Liability",
            content: [
                {
                    type: "heading",
                    text: "Platform Role"
                },
                {
                    type: "paragraph",
                    text: "LocalEyes is a marketplace platform that connects travelers with guides. We do not provide travel services directly."
                },
                {
                    type: "note",
                    text: "LocalEyes is not responsible for the conduct of users or the quality of experiences."
                },
                {
                    type: "heading",
                    text: "Limitation of Liability"
                },
                {
                    type: "list",
                    items: [
                        "LocalEyes liability is limited to the amount you paid in the last 12 months",
                        "We are not liable for indirect, incidental, or consequential damages",
                        "We do not guarantee uninterrupted or error-free service",
                        "Travel insurance is recommended for all bookings"
                    ]
                },
                {
                    type: "heading",
                    text: "Assumption of Risk"
                },
                {
                    type: "paragraph",
                    text: "Travel and experiences involve inherent risks. You voluntarily assume all risks associated with activities booked through LocalEyes."
                }
            ]
        },
        termination: {
            title: "Termination & Suspension",
            content: [
                {
                    type: "heading",
                    text: "User Termination"
                },
                {
                    type: "paragraph",
                    text: "You may terminate your account at any time by contacting support. Certain information may be retained as required by law."
                },
                {
                    type: "heading",
                    text: "Platform Termination Rights"
                },
                {
                    type: "paragraph",
                    text: "LocalEyes may suspend or terminate your account if:"
                },
                {
                    type: "list",
                    items: [
                        "You violate these Terms",
                        "We suspect fraudulent activity",
                        "Required by law or government request",
                        "To protect the safety of our community"
                    ]
                },
                {
                    type: "heading",
                    text: "Effect of Termination"
                },
                {
                    type: "paragraph",
                    text: "Upon termination, your right to use the platform ceases immediately. Outstanding payments will be processed according to these Terms."
                }
            ]
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-background via-background/95 to-background">
            {/* Hero */}
            <section className="relative overflow-hidden py-24">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.1),transparent_50%)]" />

                <div className="relative container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 rounded-xl bg-primary/10">
                                <Scale className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 mb-2">
                                    <FileText className="h-3 w-3 text-primary" />
                                    <span className="text-xs font-medium text-primary">Legal</span>
                                </div>
                                <h1 className="text-5xl font-bold tracking-tight">
                                    Terms of <span className="bg-linear-to-r from-primary to-blue-500 bg-clip-text text-transparent">Service</span>
                                </h1>
                            </div>
                        </div>

                        <div className="mt-8 p-6 rounded-2xl bg-card/50 border border-border/50">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <p className="text-muted-foreground mb-2">Effective Date</p>
                                    <p className="text-lg font-medium">{content.agreement.effectiveDate}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground mb-2">Governing Law</p>
                                    <p className="text-lg font-medium">Dhaka, Bangladesh</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground mb-2">Contact Legal</p>
                                    <a href="mailto:legal@localeyes.com" className="text-primary hover:underline font-medium">
                                        legal@localeyes.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Navigation */}
                    <div className="lg:w-64 shrink-0">
                        <div className="sticky top-24 space-y-2">
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${activeSection === section.id
                                        ? 'bg-primary text-white shadow-lg'
                                        : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    <div className={`${activeSection === section.id ? 'text-white' : 'text-muted-foreground'}`}>
                                        {section.icon}
                                    </div>
                                    <span className="font-medium">{section.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Quick Summary */}
                        <div className="mt-12 p-6 rounded-2xl bg-linear-to-br from-primary/5 to-blue-500/5 border border-primary/10">
                            <h3 className="font-bold mb-4">Quick Summary</h3>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                    <span>Must be 18+ to use</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                    <span>Secure payments protected</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                    <span>Clear cancellation policies</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                                    <span>Travel insurance recommended</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="max-w-3xl">
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold mb-6">
                                    {content[activeSection as keyof typeof content]?.title}
                                </h2>
                            </div>

                            <div className="space-y-8">
                                {content[activeSection as keyof typeof content]?.content.map((item, index) => {
                                    switch (item.type) {
                                        case "paragraph":
                                            return (
                                                <p key={index} className="text-muted-foreground leading-relaxed">
                                                    {item.text}
                                                </p>
                                            );

                                        case "heading":
                                            return (
                                                <h3 key={index} className="text-xl font-bold mt-8 mb-4 text-foreground">
                                                    {item.text}
                                                </h3>
                                            );

                                        case "list":
                                            return (
                                                <ul key={index} className="space-y-3">
                                                    {"items" in item && item!.items!.map((listItem, idx) => (
                                                        <li key={idx} className="flex items-start gap-3">
                                                            <div className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                                                            <span className="text-muted-foreground">{listItem}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            );

                                        case "note":
                                            return (
                                                <div key={index} className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                                    <div className="flex items-start gap-3">
                                                        <CheckCircle className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                                                        <p className="text-blue-700/80">{item.text}</p>
                                                    </div>
                                                </div>
                                            );

                                        case "warning":
                                            return (
                                                <div key={index} className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                                                    <div className="flex items-start gap-3">
                                                        <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                                                        <p className="text-amber-700/80">{item.text}</p>
                                                    </div>
                                                </div>
                                            );

                                        default:
                                            return null;
                                    }
                                })}
                            </div>

                            {/* Key Points */}
                            {activeSection === "agreement" && (
                                <div className="mt-12">
                                    <h3 className="text-2xl font-bold mb-6">Key Points to Understand</h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="p-6 rounded-2xl bg-card border border-border/50">
                                            <div className="flex items-center gap-3 mb-4">
                                                <UserCheck className="h-6 w-6 text-primary" />
                                                <h4 className="font-bold">Your Responsibilities</h4>
                                            </div>
                                            <p className="text-muted-foreground text-sm">
                                                You are responsible for your account security, accurate information, and compliance with local laws during experiences.
                                            </p>
                                        </div>

                                        <div className="p-6 rounded-2xl bg-card border border-border/50">
                                            <div className="flex items-center gap-3 mb-4">
                                                <Scale className="h-6 w-6 text-primary" />
                                                <h4 className="font-bold">Our Role</h4>
                                            </div>
                                            <p className="text-muted-foreground text-sm">
                                                LocalEyes is a marketplace platform connecting users. We facilitate transactions but are not a party to guide-traveler agreements.
                                            </p>
                                        </div>

                                        <div className="p-6 rounded-2xl bg-card border border-border/50">
                                            <div className="flex items-center gap-3 mb-4">
                                                <CreditCard className="h-6 w-6 text-primary" />
                                                <h4 className="font-bold">Payment Protection</h4>
                                            </div>
                                            <p className="text-muted-foreground text-sm">
                                                Payments are held securely until 24 hours after experience completion. We offer dispute resolution for unsatisfied bookings.
                                            </p>
                                        </div>

                                        <div className="p-6 rounded-2xl bg-card border border-border/50">
                                            <div className="flex items-center gap-3 mb-4">
                                                <Globe className="h-6 w-6 text-primary" />
                                                <h4 className="font-bold">Global Operations</h4>
                                            </div>
                                            <p className="text-muted-foreground text-sm">
                                                These Terms apply globally. Additional local terms may apply based on your location and the experience location.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Acceptance Section */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 p-3 rounded-full bg-primary/10 mb-6">
                            <Scale className="h-6 w-6 text-primary" />
                        </div>
                        <h2 className="text-3xl font-bold mb-6">Accept Terms</h2>
                        <p className="text-xl text-muted-foreground mb-10">
                            By using LocalEyes, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="gap-3">
                                <CheckCircle className="h-5 w-5" />
                                I Accept Terms
                            </Button>
                            <Button size="lg" variant="outline" className="gap-3">
                                <FileText className="h-5 w-5" />
                                Download Full Terms
                            </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mt-6">
                            Last updated: {content.agreement.effectiveDate}
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TermsPage;
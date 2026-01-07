"use client";

import { useState } from "react";
import {
    Shield,
    Lock,
    Eye,
    Users,
    CreditCard,
    Globe,
    FileText,
    CheckCircle,
    AlertCircle,
    Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";

const PrivacyPolicyPage = () => {
    const [activeSection, setActiveSection] = useState("overview");

    const sections = [
        { id: "overview", label: "Overview", icon: <FileText className="h-4 w-4" /> },
        { id: "data-collection", label: "Data We Collect", icon: <Eye className="h-4 w-4" /> },
        { id: "data-use", label: "How We Use Data", icon: <Users className="h-4 w-4" /> },
        { id: "data-sharing", label: "Data Sharing", icon: <Globe className="h-4 w-4" /> },
        { id: "security", label: "Security", icon: <Lock className="h-4 w-4" /> },
        { id: "rights", label: "Your Rights", icon: <CheckCircle className="h-4 w-4" /> },
        { id: "cookies", label: "Cookies", icon: <AlertCircle className="h-4 w-4" /> },
    ];

    const content = {
        overview: {
            title: "Privacy Policy Overview",
            lastUpdated: "December 1, 2023",
            content: [
                {
                    type: "paragraph",
                    text: "At LocalEyes, we are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform."
                },
                {
                    type: "paragraph",
                    text: "By accessing or using LocalEyes, you agree to the terms of this Privacy Policy. If you do not agree with the terms, please do not access the platform."
                },
                {
                    type: "note",
                    text: "This policy applies to all users of our platform: travelers, guides, and visitors."
                }
            ]
        },
        "data-collection": {
            title: "Information We Collect",
            content: [
                {
                    type: "heading",
                    text: "Information You Provide"
                },
                {
                    type: "list",
                    items: [
                        "Account information (name, email, phone number)",
                        "Profile information (photo, bio, languages, expertise)",
                        "Booking information (dates, preferences, special requests)",
                        "Payment information (processed securely through our payment partners)",
                        "Communications with guides or our support team"
                    ]
                },
                {
                    type: "heading",
                    text: "Automatically Collected Information"
                },
                {
                    type: "list",
                    items: [
                        "Device information (IP address, browser type, operating system)",
                        "Usage data (pages visited, searches made, time spent)",
                        "Location data (when you enable location services)",
                        "Cookies and similar tracking technologies"
                    ]
                }
            ]
        },
        "data-use": {
            title: "How We Use Your Information",
            content: [
                {
                    type: "heading",
                    text: "Primary Uses"
                },
                {
                    type: "list",
                    items: [
                        "To provide and maintain our services",
                        "To process bookings and payments",
                        "To verify guide identities and qualifications",
                        "To communicate with you about bookings, updates, and offers",
                        "To improve and personalize your experience",
                        "To ensure platform safety and prevent fraud"
                    ]
                },
                {
                    type: "note",
                    text: "We never sell your personal information to third parties."
                }
            ]
        },
        "data-sharing": {
            title: "Information Sharing",
            content: [
                {
                    type: "paragraph",
                    text: "We only share your information in the following circumstances:"
                },
                {
                    type: "list",
                    items: [
                        "With guides/travelers to facilitate bookings (only necessary information)",
                        "With payment processors to complete transactions",
                        "With law enforcement when required by law",
                        "With service providers who help us operate our platform (under strict confidentiality)",
                        "In connection with a business transfer (merger, acquisition, or sale)"
                    ]
                }
            ]
        },
        security: {
            title: "Security Measures",
            content: [
                {
                    type: "paragraph",
                    text: "We implement industry-standard security measures to protect your information:"
                },
                {
                    type: "list",
                    items: [
                        "End-to-end encryption for sensitive data",
                        "Secure payment processing with PCI DSS compliance",
                        "Regular security audits and vulnerability assessments",
                        "Access controls and authentication protocols",
                        "Secure data storage with encryption at rest"
                    ]
                },
                {
                    type: "warning",
                    text: "While we take all reasonable precautions, no method of transmission over the Internet is 100% secure."
                }
            ]
        },
        rights: {
            title: "Your Privacy Rights",
            content: [
                {
                    type: "heading",
                    text: "Depending on your location, you may have the right to:"
                },
                {
                    type: "list",
                    items: [
                        "Access your personal information",
                        "Correct inaccurate data",
                        "Request deletion of your data",
                        "Opt-out of marketing communications",
                        "Export your data in a portable format",
                        "Object to certain processing activities"
                    ]
                },
                {
                    type: "paragraph",
                    text: "To exercise these rights, contact our privacy team at privacy@localeyes.com. We will respond within 30 days."
                }
            ]
        },
        cookies: {
            title: "Cookies & Tracking",
            content: [
                {
                    type: "paragraph",
                    text: "We use cookies and similar technologies to:"
                },
                {
                    type: "list",
                    items: [
                        "Remember your preferences and settings",
                        "Analyze platform usage and performance",
                        "Provide personalized content and ads",
                        "Prevent fraudulent activities",
                        "Improve our services"
                    ]
                },
                {
                    type: "paragraph",
                    text: "You can control cookies through your browser settings. However, disabling cookies may affect platform functionality."
                }
            ]
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-background via-background/95 to-background">
            {/* Hero */}
            <section className="relative overflow-hidden py-24">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.1),transparent_50%)]" />

                <div className="relative container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 rounded-xl bg-primary/10">
                                <Shield className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 mb-2">
                                    <Lock className="h-3 w-3 text-primary" />
                                    <span className="text-xs font-medium text-primary">Privacy & Security</span>
                                </div>
                                <h1 className="text-5xl font-bold tracking-tight">
                                    Privacy <span className="bg-linear-to-r from-primary to-blue-500 bg-clip-text text-transparent">Policy</span>
                                </h1>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-4 mt-8 p-6 rounded-2xl bg-card/50 border border-border/50">
                            <div>
                                <p className="text-muted-foreground mb-2">Last Updated</p>
                                <p className="text-lg font-medium">{content.overview.lastUpdated}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground mb-2">Contact</p>
                                <a href="mailto:privacy@localeyes.com" className="text-primary hover:underline font-medium">
                                    privacy@localeyes.com
                                </a>
                            </div>
                            <Button variant="outline" className="gap-2">
                                <FileText className="h-4 w-4" />
                                Download PDF
                            </Button>
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

                        {/* Quick Contact */}
                        <div className="mt-12 p-6 rounded-2xl bg-linear-to-br from-primary/5 to-blue-500/5 border border-primary/10">
                            <h3 className="font-bold mb-4">Questions?</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Contact our privacy team for any concerns about your data.
                            </p>
                            <Button variant="outline" className="w-full gap-2">
                                <Shield className="h-4 w-4" />
                                Contact Privacy Team
                            </Button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="max-w-3xl">
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold mb-6">
                                    {content[activeSection as keyof typeof content]?.title}
                                </h2>

                                {activeSection === "overview" && (
                                    <div className="flex items-center gap-2 text-muted-foreground mb-6">
                                        <FileText className="h-4 w-4" />
                                        <span>Last updated: {content.overview.lastUpdated}</span>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-6">
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
                                                <h3 key={index} className="text-xl font-bold mt-8 mb-4">
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

                            {/* Key Principles */}
                            {activeSection === "overview" && (
                                <div className="mt-12 grid md:grid-cols-2 gap-6">
                                    <div className="p-6 rounded-2xl bg-card border border-border/50">
                                        <div className="flex items-center gap-3 mb-4">
                                            <Lock className="h-6 w-6 text-primary" />
                                            <h3 className="font-bold">Transparency</h3>
                                        </div>
                                        <p className="text-muted-foreground">
                                            We clearly communicate what data we collect and how we use it.
                                        </p>
                                    </div>

                                    <div className="p-6 rounded-2xl bg-card border border-border/50">
                                        <div className="flex items-center gap-3 mb-4">
                                            <Shield className="h-6 w-6 text-primary" />
                                            <h3 className="font-bold">Security</h3>
                                        </div>
                                        <p className="text-muted-foreground">
                                            We implement robust security measures to protect your information.
                                        </p>
                                    </div>

                                    <div className="p-6 rounded-2xl bg-card border border-border/50">
                                        <div className="flex items-center gap-3 mb-4">
                                            <CreditCard className="h-6 w-6 text-primary" />
                                            <h3 className="font-bold">Control</h3>
                                        </div>
                                        <p className="text-muted-foreground">
                                            You control your data with options to access, correct, or delete it.
                                        </p>
                                    </div>

                                    <div className="p-6 rounded-2xl bg-card border border-border/50">
                                        <div className="flex items-center gap-3 mb-4">
                                            <Globe className="h-6 w-6 text-primary" />
                                            <h3 className="font-bold">Compliance</h3>
                                        </div>
                                        <p className="text-muted-foreground">
                                            We comply with global privacy regulations including GDPR and CCPA.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 p-3 rounded-full bg-primary/10 mb-6">
                            <Shield className="h-6 w-6 text-primary" />
                        </div>
                        <h2 className="text-3xl font-bold mb-6">Privacy Concerns?</h2>
                        <p className="text-xl text-muted-foreground mb-10">
                            Our dedicated privacy team is here to address any questions or concerns about your data.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="gap-3">
                                <Mail className="h-5 w-5" />
                                Email Privacy Team
                            </Button>
                            <Button size="lg" variant="outline" className="gap-3">
                                <FileText className="h-5 w-5" />
                                Request Data Report
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPolicyPage;
import { useState } from "react";
import { ChevronDown, ChevronUp, Mail, Phone, MessageCircle, Package, RefreshCw, CreditCard, ShoppingBag } from "lucide-react";
import { Helmet } from "react-helmet-async";

const HelpCenterPage = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "How do I track my order?",
            answer: "Once your order is shipped, you will receive a tracking link via email and SMS. You can also track your order in the 'My Orders' section of your profile.",
            category: "Orders"
        },
        {
            question: "What is your return policy?",
            answer: "We offer a 7-day hassle-free return policy for all unused and unwashed items with original tags intact. Customized items are not eligible for return.",
            category: "Returns"
        },
        {
            question: "Do you ship internationally?",
            answer: "Yes, we ship to select countries worldwide. International shipping charges and timelines vary by destination.",
            category: "Shipping"
        },
        {
            question: "How can I cancel my order?",
            answer: "You can cancel your order from the 'My Orders' section before it has been shipped. If shipped, please contact our support team.",
            category: "Orders"
        }
    ];

    const supportOptions = [
        {
            icon: Mail,
            title: "Email Support",
            desc: "Get response within 24hrs",
            action: "support@pehnava.com",
            link: "mailto:support@pehnava.com"
        },
        {
            icon: Phone,
            title: "Call Us",
            desc: "Mon-Sat, 9AM to 7PM",
            action: "+91 98765 43210",
            link: "tel:+919876543210"
        },
        {
            icon: MessageCircle,
            title: "WhatsApp",
            desc: "Chat with our experts",
            action: "Start Chat",
            link: "https://wa.me/919876543210"
        }
    ];

    const categories = [
        { icon: Package, label: "Orders" },
        { icon: RefreshCw, label: "Returns" },
        { icon: CreditCard, label: "Payments" },
        { icon: ShoppingBag, label: "Shopping" },
    ];

    return (
        <div className="min-h-screen bg-pehnava-offWhite pt-24 pb-12">
            <Helmet>
                <title>Help Center | Pehnava</title>
                <meta name="description" content="Get help with your orders, returns, and payments at Pehnava Help Center." />
            </Helmet>

            {/* Hero Section */}
            <div className="bg-pehnava-offWhite border-b border-pehnava-border/40 py-10 px-4 mb-10">
                <div className="max-w-4xl mx-auto text-center space-y-4">
                    <h1 className="text-3xl sm:text-4xl font-black text-pehnava-charcoal uppercase tracking-tight">
                        Help <span className="text-pehnava-primary">Center</span>
                    </h1>
                    <p className="text-pehnava-slate font-medium">
                        Everything you need to know about your Pehnava experience.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

                {/* Categories */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {categories.map((cat, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl shadow-soft border border-pehnava-border/40 text-center hover:border-pehnava-primary/50 hover:shadow-glow transition-all cursor-pointer group">
                            <div className="w-12 h-12 bg-pehnava-offWhite rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-pehnava-primary group-hover:text-white transition-colors">
                                <cat.icon className="w-6 h-6 text-pehnava-charcoal group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="font-bold text-pehnava-charcoal">{cat.label}</h3>
                        </div>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="space-y-6">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-black text-pehnava-charcoal uppercase">Frequently Asked Questions</h2>
                        <div className="h-1 w-16 bg-pehnava-primary mx-auto mt-2 rounded-full" />
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white rounded-2xl border border-pehnava-border/50 overflow-hidden transition-all duration-300 hover:border-pehnava-primary/30">
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="w-full flex items-center justify-between p-6 text-left"
                                >
                                    <span className="font-bold text-pehnava-charcoal text-lg">{faq.question}</span>
                                    {openIndex === index ? (
                                        <ChevronUp className="w-5 h-5 text-pehnava-primary" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-pehnava-slate" />
                                    )}
                                </button>
                                <div
                                    className={`px-6 text-pehnava-slate font-medium transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-40 pb-6 opacity-100" : "max-h-0 opacity-0"
                                        }`}
                                >
                                    {faq.answer}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Section */}
                <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-medium border border-pehnava-border/40 text-center">
                    <h2 className="text-2xl font-black text-pehnava-charcoal uppercase mb-2">Still need help?</h2>
                    <p className="text-pehnava-slate mb-10">Our support team is just a click away.</p>

                    <div className="grid md:grid-cols-3 gap-6">
                        {supportOptions.map((option, i) => (
                            <a
                                key={i}
                                href={option.link}
                                className="flex flex-col items-center p-6 rounded-2xl bg-pehnava-offWhite hover:bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 border border-transparent hover:border-pehnava-primary/20"
                            >
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-pehnava-primary">
                                    <option.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-pehnava-charcoal mb-1">{option.title}</h3>
                                <p className="text-xs text-pehnava-slate mb-3 uppercase tracking-wider">{option.desc}</p>
                                <span className="text-sm font-bold text-pehnava-primary">{option.action}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpCenterPage;

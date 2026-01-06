"use client";

import { submitContact } from "@/services/public/contact.action";
import { useActionState } from "react";
const ContactForm = () => {
    const [state, formAction] = useActionState(submitContact, null);

    return (
        <form action={formAction} className="space-y-4">
            <input name="email" placeholder="Email" className="border p-2 w-full" />
            <textarea
                name="message"
                placeholder="Message"
                className="border p-2 w-full"
            />

            <button className="px-4 py-2 bg-primary text-white rounded">
                Send
            </button>

            {state?.success && <p className="text-green-600">Message sent!</p>}
        </form>
    );
};

export default ContactForm;
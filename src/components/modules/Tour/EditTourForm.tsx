"use client";

import { updateTour } from "@/services/tours/updateTour";
import { useRouter } from "next/navigation";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useActionState, useEffect } from "react";
import { toast } from "sonner";

type Props = {
    tour: any;
};

export default function EditTourForm({ tour }: Props) {
    const [state, formAction, pending] = useActionState(
        updateTour,
        { success: false, message: "" }
    );
    const router = useRouter();

    useEffect(() => {
        if (state.success && state.message) {
            toast.success(state.message);
            router.push("/dashboard/guide/tours");
        }

        if (!state.success && state.message) {
            toast.error(state.message);
        }
    }, [state.success, state.message, router]);

    return (
        <form action={formAction} className="space-y-4">
            <input type="hidden" name="id" value={tour.id} />

            <Input name="title" defaultValue={tour.title} label="Title" />
            <Textarea
                name="description"
                defaultValue={tour.description}
                label="Description"
            />
            <Input
                name="price"
                defaultValue={tour.price}
                type="number"
                label="Price"
            />
            <Input
                name="duration in hours"
                defaultValue={tour.duration}
                type="number"
                label="Duration"
            />
            <Input
                name="city"
                defaultValue={tour.city}
                label="City"
            />
            <Input
                name="country"
                defaultValue={tour.country}
                label="Country"
            />

            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    name="isActive"
                    defaultChecked={tour.isActive}
                />
                Active
            </label>

            <button
                type="submit"
                disabled={pending}
                className="rounded bg-primary px-6 py-2 text-primary-foreground"
            >
                {pending ? "Updating..." : "Update Tour"}
            </button>
        </form>
    );
}

/* ---------------- small components ---------------- */

function Input({
    label,
    ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
    return (
        <div className="space-y-1">
            <label className="text-sm font-medium">{label}</label>
            <input
                {...props}
                className="w-full rounded border px-3 py-2"
            />
        </div>
    );
}

function Textarea({
    label,
    ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
    return (
        <div className="space-y-1">
            <label className="text-sm font-medium">{label}</label>
            <textarea
                {...props}
                className="w-full rounded border px-3 py-2"
                rows={4}
            />
        </div>
    );
}

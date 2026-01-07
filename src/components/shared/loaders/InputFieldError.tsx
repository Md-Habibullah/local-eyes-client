import { getInputFieldError, IInputErrorState } from "@/lib/getInputFieldError";
import { FieldDescription } from "../../ui/field";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputFieldErrorProps {
    field: string;
    state: IInputErrorState;
    className?: string;
}

const InputFieldError = ({ field, state, className }: InputFieldErrorProps) => {
    const error = getInputFieldError(field, state);

    if (!error) return null;

    return (
        <FieldDescription className={cn(
            "flex items-center gap-2 text-destructive mt-2 animate-in fade-in-0 duration-300",
            className
        )}>
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
        </FieldDescription>
    );
};

export default InputFieldError;
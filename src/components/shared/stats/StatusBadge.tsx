import { Badge } from "../../ui/badge";
import { cn } from "@/lib/utils";
import { CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";

interface StatusBadgeProps {
    status: string;
    showIcon?: boolean;
}

const STATUS_CONFIG: Record<string, {
    className: string;
    icon?: React.ReactNode;
}> = {
    PENDING: {
        className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80 dark:bg-yellow-900/30 dark:text-yellow-400",
        icon: <Clock className="h-3 w-3" />
    },
    CONFIRMED: {
        className: "bg-blue-100 text-blue-800 hover:bg-blue-100/80 dark:bg-blue-900/30 dark:text-blue-400",
        icon: <CheckCircle className="h-3 w-3" />
    },
    COMPLETED: {
        className: "bg-green-100 text-green-800 hover:bg-green-100/80 dark:bg-green-900/30 dark:text-green-400",
        icon: <CheckCircle className="h-3 w-3" />
    },
    CANCELLED: {
        className: "bg-red-100 text-red-800 hover:bg-red-100/80 dark:bg-red-900/30 dark:text-red-400",
        icon: <XCircle className="h-3 w-3" />
    },
    FAILED: {
        className: "bg-red-100 text-red-800 hover:bg-red-100/80 dark:bg-red-900/30 dark:text-red-400",
        icon: <AlertCircle className="h-3 w-3" />
    },
    REFUNDED: {
        className: "bg-purple-100 text-purple-800 hover:bg-purple-100/80 dark:bg-purple-900/30 dark:text-purple-400",
        icon: <CheckCircle className="h-3 w-3" />
    },
};

const StatusBadge = ({ status, showIcon = true }: StatusBadgeProps) => {
    const config = STATUS_CONFIG[status] || {
        className: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    };

    return (
        <Badge
            className={cn(
                "px-3 py-1.5 font-medium rounded-full transition-colors",
                config.className
            )}
        >
            {showIcon && config.icon && (
                <span className="mr-1.5">{config.icon}</span>
            )}
            {status.charAt(0) + status.slice(1).toLowerCase()}
        </Badge>
    );
};

export default StatusBadge;
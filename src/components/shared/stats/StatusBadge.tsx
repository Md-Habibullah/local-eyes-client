import { Badge } from "../../ui/badge";

interface StatusBadgeProps {
    status: string;
}

const STATUS_MAP: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    CONFIRMED: "bg-blue-100 text-blue-800",
    COMPLETED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
    return (
        <Badge className={STATUS_MAP[status] || ""}>
            {status}
        </Badge>
    );
};

export default StatusBadge;

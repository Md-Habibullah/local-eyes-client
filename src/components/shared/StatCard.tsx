export const StatCard = ({
    title,
    value,
}: {
    title: string;
    value: string;
}) => (
    <div className="border rounded-lg p-4">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
    </div>
);
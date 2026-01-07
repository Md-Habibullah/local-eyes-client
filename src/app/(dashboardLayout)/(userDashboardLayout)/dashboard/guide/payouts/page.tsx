import EmptyState from "@/components/shared/EmptyState";
import { getGuidePayouts } from "@/services/guide/getGuidePayouts";
import { AlertCircle, CalendarCheck, CreditCard, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const GuidePayoutsPage = async () => {
    const data = await getGuidePayouts();

    if (!data) {
        return <EmptyState
            icon={AlertCircle}
            title="No payout data available"
            description="Your payout information will appear here once you have completed bookings."
        />;
    }
    if (data && data.error) {
        return <EmptyState
            icon={AlertCircle}
            title="Unable to load payout data"
            description={data.error}
        />;
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Payouts & Earnings</h1>
                <p className="text-muted-foreground">
                    Track your earnings and manage your payouts
                </p>
            </div>

            {/* Stats Overview Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Total Earnings Card */}
                <Card className="relative overflow-hidden border-green-100 bg-gradient-to-br from-green-50 to-white">
                    <div className="absolute right-4 top-4">
                        <div className="rounded-full bg-green-100 p-2">
                            <TrendingUp className="h-5 w-5 text-green-600" />
                        </div>
                    </div>
                    <CardHeader className="pb-2">
                        <CardDescription className="text-sm font-medium text-gray-600">
                            Total Unpaid Earnings
                        </CardDescription>
                        <CardTitle className="text-4xl font-bold text-green-700">
                            ৳ {data.totalUnpaidEarning}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                Ready for payout
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                {/* Bookings Card */}
                <Card className="border-blue-100 bg-gradient-to-br from-blue-50 to-white">
                    <div className="absolute right-4 top-4">
                        <div className="rounded-full bg-blue-100 p-2">
                            <CalendarCheck className="h-5 w-5 text-blue-600" />
                        </div>
                    </div>
                    <CardHeader className="pb-2">
                        <CardDescription className="text-sm font-medium text-gray-600">
                            Completed Bookings
                        </CardDescription>
                        <CardTitle className="text-4xl font-bold text-blue-700">
                            {data.totalCompletedBookings}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-500">
                            Successfully delivered experiences
                        </p>
                    </CardContent>
                </Card>

                {/* Payout Info Card */}
                <Card className="border-purple-100 bg-gradient-to-br from-purple-50 to-white">
                    <div className="absolute right-4 top-4">
                        <div className="rounded-full bg-purple-100 p-2">
                            <CreditCard className="h-5 w-5 text-purple-600" />
                        </div>
                    </div>
                    <CardHeader className="pb-2">
                        <CardDescription className="text-sm font-medium text-gray-600">
                            Payout Status
                        </CardDescription>
                        <CardTitle className="text-xl font-bold text-purple-700">
                            Manual Processing
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Next payout cycle</span>
                                    <span className="font-medium">End of month</span>
                                </div>
                                <Progress value={70} className="h-2 bg-gray-100" />
                            </div>
                            <p className="text-xs text-gray-500">
                                Processed by admin team
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Detailed Information Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Payout Information</CardTitle>
                    <CardDescription>
                        Important details about your earnings and payment process
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2 rounded-lg bg-gray-50 p-4">
                            <h3 className="font-medium text-gray-700">Current Balance</h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-green-700">
                                    ৳ {data.totalUnpaidEarning}
                                </span>
                                <span className="text-sm text-gray-500">Available</span>
                            </div>
                        </div>
                        <div className="space-y-2 rounded-lg bg-gray-50 p-4">
                            <h3 className="font-medium text-gray-700">Performance</h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-blue-700">
                                    {data.totalCompletedBookings}
                                </span>
                                <span className="text-sm text-gray-500">Total bookings</span>
                            </div>
                        </div>
                    </div>

                    {/* Process Information */}
                    <div className="rounded-lg border bg-blue-50/50 p-4">
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5 rounded-full bg-blue-100 p-1.5">
                                <CreditCard className="h-4 w-4 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-medium text-gray-700">Payout Process</h4>
                                <p className="mt-1 text-sm text-gray-600">
                                    Your earnings are processed manually by our admin team at the end of each month.
                                    You&apos;ll receive a notification once your payout has been initiated.
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    <Badge variant="secondary" className="text-xs">
                                        Monthly cycle
                                    </Badge>
                                    <Badge variant="secondary" className="text-xs">
                                        Manual verification
                                    </Badge>
                                    <Badge variant="secondary" className="text-xs">
                                        3-5 business days
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Help Text */}
                    <p className="text-center text-sm text-gray-500 pt-4 border-t">
                        Need help with payouts? Contact our support team at support@example.com
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default GuidePayoutsPage;
import EmptyState from "@/components/shared/EmptyState";
import { getGuidePayouts } from "@/services/guide/getGuidePayouts";
import { AlertCircle, CalendarCheck, CreditCard, TrendingUp, Clock, ShieldCheck, Wallet, Download } from "lucide-react";
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
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Payouts & Earnings</h1>
                <p className="text-muted-foreground dark:text-gray-400">
                    Track your earnings and manage your payouts
                </p>
            </div>

            {/* Stats Overview Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Total Earnings Card */}
                <Card className="relative overflow-hidden border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-gray-900">
                    <div className="absolute right-4 top-4">
                        <div className="rounded-full bg-green-100 dark:bg-green-900/40 p-2">
                            <Wallet className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                    </div>
                    <CardHeader className="pb-2">
                        <CardDescription className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            Total Unpaid Earnings
                        </CardDescription>
                        <CardTitle className="text-4xl font-bold text-green-700 dark:text-green-400">
                            ৳ {data.totalUnpaidEarning}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2 text-sm">
                            <Badge variant="outline" className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700">
                                Ready for payout
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                {/* Bookings Card */}
                <Card className="relative overflow-hidden border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-900">
                    <div className="absolute right-4 top-4">
                        <div className="rounded-full bg-blue-100 dark:bg-blue-900/40 p-2">
                            <CalendarCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                    </div>
                    <CardHeader className="pb-2">
                        <CardDescription className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            Completed Bookings
                        </CardDescription>
                        <CardTitle className="text-4xl font-bold text-blue-700 dark:text-blue-400">
                            {data.totalCompletedBookings}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Successfully delivered experiences
                        </p>
                    </CardContent>
                </Card>

                {/* Payout Info Card */}
                <Card className="relative overflow-hidden border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-900">
                    <div className="absolute right-4 top-4">
                        <div className="rounded-full bg-purple-100 dark:bg-purple-900/40 p-2">
                            <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                    </div>
                    <CardHeader className="pb-2">
                        <CardDescription className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            Payout Status
                        </CardDescription>
                        <CardTitle className="text-xl font-bold text-purple-700 dark:text-purple-400">
                            Manual Processing
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500 dark:text-gray-400">Next payout cycle</span>
                                    <span className="font-medium text-gray-800 dark:text-gray-200">End of month</span>
                                </div>
                                <Progress value={70} className="h-2 bg-gray-100 dark:bg-gray-700" />
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                                <Clock className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                                <span className="text-gray-500 dark:text-gray-400">Processed by admin team</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Detailed Information Section */}
            <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-gray-900 dark:text-white">Payout Information</CardTitle>
                            <CardDescription className="text-gray-600 dark:text-gray-400">
                                Important details about your earnings and payment process
                            </CardDescription>
                        </div>
                        <Download className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2 rounded-lg bg-gray-50 dark:bg-gray-900/50 p-4 border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500" />
                                <h3 className="font-medium text-gray-700 dark:text-gray-300">Current Balance</h3>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-green-700 dark:text-green-400">
                                    ৳ {data.totalUnpaidEarning}
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">Available for payout</span>
                            </div>
                            <div className="pt-2">
                                <Badge variant="outline" className="border-green-200 dark:border-green-700 bg-green-50/50 dark:bg-green-900/20 text-green-700 dark:text-green-300">
                                    <ShieldCheck className="w-3 h-3 mr-1" />
                                    Verified earnings
                                </Badge>
                            </div>
                        </div>
                        <div className="space-y-2 rounded-lg bg-gray-50 dark:bg-gray-900/50 p-4 border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-500" />
                                <h3 className="font-medium text-gray-700 dark:text-gray-300">Performance</h3>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-blue-700 dark:text-blue-400">
                                    {data.totalCompletedBookings}
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">Completed bookings</span>
                            </div>
                            <div className="pt-2">
                                <Badge variant="outline" className="border-blue-200 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                                    <CalendarCheck className="w-3 h-3 mr-1" />
                                    Active records
                                </Badge>
                            </div>
                        </div>
                    </div>

                    {/* Process Information */}
                    <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-50/50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/20 p-5">
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 p-2">
                                <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <h4 className="font-medium text-gray-800 dark:text-gray-200">Payout Process</h4>
                                    <Badge className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-0 text-xs">
                                        Monthly
                                    </Badge>
                                </div>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    Your earnings are processed manually by our admin team at the end of each month.
                                    You&apos;ll receive a notification once your payout has been initiated.
                                </p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 text-xs">
                                        <Clock className="w-3 h-3 mr-1" />
                                        Monthly cycle
                                    </Badge>
                                    <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 text-xs">
                                        <ShieldCheck className="w-3 h-3 mr-1" />
                                        Manual verification
                                    </Badge>
                                    <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 text-xs">
                                        3-5 business days
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Timeline Section */}
                    <div className="space-y-3">
                        <h4 className="font-medium text-gray-800 dark:text-gray-200">Payment Timeline</h4>
                        <div className="grid grid-cols-4 gap-2">
                            <div className="text-center">
                                <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
                                    <CalendarCheck className="w-4 h-4 text-green-600 dark:text-green-400" />
                                </div>
                                <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Booking Complete</p>
                            </div>
                            <div className="text-center">
                                <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                                    <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                </div>
                                <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Verification</p>
                            </div>
                            <div className="text-center">
                                <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center">
                                    <ShieldCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                </div>
                                <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Approval</p>
                            </div>
                            <div className="text-center">
                                <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
                                    <Download className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                                </div>
                                <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Payout</p>
                            </div>
                        </div>
                    </div>

                    {/* Help Text */}
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Need help with payouts? Contact our support team at support@adventureguide.com
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default GuidePayoutsPage;
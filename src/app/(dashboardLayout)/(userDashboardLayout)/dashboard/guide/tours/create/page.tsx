export const dynamic = "force-dynamic";
import TourForm from "@/components/modules/Tour/TourForm";
import { createTour } from "@/services/guide/createTour";

const CreateTourPage = () => {
    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <TourForm action={createTour} />
            </div>
        </div>
    );
};

export default CreateTourPage;
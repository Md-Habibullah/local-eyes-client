import TourForm from "@/components/modules/Tour/TourForm";
import { createTour } from "@/services/guide/createTour";


const CreateTourPage = () => {
    return (
        <section className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-6">
                Create New Tour
            </h1>

            <TourForm action={createTour} />
        </section>
    );
};

export default CreateTourPage;

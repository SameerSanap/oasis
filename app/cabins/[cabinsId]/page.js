import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Resarvation";
import Spinner from "@/app/_components/Spinner";
import { getCabin } from "@/app/_lib/data-service";

import { Suspense } from "react";

// PLACEHOLDER DATA
export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.cabinsId);
  return { title: `Cabin ${name}` };
}

// export async function generateStaticParams() {
//   const cabins = await getCabin();
//   const ids = cabins.map((cabin) => ({
//     cabinsId: String(cabin.id),
//   }));
//   console.log(ids);
//   return ids;
// }

export const revalidate = 0;

export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinsId);
  // const setting = await getSettings();
  // const bookingDates = await getBookedDatesByCabinId(params.cabinsId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve today {cabin.name}. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}

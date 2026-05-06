import Card from "./components/Card";
import Slider from "./components/Slider";

export default function Home() {

  // const cardViewData = [
  //   {
  //     title: "Explore 100+ Superbikes",
  //     description: "Discover premium machines from Kawasaki, BMW, Ducati, and more high-end manufacturers."
  //   },
  //   {
  //     title: "Book a Test Ride",
  //     description: "Experience the raw power firsthand. Schedule a slot for your favorite machine today."
  //   },
  //   {
  //     title: "Custom Performance Tuning",
  //     description: "Get expert advice on exhaust systems, ECU remapping, and aerodynamic upgrades."
  //   },
  //   {
  //     title: "Instant Valuation",
  //     description: "Trading in? Get the best market value for your current bike within minutes."
  //   }
  // ];

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Slider />

      {/* <div className="max-w-7xl mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-black">
            Our <span className="text-red-600">Services</span>
          </h2>
          <div className="w-16 h-1 bg-black mx-auto mt-2"></div>
        </div>

        <div className="flex flex-wrap gap-8 justify-center">
          {cardViewData.map((cardData, index) => {
            return (
              <Card 
                key={index} 
                title={cardData.title} 
                description={cardData.description} 
              />
            );
          })}
        </div>
      </div> */}
    </main>
  );
}
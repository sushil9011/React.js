import Card from "./components/Card";
import Slider from "./components/Slider";

export default function Home() {

  const cardViewData = [
    {
      title: "Get Access to 100+ Subjects",
      description: "Like Computer, accounting, finance, english, politics and many more."
    },
    {
      title: "Request Preview Notes",
      description: "A brief notes available to read online"
    },
    {
      title: "Ask Professors to Join Free",
      description: "Share jump2learn to your professors & circles."
    },
    {
      title: "Read Subjects Online",
      description: "View notes & reading material to read online."
    }
  ];
  return (
    <>
      <Slider />

      <div className="m-5 flex flex-wrap gap-5 justify-center">
        {cardViewData.map((cardData, index) => {
          return <Card key={index} title={cardData.title} description={cardData.description} />
        })}
      </div>

    </>
  );
}
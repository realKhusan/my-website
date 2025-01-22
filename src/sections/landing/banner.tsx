import { BackgroundBeams } from "@/components/ui/background-beams";

function Banner() {
  return (
    <div className="container grid grid-cols-2 min-h-[800px]">
      <div>
        <h1 className="text-5xl font-bold">Khusan Mirobidov</h1>
        <p className="text-lg uppercase">Frontend Devoloper</p>
      </div>
      <div className="flex-1 relative"></div>
      <BackgroundBeams />
    </div>
  );
}

export default Banner;

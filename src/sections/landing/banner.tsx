import { BackgroundBeams } from "@/components/ui/background-beams";
import { RandomizedText } from "@/components/ui/randomized-text";
import { SplineScene } from "@/components/ui/splite";

function Banner() {
  return (
    <div className="container grid grid-cols-1 lg:grid-cols-2 lg:min-h-[800px] h-full content-center ">
      <div className="flex flex-col justify-center items-start space-y-4">
        <RandomizedText text="Khusan Mirobidov" className="text-5xl" />
        <p className="text-lg uppercase">Frontend Devoloper</p>
      </div>
      <div className=" w-full max-h-screen lg:min-h-screen">
        <SplineScene
          className="z-10 h-full w-full"
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
        />
      </div>

      <BackgroundBeams className="-z-10" />
    </div>
  );
}

export default Banner;

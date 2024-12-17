"use client"

import { CarouselItem, CarouselContent, CarouselPrevious, CarouselNext, Carousel } from "@/components/ui/carousel";
import { ChevronLeftIcon, ChevronRightIcon } from "../ui/icon";

export interface CarouselProps {
  photos: string[];
}

export default function PropertyCarousel({ photos }: CarouselProps) {
  return (
    <section className="w-full px-4 md:px-6 mt-4">
      <Carousel className="w-full max-h-[500px]">
        <CarouselContent>
          {photos.map((photo, index) => (
            <PropertyPhoto key={index} photo={photo} />
          ))}
        </CarouselContent>
        <CarouselPrevious>
          <ChevronLeftIcon className="h-6 w-6" />
        </CarouselPrevious>
        <CarouselNext>
          <ChevronRightIcon className="h-6 w-6" />
        </CarouselNext>
      </Carousel>
    </section>
  );
}

function PropertyPhoto({ photo }: { photo: string }) {
  return (
    <>
      <CarouselItem>
        <img
          alt="Property 1"
          className="object-cover w-full h-[500px] rounded-lg"
          height={1080}
          src={photo}
          style={{
            aspectRatio: "1920/1080",
            objectFit: "cover",
          }}
          width={1920}
        />
      </CarouselItem>
    </>
  );
}

"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";

export const Slider = ({items, subject}) => {
  const [active, setActive] = useState(0)
  const sortedItems = items?.sort((a, b) => b._count.favoritedByUsers - a._count.favoritedByUsers).slice(0, 4)

  return (
    <main className="w-full h-full">
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
    url("${sortedItems[active].cover}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="w-full transition-all flex py-24 md:py-0 justify-center items-center"
      >
        <div className="w-full max-w-6xl lg:h-[648px] flex flex-col justify-start items-stretch gap-8 md:flex-row md:justify-start md:items-center">
          <div className="md:flex-1 p-4 flex-col md:flex-row flex justify-center items-center md:justify-start md:basis-0">
            <div className="flex flex-col justify-center items-center md:items-start gap-2">
              <h1 className="md:text-3xl text-center lg:text-start text-xl font-bold text-white">
                {sortedItems[active]?.name}
              </h1>
              <p className="text-muted md:w-3/4 dark:text-muted-foreground text-center md:text-start line-clamp-3">
                {sortedItems[active]?.description}
              </p>
              <Button size="lg" className="mt-4 font-bold" asChild>
                <Link href={`/${subject}/${sortedItems[active]?.slug}`}>Explore Now</Link>
              </Button>
            </div>

            <div className="md:flex-1 md:basis-0 rounded-xl p-12">
            <Carousel opts={{ loop: true, align: "start" }}>
              <CarouselContent>
                {sortedItems?.map((item, index) => {
                  return (
                    <CarouselItem key={index} onClick={() => setActive(index)} className="basis-1/2">
                      <div className="cursor-pointer">
                        <div className="border p-2 bg-muted gap-2 flex flex-col justify-start items-stretch overflow-hidden rounded-2xl">
                          <Image
                            src={item?.cover || "/images/no-image.png"}
                            alt={"cover"}
                            width={1000}
                            height={1000}
                            className="aspect-[9/10] object-cover object-center rounded-xl"
                          />
                          <h1 className="text-center line-clamp-1 text-sm md:text-base font-bold text-muted-foreground">
                            {item?.name}
                          </h1>
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselNext />
              <CarouselPrevious />
            </Carousel>
          </div>
          </div>
        </div>
      </div>
    </main>
  )
}

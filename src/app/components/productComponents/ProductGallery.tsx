import Image from "next/image";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

interface ThumbnailButtonProps {
  images: string;  
  index: number;
  selectedImage: number;
  setSelectedImage: (index: number) => void;
  name: string;
}
export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="flex flex-col gap-2">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <Image
          src={`http://localhost:5000/${images[selectedImage]}`}
          alt={`${name}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 500px, 50vw"
          priority
          quality={100}
        />
      </div>

      {/* Mobile and Tablet View (Carousel) */}
      <div className="lg:hidden">
        <Carousel className="w-full md:max-w-md mx-auto">
          <CarouselContent className="-ml-1">
            {images.map((image, index) => (
              <CarouselItem key={index} className="pl-1 basis-1/4 md:basis-1/5">
                <ThumbnailButton
                  images={image}
                  index={index}
                  selectedImage={selectedImage}
                  setSelectedImage={setSelectedImage}
                  name={name}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="hidden lg:grid grid-cols-5 gap-2">
        {images.map((image, index) => (
          <ThumbnailButton
            key={index}
            images={image}
            index={index}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            name={name}
          />
        ))}
      </div>
    </div>
  );
}

 
const ThumbnailButton = ({ images, index, selectedImage, setSelectedImage, name }: ThumbnailButtonProps) => (
  <button
    onClick={() => setSelectedImage(index)}
    className={`relative aspect-square w-full overflow-hidden rounded-xl 
      ${selectedImage === index ? "ring-2 ring-indigo-600" : "ring-1 ring-gray-200"}`}
  >
    <Image
      src={`http://localhost:5000/${images}`}
      alt={`${name} ${index + 1}`}
      fill
      className="object-cover"
      sizes="100px"
      quality={100}
    />
  </button>
);

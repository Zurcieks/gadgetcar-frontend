import Image from "next/image";
interface ProductGalleryProps {
    images: string[];
    name: string;
  }
  
  export function ProductGallery({ images, name }: ProductGalleryProps) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {images.map((image, idx) => (
          <div 
            key={idx}
            className={`relative aspect-square overflow-hidden rounded-lg ${
              idx === 0 ? "col-span-2" : ""
            }`}
          >
      
            <Image
              src={`http://localhost:5000/${image}`}
              alt={`${name} - Image ${idx + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={idx === 0}
            />
          </div>
        ))}
      </div>
    );
  }
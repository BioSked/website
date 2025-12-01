import { useRef } from 'react';
import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import AutoScroll from 'embla-carousel-auto-scroll';
import OptimizedImage from '@/components/OptimizedImage';

import chirecLogo from '@/assets/companies/chirec-2015.png';
import chuAngersLogo from '@/assets/companies/chu.png';
import imagirLogo from '@/assets/companies/imagir-or.png';
import irimedLogo from '@/assets/companies/irimed.webp';
import lakewoodLogo from '@/assets/companies/lakewood.webp';
import rrhLogo from '@/assets/companies/rrh.png';
import washingtonLogo from '@/assets/companies/washington-medicine.png';

const logos = [
  { name: 'Rochester Regional Health', src: rrhLogo },
  { name: 'Lakewood Health System', src: lakewoodLogo },
  { name: 'Washington Medical Center', src: washingtonLogo },
  { name: 'Irimed', src: irimedLogo },
  { name: 'CHU Angers', src: chuAngersLogo },
  { name: 'Imagir', src: imagirLogo },
  { name: 'Chirec', src: chirecLogo },
];

export default function LogosCarousel() {
  const plugin = useRef(
    AutoScroll({
      startDelay: 500,
      speed: 0.5,
      stopOnInteraction: false,
    })
  );

  return (
    <div className="w-full">
      <Carousel
        opts={{
          loop: true,
          align: 'start',
        }}
        plugins={[plugin.current]}
        onMouseEnter={() => plugin.current.stop()}
        onMouseLeave={() => plugin.current.play()}
        className="relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-24 before:bg-linear-to-r before:from-background before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-24 after:bg-linear-to-l after:from-background after:to-transparent after:z-10 lg:before:w-36 lg:after:w-36"
      >
        <CarouselContent className="-ml-4">
          {logos.concat(logos).map((logo, index) => (
            <CarouselItem key={`${logo.name}-${index}`} className="pl-4 basis-auto">
              <div className="flex items-center justify-center w-40 h-20">
                <OptimizedImage
                  src={logo.src}
                  alt={logo.name}
                  className="h-12 w-auto object-contain opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                  loading="lazy"
                  height={48}
                  style={{ maxHeight: '48px', width: 'auto', objectFit: 'contain' }}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

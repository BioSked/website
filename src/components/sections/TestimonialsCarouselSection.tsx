import { useRef } from 'react';
import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import AutoScroll from 'embla-carousel-auto-scroll';

import QuoteSvg from '@/assets/layout/quote.svg';
import rrhLogo from '@/assets/companies/rrh.png';
import lakewoodLogo from '@/assets/companies/lakewood.webp';
import washingtonLogo from '@/assets/companies/washington-medicine.png';
import irimedLogo from '@/assets/companies/irimed.webp';
import chuLogo from '@/assets/companies/chu.png';
import imagirLogo from '@/assets/companies/imagir-or.png';
import chirecLogo from '@/assets/companies/chirec-2015.png';

const testimonials = [
  {
    id: '1',
    name: 'Michael Eadie',
    title: 'Workforce Specialist',
    hospital: 'Rochester Regional Health',
    testimonial:
      "We didn't realize how much time we were spending on making schedules until we started using Momentum. We have so much free time now.",
    initials: 'ME',
    logo: rrhLogo.src,
  },
  {
    id: '2',
    name: 'Chelsi Schichtenberg',
    title: 'Scheduling Administrator',
    hospital: 'Lakewood Health System',
    testimonial:
      'I really like that Momentum gives me the ability to build and publish my schedule by individual professions in different layers.',
    initials: 'CS',
    logo: lakewoodLogo.src,
  },
  {
    id: '3',
    name: 'Katharine Barrett',
    title: 'Scheduling Administrator',
    hospital: 'Washington Medical Center',
    testimonial:
      "It's nice to be able to trust that the Momentum team will be available to address whatever needs we have.",
    initials: 'KB',
    logo: washingtonLogo.src,
  },
  {
    id: '4',
    name: 'Bernard Bensadoun',
    title: 'Group Director',
    hospital: 'Irimed',
    testimonial:
      'Choosing Momentum as an assisted scheduling tool quickly proved to be the right decision. Its pay-per-use business model is flexible and advantageous.',
    initials: 'BB',
    logo: irimedLogo.src,
  },
  {
    id: '5',
    name: 'Thomas Boishardy',
    title: 'Emergency Department Administrator',
    hospital: 'CHU Angers',
    testimonial:
      'Momentum is a highly comprehensive scheduling software, you can master it and meet all the scheduling needs of an emergency department.',
    initials: 'TB',
    logo: chuLogo.src,
  },
  {
    id: '6',
    name: 'Anthony Bagot',
    title: 'Operations Manager',
    hospital: 'Imagir',
    testimonial:
      'I am very satisfied with the tool and highly recommend it, especially for its integrations with other tools, which provide a real internal time-saving benefit. Momentum adapts to needs in a clear and simple way. Moreover, the BioSked team is always very supportive and responsive!',
    initials: 'AB',
    logo: imagirLogo.src,
  },
  {
    id: '7',
    name: 'Frédéric Cavallotto',
    title: 'Emergency Dept. Head',
    hospital: 'UCLA Health',
    testimonial:
      "I'm impressed by the tool's ability to generate highly optimized schedules while respecting almost all individual requests. Thanks to Momentum, I spend less time on schedule creation and can now devote more time to the medical management of the department.",
    initials: 'FC',
    logo: chirecLogo.src,
  },
];

export default function TestimonialsCarouselSection() {
  const plugin = useRef(
    AutoScroll({
      startDelay: 500,
      speed: 0.8,
      stopOnInteraction: false,
    })
  );

  return (
    <div>
      <Carousel
        opts={{
          loop: true,
          align: 'start',
        }}
        plugins={[plugin.current]}
        onMouseEnter={() => plugin.current.stop()}
        onMouseLeave={() => plugin.current.play()}
        className="relative sm:before:absolute before:left-0 before:top-0 before:bottom-0 before:w-24 before:bg-linear-to-r before:from-background before:to-transparent before:z-10 sm:after:absolute after:right-0 after:top-0 after:bottom-0 after:w-24 after:bg-linear-to-l after:from-background after:to-transparent after:z-10 lg:before:w-36 lg:after:w-36"
      >
        <CarouselContent className="-ml-4 pb-5">
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.id} className="pl-4 basis-auto">
              <Card className="max-w-60 sm:max-w-sm select-none p-5 sm:p-9 h-full bg-background border-top">
                <img src={QuoteSvg.src} class="size-8 sm:size-12"/>
                <blockquote className="text-muted-foreground italic leading-relaxed text-sm">
                  {testimonial.testimonial}"
                </blockquote>
                <div className="mt-6 mb-4 flex flex-col sm:flex-row gap-3 items-center text-center sm:text-left">
                  <div className="hidden md:flex size-10 bg-sidebar-primary text-sidebar-primary-foreground shrink-0 items-center justify-center rounded-full bg-mute text-sm font-medium">
                    {testimonial.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{testimonial.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {testimonial.title}
                    </p>
                    {!testimonial.logo && (
                      <p className="text-muted-foreground mt-0.5 text-xs font-medium">
                        {testimonial.hospital}
                      </p>
                    )}
                  </div>
                  {testimonial.logo && (
                    <img
                      src={testimonial.logo} 
                      alt={testimonial.hospital}
                      className="h-10 w-auto shrink-0 filter-[grayscale(1)] opacity-50"
                      loading="lazy"
                      decoding="async"
                      height={40}
                      style={{ maxHeight: '40px', maxWidth: '120px', width: 'auto', objectFit: 'contain' }}
                    />
                  )}
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

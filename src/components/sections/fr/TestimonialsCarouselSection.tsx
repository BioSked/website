import { useRef } from 'react';
import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import AutoScroll from 'embla-carousel-auto-scroll';

import QuoteSvg from '@/assets/layout/quote.svg';
import chuLogo from '@/assets/companies/carousel/chu.webp';
import imagirLogo from '@/assets/companies/carousel/imagir-or.webp';
import chirecLogo from '@/assets/companies/carousel/chirec-2015.webp';
import imallianceLogo from '@/assets/companies/carousel/imalliance-hdf.png';
import irisGrimLogo from '@/assets/companies/carousel/iris-grim.svg';
import cedresLogo from '@/assets/companies/carousel/cedres.png';
import hopitalEuropeenLogo from '@/assets/companies/carousel/hopital-europeen.svg';

const testimonials = [
  {
    id: '1',
    name: 'Anthony Bagot',
    title: 'Responsable opérationnel',
    hospital: 'IMAGIR Bordeaux',
    testimonial:
      'Je suis très satisfait de l’outil et je le recommande vraiment, notamment pour ses interfaçages avec d’autres outils qui apportent un réel gain de temps interne.',
    initials: 'AB',
    logo: imagirLogo,
  },
  {
    id: '2',
    name: 'Thomas Boishardy',
    title: 'Praticien hospitalier',
    hospital: 'CHU Angers',
    testimonial:
      'Aujourd’hui tout est au même endroit et accessible sur internet. Je n’ai rien à faire si ce n’est me connecter pour accéder aux demandes des praticiens et gérer mes plannings.',
    initials: 'TB',
    logo: chuLogo,
  },
  {
    id: '3',
    name: 'Dominique Molmy',
    title: 'Secrétaire référente',
    hospital: 'IMALLIANCE HDF',
    testimonial:
      'Le planning est produit aujourd’hui très aisément, et en cas d’aléas, les possibilités de remplacement sont proposées pour un ajustement quasi immédiat.',
    initials: 'MD',
    logo: imallianceLogo, // Official artwork normalized to monochrome so its white header wordmark remains legible on the light card.
  },
  {
    id: '4',
    name: 'Équipe de planification',
    title: 'Groupement de radiologues, Nantes',
    hospital: 'IRIS GRIM',
    testimonial:
      'La gestion des plannings-types, la proposition de médecins pour des remplacements, l’application mobile et l’intégration aux calendriers personnels sont des fonctionnalités dont on ne peut plus se passer.',
    initials: 'BB',
    logo: irisGrimLogo,
  },
  {
    id: '5',
    name: 'Karine Delaunay',
    title: 'Cadre administrative',
    hospital: 'Imagerie Médicale Les Cèdres',
    testimonial:
      'Le produit a très bien évolué en peu de temps. Momentum s’adapte vraiment à notre organisation et c’est un vrai point fort de la solution.',
    initials: 'KD',
    logo: cedresLogo,
  },
  {
    id: '6',
    name: 'Docteur Stordeur',
    title: 'Médecin anesthésiste-réanimateur',
    hospital: 'Hôpital Européen de Marseille',
    testimonial:
      'Avec Momentum, nous avons automatisé 95% de la planification des équipes. C’est réellement une source de stress en moins.',
    initials: 'DS',
    logo: hopitalEuropeenLogo,
  },
  {
    id: '7',
    name: 'Frédéric Cavallotto',
    title: 'Chef de service des urgences',
    hospital: 'CHIREC',
    testimonial:
      'Je suis impressionné par la capacité de l’outil à générer des plannings aussi optimisés en respectant presque tous les souhaits.',
    initials: 'FC',
    logo: chirecLogo,
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
              <Card className="max-w-60 sm:max-w-sm select-none p-5 sm:p-9 h-full bg-white/30 hover:bg-white/60 transition-all duration-200 border-top">
                <img src={QuoteSvg.src} alt="" aria-hidden="true" width={35} height={31} className="w-8 h-auto sm:w-12"/>
                <blockquote className="text-foreground italic leading-relaxed text-sm transition-color duration-200">
                  {testimonial.testimonial}
                </blockquote>
                <div className="mt-auto flex flex-col gap-3 items-center pt-4 text-center sm:flex-row sm:items-end sm:text-left">
                  <div className="hidden text-white md:flex size-10 bg-secondary/90 shrink-0 items-center justify-center rounded-full bg-mute text-sm font-medium">
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
                      src={testimonial.logo.src}
                      alt={testimonial.hospital}
                      className="h-auto w-auto max-h-10 max-w-[120px] shrink-0 object-contain filter-[grayscale(1)] opacity-50"
                      loading="lazy"
                      decoding="async"
                      width={testimonial.logo.width}
                      height={testimonial.logo.height}
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

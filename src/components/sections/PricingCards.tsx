import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import starterPlanLogo from '@/assets/logos/starter-plan.svg';
import plusPlanLogo from '@/assets/logos/plus-plan.svg';
import proPlanLogo from '@/assets/logos/pro-plan.svg';
import entPlanLogo from '@/assets/logos/ent-plan.svg';
import laptopScreen from '@/assets/screenshots/mm-laptop-fade-r.png';

interface Feature {
  name: string;
  included?: boolean;
}

interface PricingPlan {
  id: string;
  title: string;
  description: string;
  monthlyPrice: number | null;
  popular: boolean;
  baseOn?: string;
  features: string[];
}

interface PricingCardsProps {
  plans: PricingPlan[];
}

export function PricingCards({ plans }: PricingCardsProps) {
  const planLogos: Record<string, any> = {
    'starter': starterPlanLogo,
    'plus': plusPlanLogo,
    'pro': proPlanLogo,
  };

  const buildFeatureList = (plan: PricingPlan): Feature[] => {
    const allFeatures: Feature[] = [];
    
    if (plan.baseOn) {
      const basePlan = plans.find(p => p.id === plan.baseOn);
      if (basePlan) {
        allFeatures.push({
          name: `Everything in ${basePlan.title}, and:`,
          included: false,
        });
      }
    }
    else {
      allFeatures.push({
        name: 'Includes:',
        isIncluded: false
      });
    }
    
    plan.features.forEach(feature => {
      allFeatures.push({ name: feature, included: true });
    });
    
    return allFeatures;
  };

  const standardPlans = plans.filter(p => p.id !== 'enterprise');
  const enterprisePlan = plans.find(p => p.id === 'enterprise');

  return (
    <>
      <div className="mx-auto mt-12 grid gap-4 lg:grid-cols-3 bg-cyan-100/50 bg-green-100/50 bg-orange-100/50 bg-transparent">
        {standardPlans.map((plan) => {
          const features = buildFeatureList(plan);
          
          return (
            <Card
              key={plan.id}
              className={'h-full gap-6 p-4 shadow-none bg-transparent transition-all duration-100 rounded-none border-none mm-card relative '+(plan.popular ? 'bg-blue-600/6 shadow-xl hover:bg-blue-600/4':'hover:bg-white/25')}
            >
              <div class="cornecross"></div>
              <CardHeader className={'mt-0.5 rounded-md p-4 md:px-6 bg-white shadow-sm b order border-'+plan.color+'-600/20'}>
                  <div className="flex items-center gap-2">
                    {planLogos[plan.id] && (
                      <img 
                        src={planLogos[plan.id].src} 
                        alt={`${plan.title} logo`}
                        className="h-7 w-auto text-cyan-500 text-green-500 text-orange-500"
                      />
                    )}
                    <h3 className="text-plan-title tracking-tight">{plan.title}</h3>
                    {plan.popular && <div className="rounded-xl bg-blue-100 text-blue-700 px-3 text-sm py-1 ml-auto">Recommended</div>}
                  </div>

                  <div className="font-normal text-sm text-muted-foreground">{plan.description}</div>
                  {/*<div className="text-muted-foreground mt-2 text-sm">
                    As low as
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-medium">$</span>
                    <span className="text-4xl font-semibold md:text-5xl">
                      {plan.monthlyPrice}
                    </span>
                    <span className="text-xl text-muted-foreground">/mo</span>
                  </div>
                  <div className="text-muted-foreground mt-2 text-sm">
                    per user
                  </div>*/}
                  
                  <a href="/getquote">
                    <Button 
                      className="mt-4 h-10 w-full bg-primary-foreground hover:bg-primary-foreground/90 text-white font-semibold text-md"
                    >
                      Request {plan.title} plan
                    </Button>
                  </a>
              </CardHeader>

              <CardContent className="grid gap-3 pb-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div class={'mt-0.5 text-'+plan.color+'-500'}>
                      {feature.included && <Check className="size-4 stroke-current mr-3" />}
                    </div>
                    <span
                      className={cn(
                        'text-sm leading-tight',
                        !feature.included
                          ? 'font-bold'
                          : 'font-normal',
                      )}
                    >
                      {feature.name}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {enterprisePlan && (
        <div className="mx-auto mt-24 max-w-4xl">
          <Card className="hover:shadow-primary/5 gap-4 p-4 transition-all duration-300 hover:shadow-lg blue-gradient transition-all duration-200 scale-100 hover:scale-101">
            <CardHeader className="bg-white/5 shadow-sm rounded-md p-4 md:p-6 ">
              <div className="flex flex-col gap-8 md:flex-row md:justify-between">
                <div className="flex-2">
                  <img 
                    src={entPlanLogo.src} 
                    alt="Starter"
                    className="h-5 w-auto inline-block"
                  />
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2 mb-1">{enterprisePlan.title}</h3>
                  <div className="font-normal text-muted-foreground">{enterprisePlan.description}</div>
                  <Button className="mt-5 px-6 shadow-xl shadow-blue-200/20 bg-white text-card-foreground font-bold" asChild>
                    <a href="/getquote">
                      Let's talk
                    </a>
                  </Button>
                </div>

                <div className="flex-1 hidden sm:block">
                  <img src={laptopScreen.src} className="opacity-70"/>
                </div>
              </div>
            </CardHeader>

            <CardContent className="grid gap-1 p-4 pt-3 md:grid-cols-2 md:p-6 md:pt-4 lg:grid-cols-3">
              {buildFeatureList(enterprisePlan).map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <Check className="text-white size-4 stroke-cyan-500" />
                  </div>
                  <span
                    className={cn(
                      'text-sm leading-tight text-white',
                      feature.included
                        ? 'font-medium'
                        : '',
                    )}
                  >
                    {feature.name}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}

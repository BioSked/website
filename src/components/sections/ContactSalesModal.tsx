import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check } from 'lucide-react';

export function ContactSalesModal() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener('open-contact-sales', handleOpen);
    return () => window.removeEventListener('open-contact-sales', handleOpen);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch('/api/contact-sales', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setShowSuccess(true);
        (e.target as HTMLFormElement).reset();
        setTimeout(() => {
          setOpen(false);
          setShowSuccess(false);
        }, 3000);
      } else {
        setError(result.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[900px] lg:max-w-[1100px] p-0 max-h-[90vh] overflow-y-auto">
        <div className="grid lg:grid-cols-[1fr_1.5fr]">
          <div className="bg-linear-to-br from-primary/10 to-primary/5 p-4 md:p-8 lg:p-10">
            <DialogHeader className="text-left">
              <DialogTitle className="text-2xl md:text-3xl font-medium mb-2 md:mb-4">
                See How Momentum Fits Your Organization
              </DialogTitle>
              <p className="text-muted-foreground text-sm md:text-base mb-4 md:mb-8">
                Whether you're a solo practice or multi-site health system, we'll show you how Momentum automates scheduling for your team.
              </p>
            </DialogHeader>

            <div className="space-y-3 md:space-y-6">
              <div className="flex items-start gap-3">
                <div className="bg-primary/20 text-primary flex size-7 md:size-8 shrink-0 items-center justify-center rounded-full mt-0.5">
                  <Check className="size-3.5 md:size-4" />
                </div>
                <div>
                  <h4 className="font-medium mb-0.5 md:mb-1 text-sm md:text-base">Live product walkthrough</h4>
                  <p className="text-muted-foreground text-xs md:text-sm">
                    See how Momentum handles your specific scheduling challenges
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-primary/20 text-primary flex size-7 md:size-8 shrink-0 items-center justify-center rounded-full mt-0.5">
                  <Check className="size-3.5 md:size-4" />
                </div>
                <div>
                  <h4 className="font-medium mb-0.5 md:mb-1 text-sm md:text-base">Transparent pricing</h4>
                  <p className="text-muted-foreground text-xs md:text-sm">
                    Get a plan tailored to your organization's size and complexity
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-primary/20 text-primary flex size-7 md:size-8 shrink-0 items-center justify-center rounded-full mt-0.5">
                  <Check className="size-3.5 md:size-4" />
                </div>
                <div>
                  <h4 className="font-medium mb-0.5 md:mb-1 text-sm md:text-base">Fast implementation</h4>
                  <p className="text-muted-foreground text-xs md:text-sm">
                    Most organizations go live in weeks, not months
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-8 lg:p-10">
            {showSuccess ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="bg-green-100 text-green-600 flex size-16 items-center justify-center rounded-full mb-4">
                  <Check className="size-8" />
                </div>
                <h3 className="text-xl font-medium mb-2">Request received!</h3>
                <p className="text-muted-foreground">
                  Our sales team will contact you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="text-sm font-medium block mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="text-sm font-medium block mb-2">
                    Work Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="john@hospital.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="text-sm font-medium block mb-2">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="companyName" className="text-sm font-medium block mb-2">
                    Organization Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="companyName"
                    name="companyName"
                    type="text"
                    required
                    placeholder="City Hospital"
                  />
                </div>

                <div>
                  <label htmlFor="staffCount" className="text-sm font-medium block mb-2">
                    Staff to Schedule <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="staffCount"
                    name="staffCount"
                    required
                    className="border-input focus-visible:ring-ring w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2"
                  >
                    <option value="">Select range</option>
                    <option value="1-50">1-50</option>
                    <option value="51-200">51-200</option>
                    <option value="201-500">201-500</option>
                    <option value="501-1000">501-1000</option>
                    <option value="1000+">1000+</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="additionalInfo" className="text-sm font-medium block mb-2">
                    Tell us about your needs
                  </label>
                  <textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    rows={2}
                    placeholder="Any specific requirements or questions?"
                    className="border-input focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2 resize-none"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border-red-200 text-red-800 rounded-lg border p-3 text-sm">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Request Quote'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

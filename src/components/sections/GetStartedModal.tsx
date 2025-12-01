import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface GetStartedModalProps {}

export function GetStartedModal({}: GetStartedModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [selectedPlan, setSelectedPlan] = useState('');

  useEffect(() => {
    const handleOpen = (e: CustomEvent) => {
      setSelectedPlan(e.detail.plan || '');
      setIsOpen(true);
      setMessage({ type: '', text: '' });
    };

    window.addEventListener('open-get-started' as any, handleOpen);
    return () => window.removeEventListener('open-get-started' as any, handleOpen);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch('/api/get-started', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      
      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setIsOpen(false), 2000);
      } else {
        setMessage({ type: 'error', text: result.error || 'Something went wrong. Please try again.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to submit. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Get Started with Momentum</DialogTitle>
          <p className="text-muted-foreground text-sm">
            Tell us about your organization and we'll help you find the right plan
          </p>
        </DialogHeader>

        {message.text && (
          <div
            className={`rounded-lg border p-4 ${
              message.type === 'success'
                ? 'border-green-200 bg-green-50 text-green-800'
                : 'border-red-200 bg-red-50 text-red-800'
            }`}
          >
            <p className="text-sm font-medium">{message.text}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Contact Information
            </h3>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  className="mt-1.5"
                />
              </div>

              <div>
                <label htmlFor="email" className="text-sm font-medium">
                  Email <span className="text-red-500">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="john@hospital.com"
                  className="mt-1.5"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  className="mt-1.5"
                />
              </div>

              <div>
                <label htmlFor="title" className="text-sm font-medium">
                  Job Title
                </label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Scheduling Coordinator"
                  className="mt-1.5"
                />
              </div>
            </div>
          </div>

          {/* Organization Details */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Organization Details
            </h3>

            <div>
              <label htmlFor="organization" className="text-sm font-medium">
                Organization Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="organization"
                name="organization"
                type="text"
                required
                placeholder="City Hospital"
                className="mt-1.5"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="departmentCount" className="text-sm font-medium">
                  Number of Departments <span className="text-red-500">*</span>
                </label>
                <select
                  id="departmentCount"
                  name="departmentCount"
                  required
                  className="border-input focus-visible:ring-ring mt-1.5 w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2"
                >
                  <option value="">Select...</option>
                  <option value="1-3">1-3 departments</option>
                  <option value="4-10">4-10 departments</option>
                  <option value="11-25">11-25 departments</option>
                  <option value="26-50">26-50 departments</option>
                  <option value="50+">50+ departments</option>
                </select>
              </div>

              <div>
                <label htmlFor="staffCount" className="text-sm font-medium">
                  Total Staff Size <span className="text-red-500">*</span>
                </label>
                <select
                  id="staffCount"
                  name="staffCount"
                  required
                  className="border-input focus-visible:ring-ring mt-1.5 w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2"
                >
                  <option value="">Select...</option>
                  <option value="1-50">1-50</option>
                  <option value="51-200">51-200</option>
                  <option value="201-500">201-500</option>
                  <option value="501-1000">501-1000</option>
                  <option value="1000+">1000+</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="specialties" className="text-sm font-medium">
                Primary Specialties/Departments
              </label>
              <Input
                id="specialties"
                name="specialties"
                type="text"
                placeholder="e.g., Cardiology, Emergency, Surgery"
                className="mt-1.5"
              />
              <p className="text-muted-foreground mt-1 text-xs">
                List your main specialties or departments (optional)
              </p>
            </div>
          </div>

          {/* Plan Selection */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Plan Selection
            </h3>

            <div>
              <label htmlFor="plan" className="text-sm font-medium">
                Preferred Plan <span className="text-red-500">*</span>
              </label>
              <select
                id="plan"
                name="plan"
                required
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="border-input focus-visible:ring-ring mt-1.5 w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2"
              >
                <option value="">Select a plan...</option>
                <option value="Starter">Starter - Essential scheduling</option>
                <option value="Plus">Plus - Advanced features</option>
                <option value="Pro">Pro - Full platform access</option>
                <option value="Enterprise">Enterprise - Custom solution</option>
              </select>
            </div>

            <div>
              <label htmlFor="additionalInfo" className="text-sm font-medium">
                Additional Information
              </label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                rows={3}
                placeholder="Tell us about your specific needs or questions..."
                className="border-input focus-visible:ring-ring mt-1.5 w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2"
              ></textarea>
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, RefreshCw, Mail, User, HelpCircle, MessageSquare } from 'lucide-react';
import { validateContactForm, ContactFormData } from '../utils/cafeLogic';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    enquiryType: 'Table Reservation Enquiry',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    referenceId: string;
    name: string;
    type: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate front-end interaction delay
    setTimeout(() => {
      setIsSubmitting(false);
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      setSubmittedData({
        referenceId: `SM-${new Date().getFullYear()}-${randomCode}`,
        name: formData.fullName.trim(),
        type: formData.enquiryType,
      });
      setFormData({
        fullName: '',
        email: '',
        enquiryType: 'Table Reservation Enquiry',
        message: '',
      });
    }, 600);
  };

  const handleReset = () => {
    setSubmittedData(null);
    setErrors({});
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#F6F0E8] border-t border-[#E8DFD5] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase font-bold tracking-widest text-[#7E8B76] mb-2 block">
            Get in Touch
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#281C15] tracking-tight">
            Send Us a Note
          </h2>
          <p className="mt-3 text-base text-[#6E6259]">
            Whether you are planning an intimate breakfast gathering or have questions about our seasonal single-estate roasts.
          </p>
        </div>

        {/* Demo Disclaimer Card */}
        <div className="mb-8 p-4 rounded-xl bg-[#E8DFD5] border border-[#D8CCC0] flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#7E8B76] shrink-0 mt-0.5" />
          <div className="text-xs text-[#503A2D] leading-relaxed">
            <strong className="font-semibold text-[#281C15]">Front-End Demo Notice:</strong>{' '}
            This contact form runs strictly on the front-end for portfolio evaluation. Submissions validate your inputs and simulate an enquiry ticket without transmitting real emails.
          </div>
        </div>

        {/* Form Card or Success Confirmation */}
        <div className="bg-[#FAF6F0] rounded-2xl p-6 sm:p-10 border border-[#E8DFD5] shadow-sm">
          {submittedData ? (
            <div className="text-center py-6 sm:py-8 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#E8DFD5] text-[#7E8B76] flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <span className="inline-block px-3 py-1 rounded-full bg-[#E8DFD5] text-xs font-mono font-semibold text-[#503A2D]">
                Ticket #{submittedData.referenceId} (Simulated)
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#281C15]">
                Thank you, {submittedData.name}!
              </h3>

              <p className="text-sm text-[#6E6259] max-w-md mx-auto leading-relaxed">
                Your demo enquiry regarding <strong>{submittedData.type}</strong> has been validated and recorded in local state. In a full production launch, this triggers an automated email confirmation and routing to cafe staff.
              </p>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#281C15] hover:bg-[#3D2C22] text-[#FAF6F0] text-xs font-semibold shadow transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Submit Another Note</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-xs font-semibold text-[#503A2D] uppercase tracking-wider mb-2">
                    Your Name <span className="text-[#C86D51]">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#8A7D73] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="fullName"
                      type="text"
                      placeholder="e.g. Aarav Sharma"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (errors.fullName) setErrors({ ...errors, fullName: '' });
                      }}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-sm text-[#281C15] placeholder:text-[#9B8F85] focus:outline-none focus:ring-2 focus:ring-[#7E8B76] transition-all ${
                        errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-[#D8CCC0]'
                      }`}
                      aria-invalid={!!errors.fullName}
                      aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                    />
                  </div>
                  {errors.fullName && (
                    <p id="fullName-error" className="text-xs text-red-600 mt-1.5 font-medium">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-[#503A2D] uppercase tracking-wider mb-2">
                    Email Address <span className="text-[#C86D51]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#8A7D73] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="email"
                      type="email"
                      placeholder="e.g. aarav@example.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-sm text-[#281C15] placeholder:text-[#9B8F85] focus:outline-none focus:ring-2 focus:ring-[#7E8B76] transition-all ${
                        errors.email ? 'border-red-500 bg-red-50/20' : 'border-[#D8CCC0]'
                      }`}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                  </div>
                  {errors.email && (
                    <p id="email-error" className="text-xs text-red-600 mt-1.5 font-medium">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Enquiry Type Dropdown */}
              <div>
                <label htmlFor="enquiryType" className="block text-xs font-semibold text-[#503A2D] uppercase tracking-wider mb-2">
                  Enquiry Type <span className="text-[#C86D51]">*</span>
                </label>
                <div className="relative">
                  <HelpCircle className="w-4 h-4 text-[#8A7D73] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    id="enquiryType"
                    value={formData.enquiryType}
                    onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[#D8CCC0] text-sm text-[#281C15] focus:outline-none focus:ring-2 focus:ring-[#7E8B76] appearance-none cursor-pointer"
                  >
                    <option value="Table Reservation Enquiry">Table Reservation Enquiry</option>
                    <option value="Private Gathering / Event">Private Gathering / Small Event</option>
                    <option value="Bakery & Bulk Order">Artisanal Bakery & Bulk Orders</option>
                    <option value="Specialty Coffee Query">Specialty Coffee Beans Query</option>
                    <option value="General Feedback">General Feedback & Notes</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-[#503A2D] uppercase tracking-wider mb-2">
                  Message Details <span className="text-[#C86D51]">*</span>
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Tell us about your requested dates, guests, or special dietary considerations..."
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: '' });
                    }}
                    className={`w-full p-4 rounded-xl bg-white border text-sm text-[#281C15] placeholder:text-[#9B8F85] focus:outline-none focus:ring-2 focus:ring-[#7E8B76] resize-none transition-all ${
                      errors.message ? 'border-red-500 bg-red-50/20' : 'border-[#D8CCC0]'
                    }`}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                </div>
                {errors.message && (
                  <p id="message-error" className="text-xs text-red-600 mt-1.5 font-medium">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-[#8A7D73] order-2 sm:order-1">
                  Validated locally · Client-side preview
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto order-1 sm:order-2 inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#281C15] hover:bg-[#3D2C22] text-[#FAF6F0] text-sm font-semibold tracking-wide shadow transition-all cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-[#D8CCC0]" />
                  <span>{isSubmitting ? 'Validating...' : 'Send Demo Message'}</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </section>
  );
};

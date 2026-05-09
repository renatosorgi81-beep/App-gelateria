'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import StepIndicator from '@/components/checkout/StepIndicator';
import CustomerStep from '@/components/checkout/CustomerStep';
import PaymentStep from '@/components/checkout/PaymentStep';
import DeliveryStep from '@/components/checkout/DeliveryStep';
import SummaryStep from '@/components/checkout/SummaryStep';
import { useCartStore } from '@/lib/store/cartStore';
import { useOrderStore } from '@/lib/store/orderStore';
import type { CheckoutStep, CheckoutData, CustomerData, DeliveryData, PaymentData, ConsentData } from '@/types';

const STEPS: CheckoutStep[] = ['customer', 'delivery', 'payment', 'summary'];

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const { checkoutData, setCheckoutData, setCurrentOrder } = useOrderStore();

  const [currentStep, setCurrentStep] = useState<CheckoutStep>('customer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (items.length === 0) {
    router.replace('/cart');
    return null;
  }

  const currentStepIndex = STEPS.indexOf(currentStep);

  function goNext() {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < STEPS.length) {
      setCurrentStep(STEPS[nextIndex]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function goPrev() {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(STEPS[prevIndex]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function handleCustomerSubmit(data: CustomerData) {
    setCheckoutData({ customer: data });
    goNext();
  }

  function handleDeliverySubmit(data: DeliveryData) {
    setCheckoutData({ delivery: data });
    goNext();
  }

  function handlePaymentSubmit(data: PaymentData) {
    setCheckoutData({ payment: data });
    goNext();
  }

  async function handleFinalSubmit(data: { consent: ConsentData; notes?: string }) {
    setIsSubmitting(true);
    setError(null);

    const fullData: CheckoutData = {
      customer: checkoutData.customer!,
      delivery: checkoutData.delivery!,
      payment: checkoutData.payment!,
      consent: data.consent,
      notes: data.notes,
    };

    try {
      const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
      const deliveryFee =
        fullData.delivery.type === 'delivery'
          ? parseFloat(process.env.NEXT_PUBLIC_DELIVERY_FEE ?? '3.50')
          : 0;

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          checkoutData: fullData,
          items,
          subtotal,
          deliveryFee,
          total: subtotal + deliveryFee,
        }),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || 'Errore nella creazione dell\'ordine');
      }

      setCurrentOrder(json.order);
      clearCart();
      router.push('/checkout/success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore imprevisto. Riprova.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        title="Ordine"
        showBack={currentStepIndex > 0}
      />

      <main className="flex-1 pb-8">
        <div className="px-4 pt-4 pb-2">
          <StepIndicator currentStep={currentStep} />
        </div>

        {error && (
          <div className="mx-4 mt-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="px-4 pt-4">
          {currentStep === 'customer' && (
            <CustomerStep
              defaultValues={checkoutData.customer}
              onSubmit={handleCustomerSubmit}
            />
          )}
          {currentStep === 'delivery' && (
            <DeliveryStep
              defaultValues={checkoutData.delivery}
              onSubmit={handleDeliverySubmit}
              onBack={goPrev}
            />
          )}
          {currentStep === 'payment' && (
            <PaymentStep
              defaultValues={checkoutData.payment}
              onSubmit={handlePaymentSubmit}
              onBack={goPrev}
            />
          )}
          {currentStep === 'summary' && (
            <SummaryStep
              checkoutData={checkoutData}
              onSubmit={handleFinalSubmit}
              onBack={goPrev}
              isSubmitting={isSubmitting}
              error={error}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export {};

interface RazorpayPrefill {
  name?: string;
  email?: string;
  contact?: string;
  membershipType?:string
}

interface RazorpayTheme {
  color?: string;
}

interface RazorpayModal {
  ondismiss?: () => void;
}

interface RazorpayHandlerResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

interface RazorpayOptions {
  key: string;
  amount: number; // in paise (e.g., 50000 = ₹500)
  currency?: string; // default is INR
  name?: string;
  description?: string;
  image?: string;
  order_id?: string;
  handler: (response: RazorpayHandlerResponse) => void;
  prefill?: RazorpayPrefill;
  notes?: Record<string, string>;
  theme?: RazorpayTheme;
  modal?: RazorpayModal;
}

interface RazorpayInstance {
  open(): void;
  on(event: "payment.failed", callback: (response: {
    error: {
      code: string;
      description: string;
      source: string;
      step: string;
      reason: string;
      metadata: {
        order_id: string;
        payment_id: string;
      };
    };
  }) => void): void;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

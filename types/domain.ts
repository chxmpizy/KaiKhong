export type PaymentStatus = "pending" | "successful" | "failed" | "refunded" | "cancelled";
export type SubscriptionStatus = "trialing" | "active" | "past_due" | "cancelled" | "expired";

export type BusinessInput = {
  name: string;
  description?: string;
  industry?: string;
  websiteUrl?: string;
  targetCustomer?: string;
  businessGoal?: string;
};

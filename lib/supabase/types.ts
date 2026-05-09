export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      orders: {
        Row: {
          id: string;
          order_number: string;
          customer_name: string;
          customer_surname: string;
          customer_phone: string;
          customer_address: string | null;
          customer_city: string | null;
          delivery_type: 'pickup' | 'delivery';
          delivery_time: string;
          payment_method: 'cash' | 'card';
          notes: string | null;
          status: 'pending' | 'confirmed' | 'ready' | 'delivered' | 'cancelled';
          subtotal: number;
          delivery_fee: number;
          total: number;
          whatsapp_consent: boolean;
          marketing_consent: boolean;
          gdpr_consent: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_number: string;
          customer_name: string;
          customer_surname: string;
          customer_phone: string;
          customer_address?: string | null;
          customer_city?: string | null;
          delivery_type: 'pickup' | 'delivery';
          delivery_time: string;
          payment_method: 'cash' | 'card';
          notes?: string | null;
          status?: 'pending' | 'confirmed' | 'ready' | 'delivered' | 'cancelled';
          subtotal: number;
          delivery_fee?: number;
          total: number;
          whatsapp_consent?: boolean;
          marketing_consent?: boolean;
          gdpr_consent: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_number?: string;
          customer_name?: string;
          customer_surname?: string;
          customer_phone?: string;
          customer_address?: string | null;
          customer_city?: string | null;
          delivery_type?: 'pickup' | 'delivery';
          delivery_time?: string;
          payment_method?: 'cash' | 'card';
          notes?: string | null;
          status?: 'pending' | 'confirmed' | 'ready' | 'delivered' | 'cancelled';
          subtotal?: number;
          delivery_fee?: number;
          total?: number;
          whatsapp_consent?: boolean;
          marketing_consent?: boolean;
          gdpr_consent?: boolean;
          created_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_category: string;
          product_subcategory: string;
          product_name: string;
          variant_name: string;
          variant_price: number;
          selected_flavors: Json;
          selected_extras: Json;
          has_cream: boolean;
          quantity: number;
          unit_price: number;
          total_price: number;
          notes: string | null;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_category: string;
          product_subcategory: string;
          product_name: string;
          variant_name: string;
          variant_price: number;
          selected_flavors?: Json;
          selected_extras?: Json;
          has_cream?: boolean;
          quantity?: number;
          unit_price: number;
          total_price: number;
          notes?: string | null;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_category?: string;
          product_subcategory?: string;
          product_name?: string;
          variant_name?: string;
          variant_price?: number;
          selected_flavors?: Json;
          selected_extras?: Json;
          has_cream?: boolean;
          quantity?: number;
          unit_price?: number;
          total_price?: number;
          notes?: string | null;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

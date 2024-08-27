import { z } from 'zod';

const OrderValidationSchema = z.object({
  body: z.object({
    phone: z.string({
      required_error: 'Phone number is required',
    }),
    products: z.array(
      z.object({
        product: z.string({
          required_error: 'Product id is required',
        }),
        quantity: z.number({
          required_error: 'Product quantity is required',
        }),
        total_price: z.number({
          required_error: 'Product total price is required',
        }),
      }),
    ),
    address: z.string().optional(),
    district: z.string(),
    city: z.string(),
    order_note: z.string().optional(),
    payment_method: z.string().optional(),
    shipping_method: z.string().optional(),
    courier_address: z.string().optional(),
  }),
});

const updateOrderValidation = z.object({
  body: z.object({
    phone: z.string().optional(),
    address: z.string().optional(),
    district: z.string().optional(),
    city: z.string().optional(),
    order_note: z.string().optional(),
    payment_method: z.string().optional(),
    shipping_method: z.string().optional(),
    courier_address: z.string().optional(),
    status: z
      .enum(['pending', 'processing', 'shipped', 'delivered'])
      .optional(),
  }),
});

const orderValidations = {
  OrderValidationSchema,
  updateOrderValidation,
};

export default orderValidations;

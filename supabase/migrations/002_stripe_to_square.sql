-- Migration: Rename Stripe columns to Square
-- For existing deployments migrating from Stripe to Square

ALTER TABLE orders RENAME COLUMN stripe_payment_intent_id TO square_payment_id;
ALTER TABLE orders RENAME COLUMN stripe_session_id TO square_order_id;

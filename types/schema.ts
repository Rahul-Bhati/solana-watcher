import {z} from "zod";

// Define validation schema
export const AddWalletSchema = z.object({
  name: z.string().min(1, "Wallet name is required"),
  address: z.string(),
  network: z.enum(["ethereum", "solana", "bsc"]), // Add other networks as needed
  balance: z.string()
});
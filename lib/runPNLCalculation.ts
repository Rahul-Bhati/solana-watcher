import { strict as assert } from 'assert';
// Consider using a Decimal library for financial calculations to avoid floating point errors
// import Decimal from 'decimal.js'; // Example library

// --- Constants ---
// Use the official mint address for Wrapped SOL if you track it as an SPL token,
// or use a placeholder like this for native SOL balance calculations.
const SOL_MINT_ADDRESS = 'So11111111111111111111111111111111111111112'; // Native SOL placeholder/WSOL
const SOL_DECIMALS = 9;

// --- Interfaces ---

// Represents a parsed transaction relevant to P&L
interface Transaction {
    timestamp: Date;
    // Type helps determine how to process the transaction for P&L
    type: 'BUY' | 'SELL' | 'TRANSFER_IN' | 'TRANSFER_OUT' | 'SWAP' | 'AIRDROP' | 'UNKNOWN';
    // Token received by the wallet
    tokenIn?: { mint: string; amount: number /* | Decimal */; decimals: number };
    // Token sent from the wallet
    tokenOut?: { mint: string; amount: number /* | Decimal */; decimals: number };
    // Fee paid for the transaction
    fee?: { mint: string; amount: number /* | Decimal */; decimals: number };
    // Price information *at the time of the transaction* (crucial for cost basis)
    priceInUSD?: number; // Price per unit of tokenIn (if applicable, e.g., for BUY/SWAP)
    priceOutUSD?: number; // Price per unit of tokenOut (if applicable, e.g., for SELL/SWAP)
    feePriceUSD?: number; // Price per unit of fee token
    txHash: string;
    // Add other relevant fields: e.g., description from parsing service
}

// Represents a batch of tokens acquired at a specific cost and time
interface AcquisitionLot {
    quantity: number; // Use Decimal for precision
    costPerUnitUSD: number; // Use Decimal for precision
    timestamp: Date;
}

// Holds the state for a specific token within the wallet
interface TokenHolding {
    tokenMint: string;
    decimals: number;
    // Queue of acquisition lots (FIFO - first in, first out)
    lots: AcquisitionLot[];
    // Current total quantity held (for verification)
    currentQuantity: number; // Use Decimal for precision
}

// Stores the calculated P&L results
interface PnlResult {
    realizedPnlUSD: number; // Use Decimal for precision
    unrealizedPnlUSD: number; // Use Decimal for precision
    totalPnlUSD: number; // Use Decimal for precision
    averageCostBasisUSD?: number; // Optional: Average cost of current holdings
}

// --- Placeholder API Functions ---
// IMPORTANT: Replace these with actual API calls and data parsing

/**
 * Fetches and parses transaction history for a wallet.
 * MUST return transactions sorted chronologically (oldest first).
 * MUST include price information *at the time of the transaction* if possible,
 * or fetch prices separately based on timestamp.
 */
async function fetchTransactionHistory(walletAddress: string): Promise<Transaction[]> {
    console.log(`[API Placeholder] Fetching transactions for ${walletAddress}...`);
    // Example: Call Helius Parsed Transaction History API
    // const response = await fetch(`https://api.helius.xyz/v0/addresses/${walletAddress}/transactions?api-key=YOUR_HELIUS_KEY`);
    // const data = await response.json();
    // --- CRUCIAL PARSING STEP ---
    // Map the raw API response to the Transaction interface defined above.
    // This involves:
    // 1. Identifying transaction type (BUY, SELL, SWAP, TRANSFER_IN/OUT, AIRDROP).
    // 2. Extracting tokens involved (mint addresses, amounts, decimals).
    // 3. Getting the timestamp.
    // 4. **Fetching or extracting the historical price** for tokens involved AT THE TIME of the transaction. This is essential for cost basis.
    // 5. Sorting chronologically.
    // Return dummy data for now:
    return [
        // Example: Buy 10 TOKEN_A for 100 USD (Price: 10 USD/TOKEN_A)
        { timestamp: new Date('2024-01-01T10:00:00Z'), type: 'BUY', tokenIn: { mint: 'TOKEN_A_MINT', amount: 10, decimals: 6 }, priceInUSD: 10, txHash: 'tx1' },
        // Example: Receive 5 TOKEN_A as an airdrop/transfer (assume market price was 12 USD)
        { timestamp: new Date('2024-01-15T11:00:00Z'), type: 'TRANSFER_IN', tokenIn: { mint: 'TOKEN_A_MINT', amount: 5, decimals: 6 }, priceInUSD: 12, txHash: 'tx2' },
        // Example: Sell 8 TOKEN_A for 160 USD (Price: 20 USD/TOKEN_A)
        { timestamp: new Date('2024-02-01T12:00:00Z'), type: 'SELL', tokenOut: { mint: 'TOKEN_A_MINT', amount: 8, decimals: 6 }, priceOutUSD: 20, txHash: 'tx3' },
    ].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime()); // Ensure sorted
}

/**
 * Fetches the current market price for a list of token mint addresses.
 */
async function fetchCurrentPrices(tokenMints: string[]): Promise<Record<string, number>> {
    console.log(`[API Placeholder] Fetching current prices for ${tokenMints.join(', ')}...`);
    // Example: Call Birdeye, Jupiter, CoinGecko, or Moralis Price API
    const prices: Record<string, number> = {};
    // Dummy prices for example
    tokenMints.forEach(mint => {
        if (mint === 'TOKEN_A_MINT') prices[mint] = 25; // Example current price
        else prices[mint] = 0;
    });
    return prices;
}

// --- Core P&L Calculation Logic (FIFO) ---

async function calculatePnlFifo(walletAddress: string): Promise<Record<string, PnlResult> & { overall: PnlResult }> {
    const transactions = await fetchTransactionHistory(walletAddress);
    const holdings: Map<string, TokenHolding> = new Map(); // Map<tokenMint, TokenHolding>
    const pnl: Map<string, { realized: number; costOfRemaining: number; quantityRemaining: number }> = new Map(); // Map<tokenMint, P&L state>

    // Initialize PnL map
    const initializePnl = (mint: string) => {
        if (!pnl.has(mint)) {
            pnl.set(mint, { realized: 0, costOfRemaining: 0, quantityRemaining: 0 });
        }
    };

    // Process transactions chronologically
    for (const tx of transactions) {
        // --- Handle Acquisitions (Token In) ---
        if (tx.tokenIn) {
            const { mint, amount, decimals } = tx.tokenIn;
            const costPerUnit = tx.priceInUSD ?? 0; // Default to 0 if price unavailable (e.g., some airdrops), adjust based on tax rules/preference

            if (!holdings.has(mint)) {
                holdings.set(mint, { tokenMint: mint, decimals: decimals, lots: [], currentQuantity: 0 });
            }
            const holding = holdings.get(mint)!;
            initializePnl(mint);

            // Add new acquisition lot
            holding.lots.push({
                quantity: amount,
                costPerUnitUSD: costPerUnit,
                timestamp: tx.timestamp,
            });
            holding.currentQuantity += amount; // Use Decimal add for precision
            // console.log(`Acquired ${amount} ${mint} @ ${costPerUnit} USD`);
        }

        // --- Handle Disposals (Token Out) ---
        if (tx.tokenOut) {
            const { mint, amount, decimals } = tx.tokenOut;
            const proceedsPerUnit = tx.priceOutUSD ?? 0; // Price at time of sale/transfer

            if (!holdings.has(mint) || holdings.get(mint)!.lots.length === 0) {
                console.warn(`[P&L Warning] Trying to dispose ${amount} of ${mint} but no holdings recorded. Tx: ${tx.txHash}`);
                continue; // Skip if no corresponding holdings (might indicate incomplete history)
            }

            const holding = holdings.get(mint)!;
            initializePnl(mint);
            const pnlState = pnl.get(mint)!;

            let amountToDispose = amount;
            let totalCostBasisOfDisposed = 0;

            // Consume lots using FIFO
            while (amountToDispose > 0 && holding.lots.length > 0) {
                const oldestLot = holding.lots[0];
                const amountFromLot = Math.min(amountToDispose, oldestLot.quantity); // Use Decimal min/compare

                // Calculate cost basis for the portion being disposed from this lot
                totalCostBasisOfDisposed += amountFromLot * oldestLot.costPerUnitUSD; // Use Decimal multiply

                // Update or remove the lot
                oldestLot.quantity -= amountFromLot; // Use Decimal subtract
                if (oldestLot.quantity <= 1e-9) { // Check if lot is depleted (use Decimal comparison)
                    holding.lots.shift(); // Remove empty lot from the front
                }

                amountToDispose -= amountFromLot; // Use Decimal subtract
            }

            if (amountToDispose > 1e-9) { // Check if disposed more than held (use Decimal comparison)
                console.warn(`[P&L Warning] Disposed ${amount} of ${mint}, but only accounted for ${amount - amountToDispose}. Possible history gap? Tx: ${tx.txHash}`);
            }

            const proceeds = (amount - amountToDispose) * proceedsPerUnit; // Proceeds from what was actually disposed
            const realizedGainLoss = proceeds - totalCostBasisOfDisposed;
            pnlState.realized += realizedGainLoss; // Use Decimal add

            holding.currentQuantity -= (amount - amountToDispose); // Update current quantity
            // console.log(`Disposed ${amount - amountToDispose} ${mint} @ ${proceedsPerUnit} USD. Realized P&L: ${realizedGainLoss}`);
        }

        // --- Handle Fees (Considered as a cost/loss) ---
        // Simple approach: Treat fee as a separate loss. Complex: Add fee to cost basis or deduct from proceeds.
        if (tx.fee) {
            const { mint, amount } = tx.fee;
            const feeValue = amount * (tx.feePriceUSD ?? 0); // Requires fee token price at tx time
            initializePnl(mint); // Track PNL for the fee token itself if needed
            // Simplification: Add fee value as a negative realized PNL to the primary token involved or overall
            // For simplicity, we'll add it to the 'overall' calculation later.
            // A more robust system might associate the fee cost with the specific buy/sell.
        }
    }

    // --- Calculate Unrealized P&L ---
    const finalResults: Record<string, PnlResult> & { overall: PnlResult } = {
        overall: { realizedPnlUSD: 0, unrealizedPnlUSD: 0, totalPnlUSD: 0 }
    };
    const mintsToFetch = Array.from(holdings.keys());
    const currentPrices = await fetchCurrentPrices(mintsToFetch);

    for (const [mint, holding] of holdings.entries()) {
        if (holding.currentQuantity <= 1e-9) continue; // Skip tokens fully disposed

        const currentPrice = currentPrices[mint] ?? 0;
        let currentTotalValue = 0;
        let totalCostBasisOfRemaining = 0;
        let totalQuantityRemaining = 0;

        // Calculate cost basis and quantity of remaining lots
        for (const lot of holding.lots) {
            totalCostBasisOfRemaining += lot.quantity * lot.costPerUnitUSD; // Use Decimal
            totalQuantityRemaining += lot.quantity; // Use Decimal
        }

        // Verify calculated remaining quantity matches tracked quantity
        if (Math.abs(totalQuantityRemaining - holding.currentQuantity) > 1e-9) { // Use Decimal comparison
            console.warn(`[P&L Warning] Mismatch in remaining quantity for ${mint}. Calculated: ${totalQuantityRemaining}, Tracked: ${holding.currentQuantity}`);
            // Use the tracked holding.currentQuantity as potentially more reliable if history parsing was perfect
            totalQuantityRemaining = holding.currentQuantity;
        }


        currentTotalValue = totalQuantityRemaining * currentPrice; // Use Decimal
        const unrealizedGainLoss = currentTotalValue - totalCostBasisOfRemaining;

        const tokenPnl = pnl.get(mint) ?? { realized: 0 }; // Get realized PNL calculated earlier
        const averageCostBasis = totalQuantityRemaining > 1e-9 ? totalCostBasisOfRemaining / totalQuantityRemaining : 0;

        finalResults[mint] = {
            realizedPnlUSD: tokenPnl.realized,
            unrealizedPnlUSD: unrealizedGainLoss,
            totalPnlUSD: tokenPnl.realized + unrealizedGainLoss, // Use Decimal
            averageCostBasisUSD: averageCostBasis
        };

        // Aggregate overall P&L
        finalResults.overall.realizedPnlUSD += tokenPnl.realized; // Use Decimal
        finalResults.overall.unrealizedPnlUSD += unrealizedGainLoss; // Use Decimal
    }

    // Add fee impact to overall realized PNL (simplistic approach)
    let totalFeeLoss = 0;
    for (const tx of transactions) {
        if (tx.fee) {
            totalFeeLoss += tx.fee.amount * (tx.feePriceUSD ?? 0); // Use Decimal
        }
    }
    finalResults.overall.realizedPnlUSD -= totalFeeLoss; // Subtract fees

    finalResults.overall.totalPnlUSD = finalResults.overall.realizedPnlUSD + finalResults.overall.unrealizedPnlUSD; // Use Decimal

    return finalResults;
}

// --- Example Usage ---
async function runPnlCalculation() {
    // Replace with the actual wallet address you want to track
    const wallet = "MJKqp326RZCHnAAbew9MDdui3iCKWco7fsK9sVuZTX2";
    console.log(`Calculating P&L for wallet: ${wallet}`);

    try {
        const results = await calculatePnlFifo(wallet);
        console.log("\n--- P&L Results ---");
        console.log(JSON.stringify(results, (key, value) =>
            // Basic serialization for Date, potentially add Decimal serialization if used
            value instanceof Date ? value.toISOString() : value
            , 2));

        // Example: Accessing specific token P&L
        if (results['TOKEN_A_MINT']) {
            console.log(`\nToken A P&L:`);
            console.log(` Realized: $${results['TOKEN_A_MINT'].realizedPnlUSD.toFixed(2)}`);
            console.log(` Unrealized: $${results['TOKEN_A_MINT'].unrealizedPnlUSD.toFixed(2)}`);
            console.log(` Total: $${results['TOKEN_A_MINT'].totalPnlUSD.toFixed(2)}`);
            console.log(` Average Cost Basis: $${results['TOKEN_A_MINT'].averageCostBasisUSD?.toFixed(2) ?? 'N/A'}`);
        }
        console.log(`\nOverall Wallet P&L:`);
        console.log(` Realized: $${results.overall.realizedPnlUSD.toFixed(2)}`);
        console.log(` Unrealized: $${results.overall.unrealizedPnlUSD.toFixed(2)}`);
        console.log(` Total: $${results.overall.totalPnlUSD.toFixed(2)}`);


    } catch (error) {
        console.error("Error calculating P&L:", error);
    }
}

runPnlCalculation(); // Execute the example

// import { ethers } from 'ethers';
import { Connection, PublicKey, StakeProgram } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token';

export async function validateSolanaAddress(
  address: string,
  connection: Connection
): Promise<{ isValid: boolean; type: string }> {
  try {
    // First check if it's a valid public key format
    const pubKey = new PublicKey(address);
    
    // Get account info
    const accountInfo = await connection.getAccountInfo(pubKey);
    
    if (!accountInfo) {
      return { isValid: false, type: 'invalid' };
    }

    // Check for different account types
    if (accountInfo.owner.equals(TOKEN_PROGRAM_ID) || 
        accountInfo.owner.equals(TOKEN_2022_PROGRAM_ID)) {
      return { isValid: true, type: 'token' };
    }

    if (accountInfo.owner.equals(StakeProgram.programId)) {
      return { isValid: true, type: 'stake' };
    }

    // Check if it's a program (executable)
    if (accountInfo.executable) {
      return { isValid: true, type: 'program' };
    }

    // Check for token mint accounts
    if (accountInfo.data.length === 82) {
      return { isValid: true, type: 'mint' };
    }

    // Regular wallet address
    return { isValid: true, type: 'wallet' };

  } catch (error) {
    return { isValid: false, type: 'invalid' };
  }
}

// Usage example
const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');

// Example usage:
export async function checkAddress(address: string) {
  // Quick format check
  // if (!isValidSolanaAddress(address)) {
  //   console.log('Invalid address format');
  //   return;
  // }

  // Detailed validation
  const result = await validateSolanaAddress(address, connection);
  console.log(`Address is ${result.isValid ? 'valid' : 'invalid'} and is a ${result.type}`);
  return result;
}

// Function to validate Ethereum-like addresses (works for ETH, BSC)
// function isValidEthereumAddress(address: string): boolean {
//   try {
//     return ethers.isAddress(address);
//   } catch {
//     return false;
//   }
// }

// Function to validate Solana address
export function isValidSolanaAddress(address: string): boolean {
  try {
    const pubKey = new PublicKey(address);
    return PublicKey.isOnCurve(pubKey);
  } catch {
    return false;
  }
}
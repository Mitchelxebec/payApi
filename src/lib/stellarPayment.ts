import { signTransaction } from "@stellar/freighter-api";
import {
  Asset,
  Horizon,
  Networks,
  Operation,
  TransactionBuilder,
} from "@stellar/stellar-sdk";

const server = new Horizon.Server("https://horizon-testnet.stellar.org");

export async function sendPayment({
  from,
  to,
  amount,
}: {
  from: string;
  to: string;
  amount: string;
}) {
  // 1. Load sender account
  const account = await server.loadAccount(from);

  // 2. Build transaction
  const tx = new TransactionBuilder(account, {
    fee: "100",
    networkPassphrase: Networks.TESTNET,
  })
    .addOperation(
      Operation.payment({
        destination: to,
        asset: Asset.native(), //XLM
        amount,
      }),
    )
    .setTimeout(30)
    .build();

  // 3. Convert to XDR
  const xdr = tx.toXDR();

  // 4. Ask Freighter to sign
  const signed = await signTransaction(xdr, {
    networkPassphrase: Networks.TESTNET,
  });

  if (signed.error) {
    // signed.error can be an object — extract a readable message
    const errMsg =
      typeof signed.error === "string"
        ? signed.error
        : (signed.error as any)?.message ?? "Transaction was cancelled";
    throw new Error(errMsg);
  }

  //   5. Rebuild signed transaction
  const signedTx = TransactionBuilder.fromXDR(
    signed.signedTxXdr,
    Networks.TESTNET,
  );

  //   6. Submit transaction
  const result = await server.submitTransaction(signedTx);

  return result.hash;
}

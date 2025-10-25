import { PrivateKey, AccountCreateTransaction, Hbar } from "@hashgraph/sdk";
import hederaClient from "./hedera";

export const createHederaAccount = async () => {
  const newKey = PrivateKey.generateECDSA();
  const newPub = newKey.publicKey;
  const newCreateTx = await new AccountCreateTransaction()
    .setECDSAKeyWithAlias(newPub)
    .setInitialBalance(new Hbar(20))
    .execute(hederaClient);
  const newId = (await newCreateTx.getReceipt(hederaClient)).accountId;

  return {
    hederaId: newId,
    publicKey: newPub,
    privateKey: newKey.toString(),
  };
};

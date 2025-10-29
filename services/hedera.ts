import { Client } from "@hashgraph/sdk";

const OPERATOR_ID = process.env.OPERATOR_ID ?? "";
const OPERATOR_KEY = process.env.OPERATOR_KEY ?? "";

const hederaClient = Client.forTestnet().setOperator(OPERATOR_ID, OPERATOR_KEY);

export default hederaClient;

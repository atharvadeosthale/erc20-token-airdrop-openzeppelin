import { ethers } from "ethers";
import { contractABI, contractAddress } from "../../contract";

const provider = new ethers.providers.JsonRpcProvider(
  "https://rpc-mumbai.maticvigil.com"
);

const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);

const contract = new ethers.Contract(contractAddress, contractABI, wallet);

export default async function (req, res) {
  if (req.method != "POST")
    return res.status(400).json({ message: "Please use POST request" });
  const txn = await contract.functions.mint(
    req.body.address,
    ethers.utils.parseEther("20")
  );

  await txn.wait();

  res.json({
    message: `Transaction completed, contract address ${contractAddress}`,
  });
}

import { useState, useEffect, useContext } from "react";
import pb from "../lib/pocketbase.js";
import UserContext from "./UserContext";

interface PaymentDetails {
  paymentStatus: boolean;
  amount: number;
  verceraId: string | null;
  qrCode: string | null;
  paymentScreenshot: string | null;
}

const useFetchPaymentStatus = () => {
  const { userInfo } = useContext(UserContext);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userInfo) {
      fetchPaymentStatus(userInfo.id);
    }
  }, [userInfo]);

  const fetchPaymentStatus = async (userId: string) => {
    try {
      const record = await pb.collection("users").getOne(userId);
      setPaymentDetails({
        paymentStatus: record.paymentStatus || false,
        amount: record.isAMURoboclubMember ? 100 : 250,
        verceraId: record.verceraId || null,
        qrCode: record.qrCode || null,
        paymentScreenshot: record.paymentScreenshot || null,
      });
    } catch (error) {
      console.error("Error fetching payment status:", error);
      setError("Unable to fetch payment status. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return { paymentDetails, loading, error };
};

export default useFetchPaymentStatus;

import { useState, useEffect } from "react";
import pb from "@/lib/pocketbase";
import { useContext } from "react";
import UserContext from "@/utils/UserContext";

export default function useFetchEvents() {
  const [registrationLoading, setRegistrationLoading] = useState(false);
  const [registrationError, setRegistrationError] = useState<string | null>(
    null
  );
  const { userInfo } = useContext(UserContext);

  const handleEventRegistration = async (eventId: string) => {
    console.log(eventId);
    const data = {
      user: userInfo?.id,
      event: eventId,
    };
    setRegistrationLoading(true);
    try {
      const existingRegistration = await pb
        .collection("event_registrations")
        .getFullList({
          filter: `user="${userInfo?.id}" && event="${eventId}"`,
        });
      console.log(existingRegistration);
      if (existingRegistration.length > 0) {
        setRegistrationError("You have already registered for this event.");
        return;
      }
      await pb.collection("event_registrations").create(data);
    } catch (e) {
      setRegistrationError(e.message);
    } finally {
      setRegistrationLoading(false);
    }
  };

  return { handleEventRegistration, registrationLoading, registrationError };
}

import { useState, useEffect } from "react";
import pb from "@/lib/pocketbase";
import { useContext } from "react";
import UserContext from "@/utils/UserContext";

export default function useFetchEvents() {
  const [registrationLoading, setRegistrationLoading] = useState(false);
  const [registrationError, setRegistrationError] = useState<string | null>(null);
  const { userInfo } = useContext(UserContext);

  const handleEventRegistration = async (eventId: string) => {
    const data = {
      user: userInfo?.id,
      event: eventId,
    };
    setRegistrationLoading(true);
    try {
      const existingRegistration = await pb
        .collection("event_registrations")
        .getFirstListItem(`user="${userInfo?.id}" && event="${eventId}"`);

      if (existingRegistration) {
        setRegistrationError("You have already registered for this event.");
        return;
      }
      const record = await pb.collection("event_registrations").create(data);
    } catch (e) {
      setRegistrationError(e.message);
    } finally {
        console.log(registrationError)
      setRegistrationLoading(false);
    }
  };

  return { handleEventRegistration, registrationLoading, registrationError };
}

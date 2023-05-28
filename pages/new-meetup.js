import { useRouter } from "next/router";
import NewMeetupForm from "../components/meetups/NewMeetupForm";

function newMeetup() {
  const router = useRouter();

  async function addMeetup(meetup) {
    const res = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetup),
      headers: { "Content-Type": "application/json" },
    });

    await res.json();
    router.replace("/");
  }
  return <NewMeetupForm onAddMeetup={addMeetup} />;
}

export default newMeetup;

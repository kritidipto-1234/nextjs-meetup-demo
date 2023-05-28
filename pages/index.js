import { useEffect, useState } from "react";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

function Homepage(props) {
  // const [meetups, setMeetups] = useState([]);
  // useEffect(() => {
  //   setMeetups(DUMMY_MEETUPS);
  // }, []);
  return <MeetupList meetups={props.meetups} />;
}

// export async function getServerSideProps({ req, res }) {
//   return {
//     props: { meetups: DUMMY_MEETUPS },
//   };
// }

export async function getStaticProps() {
  const client = await MongoClient.connect("mongodb+srv://kriti:QJJEE07v0tjI4tD1@cluster0.gbmpplt.mongodb.net/meetups?retryWrites=true&w=majority");
  const db = client.db();
  const meetupsCollection = db.collection("meetup-details");
  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((m) => {
        m.id = m._id.toString();
        delete m._id;
        return m;
      }),
    },
    revalidate: 10,
  };
}

export default Homepage;

import MeetupDetail from "../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";

function Meetup(props) {
  return <MeetupDetail meetup={props.meetup} />;
}

export async function getStaticPaths() {
  const client = await MongoClient.connect("mongodb+srv://kriti:QJJEE07v0tjI4tD1@cluster0.gbmpplt.mongodb.net/meetups?retryWrites=true&w=majority");
  const db = client.db();
  const meetupsCollection = db.collection("meetup-details");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    paths: meetups.map((m) => ({ params: { meetupId: m._id.toString() } })),
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect("mongodb+srv://kriti:QJJEE07v0tjI4tD1@cluster0.gbmpplt.mongodb.net/meetups?retryWrites=true&w=majority");
  const db = client.db();
  const meetupsCollection = db.collection("meetup-details");
  const meetup = await meetupsCollection.findOne({ _id: new ObjectId(meetupId) });
  client.close();
  meetup.id = meetup._id.toString();
  delete meetup._id;

  console.log(meetupId);
  return {
    props: { meetup },
    // revalidate: 10,
  };
}

export default Meetup;

import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, image, address, description } = req.body;
    const client = await MongoClient.connect("mongodb+srv://kriti:QJJEE07v0tjI4tD1@cluster0.gbmpplt.mongodb.net/meetups?retryWrites=true&w=majority");
    const db = client.db();
    const meetupsCollection = db.collection("meetup-details");
    const result = await meetupsCollection.insertOne({
      title,
      image,
      address,
      description,
    });
    console.log(result);
    client.close();
    res.status(201).json({
      message: "Meetup inserted",
      meetup: result,
    });
  }
}
// QJJEE07v0tjI4tD1

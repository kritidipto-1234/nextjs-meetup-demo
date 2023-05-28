import classes from "./MeetupItem.module.css";

function MeetupDetail({ meetup }) {
  return (
    <>
      <div>Meetup Details</div>
      <div className={classes.image}>
        <img src={meetup.image} alt={meetup.title} />
      </div>
      <div className={classes.content}>
        <h3>{meetup.title}</h3>
        <address>{meetup.address}</address>
      </div>
    </>
  );
}

export default MeetupDetail;

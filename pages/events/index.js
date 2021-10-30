import Layout from "@components/layout";
import EventItem from "@components/event-item";
import { API_URL } from "@config/index";

export default function EventsPage({ events }) {
  console.log(events);
  return (
    <div>
      <Layout>
        <h1>Events</h1>
        {events.length === 0 && <h3>No events to show</h3>}

        {events.map(evt => (
          <EventItem key={evt.id} evt={evt} />
        ))}
      </Layout>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();
  return {
    props: { events },
    revalidate: 1,
  };
}

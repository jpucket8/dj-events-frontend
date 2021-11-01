import Layout from "@components/layout";
import EventItem from "@components/event-item";
import { API_URL, PER_PAGE } from "@config/index";
import Pagination from "@components/pagination";

export default function EventsPage({ events, page, total }) {
  return (
    <div>
      <Layout>
        <h1>Events</h1>
        {events.length === 0 && <h3>No events to show</h3>}

        {events.map(evt => (
          <EventItem key={evt.id} evt={evt} />
        ))}

        <Pagination page={page} total={total} />
      </Layout>
    </div>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  // Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  // Fetch total/count
  const toatlRes = await fetch(`${API_URL}/events/count`);
  const total = await toatlRes.json();

  // Fetch events
  const eventRes = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const events = await eventRes.json();

  return {
    props: { events, page: +page, total },
  };
}

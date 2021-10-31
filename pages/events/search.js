import qs from "qs";
import Link from "next/link";
import Layout from "@components/layout";
import EventItem from "@components/event-item";
import { API_URL } from "@config/index";

export default function SearchPage({ events, term }) {
  console.log(events);
  return (
    <Layout title={`Search Results for: ${term}`}>
      <Link href="/events">
        <a>{"<"} Go Back</a>
      </Link>
      <h1>
        Search Results for: {'"'}
        {term}
        {'"'}
      </h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map(evt => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { description_contains: term },
        { venue_contains: term },
      ],
    },
  });
  const res = await fetch(`${API_URL}/events?${query}`);
  const events = await res.json();

  return {
    props: { events, term },
  };
}

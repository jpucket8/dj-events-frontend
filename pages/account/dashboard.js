import Layout from "@components/layout";
import DashboardEvent from "@components/dashboard-event";
import { parseCookies } from "@helpers/index";
import { API_URL } from "@config/index";

import styles from "@styles/dashboard.module.css";

export default function DashboardPage({ events }) {
  const deleteEvent = (e, id) => {
    e.preventDefault();
    console.log(id);
  };

  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>

        {events.map(evt => (
          <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/events/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const events = await res.json();

  return {
    props: { events },
  };
}

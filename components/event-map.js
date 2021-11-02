import Image from "next/image";
import { useState, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import Geocode from "react-geocode";

import "mapbox-gl/dist/mapbox-gl.css";

export default function EventMap({ evt }) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "500px",
    latitude: 40.712772,
    longitude: -73.935242,
    zoom: 12,
  });

  useEffect(() => {
    // Get lattitude & longitude from address.
    Geocode.fromAddress(evt.address).then(
      res => {
        const { lat, lng } = res.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
        setViewport({ ...viewport, latitude: lat, longitude: lng });
        setLoading(false);
        console.log(lat, lng);
      },
      error => console.error(error)
    );
  }, []);

  Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);

  if (loading) return false;

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
      onViewportChange={vp => setViewport(vp)}>
      <Marker key={evt.id} latitude={lat} longitude={lng}>
        <Image src="/images/pin.svg" width={30} height={30} alt={evt.name} />
      </Marker>
    </ReactMapGL>
  );
}

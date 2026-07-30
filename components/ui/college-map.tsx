"use client";

import { useEffect, useRef } from "react";
import { Map, NavigationControl, Marker, Popup } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export function CollegeMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new Map({
      container: mapContainer.current,
      style:
        "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
      center: [57.1815, 50.2839],
      zoom: 14.5,
      attributionControl: false,
    });

    map.current.addControl(
      new NavigationControl({ visualizePitch: false }),
      "top-right"
    );

    new Marker({ color: "#6178f5" })
      .setLngLat([57.1815, 50.2839])
      .setPopup(
        new Popup({ offset: 25, closeButton: false }).setHTML(
          `<div style="color:#08090a;font-family:system-ui,sans-serif;padding:4px;font-size:13px;line-height:1.4;">
            <strong style="font-size:14px;">Европейский колледж</strong><br/>
            г. Актобе, ул. Маресьева, 105
           </div>`
        )
      )
      .addTo(map.current);

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  return (
    <div
      ref={mapContainer}
      className="absolute inset-0 w-full h-full"
      style={{ mixBlendMode: "normal" }}
    />
  );
}

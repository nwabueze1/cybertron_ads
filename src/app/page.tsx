"use client";

import dynamic from "next/dynamic";
import { nhost } from "@/lib.nhost";
import { NhostProvider } from "@nhost/nextjs";

const Home = dynamic(
  () => {
    return import("../components/Home");
  },
  { ssr: false }
);

function App() {
  return (
    <NhostProvider nhost={nhost}>
      <Home />
    </NhostProvider>
  );
}

export default App;

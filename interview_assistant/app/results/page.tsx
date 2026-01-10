"use client";
import { useEffect, useState } from "react";

export default function Results() {
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    const run = async () => {
      const res = await fetch("http://localhost:5001/api/results");
      const data = await res.json();
      setResults(data);
    };

    run();
  }, []);

  return (
    <div>
      <h1>Results</h1>
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </div>
  );
}

"use client";

import useFetchTable from "@/app/[project-id]/call-sheet/[call-sheet-id]/(component)/hooks/useFetchTable";

export default function ProjectList() {
  const { data, error, loading, refetch } = useFetchTable("projects");

  return (
    <>
      {data.map((project, index) => (
        <div key={index}>{project.title}</div>
      ))}
    </>
  );
}

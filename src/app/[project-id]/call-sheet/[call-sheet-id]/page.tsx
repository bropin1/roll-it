import AddressTable from "./(component)/(address)/address";
import CastTable from "./(component)/(cast)/castTable";

export default function CallSheetInstancePage({
  params,
}: {
  params: { "project-id": string; "call-sheet-id": string };
}) {
  return (
    <>
      {params["project-id"]}
      <AddressTable />
      <CastTable params={params} />
    </>
  );
}

"use client";
import styles from "./callSheetHeader.module.scss";
import useFetchTable from "../hooks/useFetchTable";
export default function CallSheetHeader({
  params,
}: {
  params: { "project-id": string; "call-sheet-id": string };
}) {
  const { data } = useFetchTable("call_sheets", undefined, {
    column: "id",
    condition: params["call-sheet-id"],
  });
  return (
    <div className={styles.root}>
      <div className={styles["title-wrapper"]}>
        <div className={styles.breadcrumbs}>
          Calendrier / Création d’une feuille de service
        </div>
        <h1 className={styles.title}>Feuille de service du {data[0]?.date}</h1>
      </div>
      <div className={styles["action-buttons"]}></div>
    </div>
  );
}

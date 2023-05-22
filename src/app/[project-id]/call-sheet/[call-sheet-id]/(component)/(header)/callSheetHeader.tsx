"use client";
import styles from "./callSheetHeader.module.scss";
import useFetchTable from "../hooks/useFetchTable";
import Button from "@/common/components/1-atoms/button/button";
import Modal from "@/common/components/1-atoms/modal/modal";
import { useState } from "react";

export default function CallSheetHeader({
  params,
}: {
  params: { "project-id": string; "call-sheet-id": string };
}) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { data } = useFetchTable("call_sheets", undefined, {
    column: "id",
    condition: params["call-sheet-id"],
  });
  function onClick() {
    setModalOpen(true);
  }
  return (
    <div className={styles.root}>
      <div className={styles["title-wrapper"]}>
        <div className={styles.breadcrumbs}>
          Calendrier / Création d’une feuille de service
        </div>
        <h1 className={styles.title}>Feuille de service du {data[0]?.date}</h1>
      </div>
      <div className={styles["action-buttons"]}>
        <Button variant="default" onClick={onClick}>
          Envoyer la feuille
        </Button>
      </div>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        Envoyé aux utilisateurs !
      </Modal>
    </div>
  );
}

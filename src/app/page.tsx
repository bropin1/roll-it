import Image from "next/image";
import styles from "./page.module.css";
import useFetchTable from "./[project-id]/call-sheet/[call-sheet-id]/(component)/hooks/useFetchTable";
import { Database } from "@/common/lib/database.types";
import ProjectList from "@/common/components/projects-list";

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <span>Mes projets </span>
      </div>
      <ProjectList />
    </main>
  );
}

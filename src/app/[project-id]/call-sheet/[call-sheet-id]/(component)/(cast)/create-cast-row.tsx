"use client";
import { useRef, useState } from "react";
import useFetchTable from "@/app/[project-id]/call-sheet/[call-sheet-id]/(component)/hooks/useFetchTable";
import { FormEvent } from "react";
import { supabase } from "@/common/supabaseConfig/supabaseConfig";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import Modal from "@/common/components/1-atoms/modal/modal";
import styles from "./styling.module.scss";
import InputComponent from "../../../../../../common/components/1-atoms/input/input";
import Button from "@/common/components/1-atoms/button/button";

export default function CreateCastRole({
  params,
  setTableRow,
  modalOpen,
  setModalOpen,
}: {
  params: { "project-id": string; "call-sheet-id": string };
  setTableRow: Dispatch<SetStateAction<any[]>>;
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement | null>(null);
  const userNameRef = useRef<HTMLInputElement | null>(null);
  const roleNumberRef = useRef<HTMLInputElement | null>(null);
  const [email, setEmail] = useState<string>("");
  const {
    data: users,
    error,
    loading,
    refetch,
  } = useFetchTable("project_users");
  console.log("");
  //fetch the projectUsers
  const projectUsers = users.filter(
    (item) => item.project_id === Number(params["project-id"])
  );
  async function onSubmitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    //Insert cast_roles
    const { data, error } = await supabase
      .from("cast_roles")
      .insert({
        fiction_name: nameRef.current?.value,
        number: Number(roleNumberRef.current?.value),
        user_name: userNameRef.current?.value,
        project_id: Number(params["project-id"]),
        email: email,
      })
      .select();
    if (error) {
      console.log("error: ", error);
      return;
    }

    // insert a new row inside cast_call_times table
    const { data: dataCastCallTimes, error: errorCastCallTimes } =
      await supabase
        .from("cast_call_times")
        .insert({
          cast_role_id: data[0].id,
          call_sheet_id: Number(params["call-sheet-id"]),
        })
        .select(
          "id, hmc_call_time, pat_call_time, call_sheet_id, cast_role_id, cast_role_id ( id, fiction_name, number, user_name )"
        );
    console.log("return cast-call-times object", dataCastCallTimes);

    if (errorCastCallTimes) {
      console.log(
        "an error has happened on inserting the new row: ",
        errorCastCallTimes
      );
      return;
    }

    //update the state to add a row
    setTableRow((prevState) => {
      return [...prevState, dataCastCallTimes[0]];
    });

    //close modal
    setModalOpen(false);
  }
  function onChangeHandler(event: React.ChangeEvent<HTMLSelectElement>) {
    setEmail(event.target.value);
  }

  return (
    <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className={styles.root}>
        <div className={styles.header}>
          <h1 className={styles.title}>Ajouter un cast</h1>
          <span className={styles.subtitle}>
            Remplissez les champs ci-dessous pour ajouter un cast
          </span>
        </div>
        <form onSubmit={onSubmitHandler} className={styles.content}>
          <div className={styles["input-wrapper"]}>
            <span className={styles.label}>Numéro du cast</span>
            <InputComponent
              variant="medium"
              type="number"
              name="role-number"
              ref={roleNumberRef}
            />
          </div>
          <div className={styles["input-wrapper"]}>
            <span className={styles.label}>Nom et Prénom</span>
            <InputComponent
              variant="medium"
              type="text"
              name="username"
              ref={userNameRef}
            />
          </div>
          <div className={styles["input-wrapper"]}>
            <span className={styles.label}>Rôle</span>
            <InputComponent
              variant="medium"
              type="text"
              name="name"
              ref={nameRef}
            />
          </div>
          <div className={styles["input-wrapper"]}>
            <span className={styles.label}>Email</span>
            <select
              className={styles.select}
              name="email"
              defaultValue={email}
              onChange={(e) => {
                onChangeHandler(e);
              }}
            >
              {projectUsers.map((user) => {
                return (
                  <option key={user.email} value={user.email}>
                    {user.email}
                  </option>
                );
              })}
            </select>
          </div>
          <Button variant="default" type="submit" className={styles.button}>
            Ajouter le cast
          </Button>
        </form>
      </div>
    </Modal>
  );
}

"use client";
import styles from "./note.module.scss";
import useFetchTable from "../hooks/useFetchTable";
import { ChangeEvent } from "react";
import { supabase } from "@/common/supabaseConfig/supabaseConfig";

export default function Note({
  params,
}: {
  params: { "project-id": string; "call-sheet-id": string };
}) {
  //fetch default Value
  const { data, refetch } = useFetchTable("call_sheets", undefined, {
    column: "id",
    condition: params["call-sheet-id"],
  });
  async function onChangeHandler(event: ChangeEvent<HTMLTextAreaElement>) {
    const { error } = await supabase
      .from("call_sheets")
      .update({ note: event.target.value })
      .eq("id", params["call-sheet-id"]);

    if (error) {
      console.log(error);
      return;
    }
  }
  return (
    <textarea
      defaultValue={data[0]?.note}
      className={styles.root}
      onChange={onChangeHandler}
    ></textarea>
  );
}

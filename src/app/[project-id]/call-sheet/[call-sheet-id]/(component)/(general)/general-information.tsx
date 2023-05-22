"use client";
import InputComponent from "../../../../../../common/components/1-atoms/input/input";
import { supabase } from "@/common/supabaseConfig/supabaseConfig";
import { useRef, useState, useEffect } from "react";
import useFetchTable from "../hooks/useFetchTable";
import { Database } from "@/common/lib/database.types";
import styles from "./genera.module.scss";

type Data = Database["public"]["Tables"]["call_sheets"]["Row"];

export default function GeneralInformation({
  params,
}: {
  params: { "project-id": string; "call-sheet-id": string };
}) {
  // insert Call_sheet
  const { data, error, loading, refetch } = useFetchTable(
    "call_sheets",
    undefined,
    { column: "id", condition: params["call-sheet-id"] }
  );

  const startTimeRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);
  const lunchTimeRef = useRef<HTMLInputElement>(null);

  async function onChangeHandler(columnName: string) {
    console.log("ref value", startTimeRef?.current?.value);
    const value = (() => {
      switch (columnName) {
        case "start_time":
          return startTimeRef?.current?.value;

        case "end_time":
          return endTimeRef?.current?.value;

        case "lunch_time":
          return lunchTimeRef?.current?.value;

        default:
          return undefined;
      }
    })();
    const { error } = await supabase
      .from("call_sheets")
      .update({ [columnName]: value })
      .eq("id", params["call-sheet-id"]);

    if (error) {
      console.log(error);
      return;
    }
  }
  return (
    <div className={styles.root}>
      <div className={styles.header}>{"[Date]"}</div>
      <div className={styles.content}>
        <div className={styles["input-wrapper"]}>
          <span className={styles.label}>Horaire</span>
          <div className={styles.flex}>
            <InputComponent
              variant="small"
              type="time"
              className={styles.input}
              ref={startTimeRef}
              defaultValue={data[0]?.start_time}
              onChange={() => {
                onChangeHandler("start_time");
              }}
            />
            à
            <InputComponent
              variant="small"
              type="time"
              ref={endTimeRef}
              className={styles.input}
              defaultValue={data[0]?.end_time}
              onChange={() => {
                onChangeHandler("end_time");
              }}
            />
          </div>
        </div>
        <div className={styles["input-wrapper"]}>
          <span className={styles.label}>Pause déjeuner</span>
          <InputComponent
            variant="small"
            type="time"
            ref={lunchTimeRef}
            defaultValue={
              data[0]?.lunch_time === null ? undefined : data[0]?.lunch_time
            }
            onChange={() => {
              onChangeHandler("lunch_time");
            }}
          />
        </div>
      </div>
    </div>
  );
}

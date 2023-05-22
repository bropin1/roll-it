"use client";

import useFetchTable from "../hooks/useFetchTable";
import { Database } from "@/common/lib/database.types";
import { supabase } from "@/common/supabaseConfig/supabaseConfig";
import { HtmlHTMLAttributes, ChangeEvent } from "react";
import styles from "../table.module.scss";
import InputComponent from "../../../../../../common/components/1-atoms/input/input";

type departments = Database["public"]["Tables"]["department_call_times"]["Row"];
type Header = {
  key: keyof departments;
  label: string;
};
const headers: Header[] = [
  {
    key: "Mise en scène",
    label: "Mise en scène",
  },
  {
    key: "Image",
    label: "Image",
  },
  {
    key: "Réalisation",
    label: "Réalisation",
  },
  {
    key: "H.M.C.",
    label: "H.M.C.",
  },
  {
    key: "Machinerie",
    label: "Machinerie",
  },
  {
    key: "Lumière",
    label: "Lumière",
  },
  {
    key: "Son",
    label: "Son",
  },
  {
    key: "Régie",
    label: "Régie",
  },
];

export default function DepartmentTable({
  params,
}: {
  params: { "project-id": string; "call-sheet-id": string };
}) {
  //fetch the department table
  const { data } = useFetchTable("department_call_times", undefined, {
    column: "call_sheet_id",
    condition: params["call-sheet-id"],
  });

  async function onChangeHandler(
    event: ChangeEvent<HTMLInputElement>,
    columnName: string
  ) {
    try {
      const { error } = await supabase
        .from("department_call_times")
        .update({ [columnName]: event.target.value })
        .eq("call_sheet_id", params["call-sheet-id"]);
      if (error) {
        console.log(error);
        return;
      }
    } catch (error) {
      return error;
    }
  }
  return (
    <div className={styles.root}>
      <table>
        <thead>
          <tr>
            {headers.map((header) => {
              return <td key={header.key}> {header.label}</td>;
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            {headers.map((header, index) => {
              return (
                <td key={index}>
                  <InputComponent
                    variant="cell"
                    type="time"
                    defaultValue={data[0]?.[header.key]}
                    onChange={(e) => {
                      onChangeHandler(e, header.key);
                    }}
                  />
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

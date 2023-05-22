"use client";
import { supabase } from "@/common/supabaseConfig/supabaseConfig";
import { useEffect, useRef, createRef, Fragment, useState } from "react";
import { Database } from "@/common/lib/database.types";
import useFetchTable from "../hooks/useFetchTable";
import CreateCastRole from "./create-cast-row";
import { ChangeEvent } from "react";
import styles from "../table.module.scss";
import InputComponent from "../../../../../../common/components/1-atoms/input/input";
import Button from "@/common/components/1-atoms/button/button";
import ReadOnlyCellComponent from "./readOnlyCellComponent";
import { MouseEvent } from "react";

type castData = Omit<
  Database["public"]["Tables"]["cast_call_times"]["Row"],
  "cast_role_id"
> & {
  cast_role_id: {
    id: string;
    fiction_name: string;
    number: number;
    user_name: string;
  };
};
type castRolesData = Database["public"]["Tables"]["cast_roles"]["Row"];
type ItemKey = keyof castData | keyof castRolesData | "sequences";

type Header = {
  key: ItemKey;
  label: string;
};

interface Refs {
  [key: string]: {
    [key: string]: React.RefObject<HTMLInputElement>;
  };
}
const tableName = "cast_call_times";

const headers: Header[] = [
  {
    key: "number",
    label: "Number",
  },
  {
    key: "fiction_name",
    label: "Role",
  },
  {
    key: "user_name",
    label: "Comédien(nne)",
  },
  {
    key: "sequences",
    label: "séquences",
  },
  {
    key: "call_time",
    label: "Sur place",
  },
  {
    key: "hmc_call_time",
    label: "HMC",
  },
  {
    key: "pat_call_time",
    label: "PAT",
  },
];

export default function CastTable({
  params,
}: {
  params: { "project-id": string; "call-sheet-id": string };
}) {
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(-1);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  //data used to populate the table
  const { data, loading, error, refetch } = useFetchTable(
    "cast_call_times",
    "id, hmc_call_time, pat_call_time, call_sheet_id, cast_role_id, cast_role_id ( id, fiction_name, number, user_name )"
  ) as { data: castData[]; loading: boolean; error: any; refetch: Function };

  const [dataCopy, setDataCopy] = useState<castData[]>([]);
  console.log("datacopy:", dataCopy);

  //Data of the role that is a combination of a user (email) and a description of the role.
  const { data: castRolesData, refetch: refetchCastRolesData } =
    useFetchTable("cast_roles");

  // The sequence for a role
  const { data: sequence_role_unions, refetch: refetchSequence_role_unions } =
    useFetchTable("sequence_role_unions", "sequence_id ( name ), cast_role_id");

  const inputRefs = useRef<Refs>({});
  //Map inputRefs to its input
  useEffect(() => {
    //shallow copy of data
    setDataCopy(data);

    //mapping the refs to the editable cells (call_time)
    data.forEach((item) => {
      if (item.id === undefined) return;
      headers.forEach((header) => {
        if (!inputRefs.current[item.id]) {
          inputRefs.current[item.id] = {};
        }
        inputRefs.current[item.id][header.key] = createRef();
      });
    });
  }, [data]);

  useEffect(() => {
    const handleClickBrowser = (event: globalThis.MouseEvent) => {
      setSelectedRowIndex(-1);
      // Handle the click event here
      console.log("clicked outside ");
    };

    // Add event listener when the component mounts
    window.addEventListener("click", handleClickBrowser);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("click", handleClickBrowser);
    };
  }, []);

  //update the value of input that correspond to an id and a key
  async function changeHandle(id: number, key: string) {
    const newValue = inputRefs.current[id][key].current?.value;
    try {
      const { error } = await supabase
        .from(tableName)
        .update({ [key]: newValue })
        .eq("id", id);

      if (error) {
        console.log(error);
        return error;
      }
    } catch (error) {
      return error;
    }
  }

  async function onChangeRoleHandler(
    event: ChangeEvent<HTMLSelectElement>,
    rowId: number
  ) {
    console.log("value:", event.target.value);
    console.log("item.id", rowId);
    // update the row in the db
    const { data, error } = (await supabase
      .from("cast_call_times")
      .update({ cast_role_id: Number(event.target.value) })
      .eq("id", rowId)
      .select(
        "id, hmc_call_time, pat_call_time, call_sheet_id, cast_role_id, cast_role_id ( fiction_name, number, user_name )"
      )) as { data: castData[]; error: any };
    if (error) {
      console.log(error);
      return error;
    }
    setDataCopy((prevState) => {
      //update the row that has been changed in the UI
      return prevState.map((row: castData) =>
        row.id === rowId ? data[0] : row
      );
    });
  }

  function getSequence(castRoleId: number) {
    return sequence_role_unions
      .filter((item) => item.cast_role_id === castRoleId)
      .map((item) => item.name)
      .join(", ");
  }

  function onClickHandle(
    e: MouseEvent<HTMLTableDataCellElement>,
    index: number
  ) {
    e.stopPropagation();
    console.log("clicked td");
    setSelectedRowIndex(index);
  }

  return (
    <div className={styles.root}>
      <div>
        <table>
          <thead>
            <tr>
              {headers.map((header) => (
                <td key={header.key}>{header.label}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataCopy.map((item, index) => {
              return (
                <tr key={index}>
                  <td
                    key="number"
                    onClick={(e) => {
                      onClickHandle(e, index);
                    }}
                  >
                    {selectedRowIndex !== index ? (
                      <ReadOnlyCellComponent>
                        {item?.cast_role_id?.number}
                      </ReadOnlyCellComponent>
                    ) : (
                      <select
                        name="role-select"
                        defaultValue={item?.cast_role_id?.id}
                        onChange={(e) => {
                          onChangeRoleHandler(e, item.id);
                        }}
                      >
                        {castRolesData.map((item) => {
                          return (
                            <option key={item.id} value={item.id}>
                              {item.fiction_name}
                            </option>
                          );
                        })}
                      </select>
                    )}
                  </td>
                  <td
                    key="fiction_name"
                    onClick={(e) => {
                      onClickHandle(e, index);
                    }}
                  >
                    <ReadOnlyCellComponent>
                      {item?.cast_role_id?.fiction_name}
                    </ReadOnlyCellComponent>
                  </td>
                  <td
                    key="user_name"
                    onClick={(e) => {
                      onClickHandle(e, index);
                    }}
                  >
                    <ReadOnlyCellComponent>
                      {item?.cast_role_id?.user_name}
                    </ReadOnlyCellComponent>
                  </td>
                  <td key="sequences">
                    {
                      //filter the sequences with cast_role_id
                      //readOnly
                      item?.cast_role_id
                        ? getSequence(Number(item?.cast_role_id.id))
                        : ""
                    }
                  </td>
                  <td key="call_time">
                    <InputComponent variant="cell"></InputComponent>
                  </td>
                  <td key="hmc_call_time">
                    <InputComponent variant="cell"></InputComponent>
                  </td>
                  <td key="pat_call_time">
                    <InputComponent variant="cell"></InputComponent>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <Button
          variant="text"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          + Create role
        </Button>
      </div>

      <CreateCastRole
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        params={params}
        setTableRow={setDataCopy}
      ></CreateCastRole>
    </div>
  );
}

"use client";
import { supabase } from "@/common/supabaseConfig/supabaseConfig";
import { useEffect, useState, useRef, createRef, useCallback } from "react";
import { Database } from "@/common/lib/database.types";
import useFetchData from "../hooks/useFetchTable";
import styles from "../table.module.scss";
import InputComponent from "../../../../../../common/components/1-atoms/input/input";
import Button from "@/common/components/1-atoms/button/button";
type Data = Database["public"]["Tables"]["locations"]["Row"];
type ItemKey = keyof Data;

type Header = {
  key: ItemKey;
  label: string;
};

interface Refs {
  [key: string]: {
    [key: string]: React.RefObject<HTMLInputElement>;
  };
}
const tableName = "locations";

const headers: Header[] = [
  {
    key: "address",
    label: "Adresse",
  },
  {
    key: "scenery_name",
    label: "Nom du décors",
  },
  {
    key: "parking_address",
    label: "Parking",
  },
  {
    key: "hospital_address",
    label: "Hôpital",
  },
];

//PERFORMANCE IS FUCKED UP, EVERY TIME ADDING A ROW THE WHOLE TAB IS RESETTING -> DO NOT REFETCH
//PUSH A NEW ITEM INSIDE DATA ARRAY
//BUT HOW TO PRODUCE A UNIQUE ID ?
//MAYBE INSERT BUT THEN GET BACK THE ID -> NO REFETCH!!!

export default function AddressTable({
  params,
}: {
  params: { "project-id": string; "call-sheet-id": string };
}) {
  const { data, loading, error, refetch: fetchData } = useFetchData(tableName);
  // add a state to store data
  const inputRefs = useRef<Refs>({});
  const [displayedData, setDisplayedData] = useState<Data[]>([]);
  //Map inputRefs to its input
  useEffect(() => {
    data.forEach((item) => {
      if (item.id === undefined) return;
      headers.forEach((header) => {
        if (!inputRefs.current[item.id]) {
          inputRefs.current[item.id] = {};
        }
        inputRefs.current[item.id][header.key] = createRef();
      });
    });

    setDisplayedData(data);
  }, [data]);

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
  async function addRowHandle() {
    console.log("add row");
    try {
      const { data, error } = await supabase
        .from(tableName)
        .insert({})
        .select(); //initialize the row
      console.log(error);
      if (error) {
        console.log(error);
        return error;
      }
      //create the ref
      headers.forEach((header) => {
        if (!inputRefs.current[data[0].id]) {
          inputRefs.current[data[0].id] = {};
        }
        inputRefs.current[data[0].id][header.key] = createRef();
      });

      //update the ui
      setDisplayedData((prevState) => [...prevState, data[0]]);
    } catch (error) {
      return error;
    }
  }

  return (
    <div className={styles.root}>
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <td key={header.key}>{header.label}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayedData.map((item) => (
            <tr key={item.id}>
              {headers.map((header) => (
                <td key={header.key}>
                  <InputComponent
                    variant="cell"
                    ref={inputRefs.current[item.id]?.[header.key]}
                    defaultValue={item[header.key] ?? undefined} //if values are changed in the server just refetch the page via websocket
                    onChange={() => changeHandle(item.id, header.key)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Button
        variant="text"
        onClick={() => {
          addRowHandle();
        }}
      >
        + Ajouter un lieu
      </Button>
    </div>
  );
}

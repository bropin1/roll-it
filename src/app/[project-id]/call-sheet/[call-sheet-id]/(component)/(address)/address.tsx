"use client";
import { supabase } from "@/common/supabaseConfig/supabaseConfig";
import { useEffect, useState, useRef, createRef, useCallback } from "react";
import { Database } from "@/common/lib/database.types";
import useFetchData from "../hooks/useFetchTable";

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

export default function AddressTable({}) {
  const { data, loading, error, refetch: fetchData } = useFetchData(tableName);

  const inputRefs = useRef<Refs>({});

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
      const { error } = await supabase.from(tableName).insert({}); //initialize the row
      console.log(error);
      if (error) return error;
      //fetch the data
      fetchData();
    } catch (error) {
      return error;
    }
  }

  return (
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
          {data.map((item) => (
            <tr key={item.id}>
              {headers.map((header) => (
                <td key={header.key}>
                  <input
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
      <button
        onClick={() => {
          addRowHandle();
        }}
      >
        add row
      </button>
    </div>
  );
}

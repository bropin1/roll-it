"use client";

import classNames from "classnames";
import { useState } from "react";
import { supabase } from "@/common/supabaseConfig/supabaseConfig";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import Link from "next/link";

import * as z from "zod";

interface stepOneProps {
  className?: string;
  setStep: Dispatch<SetStateAction<number>>;
  projectId: number | null;
  setProjectId: Dispatch<SetStateAction<number | null>>;
}

const projectNameSchema = z.object({
  title: z.string(),
});

type FormData = z.infer<typeof projectNameSchema>;

export function StepOne({
  className,
  setStep,
  projectId,
  setProjectId,
}: stepOneProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(projectNameSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getUser = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return user;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  async function onSubmit(data: FormData) {
    try {
      setIsLoading(true);
      const supabaseResponse = await supabase.from("projects").upsert({
        id: projectId ?? undefined,
        manager_id: (await getUser())?.id,
        title: data.title,
      });

      setIsLoading(false);

      if (supabaseResponse.error) {
        console.log(supabaseResponse.error);
        return supabaseResponse.error;
      }
      //setProjectId(supabaseResponse?.data?.id);
      setStep(2);
      console.log("Hello");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={classNames(className)}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <span>Nom du projet</span>
          <input
            id="title"
            placeholder=""
            type="text"
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            disabled={isLoading}
            {...register("title")}
          ></input>
          {errors?.title && <p>{errors.title.message}</p>}
        </div>
        <button disabled={isLoading} type="submit">
          {isLoading && "loading"}
          Suivant
        </button>
      </form>
    </div>
  );
}

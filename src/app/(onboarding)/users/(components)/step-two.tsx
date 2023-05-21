"use client";

import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/common/supabaseConfig/supabaseConfig";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";

import * as z from "zod";

interface stepTwoProps {
  className?: string;
  setStep: Dispatch<SetStateAction<number>>;
}

const projectNameSchema = z.object({
  department: z.string(),
  role: z.number(),
});

type FormData = z.infer<typeof projectNameSchema>;

export function StepTwo({ className, setStep }: stepTwoProps) {
  const router = useRouter();
  const { register, handleSubmit } = useForm<FormData>({
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
      const supabaseResponse = await supabase
        .from("user_accounts")
        .insert({ user_id: (await getUser())?.id, role_id: data.role });

      setIsLoading(false);

      if (supabaseResponse.error) {
        return supabaseResponse.error;
      }
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  function goBackHandle() {
    setStep(1);
  }

  return (
    <div className={classNames(className)}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <span>Votre département</span>
          <select
            id="department"
            placeholder=""
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            disabled={isLoading}
            {...register("department")}
          >
            <option value="cat">Cat</option>
            <option value="cat">Cat</option>
            <option value="cat">Cat</option>
            <option value="cat">Cat</option>
          </select>
        </div>
        <div>
          <span>Votre rôle</span>
          <select
            id="role"
            placeholder=""
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            disabled={isLoading}
            {...register("role")}
          >
            <option value="cat">Cat</option>
            <option value="cat">Cat</option>
            <option value="cat">Cat</option>
            <option value="cat">Cat</option>
          </select>
        </div>
        <button onClick={goBackHandle} disabled={isLoading}>
          {isLoading && "loading"}
          Retour
        </button>
        <button disabled={isLoading} type="submit">
          {isLoading && "loading"}
          Suivant
        </button>
      </form>
    </div>
  );
}

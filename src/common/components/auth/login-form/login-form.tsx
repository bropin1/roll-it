"use client";

import { useRouter } from "next/navigation";
import classNames from "classnames";
import { useState } from "react";
import { supabase } from "@/common/supabaseConfig/supabaseConfig";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userAuthSchema } from "@/common/lib/validations/auth";
import styles from "../auth.module.scss";
import InputComponent from "../../1-atoms/input/input";
import Button from "../../1-atoms/button/button";

import * as z from "zod";

interface RegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}
type FormData = z.infer<typeof userAuthSchema>;

export function LoginForm({ className }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  async function onSubmit(data: FormData) {
    console.log(data);
    setIsLoading(true);
    const supabaseResponse = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    setIsLoading(false);

    if (supabaseResponse.error) {
      return supabaseResponse.error;
    }

    router.push("/13/call-sheet/1");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.root}>
      <div className={styles.inputs}>
        <div className={styles["input-container"]}>
          <div className={styles.label}>
            <span>Email</span>
          </div>
          <InputComponent
            variant="medium"
            id="email"
            placeholder="name@example.com"
            type="email"
            disabled={isLoading}
            {...register("email")}
          ></InputComponent>
          {errors?.email && <p>{errors.email.message}</p>}
        </div>
        <div className={styles["input-container"]}>
          <div className={styles.label}>
            <span>Password</span>
          </div>
          <InputComponent
            variant="medium"
            id="password"
            placeholder=""
            type="password"
            disabled={isLoading}
            {...register("password")}
          ></InputComponent>
        </div>
      </div>
      <Button variant="default" disabled={isLoading} type="submit">
        {isLoading && "loading"}
        Sign In with Email
      </Button>
    </form>
  );
}

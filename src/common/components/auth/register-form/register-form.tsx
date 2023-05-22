"use client";

import { useState } from "react";
import { supabase } from "@/common/supabaseConfig/supabaseConfig";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userAuthSchema } from "@/common/lib/validations/auth";
import Link from "next/link";
import Button from "../../1-atoms/button/button";
import styles from "../auth.module.scss";
import InputComponent from "../../1-atoms/input/input";

import * as z from "zod";

interface RegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}
type FormData = z.infer<typeof userAuthSchema>;

export function RegisterForm({ className, ...props }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(data: FormData) {
    console.log(data);
    setIsLoading(true);
    const supabaseResponse = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    setIsLoading(false);

    if (supabaseResponse.error) {
      return supabaseResponse.error;
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.root}>
      <div className={styles.inputs}>
        <div className={styles.identification}>
          <div className={styles["input-container"]}>
            <div className={styles.label}>
              <span>Prénom</span>
              <p className={styles.required}>*</p>
            </div>
            <InputComponent
              variant="medium"
              id="name"
              placeholder=""
              type="text"
              disabled={isLoading}
            ></InputComponent>
          </div>
          <div className={styles["input-container"]}>
            <div className={styles.label}>
              <span>Nom</span> <p className={styles.required}>*</p>
            </div>
            <InputComponent
              variant="medium"
              id="last-name"
              placeholder=""
              type="text"
              disabled={isLoading}
            ></InputComponent>
          </div>
        </div>
        <div className={styles["input-container"]}>
          <div className={styles.label}>
            <span>Email</span>
            <p className={styles.required}>*</p>
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
            <p className={styles.required}>*</p>
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
      <div className={styles["general-conditions"]}>
        <input type="checkbox" {...props} />
        <p>Je confirme les </p>
        <Link href="/conditions">Conditions générale d`&apos;`utilisation</Link>
      </div>

      <Button variant="default" disabled={isLoading} type="submit">
        {isLoading && "loading"}
        S`&apos;`inscrire
      </Button>
      <span>
        Déjà inscrit ?{" "}
        <Link href="/login" className={styles["link"]}>
          Connectez-vous !
        </Link>
      </span>
    </form>
  );
}

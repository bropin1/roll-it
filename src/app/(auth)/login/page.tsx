import { Metadata } from "next";
import Link from "next/link";

import { LoginForm } from "@/common/components/auth/login-form/login-form";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1>Welcome back</h1>
        <p>Enter your email to sign in to your account</p>
      </div>
      <LoginForm />
      <p>
        <Link href="/register">Don&apos;t have an account? Sign Up</Link>
      </p>
    </div>
  );
}

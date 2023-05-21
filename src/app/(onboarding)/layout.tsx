import Link from "next/link";
interface layoutProps {
  children?: React.ReactNode;
}

export default async function OnboardingLayout({ children }: layoutProps) {
  return <>{children}</>;
}

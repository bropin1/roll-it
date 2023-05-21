import { useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./modal.module.scss";

export default function ModalRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div ref={overlay} className={styles.overlay} onClick={onClick}>
      <div ref={wrapper} className={styles.wrapper}>
        {children}
      </div>
    </div>
  );
}

import { useCallback, useRef, useEffect } from "react";
import styles from "./modal.module.scss";
import { Dispatch, SetStateAction } from "react";

export default function Modal({
  children,
  modalOpen,
  setModalOpen,
}: {
  children: React.ReactNode;
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  console.log(modalOpen);
  const onDismiss = () => {
    setModalOpen(false);
  };

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      console.log("clicked");
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

  return modalOpen ? (
    <div ref={overlay} className={styles.overlay} onClick={onClick}>
      <div ref={wrapper} className={styles.wrapper}>
        {children}
      </div>
    </div>
  ) : null;
}

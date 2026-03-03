"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./NotePreviewModal.module.css";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

const Modal = ({ children, onClose }: Props) => {
  const router = useRouter();

  const close = () => {
    router.back();
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      close();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  });

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        {children}
        {/* <button onClick={close} className={css.cancelButton}>
          Close
        </button> */}
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLDivElement,
  );
};

export default Modal;

// Треба ReactNode
// Треба Type

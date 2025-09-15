"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export interface ModalProps {
  /** 모달 열림/닫힘 상태 */
  isOpen: boolean;
  /** 모달 닫기 함수 */
  onClose: () => void;
  /** 모달 제목 */
  title: string;
  /** 모달 설명 */
  description?: string;
  /** 취소 버튼 텍스트 */
  cancelText?: string;
  /** 확인 버튼 텍스트 */
  confirmText?: string;
  /** 확인 버튼 클릭 핸들러 */
  onConfirm: () => void;
  /** 취소 버튼 클릭 핸들러 (기본값: onClose) */
  onCancel?: () => void;
  /** 확인 버튼 비활성화 여부 */
  disabled?: boolean;
  /** 확인 버튼 variant */
  confirmVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  /** 취소 버튼 variant */
  cancelVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  /** 모달 크기 */
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  /** 추가 클래스명 */
  className?: string;
  /** 모달 내용 (title, description 외의 추가 내용) */
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  cancelText = "취소",
  confirmText = "확인",
  onConfirm,
  onCancel,
  disabled = false,
  confirmVariant = "default",
  cancelVariant = "outline",
  size = "md",
  className,
  children,
}) => {
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      onClose();
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "modal-sm";
      case "md":
        return "modal-md";
      case "lg":
        return "modal-lg";
      case "xl":
        return "modal-xl";
      case "2xl":
        return "modal-2xl";
      case "3xl":
        return "modal-3xl";
      case "4xl":
        return "modal-4xl";
      default:
        return "modal-md";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`
          ${getSizeClasses()}
          ${className || ""}
        `}
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
          {description && (
            <DialogDescription className="text-muted-foreground text-sm">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        {children && <div className="py-4">{children}</div>}

        <DialogFooter
          className={`
            flex gap-2
            sm:gap-0
          `}
        >
          <div className="flex gap-2">
            <Button
              type="button"
              variant={cancelVariant}
              onClick={handleCancel}
              className="sm:order-1"
            >
              {cancelText}
            </Button>
            <Button
              type="button"
              variant={confirmVariant}
              onClick={onConfirm}
              disabled={disabled}
              className="sm:order-2"
            >
              {confirmText}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;

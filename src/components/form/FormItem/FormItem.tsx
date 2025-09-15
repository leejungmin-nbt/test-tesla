import type { ReactNode } from "react";

interface FormItemProps {
  children: ReactNode;
  label?: string;
  required?: boolean;
  description?: ReactNode;
  errorMessage?: string;
  className?: string;
  inputId: string;
}

const FormItem = ({
  children,
  label,
  required = false,
  description,
  errorMessage,
  className,
  inputId,
}: FormItemProps) => {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="mb-2 block text-sm font-medium">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      <div className="mb-2">{children}</div>
      {errorMessage && (
        <p className="text-destructive mb-2 text-sm">{errorMessage}</p>
      )}
      {description && (
        <div className="text-muted-foreground text-sm">{description}</div>
      )}
    </div>
  );
};

export default FormItem;

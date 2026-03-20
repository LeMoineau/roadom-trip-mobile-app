export type ToastMessage = {
  message: string;
  duration?: number;
  bgColor?: string;
  textColor?: string;
  onHiding?: () => void;
};

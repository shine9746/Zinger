export type ToastType = 'success' | 'error' | 'warning' | 'info';
export interface ToasterOptions {
    id: number;
    message: string;
    type: ToastType;
    duration?: number;
}
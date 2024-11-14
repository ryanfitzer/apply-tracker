import * as Dialog from "@radix-ui/react-dialog";

import { Cross1Icon } from "@radix-ui/react-icons";
import { ReactNode } from "react";

const Modal = ({
    open,
    onOpenChange,
    children
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: ReactNode;
}) => {
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            {children}
        </Dialog.Root>
    );
};

const ModalContent = ({ title, children }: { title: string; children: ReactNode }) => {
    return (
        <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            <Dialog.Content
                aria-describedby=""
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-3 shadow-md"
            >
                <div className="mb-3 flex items-center justify-between">
                    <Dialog.Title className="size text-lg">{title}</Dialog.Title>
                    <Dialog.Close>
                        <Cross1Icon className="text-gray-600 hover:text-gray-300" />
                    </Dialog.Close>
                </div>
                {children}
            </Dialog.Content>
        </Dialog.Portal>
    );
};

Modal.Button = Dialog.Trigger;
Modal.Content = ModalContent;
Modal.Close = Dialog.Close;
export default Modal;

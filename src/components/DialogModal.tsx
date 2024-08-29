import { useEffect, useRef } from "react";

const DialogModal = ({ children, isOpened, closeModal, title, width = "auto" }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (dialogRef.current) {
            if (isOpened) {
                dialogRef.current.showModal();
            } else {
                dialogRef.current.close();
            }
        }
    }, [isOpened]);

    return (
        <dialog
            ref={dialogRef}
            onClose={closeModal}
            className={`backdrop:backdrop-blur-sm p-6 rounded shadow-box pt-5 overflow-hidden h-full ${width === "auto" ? "w-auto" : `w-[${width}px]`}`}

        >
            <div className="overflow-hidden h-full w-full">
                <div className="flex justify-between border-b-2 pb-2">
                    <p className="font-bold text-2xl">{title}</p>
                    <button
                        onClick={closeModal}
                        className="pl-5 text-lg"
                    >
                        &#x2716;
                    </button>
                </div>
                <div className={`overflow-hidden h-[calc(100%_-_20px)]`}>
                    <div className="overflow-y-auto w-full h-full">
                        {isOpened && children}
                    </div>
                </div>
            </div>
        </dialog>
    );
};

export default DialogModal;

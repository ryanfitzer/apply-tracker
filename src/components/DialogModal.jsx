import { useEffect, useRef } from "react";

const DialogModal = ({ children, isOpened, closeModal }) => {
    const dialogRef = useRef();

    useEffect(() => {
        if (isOpened) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [isOpened]);

    return (
        <dialog
            ref={dialogRef}
            onClose={closeModal}
            className="backdrop:backdrop-blur-sm p-2"
        >
            <div className="flex justify-end">
                <button onClick={closeModal}>X</button>
            </div>
            {isOpened && children}
        </dialog>
    );
};

export default DialogModal;

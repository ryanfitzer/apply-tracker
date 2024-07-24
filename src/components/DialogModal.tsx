import { useEffect, useRef } from "react";

import { uiActions } from "../store/ui-slice";
import { useDispatch } from "react-redux";

const DialogModal = ({ children, isOpened, closeModal, title }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const dispatch = useDispatch();

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
            className="backdrop:backdrop-blur-sm p-2 rounded"
        >
            <div className="flex justify-between border-b-2 pb-2 mb-4">
                <p className="font-bold text-2xl">{title}</p>
                <button
                    onClick={() => dispatch(uiActions.toggleModal(false))}
                    className="pl-5 text-lg"
                >
                    &#x2716;
                </button>
            </div>
            {isOpened && children}
        </dialog>
    );
};

export default DialogModal;

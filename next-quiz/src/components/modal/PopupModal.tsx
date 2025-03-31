import {ReactNode} from "react";
import {createPortal} from "react-dom";

export default function PopupModal({
    isOpen,
    onclose,
    children}: {
    isOpen: boolean,
    onclose: () => void,
    children: ReactNode}) {
    if (!isOpen)
        return null;

    return createPortal(
        <>
            <div className={"modal-overlay"}></div>
            <div className={"modal-container"}>
                {children}
                <button className={"modal-close"} onClick={onclose}>X</button>
            </div>
        </>,
        document.querySelector("#modal")!,
    )
}
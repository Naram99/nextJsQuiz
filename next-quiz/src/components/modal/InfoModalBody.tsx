const InfoModalBody = ({
                           text,
                           onClose}: {
    text: string,
    onClose: () => void;}) => {
    return (
        <div className={"modal-body-wrapper"}>
            <div className={"modal-body"}>
                <div className={"modal-text"}>{text}</div>
            </div>
            <div className={"modal-footer"}>
                <button type={"button"} onClick={onClose}>OK</button>
            </div>
        </div>
    )
}

export default InfoModalBody;
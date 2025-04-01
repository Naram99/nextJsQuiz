export default function DeleteModalBody({
                                            text,
                                            confirm,
                                            deny,
                                            onChoice}: {
    text: string;
    confirm: string;
    deny: string;
    onChoice: (confirmed: boolean) => void;
}) {
    return (
        <div className={"modal-body-wrapper"}>
            <div className={"modal-body"}>
                <div className={"modal-text"}>{text}</div>
            </div>
            <div className={"modal-footer"}>
                <button type={"button"} onClick={() => onChoice(true)}>{confirm}</button>
                <button type={"button"} onClick={() => onChoice(false)}>{deny}</button>
            </div>
        </div>
    )
}
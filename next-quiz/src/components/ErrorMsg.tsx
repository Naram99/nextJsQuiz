const ErrorMsg = ({message}: {message: string}) => {
    // TODO: Error msg display
    return(
        <div className={"errorWrapper"}>
            <div className={"errorCt"} >
                <p className={"errorMsg"}>{message}</p>
            </div>
        </div>
    )
}

export default ErrorMsg;
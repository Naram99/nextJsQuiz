import InputGroup from "@/components/InputGroup";
import React from "react";

export default function NewForumPostBody({
    text,
    publish,
    dataChange,
    data,
    onPublish,
}: {
    text: string,
    publish: string,
    dataChange: (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
    ) => void,
    data: {
        title: string,
        description: string
    },
    onPublish: () => void,
}) {
    // TODO: newPostConfirm, send
    return (
        <div className={"modal-body-wrapper"}>
            <div className={"modal-body"}>
                <InputGroup
                    title={text}
                    id={"title"}
                    inputType={"text"}
                    onChange={dataChange}
                    value={data.title}
                />
                <textarea
                    rows={3}
                    onChange={dataChange}
                    id={"description"}
                    value={data.description}
                ></textarea>
            </div>
            <div className={"modal-footer"}>
                <button
                    className={"modal-publish-btn"}
                    onClick={onPublish}
                >{publish}</button>
            </div>
        </div>
    )
}
import InputGroup from "@/components/InputGroup";
import React from "react";

export default function NewForumPostBody({
    text,
    dataChange,
    data
}: {
    text: string,
    dataChange: (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
    ) => void,
    data: {
        title: string,
        description: string
    }
}) {
    // TODO: newPostConfirm, send
    return (
        <>
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
        </>
    )
}
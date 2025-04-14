"use client";

import { forumPostData } from "@/utils/types/forumPostData.type";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function ForumPostPage() {
    const params = useParams();
    const id = params.id;

    const [data, setData] = useState<forumPostData>({});

    useEffect(() => {
        async function getData() {
            const resp = await fetch(`/api/forum?${id}`, {
                method: "GET",
                credentials: "include"
            });

            const respData = await resp.json();
            setData(respData.data[0])
        }

        getData().then()
    }, [])

    useEffect(() => {console.log(data)}, [data])

    return <h1>{data.title}</h1>
}
export type friendData = {
    accepted: {
        initiator: string;
        target: string;
        since: string;
    }[],
    requests: {
        initiator: string;
    }[]
}
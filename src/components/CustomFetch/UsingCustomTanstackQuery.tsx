import { useCustomFetch } from '@service/useCustomFetch';
import { Button } from 'antd';

export function UsingCustomTanstackQuery() {
    const { data, status, loading, refetching } = useCustomFetch<{ id: number; text: string }[]>({
        url: 'http://localhost:8080/api/todos',
    });

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <div>status : {status}</div>
            <div>data : {data?.map((it) => it.text)}</div>
            <Button onClick={refetching}>Refetch</Button>
        </>
    );
}

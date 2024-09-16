// interface DataDisplayProps {}

import { Table } from 'antd';
import { FakeData, listFakeData } from './fakeData';
import { ColumnsType } from 'antd/es/table';

export function DataDisplay() {
    const columns: ColumnsType<FakeData> = [
        {
            key: 'lastName',
            title: 'Prénom',
            render: (_, record) => <div>{record.lastname}</div>
        },
        // {
        //     key: 'surname',
        //     title: 'Nom',
        //     render: value => <div>{value}</div>
        // },
        // {
        //     key: 'size',
        //     title: 'Taille',
        //     render: value => <div>{value}</div>
        // },
        // {
        //     dataIndex: 'age',
        //     title: 'Age',
        //     render: value => <div>{value}</div>
        // },
    ];

    return <Table dataSource={listFakeData} columns={columns} rowKey="id" />;
}

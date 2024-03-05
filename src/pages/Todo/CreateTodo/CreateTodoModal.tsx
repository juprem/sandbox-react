import { Button, DatePicker, Form, Input, Modal, Select, Tag } from 'antd';
import { useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { Priority, TodoCreate, TodoCreateSchema } from '@model/TodoModel';
import { useCreateTodo } from '@hooks/useTodos';
import { css } from '@styled-system/css';
import Cross from '@assets/cross.svg';
import Plus from '@assets/plus.svg';
import dayjs from 'dayjs';

export function CreateTodoModal() {
    const [open, setOpen] = useState(false);
    const todoMutation = useCreateTodo();

    return (
        <>
            <Modal
                destroyOnClose
                closeIcon={<img src={Cross} alt="close" />}
                footer={null}
                title="Créer un Todo"
                open={open}
                onCancel={() => setOpen(false)}
            >
                <Form
                    name="create todo"
                    onFinish={(values: TodoCreate) => {
                        const todoCreate = TodoCreateSchema.parse({
                            ...values,
                            dueDate: dayjs(values.dueDate).format('YYYY-MM-DDTHH:mm:ss[Z]'),
                        });
                        todoMutation.mutate(todoCreate, {
                            onSuccess: () => setOpen(false),
                        });
                    }}
                >
                    <Form.Item
                        name="name"
                        label="name"
                        rules={[{ required: true, message: 'Un nom doit être défini' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="description">
                        <TextArea />
                    </Form.Item>
                    <Form.Item
                        name="priority"
                        label="Priorité"
                        rules={[{ required: true, message: 'Veuillez ajouter une priorité' }]}
                    >
                        <Select options={Priority} />
                    </Form.Item>
                    <Form.Item
                        name="dueDate"
                        label="Date d'exécution"
                        rules={[{ required: true, message: 'Veuillez ajouter une date' }]}
                    >
                        <DatePicker showTime />
                    </Form.Item>
                    <Form.Item
                        name="tags"
                        label="Labels"
                        rules={[{ required: true, message: 'Veuillez ajouter des labels' }]}
                    >
                        <Select
                            mode="tags"
                            tagRender={(props) => (
                                <Tag color="blue" onClose={props.onClose}>
                                    {props.label}
                                </Tag>
                            )}
                        />
                    </Form.Item>
                    <Button htmlType="submit">Ajouter</Button>
                </Form>
            </Modal>
            <Button
                icon={<img src={Plus} alt="ajouter" />}
                className={css({ width: 'fit-content', marginBottom: '1rem' })}
                onClick={() => setOpen(true)}
            />
        </>
    );
}

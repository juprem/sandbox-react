import { Button, Form, Input } from 'antd';
import { CustomModal } from '@component/CustomModal/CustomModal';
import { useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { TodoCreateSchema } from '@model/TodoModel';
import { useCreateTodo } from '@hooks/useTodos';
import { css } from '@styled-system/css';

export function CreateTodoModal() {
    const [open, setOpen] = useState(false);
    const todoMutation = useCreateTodo();

    return (
        <>
            <CustomModal destroyOnClose title="Créer un Todo" open={open} onClose={() => setOpen(false)}>
                <Form
                    name="create todo"
                    onFinish={(values) => {
                        const todoCreate = TodoCreateSchema.parse(values);
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
                    <Button htmlType="submit">Ajouter</Button>
                </Form>
            </CustomModal>
            <Button className={css({ width: 'fit-content', marginBottom: '1rem' })} onClick={() => setOpen(true)}>
                Ajouter un Todo
            </Button>
        </>
    );
}

import { Button, Form, Input } from 'antd';
import { CustomModal } from '../../../component/CustomModal/CustomModal.tsx';
import { useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { TodoCreateSchema } from '../../../model/TodoModel.ts';
import { useCreateTodo } from '../../../hooks/useTodos.ts';

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
                            onSuccess: () => setOpen(false)
                        })
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
            <Button onClick={() => setOpen(true)}>Ajouter un Todo</Button>
        </>
    );
}

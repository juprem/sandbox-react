import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import { useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { Priority, TodoCreateSchema } from '@model/TodoModel';
import { useCreateTodo } from '@hooks/useTodos';
import { css } from '@styled-system/css';
import Cross from '@assets/cross.svg';
import Plus from '@assets/plus.svg';
import { CustomTags } from '../../../components/CustomTags/CustomTags';

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
                    <Form.Item name="priority" label="Priorité">
                        <Select options={Priority} />
                    </Form.Item>
                    <Form.Item name="dueDate" label="Date d'exécution">
                        <DatePicker showTime />
                    </Form.Item>
                    <Form.Item name="tags" label="Labels">
                        <Select
                            mode="tags"
                            tagRender={(props) => <CustomTags text={props.label} onClose={props.onClose} />}
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

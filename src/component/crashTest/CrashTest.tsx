import { CustomModal } from '../CustomModal/CustomModal.tsx';
import { Button, Input } from 'antd';
import { useState } from 'react';

interface CrashTestProps {
    to: number;
}

export function CrashTest({ to }: CrashTestProps) {
    console.log(to);
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setOpen(true)}>Ouvrir</Button>
            <CustomModal title="First Modal" destroyOnClose open={open} onClose={() => setOpen(false)}>
                Content
                <Input />
            </CustomModal>
        </>
    );
}

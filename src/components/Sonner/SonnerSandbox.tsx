import { toast, Toaster } from 'sonner';
import { Button } from 'antd';

export function SonnerSandbox() {
    return (
        <>
            <Toaster />
            <Button
                onClick={() =>
                    toast('My first toast', {
                        position: 'top-right',
                        closeButton: true,
                        duration: 5000,
                    })
                }
            >
                Give me a toast
            </Button>
            <Button
                onClick={() =>
                    toast.success('My first toast', {
                        position: 'top-right',
                        closeButton: true,
                        duration: 5000,
                    })
                }
            >
                Give me a toast
            </Button>
            <Button
                onClick={() =>
                    toast.error('My first toast', {
                        position: 'top-right',
                        closeButton: true,
                        duration: 5000,
                    })
                }
            >
                Give me a toast
            </Button>
        </>
    );
}

import { useState } from 'react';
import { Coordinates } from '@dnd-kit/utilities';
import { defaultCoordinates, DndContext, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import { Button } from 'antd';
import { ModalDrag } from './ModalDrag';

export function DraggableModalContainer() {
    const [{ x, y }, setCoordinates] = useState<Coordinates>(defaultCoordinates);
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setOpen(true)}>Open</Button>
            <DndContext
                onDragEnd={({ delta }) => {
                    setCoordinates(({ x, y }) => {
                        return {
                            x: x + delta.x,
                            y: y + delta.y,
                        };
                    });
                }}
            >
                <ModalDrag x={x} y={y} onClose={() => setOpen(false)} open={open} />
            </DndContext>
        </>
    );
}
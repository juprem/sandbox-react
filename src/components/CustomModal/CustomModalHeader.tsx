import { ReactNode } from 'react';
import Cross from '../../assets/cross.svg';
import { Button } from 'antd';
import { Flex } from '../Flex/Flex';

interface CustomModalHeaderProps {
    children: ReactNode;
    onClose: () => void;
}

export function CustomModalHeader({ children, onClose }: CustomModalHeaderProps) {
    return (
        <Flex alignItems="center" justifyContent="space-between">
            <div style={{ fontWeight: 'bold', fontSize: '20px' }}>{children}</div>
            <Button
                ghost
                icon={<img src={Cross} alt="close" />}
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}
            />
        </Flex>
    );
}

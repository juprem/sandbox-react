import { css } from '@styled-system/css';
import { ReactNode } from 'react';
import { Button } from 'antd';
import { ActionMode } from '@hooks/useActionMode';

interface CustomModalButtonProps {
    children: ReactNode;
    actionMode: ActionMode;
    actionType: ActionMode;
    isEnable: boolean;
    onClick: () => void;
}

export function CustomModalButton({ children, isEnable, actionType, actionMode, onClick }: CustomModalButtonProps) {
    return (
        <>
            {isEnable && (
                <Button
                    className={
                        actionMode === actionType
                            ? css({
                                  cursor: 'pointer',
                                  borderRadius: '5px',
                                  width: '40px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  backgroundColor: 'lightgray',
                              })
                            : css({
                                  cursor: 'pointer',
                                  width: '40px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                              })
                    }
                    onClick={onClick}
                >
                    {children}
                </Button>
            )}
        </>
    );
}

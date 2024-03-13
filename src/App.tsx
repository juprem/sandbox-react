import './App.css';
import { css } from '../styled-system/css';
import { DraggableModal } from './component/ModalDrag/DraggableModal.tsx';
import { useState } from 'react';
import { Button } from 'antd';

function App() {
    const [counter, setCounter] = useState<number>(0);
    return (
        <div className={css({ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' })}>
            <Button onClick={() => setCounter(counter + 1)}>{counter}</Button>
            <DraggableModal isDraggable isResizable title="COucou" enableBackground >
                COucou COucou COucou COucou COucou COucou COucou COucou COucou COucou v COucou COucou COucou COucou v v
                v COucouCOucouCOucouCOucouCOucouCOucouCOucouCOucou

                COucou COucou COucou COucou COucou COucou COucou COucou COucou COucou v COucou COucou COucou COucou v v
                v COucouCOucouCOucouCOucouCOucouCOucouCOucouCOucou

                COucou COucou COucou COucou COucou COucou COucou COucou COucou COucou v COucou COucou COucou COucou v v
                v COucouCOucouCOucouCOucouCOucouCOucouCOucouCOucou

                COucou COucou COucou COucou COucou COucou COucou COucou COucou COucou v COucou COucou COucou COucou v v
                v COucouCOucouCOucouCOucouCOucouCOucouCOucouCOucou

                COucou COucou COucou COucou COucou COucou COucou COucou COucou COucou v COucou COucou COucou COucou v v
                v COucouCOucouCOucouCOucouCOucouCOucouCOucouCOucou
            </DraggableModal>
        </div>
    );
}

export default App;

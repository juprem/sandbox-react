import './App.css';
import { css } from '../styled-system/css';
import { DraggableModal } from './component/ModalDrag/DraggableModal.tsx';

function App() {
    return (
        <div className={css({ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' })}>
            <DraggableModal isDraggable isResizable />
            <DraggableModal isDraggable />
            <DraggableModal enableBackground />
        </div>
    );
}

export default App;

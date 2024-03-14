import './App.css';
import { css } from '../styled-system/css';
import { MasonryTest } from './component/VirtualListTest/MasonryTest.tsx';
import { VirtualListTest } from './component/VirtualListTest/VirtualListTest.tsx';

function App() {
    return (
        <div className={css({ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' })}>
            <MasonryTest />
        </div>
    );
}

export default App;

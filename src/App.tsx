import './App.css';
import { css } from '../styled-system/css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MasonryTest } from './component/VirtualListTest/MasonryTest.tsx';

function App() {
    return (
        <div className={css({ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' })}>
            <div style={{ width: '300px' }}>
                <MasonryTest />
            </div>
        </div>
    );
}

export default App;

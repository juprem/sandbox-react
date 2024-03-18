import './App.css';
import { css } from '../styled-system/css';
import { CarouselSlick } from './component/CarouselSlick/CarouselSlick.tsx';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
    return (
        <div className={css({ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' })}>
            <div style={{ width: '300px' }}>
                <CarouselSlick />
            </div>
        </div>
    );
}

export default App;

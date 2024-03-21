import './App.css';
import { css } from '../styled-system/css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { EnhancedSwitch } from './component/MotionAnimation/EnhancedSwitch.tsx';

function App() {
    return (
        <div className={css({ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' })}>
            <EnhancedSwitch />
        </div>
    );
}

export default App;

import { css } from '../styled-system/css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { EnhancedSwitch } from './component/MotionAnimation/EnhancedSwitch.tsx';
import { Sidebar } from './component/Layout/Sidebar.tsx';
import { Content } from './component/Layout/Content.tsx';

function App() {
    return (
        <div className={css({ height: '100vh', backgroundColor: "#dadada"})}>
            <Sidebar>ajoiz</Sidebar>
            <Content>
                <EnhancedSwitch />
            </Content>
        </div>
    );
}

export default App;

import { useState } from 'react';
import { Button } from 'antd';
import { MountingTesting } from './MountingTesting';
import { MountingTesting2 } from './MountingTesting2';
import { css } from '@styled-system/css';
import { TextSection } from '../TextSection/TextSection';
import { CenteredBlock } from '../LayoutBlock/CenteredBlock';

export function MountingTestBase() {
    const [switching, setSwitching] = useState<boolean>(true);
    const [switching2, setSwitching2] = useState<boolean>(true);

    const first = '//with switch = false\n{ \n\ttype: MountingTest \n\t... \n}';

    return (
        <>
            <div style={{ display: 'flex', gap: '10px' }}>
                <Button onClick={() => setSwitching(!switching)}>Switch same component</Button>
                {/*doesn't recreate on switch change*/}
                {switching ? <MountingTesting content="first" /> : <MountingTesting content="second" />}
                {/*does recreate on switch change*/}
                <Button onClick={() => setSwitching2(!switching2)}>Switch with different component</Button>
                {switching2 ? <MountingTesting content="first" /> : <MountingTesting2 content="second" />}
            </div>
            <TextSection isTop>
                the render occurs only because the ref of the component change in the virtual dom
            </TextSection>
            <CenteredBlock>
                <div className={css({ width: 'fit-content' })}>
                    CodeBlock
                </div>
            </CenteredBlock>
        </>
    );
}

//
// =>
//     [ with switch = false
// {
//     type: MountingTesting
//     ...
// }
// ]
// [ with switch = true
// {
//     type: MountingTesting
//     ...
//         needsUpdate: true
// }
// ]
// The type is the same so React understand that there is only an update to do (no unmount or mount)
// With the second case
// [ with switch = false
// {
//     type: MountingTesting2
//     ...
// }
// ]
// [ with switch = true
// {
//     type: MountingTesting2
//     ...
// }
// ]
// React see 2 differents components so it triggers the unmount of MountingTesting and the mount of MountingTesting2

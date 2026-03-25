import { css } from '@styled-system/css'

export const iconBtn = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.3rem',
    height: '28px',
    padding: '0 0.6rem',
    border: '1px solid #3b3b3b',
    borderRadius: '6px',
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,0.45)',
    cursor: 'pointer',
    fontSize: '0.72rem',
    transition: 'all 0.15s',
    _hover: { backgroundColor: '#2e2e2e', color: 'white' },
})

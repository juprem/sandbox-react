import { cva } from '../../styled-system/css';

export const flex = cva({
    base: {
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
    },
    variants: {
        visual: {
            row: {},
            column: {
                flexDirection: 'column',
                width: 'fit-content',
            },
        },
    },
    defaultVariants: {
        visual: 'row',
    },
});

export const basicShape = cva({
    base: {
        width: '50px',
        height: '50px',
        backgroundColor: 'black',
    },
    variants: {
        visual: {
            square: {
                borderRadius: '15%',
            },
            circle: {
                borderRadius: '50%',
            },
        },
    },
    defaultVariants: {
        visual: 'square',
    },
});

export const TRContainer = cva({
    base: {
        position: 'absolute',
        top: '10%',
        right: '10%',
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        backgroundColor: 'wheat',
        borderRadius: '6px',
        padding: '1rem',
        gap: '1rem',
        height: 'fit-content',
    },
});

export const textSection = cva({
    base: {
        width: '100%',
        color: 'black',
        padding: '0 0 0 10%',
    },
    variants: {
        visual: {
            top: {
                paddingTop: '5%',
            },
        },
    },
});

export const lightItUp = cva({
    base: {
        width: '100px',
        height: '100px',
        backgroundColor: 'white',
        borderRadius: '5px',
    },
    variants: {
        visual: {
            none: {},
            smooth: {
                boxShadow: '0 0 8px 0 white',
            },
            medium: {
                boxShadow: '0 0 32px 8px white',
            },
            big: {
                boxShadow: '0 0 128px 32px white',
            },
        },
    },
    defaultVariants: {
        visual: 'none',
    },
});

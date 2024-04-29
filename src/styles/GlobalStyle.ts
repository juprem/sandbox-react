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
        backgroundColor: 'wheat',
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
                paddingTop: "5%"
            }
        }
    }
})
import { cva } from '../../styled-system/css'

export const flex = cva({
    base: {
        display: 'flex'
    },
    variants: {
        visual: {
            row: {},
            column: {
                flexDirection: 'column'
            }
        },
    },
    defaultVariants: {
        visual: 'row'
    }
})
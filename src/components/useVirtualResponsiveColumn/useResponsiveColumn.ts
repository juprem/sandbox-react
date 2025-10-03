import { useEffect, useRef, useState } from 'react';

function getItemsPerRow(containerWidth: number, elementWidth: number, minGutterWidth: number) {
    const maxNbItemWithoutSpace = Math.trunc(containerWidth / elementWidth);

    const hasMinGutterSpaceAvailable =
        (containerWidth % elementWidth) - minGutterWidth * (maxNbItemWithoutSpace + 2) > 0;

    const maxNbItem = hasMinGutterSpaceAvailable ? maxNbItemWithoutSpace : maxNbItemWithoutSpace - 1;

    if (maxNbItem <= 1) {
        return 1;
    }

    return maxNbItem;
}

interface ResponsiveColumnVariables {
    elementListWidth: number;
    minGutterWidth: number;
    defaultNbItemPerRow: number;
}

/**
 *
 * @param elementListWidth
 * @param minGutterWidth
 * @param defaultNbItemPerRow Le nombre de row qu'il y aura en attendant le premier calcul
 */
export function useResponsiveColumn({
    elementListWidth,
    minGutterWidth,
    defaultNbItemPerRow,
}: ResponsiveColumnVariables) {
    const elementRef = useRef<HTMLDivElement | null>(null);
    const [nbItemPerRow, setNbItemPerRow] = useState<number>(defaultNbItemPerRow);

    useEffect(() => {
        if (!elementRef.current) {
            throw new Error(
                "Vous devez associer la référence à un élément / l'élément est dans un render conditionnel",
            );
        }

        const resizeObserver = new ResizeObserver((entries) => {
            if (entries.length !== 1) {
                throw new Error('Vous devez affecter 1 seule liste virtuel');
            }

            const maxNbItem = getItemsPerRow(entries[0].contentRect.width, elementListWidth, minGutterWidth);

            if (maxNbItem !== nbItemPerRow) {
                setNbItemPerRow(maxNbItem);
            }
        });

        resizeObserver.observe(elementRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, [elementListWidth, minGutterWidth, nbItemPerRow]);

    return [nbItemPerRow, elementRef] as const;
}

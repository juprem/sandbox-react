// const widthNumber = 30;
// const divRef = useRef<HTMLDivElement>(null);
// const childRef = useRef<Element[]>([]);
// const moreDivRef = useRef<HTMLDivElement>(null);
// const [width, setWidth] = useState<number>(170);
// console.log(childRef);
//
// useEffect(() => {
//     const element = divRef.current;
//     const moreElement = moreDivRef.current;
//
//     if (!element || !moreElement) {
//         throw new Error('Not assigned');
//     }
//     if (childRef.current.length == 0) {
//         childRef.current = Array(...element.children);
//     }
//
//     const displayedItem: Element[] = [];
//
//     childRef.current.forEach((it) => {
//         const actualWidth = displayedItem
//             .map((it) => it.getBoundingClientRect().width)
//             .reduce((prev, next) => prev + next, 0);
//
//         if (
//             it.getBoundingClientRect().width != 0 &&
//             actualWidth + it.getBoundingClientRect().width < width - widthNumber
//         ) {
//             displayedItem.push(it);
//         } else moreElement.innerText = (childRef.current.length - displayedItem.length).toString();
//     });
//
//     element.replaceChildren(...displayedItem);
// }, [width]);
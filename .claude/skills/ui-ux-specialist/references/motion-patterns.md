# Motion Patterns (framer-motion + CSS)

## Staggered Reveal

```tsx
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export const List = ({ items }) => (
  <motion.ul variants={container} initial="hidden" animate="show">
    {items.map((i) => (
      <motion.li key={i.id} variants={item}>
        {i.name}
      </motion.li>
    ))}
  </motion.ul>
);
```

## CSS Micro-interactions

```css
/* Panda CSS / CSS Module example */
.button {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.button:active {
  transform: translateY(0);
}
```

ALWAYS IN ENGLISH
Structure of component is the following :
```tsx
import ...

interface ComponentProps {
    
}

export function Component({...}: ComponentProps) {
    // logic
    
    return (//ui)
}
```

the only way to handling tanstack query key
```ts
    const <resourceName>Key = {
        all: ["resourceName"],
        listById: (ids: string[]) => [<resourceName>.all, ...ids],
    // ...
    } as const
```

No useEffect or you have prove it is needed
No css inside tsx file everything inside a ...module.scss
Keep component short and reusable
No definition of logical function in the return part, always extract and name with a meaningful name (ie no handleClick, handleSubmit)
No definition of component inside the logic part, you have to create a new component
Run the oxlint command 'npx oxlint' and correct the error and warnings it mays return, and run also the tsc command and correct any errors it returns
All new colors must be added to src/styles/color.scss with a meaningful name. All color variables must be imported from this file using @use.
Use the classnames library to construct complexe styles with condition.
Use the antd component library
Don t forget the lessons.md when you fell the need to add new rules on codding. But you have to tell me what you add and why.

Color & Theme: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
Motion: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions. Use scroll-triggering and hover states that surprise.
Spatial Composition: Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.
Backgrounds & Visual Details: Create atmosphere and depth rather than defaulting to solid colors. Add contextual effects and textures that match the overall aesthetic. Apply creative forms like gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, custom cursors, and grain overlays.
- **One Component per File**: Each React component must be defined in its own file. Do not define multiple components in a single file to maintain modularity and clarity.
- **Max 3 TSX files per directory**: No more than 3 direct .tsx files are allowed in a single directory. If this limit is reached, create subdirectories or move shared components to a common location.
- **Shared UI Components**: Generic components like LoadingMessage and EmptySearchMessage should be stored in the root of the components directory for reuse.
- **Commit Before Deletion**: Always create a git commit before performing any `rm` operation to ensure code history is preserved.
- **Commit After Session**: Create a git commit at the end of every session to save progress and provide a clear history of changes.
- **Decision Process**: Before implementing a non-trivial architectural change, always explain the process, list the pros and cons, and propose a better alternative if one exists.
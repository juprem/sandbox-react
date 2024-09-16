import styles from './CSSAmusement.module.scss';

export function SelectedAnim() {
    return <div className={styles.label}>COucou</div>;
}


// label {
//     --selected: 0;
//     grid-template-columns:
//     auto calc(var(--selected) * 20px);
// }
// label svg { opacity: var(--selected); }
// label:has(:checked) { --selected: 1; }
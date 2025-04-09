// import { html, LitElement } from 'lit';
//
// class CustomElement extends LitElement {
//     // static properties = {
//     //     count: { type: Number },
//     // };
//     count: number;
//
//     constructor(count = 0) {
//         super();
//         this.count = count;
//     }
//     //
//     // createRenderRoot() {
//     //     return this;
//     // }
//
//     // connectedCallback() {
//     //     super.connectedCallback();
//     // }
//
//     click() {
//         this.count = this.count + 1;
//         console.log(this.count);
//         this.render();
//     }
//
//     render() {
//         return html`<button @click="${this.click}">increase count</button><span>${this.count}</span>`;
//     }
// }
//
// customElements.define('custom-element', CustomElement);
//
// export function WebComponent() {
//     // @ts-ignore
//     return <custom-element></custom-element>;
// }

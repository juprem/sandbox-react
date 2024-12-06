import { useEffect } from 'react';

interface MappedEvent {
    abort: UIEvent;
    animationcancel: AnimationEvent;
    animationend: AnimationEvent;
    animationiteration: AnimationEvent;
    animationstart: AnimationEvent;
    auxclick: MouseEvent;
    beforeinput: InputEvent;
    beforetoggle: Event;
    blur: FocusEvent;
    cancel: Event;
    canplay: Event;
    canplaythrough: Event;
    change: Event;
    click: MouseEvent;
    close: Event;
    compositionend: CompositionEvent;
    compositionstart: CompositionEvent;
    compositionupdate: CompositionEvent;
    contextmenu: MouseEvent;
    copy: ClipboardEvent;
    cuechange: Event;
    cut: ClipboardEvent;
    dblclick: MouseEvent;
    drag: DragEvent;
    dragend: DragEvent;
    dragenter: DragEvent;
    dragleave: DragEvent;
    dragover: DragEvent;
    dragstart: DragEvent;
    drop: DragEvent;
    durationchange: Event;
    emptied: Event;
    ended: Event;
    error: ErrorEvent;
    focus: FocusEvent;
    focusin: FocusEvent;
    focusout: FocusEvent;
    formdata: FormDataEvent;
    gotpointercapture: PointerEvent;
    input: Event;
    invalid: Event;
    keydown: KeyboardEvent;
    keypress: KeyboardEvent;
    keyup: KeyboardEvent;
    load: Event;
    loadeddata: Event;
    loadedmetadata: Event;
    loadstart: Event;
    lostpointercapture: PointerEvent;
    mousedown: MouseEvent;
    mouseenter: MouseEvent;
    mouseleave: MouseEvent;
    mousemove: MouseEvent;
    mouseout: MouseEvent;
    mouseover: MouseEvent;
    mouseup: MouseEvent;
    paste: ClipboardEvent;
    pause: Event;
    play: Event;
    playing: Event;
    pointercancel: PointerEvent;
    pointerdown: PointerEvent;
    pointerenter: PointerEvent;
    pointerleave: PointerEvent;
    pointermove: PointerEvent;
    pointerout: PointerEvent;
    pointerover: PointerEvent;
    pointerup: PointerEvent;
    progress: ProgressEvent;
    ratechange: Event;
    reset: Event;
    resize: UIEvent;
    scroll: Event;
    scrollend: Event;
    securitypolicyviolation: SecurityPolicyViolationEvent;
    seeked: Event;
    seeking: Event;
    select: Event;
    selectionchange: Event;
    selectstart: Event;
    slotchange: Event;
    stalled: Event;
    submit: SubmitEvent;
    suspend: Event;
    timeupdate: Event;
    toggle: Event;
    touchcancel: TouchEvent;
    touchend: TouchEvent;
    touchmove: TouchEvent;
    touchstart: TouchEvent;
    transitioncancel: TransitionEvent;
    transitionend: TransitionEvent;
    transitionrun: TransitionEvent;
    transitionstart: TransitionEvent;
    volumechange: Event;
    waiting: Event;
    webkitanimationend: Event;
    webkitanimationiteration: Event;
    webkitanimationstart: Event;
    webkittransitionend: Event;
    wheel: WheelEvent;
}

type EventTypeName = keyof MappedEvent;

interface useEventListenerProps<T extends EventTypeName> {
    eventType: T;
    listener: (event: MappedEvent[T]) => void;
    htmlId?: string;
}

export function useEventListener<T extends EventTypeName>({ htmlId, eventType, listener }: useEventListenerProps<T>) {
    useEffect(() => {
        const abortController = new AbortController();

        htmlId
            ? document.getElementById(htmlId)?.addEventListener(eventType, listener, { signal: abortController.signal })
            : addEventListener(eventType, listener, { signal: abortController.signal });

        return () => {
            abortController.abort();
        };
    }, []);
}

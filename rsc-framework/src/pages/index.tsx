import { ClientCounter } from '../client.tsx';
import { changeServerCounter, getServerCounter } from '../action.tsx';

export function Page() {
    return (
        <div id="root">
            <form action={changeServerCounter}>
                <input type="hidden" name="change" value="1" />
                <button>server-counter: {getServerCounter()}</button>
            </form>
            <ClientCounter />
            <nav>
                <a href="/test">Go to Test</a> | <a href="/list">Go to List</a>
            </nav>
        </div>
    );
}

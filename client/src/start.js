import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";
import { createStore, applyMiddleware } from "redux";
import * as immutableState from "redux-immutable-state-invariant";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import rootReducer from "./redux/reducer";
import { init } from "./socket";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(immutableState.default()))
);

(async () => {
    const response = await fetch("/user/id.json");
    const data = await response.json();

    if (!data.userId) {
        ReactDOM.render(<Welcome />, document.querySelector("main"));
    } else {
        //initialize Websocket connection and pass the store to it
        init(store);
        ReactDOM.render(
            <Provider store={store}>
                <App />
            </Provider>,

            document.querySelector("main")
        );
    }
})();

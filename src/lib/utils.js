import { globalLoader } from "./loader.js";
import { stepsStore, dbStore } from "./db.js";
import { API_URL, plain_text_assistant_id } from "./constants.js";
import Toastify from 'toastify-js'

export function safeJsonParse(input) {
    console.log(input)
    try {
        return JSON.parse(input);
    } catch (error) {
        return {};
    }
}

export function waitFor(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function handleNext(currentStep) {
    try {
        globalLoader.set(true);
        stepsStore.update((val) => {
            const keys = Object.keys(val);
            keys.forEach((key) => {
                const indexToUpdate = val[key].findIndex((step) => step.number === currentStep);
                if (indexToUpdate !== -1) {
                    val[key][indexToUpdate].done = true;
                }
            });
            return val;

            // const updated = val.map((step) => {
            // 	if (step.number == currentStep) {
            // 		step.done = true;
            // 		return step;
            // 	}
            // 	return step;
            // });
            // return updated;
        });
        const updatedStep = currentStep + 1;
        const updates = {
            currentStep: updatedStep
        };
        dbStore.set(updates);
    } catch (error) {
        Toastify({
            text: 'Error saving data.'
        }).showToast();
    } finally {
        globalLoader.set(false);
    }
}

export async function aiStream(prompt, updateState, setState) {
    let source
    try {
        if (typeof EventSource !== 'undefined') {
            globalLoader.set(true);
            source = new EventSource(
                `${API_URL}/ask_ai_stream?prompt=${prompt}&assistant_id=${plain_text_assistant_id}`
            );
            source.onmessage = (event) => {
                let streamed_data = JSON.parse(event.data);

                if (streamed_data.message) {
                    streamed_data.message = streamed_data.message;
                    // message += streamed_data.message;
                    updateState(streamed_data.message)
                    // console.log(streamed_data.message);
                }
                if (streamed_data.data_stream_event) {
                    let streaming_status = streamed_data.data_stream_event;
                    console.log(streaming_status);
                    if (streaming_status === 'thread.run.failed') {
                        console.error('stream error');
                    }
                }
                if (streamed_data.final_response) {
                    globalLoader.set(false);
                    setState(streamed_data.final_response)
                    // message = streamed_data.final_response;
                }
            };
            source.onerror = (error) => {
                source.close();
                console.error(error);
                globalLoader.set(false);
            };
        } else {
            console.error('SSE Not supported by browser');
        }
    } catch (error) {
        console.log(error);
        Toastify({
            text: error.message
        }).showToast();
        globalLoader.set(false);
    }
}
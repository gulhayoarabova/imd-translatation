/** @format */
import { create } from 'zustand';
import { io } from 'socket.io-client';

const useSocketStore = create((set, get) => ({
    socket: null,
    state: null,
    loading: 'noaction',
    file: null,
    page: 0,
    totalPages: 0,
    action: [],
    status: 'default',

    // Initialize the socket connection
    initializeSocket: (url, jobId) => {
        const existingSocket = get().socket;

        if (!existingSocket) {
            const socket = io(url);

            // Set socket instance
            set({ socket });

            // Attach listeners based on jobId
            if (jobId) {
                socket.on(jobId, (message) => {
                    const { state, action, page, totalPages, setState, setAction } = get();

                    if (message?.status === 'pdf_started') {
                        set({
                            state: { ...state, ...message },
                            totalPages: message.page_num,
                        });
                    } else if (message?.status === 'pdf_completed') {
                        set({
                            loading: 'noaction',
                            state: { ...state, ...message },
                        });
                    } else if (message?.status === 'page_completed' && !action.some((a) => a.page_num === message.page_num)) {
                        set({
                            action: [...action, message],
                            page: message.page_num,
                        });
                    }
                });
            }

            return socket;
        }

        return existingSocket;
    },

    // Actions for socket and file management
    setState: (newState) => set({ state: newState }),
    setFile: (newFile) => set({ file: newFile }),
    setLoading: (loadingStatus) => set({ loading: loadingStatus }),
    setPage: (newPage) => set({ page: newPage }),
    setTotalPages: (newTotal) => set({ totalPages: newTotal }),
    setAction: (newAction) => set({ action: newAction }),
    setStatus: (newStatus) => set({ status: newStatus }),

    // Clear the state
    clearState: () =>
        set({
            state: null,
            action: [],
            file: null,
            page: 0,
            totalPages: 0,
            loading: 'noaction',
            status: 'default',
        }),
}));

export default useSocketStore;

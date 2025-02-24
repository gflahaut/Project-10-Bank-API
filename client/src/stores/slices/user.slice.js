import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const apiUrl = import.meta.env.VITE_API_URL;

const endpoints = {
    login: `${apiUrl}/user/login`,
    profile: `${apiUrl}/user/profile`,
};

const apiRequest = async (url, options) => {
    const response = await fetch(url, options);
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'API Request Failed');
    }

    return response.json();
};

const loginApi = async ({ username, password }) => {
    const tokenRequest = await apiRequest(endpoints.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, password }),
    });

    const token = tokenRequest.body?.token;

    if (!token) {
        throw new Error('Token is missing in the response');
    }
    const infos = await fetchProfileApi(token);

    return { token, infos };
};

export const fetchProfileApi = async (token) => {

    const userInfosRequest = await apiRequest(endpoints.profile, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    const infos = userInfosRequest.body;
    if (!infos) {
        throw new Error('user infos are missing in the response');
    }
    return infos;
}

const updateUserApi = async ({ firstName, lastName, token }) => {
    const response = await apiRequest(endpoints.profile, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ firstName, lastName }),
    });

    return response.body;
};

export const login = createAsyncThunk('user/login', async (credentials, thunkAPI) => {
    try {
        return await loginApi(credentials);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Unexpected error occurred');
    }
});

export const fetchProfile = createAsyncThunk('user/profile', async (token, thunkAPI) => {
    try {
        return await fetchProfileApi(token);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Unexpected error occurred');
    }
});

export const updateUser = createAsyncThunk('user/update', async ({ firstName, lastName }, { getState, rejectWithValue }) => {
    try {
        const token = getState().user.user.token;
        return await updateUserApi({ firstName, lastName, token });
    } catch (error) {
        return rejectWithValue(error.message || 'Unexpected error occurred');
    }
}
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {
            token: null,
            infos: null
        },
        error: null,
        loading: false,
    },
    reducers: {
        logout(state) {
            state.user.token = null;
            state.user.infos = null;
            sessionStorage.removeItem('token');
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user.infos = action.payload;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user.infos = action.payload;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
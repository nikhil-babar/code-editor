import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { axiosClient } from "../../axiosClient";
import { v4 as uuid } from "uuid";
import { saveAs } from "file-saver";
import config from "../../config.json";

export const FILE_STATUS = {
  pending: "PENDING",
  failure: "FAILURE",
  success: "SUCCESS",
  idle: "IDLE",
};

export const EXTENSION_TO_LANG = {
  js: "javascript",
  java: "java",
  py: "python",
  cpp: "cpp",
  c: "c",
};

const getOutput = createAsyncThunk(
  "editor/get-output",
  async ({ fetchRetry = 0, _id, fileId }, { dispatch }) => {
    try {
      const res = await axiosClient.get("/code", {
        params: {
          submit_id: _id,
        },
      });

      return { ...res.data, fileId };
    } catch (error) {
      if (error.response && error.response.status === 404 && fetchRetry <= 10) {
        setTimeout(
          () => dispatch(getOutput({ fetchRetry: ++fetchRetry, _id, fileId })),
          1000
        );

        return Promise.reject(
          JSON.stringify({ fileId, message: FILE_STATUS.pending })
        );
      } else {
        return Promise.reject(
          JSON.stringify({ fileId, message: "Unknown error" })
        );
      }
    }
  }
);

export const executeCode = createAsyncThunk(
  "editor/execute-code",
  async ({ fileId }, { getState, dispatch }) => {
    try {
      const file = fileAdapter
        .getSelectors()
        .selectById(getState().editor, fileId);

      const res = await axiosClient.post("/code", {
        code: file.code,
        lang: file.lang,
        filename: file.nameWithExtension,
        input: file.input,
      });

      dispatch(
        getOutput({
          _id: res.data.submit_id,
          fileId,
        })
      );
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

const fileAdapter = createEntityAdapter({
  selectId: (state) => state.fileId,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const EditorSlice = createSlice({
  name: "editor",
  initialState: {
    ...fileAdapter.getInitialState(),
    openFileIds: [],
    currentFileId: null,
    themes: [...config.themes],
    currentTheme: config.currentTheme,
  },
  reducers: {
    addFile: (state, action) => {
      const newFile = {
        ...action.payload,
        fileId: uuid(),
        status: FILE_STATUS.idle,
        lang: EXTENSION_TO_LANG[action.payload.extension],
        nameWithExtension: [action.payload.name, action.payload.extension].join(
          "."
        ),
      };

      fileAdapter.addOne(state, newFile);
      state.openFileIds.push(newFile.fileId);
      state.currentFileId = newFile.fileId;
    },

    openFile: (state, action) => {
      const { fileId } = action.payload;
      if (!fileId) return;

      const index = state.openFileIds.findIndex((e) => e === fileId);

      if (index === -1) {
        state.openFileIds.push(fileId);
      }

      state.currentFileId = fileId;
    },

    closeFile: (state, action) => {
      const { fileId } = action.payload;
      const index = state.openFileIds.findIndex((e) => e === fileId);

      if (index === -1) return;

      state.openFileIds.splice(index, 1);
      state.currentFileId =
        state.openFileIds.length !== 0
          ? state.openFileIds[Math.min(index, state.openFileIds.length - 1)]
          : null;
    },

    updateFile: (state, action) => {
      fileAdapter.updateOne(state, {
        id: action.payload.fileId,
        changes: { ...action.payload },
      });
    },

    deleteFile: (state, action) => {
      const { fileId } = action.payload;

      fileAdapter.removeOne(state, fileId);

      const index = state.openFileIds.findIndex((e) => e === fileId);
      if (index === -1) return;

      state.openFileIds.splice(index, 1);
      state.currentFileId =
        state.openFileIds.length !== 0
          ? state.openFileIds[Math.min(index, state.openFileIds.length - 1)]
          : null;
    },

    setTheme: (state, action) => {
      state.currentTheme = action.payload;
    },

    downloadFile: (state, action) => {
      const { fileId } = action.payload;
      if (!fileId) return;
      saveAs(
        new Blob([state.entities[fileId].code], {
          type: "text/plain;charset=utf-8",
        }),
        state.entities[fileId].nameWithExtension
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getOutput.rejected, (state, action) => {
        const { fileId, message } = JSON.parse(action.error.message);

        if (message === FILE_STATUS.pending) {
          fileAdapter.updateOne(state, {
            id: fileId,
            changes: { status: FILE_STATUS.pending },
          });
        } else {
          fileAdapter.updateOne(state, {
            id: fileId,
            changes: { status: FILE_STATUS.failure, output: message },
          });
        }
      })
      .addCase(getOutput.fulfilled, (state, action) => {
        const { fileId, output } = action.payload;

        fileAdapter.updateOne(state, {
          id: fileId,
          changes: { output: output, status: FILE_STATUS.success },
        });
      });
  },
});

export const {
  addFile,
  openFile,
  closeFile,
  updateFile,
  setTheme,
  deleteFile,
  downloadFile,
} = EditorSlice.actions;

export const {
  selectAll: selectAllFiles,
  selectById: selectFile,
  selectIds: selectFileIds,
} = fileAdapter.getSelectors();

export const selectOpenFileIds = createSelector(
  [(state) => state?.openFileIds],
  (state) => state
);

export const selectCurrentFileId = createSelector(
  [(state) => state?.currentFileId],
  (state) => state
);

export const selectCurrentTheme = createSelector(
  [(state) => state?.currentTheme],
  (state) => state
);

export const selectThemes = createSelector(
  [(state) => state?.themes],
  (state) => state
);

export default EditorSlice.reducer;

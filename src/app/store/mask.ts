import { create } from "zustand";
import { persist } from "zustand/middleware";

export const ROLES = ["system", "user", "assistant"] as const;

export type MessageRole = (typeof ROLES)[number];

export interface MultimodalContent {
  type: "text" | "image_url";
  text?: string;
  image_url?: {
    url: string;
  };
}

export interface RequestMessage {
  role: MessageRole;
  content: string | MultimodalContent[];
}

export type ChatMessage = RequestMessage & {
  date: string;
  streaming?: boolean;
  isError?: boolean;
  id: string;
};

export type Mask = {
  id: string;
  avatar: string;
  name: string;
  context: ChatMessage[];
};

export const DEFAULT_MASK_AVATAR = "gpt-bot";

export interface MaskState {
  masks: Mask[];
  uploadMasks: () => {};
  fetchMasks: () => {};
}

export const useMaskStore = create<MaskState>()(
  persist((set, get) => ({
    masks: [],
    uploadMasks: async () => {

    },
    fetchMasks: async () => {
      fetch("http://localhost:8080/mask/all").then((res) => {
        return res.json();
      }).then((serverMasks: Mask[]) => {
        set({ masks: serverMasks });
      })
        .catch(e => {
        //  console.error(e);
        })
    }
  }),
    { name: "mask" }
  )
)
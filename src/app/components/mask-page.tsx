import { useEffect } from "react";
import styles from "./mask-page.module.scss";
import { Path } from "../constant";
import { useNavigate } from "react-router-dom";
import { Avatar, EmojiAvatar } from "./emoji";
import { Mask, useMaskStore } from "../store/mask";
import { useChatStore } from "../store/chat";

export function MaskAvatar(props: { avatar: string }) {
    return (
        <Avatar avatar={props.avatar} />
    );
}

function MaskItem(props: { mask: Mask; onClick?: () => void }) {
    return (
        <div className={styles["mask"]} onClick={props.onClick}>
            <MaskAvatar
                avatar={props.mask.avatar}
            />
            <div className={styles["mask-name"] + " one-line"}>{props.mask.name}</div>
        </div>
    );
}

export function MaskPage() {
    const chatStore = useChatStore();

    const masks = useMaskStore((state) => state.masks);
    const fetchMasks = useMaskStore((state) => state.fetchMasks);

    const startChat = (mask?: Mask) => {
        chatStore.newSession(mask);
        navigate(Path.Chat);
    };

    useEffect(() => {
        fetchMasks();
    }, []);

    const navigate = useNavigate();

    return (
        <div className={styles["new-chat"]}>
            <div className={styles["mask-cards"]}>
                <div className={styles["mask-card"]}>
                    <EmojiAvatar avatar="1f606" size={24} />
                </div>
                <div className={styles["mask-card"]}>
                    <EmojiAvatar avatar="1f916" size={24} />
                </div>
                <div className={styles["mask-card"]}>
                    <EmojiAvatar avatar="1f479" size={24} />
                </div>
            </div>

            <div className={styles["title"]}>{"挑选一个面具"}</div>
            
            <div className={styles["sub-title"]}>{"现在开始，与面具背后的灵魂思维碰撞"}</div>

            <div className={styles["mask-container"]}>
                {masks.map((mask, index) => (
                    <MaskItem
                        key={index}
                        mask={mask}
                        onClick={() => startChat(mask)}
                    />
                ))}
            </div>
        </div>
    );
}
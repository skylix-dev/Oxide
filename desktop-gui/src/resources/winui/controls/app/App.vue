<template>
    <div class="app">
        <div :class="`title-bar`+ (!titleBar.focused ? ' mode-blurred' : '') + (titleBar.fullScreen ? ' mode-full-screen' : '')">
            <div class="title-area">
                <div v-if="showTitleArea" class="icon-outer">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Microsoft_Office_logo_%282019%E2%80%93present%29.svg/2048px-Microsoft_Office_logo_%282019%E2%80%93present%29.svg.png" alt="ERR" />
                </div>

                <span v-if="showTitleArea" class="text">{{ title }}</span>
            </div>

            <div class="window-buttons">
                <button @click="windowManager.minimize()">
                    <Icon style="font-size: 17px" :icon="icons.subtract16Regular" />
                </button>

                <button @click="middleButtonAction()">
                    <Icon v-if="titleBar.maximized && !titleBar.fullScreen" style="font-size: 16px" :icon="icons.restore16Regular" />
                    <Icon v-if="!titleBar.maximized && !titleBar.fullScreen" style="font-size: 16px" :icon="icons.maximize16Regular" />
                    <Icon v-if="titleBar.fullScreen" style="font-size: 17px" :icon="icons.fullScreenMinimize24Regular" />
                </button>
                
                <button @click="windowManager.close()" class="mode-close">
                    <Icon style="font-size: 16px" :icon="icons.dismiss16Regular" />
                </button>
            </div>
        </div>

        <div class="content">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Icon } from "@iconify/vue";
import dismiss16Regular from '@iconify-icons/fluent/dismiss-16-regular';
import subtract16Regular from '@iconify-icons/fluent/subtract-16-regular';
import restore16Regular from '@iconify-icons/fluent/restore-16-regular';
import maximize16Regular from '@iconify-icons/fluent/maximize-16-regular';
import fullScreenMinimize24Regular from '@iconify-icons/fluent/full-screen-minimize-24-regular';
import { windowManager } from "../../../../../examples/BasicApp/node_modules/@illuxdev/oxide-desktop-gui/src/Exports";

let onStateChange: null | (() => void) = null;
let onFocusChange: null | (() => void) = null;
let initEvents = false;

export default defineComponent({
    components: {
        Icon
    },
    created() {
        if (!initEvents) {
            initEvents = true;
            windowManager.on("state", () => onStateChange && onStateChange());
            windowManager.on("focusChange", () => onFocusChange && onFocusChange());
        }

        onStateChange = () => {
            this.titleBar.maximized = windowManager.getWindowState() == "maximized";
            this.titleBar.fullScreen = windowManager.getWindowState() == "fullScreen";
        }

        onFocusChange = () => {
             this.titleBar.focused = windowManager.isFocused()
        }
    },
    data() {
        return {
            icons: {
                dismiss16Regular,
                subtract16Regular,
                restore16Regular,
                maximize16Regular,
                fullScreenMinimize24Regular
            },
            titleBar: {
                maximized: windowManager.getWindowState() == "maximized",
                focused: windowManager.isFocused(),
                fullScreen: windowManager.getWindowState() == "fullScreen"
            },
            windowManager
        }
    },
    props: {
        title: {
            type: String,
            default: "Application"
        },
        showTitleArea: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        middleButtonAction() {
            if (this.titleBar.fullScreen) {
                windowManager.exitFullScreen();
            } else if (this.titleBar.maximized) {
                windowManager.restore();
            } else {
                windowManager.maximize();
            }
        }
    }
});
</script>

<style lang="scss" scoped>
@import "../SassTheme.scss";

.app {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;

    .title-bar {
        -webkit-app-region: drag;
        width: 100%;
        height: 32px;
        background: $background_solidBackground_base;
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition: top 100ms;

        .window-buttons {
            -webkit-app-region: no-drag;
            display: flex;
            transition: 100ms;

            button {
                border: none;
                width: 48px;
                height: 32px;
                font-size: 16px;
                background: transparent;
                color: $fill_text_primary;
                display: flex;
                align-items: center;
                justify-content: center;
                outline: none;

                &.mode-close {
                    &:hover {
                        background: #c82c1c;
                        color: #fff;

                        &:active {
                            background: rgba(196, 43, 28, 80%);
                        }
                    }
                }

                &:hover {
                    background: $fill_subtle_secondary;

                    &:active {
                        background: $fill_subtle_tertiary;
                        color: $fill_text_tertiary;
                    }
                }
            }
        }

        .title-area {
            display: flex;
            margin-left: 20px;
            gap: 10px;

            .icon-outer {
                width: 20px;
                border-radius: 4px;
                height: 20px;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .text {
                color: $fill_text_primary;
                font-family: $_font;
                font-size: 12px;
            }
        }

        &.mode-blurred {
            .window-buttons {
                button {
                    color: $fill_text_tertiary;

                    &:hover {
                        color: $fill_text_primary;
                    }
                }
            }   

            .title-area {
                .text {
                    color: $fill_text_tertiary;
                }
            }
        }

        &.mode-full-screen {
            background: transparent;
            position: fixed;
            top: -30px;
            left: 0;
            -webkit-app-region: no-drag;

            &:hover {
                top: 0;
            }

            .window-buttons {
                pointer-events: all;
            }

            .title-area {
                pointer-events: none;
                opacity: 0;
            }
        }
    }

    .content {
        width: 100%;
        height: 100%;
        background: $background_solidBackground_tertiary;
    }
}
</style>
